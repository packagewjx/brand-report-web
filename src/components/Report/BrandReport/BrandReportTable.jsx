import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import ApiClient from "../../Utils/ApiClient";
import BrandReport from "../../Model/BrandReport";

export default class BrandReportTable extends React.Component {
    static propTypes = {
        arg: PropTypes.instanceOf(BrandReport),
        notifyRefresh: PropTypes.func,
        api: PropTypes.object,
    };

    static defaultProps = {
        arg: new BrandReport(),
        api: {},
    };

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);

        this.state = {
            data: [],
            brandMap: {},
            deleteModal: false,
            deleteReport: undefined,
        }
    }

    fetchData(arg) {
        this.setState({loading: true});
        ApiClient.getAllByExample("brand-report", arg)
            .done((response, status, xhr) => {
                if (status === "success") {
                    this.setState({data: response, loading: false});
                }
            });
        ApiClient.getAll("brand")
            .done((response, status) => {
                if (status === "success") {
                    let brandMap = {};
                    for (let i = 0; i < response.length; i++) {
                        brandMap[response[i].brandId] = response[i];
                    }
                    this.setState({brandMap: brandMap})
                }
            })
    }

    onViewButtonClick(row) {
        console.log(this.props);
        console.log(row);
    }

    onDeleteButtonClick(row) {
        this.setState({
            deleteReport: row.original,
            deleteModal: true
        });
    }

    deleteBrandReport() {
        console.log(this.state.deleteReport);
        this.setState({
            deleteReport: undefined,
            deleteModal: false
        })
    }

    toggleDeleteModal() {
        this.setState({deleteModal: !this.state.deleteModal})
    }

    componentDidMount() {
        this.fetchData(this.props.arg);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.fetchData(nextProps.arg);

        // 填充API
        let self = this;
        this.props.api.refresh = function () {
            self.setState({loading: true});
            self.fetchData(self.props.arg);
        };
    }

    static getTime(report) {
        let str = report.year + "年";
        if (report.period === "monthly") {
            str += report.periodTimeNumber + "月"
        } else if (report.period === "quarterly") {
            str += "第" + report.periodTimeNumber + "季度";
        }
        return str;
    }

    render() {
        let columns = [
            {
                Header: "ID",
                accessor: "reportId"
            },
            {
                Header: "品牌名",
                id: "brandName",
                accessor: row => {
                    return this.state.brandMap[row.brandId] ? this.state.brandMap[row.brandId].brandName : row.brandId;
                }
            },
            {
                Header: "报告年份",
                accessor: "year",
                width: 80,
            },
            {
                Header: "统计时长",
                id: 'period',
                width: 80,
                accessor: row => {
                    switch (row.period) {
                        case "annual":
                            return "年度";
                        case "monthly":
                            return "月度";
                        case "quarterly":
                            return "季度";
                        default:
                            return "未知";
                    }
                },
            },
            {
                Header: "年内时间",
                id: 'periodTimeNumber',
                width: 80,
                accessor: row => {
                    switch (row.period) {
                        case "annual":
                            return "-";
                        case "monthly":
                            return row.periodTimeNumber + "月";
                        case "quarterly":
                            return row.periodTimeNumber + "季度";
                    }
                },
            },
            {
                Header: "创建时间",
                id: 'createTime',
                accessor: row => {
                    let date = new Date(Date.parse(row.createTime));
                    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
                }
            },
            {
                Header: "操作",
                Cell: row => <OperationButtons row={row} onDeleteButtonClick={this.onDeleteButtonClick.bind(this)}
                                               onViewButtonClick={this.onViewButtonClick.bind(this)}/>
            }
        ];

        return (
            <div>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    loading={this.state.loading}
                    style={{textAlign: 'center', verticalAlign: 'center'}}
                    defaultPageSize={10}
                />
                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Modal title</ModalHeader>
                    <ModalBody>
                        {typeof this.state.deleteReport !== "undefined" ?
                            "确定要删除" + this.state.brandMap[this.state.deleteReport.brandId].brandName
                            + "在" + BrandReportTable.getTime(this.state.deleteReport)
                            + "的品牌报告(ID:" + this.state.deleteReport.brandId + ")吗？"
                            : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteBrandReport.bind(this)}>是</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteModal}>否</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}

class OperationButtons extends React.Component {
    static propTypes = {
        onDeleteButtonClick: PropTypes.func,
        onViewButtonClick: PropTypes.func,
        row: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <Button title="查看报告" onClick={() => {
                    this.props.onViewButtonClick(this.props.row);
                }}>
                    <FontAwesomeIcon icon={faEye}/>
                </Button>
                <Button title="删除报告" onClick={() => {
                    this.props.onDeleteButtonClick(this.props.row);
                }}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </span>
        );
    }
}
