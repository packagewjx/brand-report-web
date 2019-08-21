import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import BrandReport from "../../Model/BrandReport";
import ApiClient from "../../Utils/ApiClient";
import CommentApplication from "../../Model/CommentApplication";
import ContentWrapper from "../../Layout/ContentWrapper";
import ReactTable from 'react-table';
import {toast, ToastContainer} from 'react-toastify'
import BrandReportComment from "../../Model/BrandReportComment";
import {getCurrentUserId} from "../../Utils/UserUtils";
import {faEye, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

/**
 * 专家查看的页面，显示当前请求评论的和已经评论过的所有品牌报告
 */
class CommentManagementPage extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            myComments: [],
            brandReportMap: {},
            brandReportCommentMap: {},
            loading: false,
            deleteModal: false,
            selectedMyComment: undefined
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({loading: true});
        ApiClient.getAll("comment-application")
            .then(response => {
                let myComments = [];
                let brandReportIdToMyCommentMap = {};

                for (let i = 0; i < response.length; i++) {
                    let myComment = new MyComment();
                    let app = CommentApplication.fromJson(response[i]);
                    myComment.brandReportId = app.brandReportId;
                    myComment.applicantId = app.applicantId;
                    myComment.state = "未评论";
                    myComments.push(myComment);
                    brandReportIdToMyCommentMap[myComment.brandReportId] = myComment;
                }

                let reportPromises = [];
                // 请求所有对应的BrandReport
                for (let i = 0; i < myComments.length; i++) {
                    reportPromises.push(ApiClient.get("brand-report", myComments[i].brandReportId)
                        .then(response => {
                            return BrandReport.fromJson(response);
                        }));
                }
                let query = new BrandReportComment();
                query.userId = getCurrentUserId();
                let commentPromise = ApiClient.getAllByExample("brand-report-comment", query)
                    .then(response => {
                        let comments = [];
                        for (let i = 0; i < response.length; i++) {
                            comments.push(BrandReportComment.fromJson(response[i]));
                        }
                        return comments;
                    });
                return Promise.all([
                    new Promise(resolve => resolve(myComments)),
                    Promise.all(reportPromises),
                    commentPromise,
                    new Promise(resolve => resolve(brandReportIdToMyCommentMap))
                ]);
            })
            .then((value) => {
                let myComments = value[0];
                let reports = value[1];
                let comments = value[2];
                let brandReportIdToMyCommentMap = value[3];
                let currentUserId = getCurrentUserId();

                let reportMap = {};
                for (let i = 0; i < reports.length; i++) {
                    reportMap[reports[i].reportId] = reports[i];
                }

                // 已得到的所有Comment
                let commentMap = {};
                for (let i = 0; i < comments.length; i++) {
                    commentMap[comments[i].brandReportId] = comments[i];
                    // 加入我评论过但是申请没有的
                    if (typeof brandReportIdToMyCommentMap[comments[i].brandReportId] === "undefined"
                        && comments[i].userId === currentUserId) {
                        let myComment = new MyComment();
                        myComment.state = "已评论";
                        myComment.brandReportId = comments[i].brandReportId;
                        myComment.brandReportCommentId = comments[i].commentId;
                        myComments.push(myComment);
                    }
                    // 已评论的
                    if (typeof brandReportIdToMyCommentMap[comments[i].brandReportId] !== "undefined") {
                        brandReportIdToMyCommentMap[comments[i].brandReportId].brandReportCommentId = comments[i].commentId;
                        brandReportIdToMyCommentMap[comments[i].brandReportId].state = "已评论";
                    }
                }

                this.setState({
                    myComments: myComments,
                    brandReportMap: reportMap,
                    brandReportCommentMap: commentMap,
                    loading: false
                });
            })
    }

    deleteComment() {
        this.setState({deleteModal: false});
        ApiClient.delete("brand-report-comment",
            this.state.brandReportCommentMap[this.state.selectedMyComment.brandReportId].commentId)
            .then(() => {
                toast("删除成功", {type: "success"});
                this.setState({selectedMyComment: undefined});
                this.fetchData();
            })
    }

    render() {
        let columns = [
            {
                Header: '报告ID',
                id: 'reportID',
                accessor: 'brandReportId'
            },
            {
                Header: '申请人ID',
                id: 'applicantID',
                Cell: row => row.original.applicantId ? row.original.applicantId : "无申请人"
            },
            {
                Header: '状态',
                id: 'state',
                accessor: 'state'
            },
            {
                Header: '操作',
                id: 'operation',
                Cell: row => <OperationButton row={row} brandReportCommentMap={this.state.brandReportCommentMap}
                                              brandReportMap={this.state.brandReportMap}
                                              onDelete={data => {
                                                  this.setState({
                                                      deleteModal: true,
                                                      selectedMyComment: data
                                                  })
                                              }}/>
            }
        ];

        return (
            <ContentWrapper>
                <h3>评论管理</h3>
                <Card>
                    <CardBody>
                        <ReactTable data={this.state.myComments} loading={this.state.loading}
                                    defaultPageSize={10} columns={columns} style={{textAlign: "center"}}
                                    noDataText="暂无评论申请"
                        />
                    </CardBody>
                </Card>
                <ToastContainer/>
                <DeleteModal toggle={() => {
                    this.setState({deleteModal: !this.state.deleteModal})
                }} isOpen={this.state.deleteModal}
                             name={this.state.selectedMyComment ?
                                 "品牌报告(ID:" + this.state.selectedMyComment.brandReportId + ")的评论" : ""}
                             onDelete={this.deleteComment.bind(this)}/>
            </ContentWrapper>
        );
    }
}

export default withRouter(CommentManagementPage);

function OperationButton(props) {
    let data = props.row.original;

    let checkButton = (
        <Link title={"查看与编辑"} to={{
            pathname: '/brand-report/' + data.brandReportId,
            state: {
                brandReport: props.brandReportMap[data.brandReportId],
                enableCommentEditing: true
            }
        }}>
            <Button>
                <FontAwesomeIcon icon={faEye} style={{fontSize: "18px"}}/>
            </Button>
        </Link>
    );

    if (typeof props.brandReportCommentMap[data.brandReportId] !== "undefined") {
        return (
            <span>
                {checkButton}
                {" "}
                <Button color="danger" onClick={() => props.onDelete(data)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{fontSize: "18px"}}/>
                </Button>
            </span>
        )
    } else {
        return (
            <span>
                {checkButton}
            </span>
        )
    }
}

OperationButton.propTypes = {
    onDelete: PropTypes.func
};

class DeleteModal extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        toggle: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        onDelete: PropTypes.func.isRequired,
    };


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    <FontAwesomeIcon icon={faExclamationTriangle} color={"red"}/>
                    确认删除
                </ModalHeader>
                <ModalBody>
                    确实要删除{this.props.name}吗？
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.onDelete}>确认</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>取消</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class MyComment {
    brandReportId;

    brandReportCommentId;

    applicantId;

    state;
}
