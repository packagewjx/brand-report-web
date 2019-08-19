import {Link, withRouter} from 'react-router-dom';
import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import BrandReportTable from "../BrandReport/BrandReportTable";
import {Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faClipboard, faEye} from '@fortawesome/free-regular-svg-icons';
import {toast, ToastContainer} from 'react-toastify';
import ApiClient from "../../Utils/ApiClient";
import CommentApplication from "../../Model/CommentApplication";
import {getCurrentUserId} from "../../Utils/UserUtils";
import PropTypes from 'prop-types';
import BrandReport from "../../Model/BrandReport";
import BrandReportComment from "../../Model/BrandReportComment";

const stateDisplayName = {
    [CommentApplication.STATE_APPLIED]: "已申请",
    [CommentApplication.STATE_COMMENTING]: "专家评论中",
    [CommentApplication.STATE_FINISHED]: "评论完成"
};

class CommentApplicationPage extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            /**
             * BrandReportId与对应的Application的映射
             */
            commentApplicationMap: {},
            loading: false,
            newApplicationModal: false,
            deleteApplicationModal: false,
            applicationDetailModal: false,
            operateReport: undefined,
            operateApplication: undefined,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({loading: true});
        let query = new CommentApplication();
        query.applicantId = getCurrentUserId();
        ApiClient.getAllByExample("comment-application", query)
            .then((response) => {
                let commentApplicationMap = {};
                for (let i = 0; i < response.length; i++) {
                    let app = CommentApplication.fromJson(response[i]);
                    commentApplicationMap[app.brandReportId] = app;
                }
                this.setState({commentApplicationMap: commentApplicationMap, loading: false});
            })
            .catch((state, xhr, err) => {
                console.error(state, xhr, err);
                toast("获取申请列表失败", {type: "error"})
            });
    }

    addApplication() {
        let app = new CommentApplication();
        app.brandReportId = this.state.operateReport.reportId;
        app.applicantId = getCurrentUserId();
        app.state = CommentApplication.STATE_APPLIED;
        app.stateUpdate = new Date().toISOString();
        app.expertUserIds = [];
        ApiClient.insert("comment-application", app)
            .then((response) => {
                let newApp = CommentApplication.fromJson(response);
                let map = this.state.commentApplicationMap;
                map[newApp.brandReportId] = newApp;
                this.setState({
                    commentApplicationMap: map,
                    newApplicationModal: false,
                    operateReport: undefined
                }, () => {
                    toast("申请成功", {type: "success"})
                })
            })
            .catch((state, xhr, err) => {
                console.error(state, xhr, err);
                toast("申请失败", {type: "error"});
                this.setState({
                    newApplicationModal: false,
                    operateReport: undefined
                })
            })
    }

    deleteApplication() {
        let report = this.state.operateReport;
        let app = this.state.commentApplicationMap[report.reportId];
        // 这里report和app都不应该是undefined
        ApiClient.delete("comment-application", app.applicationId)
            .then((response) => {
                toast("删除申请成功", {type: "success"});
                let map = this.state.commentApplicationMap;
                delete map[report.reportId];
                this.setState({
                    deleteApplicationModal: false,
                    operateReport: undefined,
                    commentApplicationMap: map
                })
            })
            .catch((state, xhr, err) => {
                console.error(state, xhr, err);
                toast("删除申请失败", {type: "error"});
                this.setState({
                    deleteApplicationModal: false,
                    operateReport: undefined
                })
            })
    }

    render() {
        let additionalColumn = [
            {
                Header: "状态",
                id: "state",
                Cell: row => {
                    let report = row.original;
                    let app = this.state.commentApplicationMap[report.reportId];
                    return (
                        <span>
                            {typeof app !== "undefined" ? stateDisplayName[app.state] : "未申请"}
                        </span>
                    )
                }
            },
            {
                Header: "状态更新时间",
                id: "state-update",
                Cell: row => {
                    let report = row.original;
                    let app = this.state.commentApplicationMap[report.reportId];
                    if (typeof app === "undefined") {
                        return "-"
                    } else {
                        let date = new Date(app.stateUpdate);
                        return (
                            <span>
                                {date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
                            </span>
                        )
                    }
                }
            },
            {
                Header: "申请操作",
                id: "operation",
                // 按钮取消居中
                style: {justifyContent: null, flexDirection: null, flex: null},
                Cell: row => {
                    let report = row.original;
                    let app = this.state.commentApplicationMap[report.reportId];
                    if (typeof app === "undefined") {
                        return (
                            <span>
                                <Button title="新建申请" onClick={() => {
                                    this.setState({newApplicationModal: true, operateReport: report})
                                }}>
                                    <span className="fa-layers" style={{fontSize: "16px"}}>
                                        <FontAwesomeIcon icon={faClipboard}/>
                                        <FontAwesomeIcon icon={faPlus} inverse={true}
                                                         transform={"right-6 down-5 shrink-6"}/>
                                        <FontAwesomeIcon icon={faPlus} transform={"right-6 down-5 shrink-8"}/>
                                    </span>
                                </Button>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <Button title="查看申请详情" onClick={() => {
                                    this.setState({applicationDetailModal: true, operateApplication: app})
                                }}>
                                    <FontAwesomeIcon style={{fontSize: "16px"}} icon={faEye}/>
                                </Button>
                                {" "}
                                <Button title="删除申请" color="danger" onClick={() => {
                                    this.setState({deleteApplicationModal: true, operateReport: report})
                                }}>
                                    <FontAwesomeIcon style={{fontSize: "16px"}} icon={faTrash}/>
                                </Button>
                            </span>
                        )
                    }
                }
            }
        ];

        return (
            <ContentWrapper>
                <h3>品牌报告专家评论申请</h3>
                <Card>
                    <CardBody>
                        <BrandReportTable api={this.tableApi} loading={this.state.loading}
                                          additionalColumn={additionalColumn}/>
                        <ToastContainer/>
                    </CardBody>
                </Card>
                <AddApplicationModal open={this.state.newApplicationModal} onConfirm={this.addApplication.bind(this)}
                                     toggle={() => {
                                         this.setState({newApplicationModal: !this.state.newApplicationModal})
                                     }} report={this.state.operateReport}/>
                <DeleteApplicationModal
                    onConfirm={this.deleteApplication.bind(this)} report={this.state.operateReport}
                    open={this.state.deleteApplicationModal}
                    toggle={() => {
                        this.setState({deleteApplicationModal: !this.state.deleteApplicationModal})
                    }}/>
                <ApplicationDetailModal toggle={() => {
                    this.setState({applicationDetailModal: !this.state.applicationDetailModal})
                }} open={this.state.applicationDetailModal} application={this.state.operateApplication}/>
            </ContentWrapper>
        )
    }
}

export default withRouter(CommentApplicationPage)

class ApplicationDetailModal extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        toggle: PropTypes.func,
        application: PropTypes.instanceOf(CommentApplication)
    };

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: false
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.open === false && nextProps.open === true) {
            // 切换为打开时，获取数据
            this.setState({loading: true});
            let query = new BrandReportComment();
            query.brandReportId = nextProps.brandReportId;
            ApiClient.getAllByExample("brand-report-comment", query)
                .then((response) => {
                    let comments = [];
                    for (let i = 0; i < response.length; i++) {
                        comments.push(BrandReportComment.fromJson(response[i]))
                    }
                    this.setState({comments: comments, loading: false})
                })
                .catch(() => {
                    toast("获取数据错误", {type: "error"});
                    this.setState({comments: [], loading: false})
                })
        }
    }

    render() {
        if (typeof this.props.application === "undefined") {
            return null;
        }

        let commentedExpert = undefined;
        if (this.state.loading === true) {
            commentedExpert = "数据获取中";
        } else {
            commentedExpert = "";
            for (let i = 0; i < this.state.comments; i++) {
                commentedExpert += this.state.comments[i].userId + ", ";
            }
            commentedExpert.substr(0, commentedExpert.length - 2);
        }

        let date = new Date(this.props.application.stateUpdate);

        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>专家评论申请详情</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={4}>申请Id</Col>
                        <Col>{this.props.application.applicationId}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>申请人Id</Col>
                        <Col>{this.props.application.applicantId}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>报告Id</Col>
                        <Col>{this.props.application.brandReportId}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>状态</Col>
                        <Col>{stateDisplayName[this.props.application.state]}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>状态更新时间</Col>
                        <Col>{date.toLocaleDateString() + " " + date.toLocaleTimeString()}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>已评价专家ID</Col>
                        <Col>{commentedExpert}</Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Link to={"brand-report/" + this.props.application.brandReportId}>
                        <Button color="primary">查看评论</Button>
                    </Link>
                    <Button onClick={this.props.toggle}>关闭</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class DeleteApplicationModal extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        toggle: PropTypes.func,
        report: PropTypes.instanceOf(BrandReport),
        onConfirm: PropTypes.func,
    };

    render() {
        if (typeof this.props.report === "undefined") {
            return null;
        }
        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>确认删除</ModalHeader>
                <ModalBody>
                    请确认是否删除对品牌报告(ID:{this.props.report.reportId})的专家评价申请
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.onConfirm}>确定</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>取消</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class AddApplicationModal extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        toggle: PropTypes.func,
        onConfirm: PropTypes.func,
        report: PropTypes.instanceOf(BrandReport)
    };

    render() {
        console.log(this);
        if (typeof this.props.report === "undefined")
            return null;
        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>确认</ModalHeader>
                <ModalBody>
                    请确认是否申请对品牌报告(ID:{this.props.report.reportId})进行专家评价
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onConfirm}>确定</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>取消</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
