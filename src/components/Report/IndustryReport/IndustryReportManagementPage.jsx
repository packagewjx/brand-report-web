import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {equalsObj} from "../../Utils/UtilFunctions";
import ApiClient from "../../Utils/ApiClient";
import IndustryReport from "../../Model/IndustryReport";
import Brand from "../../Model/Brand";
import ReactTable from 'react-table';
import ContentWrapper from "../../Layout/ContentWrapper";
import {toast} from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAsterisk, faChartBar, faClipboard} from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
import {
    Button,
    Card,
    CardBody,
    FormFeedback,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

const PeriodDisplayNameMap = {
    "annual": "年度",
    "monthly": "月度",
    "quarterly": "季度"
};

class IndustryReportManagementPage extends React.Component {
    static propTypes = {
        query: PropTypes.instanceOf(IndustryReport),
    };

    constructor(props) {
        super(props);

        this.toggleBuildModal = this.toggleBuildModal.bind(this);

        this.state = {
            data: new PageData([], []),
            loading: false,
            buildModal: false
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (!equalsObj(prevProps, this.props)) {
            this._fetchData();
        }
    }

    toggleBuildModal() {
        this.setState({buildModal: !this.state.buildModal})
    }

    _fetchData() {
        let query = this.state.query;
        let reportPromise = ApiClient.getAllByExample("industry-report", query)
            .then(value => {
                let reports = [];
                for (let i = 0; i < value.length; i++) {
                    reports.push(IndustryReport.fromJson(value[i]))
                }
                return reports;
            });

        let brandPromise = ApiClient.getAll("brand")
            .then(value => {
                let brands = [];
                for (let i = 0; i < value.length; i++) {
                    brands.push(Brand.fromJson(value[i]));
                }
                return brands;
            });

        Promise.all([reportPromise, brandPromise])
            .then(value => {
                this.setState({data: new PageData(value[1], value[0]), loading: false})
            });
    }

    onBuild(industry, year, period, periodTimeNumber) {
        this.toggleBuildModal();
        toast("正在构建报告，请稍候");
        $.ajax({
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/industry-report",
            data: {
                build: true,
                "industry": industry,
                "period": period,
                "period-time-number": periodTimeNumber,
                "year": year,
                "save": true
            },
            method: "GET"
        }).done((response, status, xhr) => {
            if (status === "success") {
                let data = this.state.data;
                data.industryReports.push(IndustryReport.fromJson(response));
                this.setState(data);
            } else {
                console.error(xhr);
                toast("构建请求失败", {type: "danger", position: "top-right"});
            }
        }).fail((xhr, status, err) => {
            console.error(err);
            toast("构建请求失败", {type: "danger", position: "top-right"});
        });
    }

    render() {
        let columns = [
            {
                Header: "ID",
                accessor: "industryReportId"
            },
            {
                Header: "行业",
                accessor: "industry"
            },
            {
                Header: "年份",
                accessor: "year",
            },
            {
                Header: "统计时长",
                id: "period",
                Cell: row => {
                    return PeriodDisplayNameMap[row.original.period];
                }
            },
            {
                Header: "年内时间",
                id: "periodTimeNumber",
                Cell: row => {
                    switch (row.original.period) {
                        case "annual":
                            return "-";
                        case "monthly":
                            return row.original.periodTimeNumber + "月";
                        case "quarterly":
                            return "第" + row.original.periodTimeNumber + "季度";
                    }
                }
            }
        ];

        return (
            <ContentWrapper>
                <h3>行业报告管理</h3>
                <Card>
                    <CardBody>
                        <div>
                            <Button title="创建报告" onClick={this.toggleBuildModal}>
                                <span className="fa-layers fa-fw fa-2x">
                                    <FontAwesomeIcon icon={faClipboard}/>
                                    <FontAwesomeIcon icon={faAsterisk} inverse={true}
                                                     transform="shrink-8 right-5 up-5"/>
                                    <FontAwesomeIcon icon={faAsterisk} color={"orange"}
                                                     transform="shrink-10 right-5 up-5"/>
                                    <FontAwesomeIcon icon={faChartBar} inverse={true} transform="shrink-9 down-2"/>
                                </span>
                            </Button>
                            {' '}
                        </div>
                        <ReactTable data={this.state.data.industryReports} columns={columns}/>
                    </CardBody>
                </Card>
                <BuildReportModal open={this.state.buildModal} toggle={this.toggleBuildModal}
                                  brands={this.state.data.brands} onConfirm={this.onBuild.bind(this)}/>
            </ContentWrapper>
        );

    }
}

export default withRouter(IndustryReportManagementPage);

class PageData {
    /**
     * @type {Array.<Brand>}
     */
    brands;

    /**
     * @type {Array.<IndustryReport>}
     */
    industryReports;


    constructor(brands, industryReports) {
        this.brands = brands;
        this.industryReports = industryReports;
    }
}

class BuildReportModal extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        toggle: PropTypes.func,
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        /**
         * 参数为(industry, year, period, periodTimeNumber)的回调函数
         * @type {function(string, number, string, number)}
         */
        onConfirm: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.state = {
            errors: {
                year: '',
                industry: ''
            }
        };
        Object.assign(this.state, BuildReportModal.defaultVal);
    }

    static defaultVal = {
        year: undefined,
        period: "annual",
        periodTimeNumber: 1,
        industry: undefined
    };

    static getPeriodOptions(period) {
        switch (period) {
            case "annual":
                return <option key="1" value={1}>全年</option>;
            case "monthly":
                return [
                    <option key={1} value={1}>一月</option>,
                    <option key={2} value={2}>二月</option>,
                    <option key={3} value={3}>三月</option>,
                    <option key={4} value={4}>四月</option>,
                    <option key={5} value={5}>五月</option>,
                    <option key={6} value={6}>六月</option>,
                    <option key={7} value={7}>七月</option>,
                    <option key={8} value={8}>八月</option>,
                    <option key={9} value={9}>九月</option>,
                    <option key={10} value={10}>十月</option>,
                    <option key={11} value={11}>十一月</option>,
                    <option key={12} value={12}>十二月</option>,
                ];
            case "quarterly":
                return [
                    <option key={1} value={1}>第一季度</option>,
                    <option key={2} value={2}>第二季度</option>,
                    <option key={3} value={3}>第三季度</option>,
                    <option key={4} value={4}>第四季度</option>,
                ];
            default:
                return [];
        }
    }

    validate() {
        let pass = true;
        let errors = {};
        if (typeof this.state.industry === "undefined") {
            errors.industry = "行业不能为空";
            pass = false;
        } else {
            errors.industry = "";
        }

        if (typeof this.state.year === "undefined" || this.state.year.length === 0) {
            errors.year = "年份不能为空";
            pass = false;
        } else {
            errors.year = "";
        }
        this.setState({errors});
        return pass;
    }

    onConfirm() {
        if (this.validate()) {
            this.setState(BuildReportModal.defaultVal);
            this.props.onConfirm(this.state.industry, this.state.year, this.state.period, this.state.periodTimeNumber);
        }
    }

    render() {
        let indMap = new Map();
        for (let i = 0; i < this.props.brands.length; i++) {
            indMap.set(this.props.brands[i].industry, true)
        }
        let industryOptions = [];
        indMap.forEach((value, key) => {
            industryOptions.push(
                <option key={key} value={key}>{key}</option>
            )
        });

        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>构建行业报告</ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            <label>行业</label>
                            <Input type="select" value={this.state.industry} onChange={e => {
                                this.setState({industry: e.target.value})
                            }} invalid={this.state.errors.industry.length > 0}>
                                <option value={undefined}>请选择</option>
                                {industryOptions}
                            </Input>
                            <FormFeedback>{this.state.errors.industry}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <label>年份</label>
                            <Input type="number" value={this.state.year} onChange={e => {
                                this.setState({year: e.target.value})
                            }} invalid={this.state.errors.year.length > 0}/>
                            <FormFeedback>{this.state.errors.year}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <label>统计时长</label>
                            <Input type="select" value={this.state.period} onChange={e => {
                                this.setState({period: e.target.value})
                            }}>
                                <option value="annual">年度</option>
                                <option value="monthly">月度</option>
                                <option value="quarterly">季度</option>
                            </Input>
                        </FormGroup>
                        {
                            this.state.period === "annual" ? null :
                                <FormGroup>
                                    <label>统计时长</label>
                                    <Input type="select" value={this.state.periodTimeNumber} onChange={e => {
                                        this.setState({periodTimeNumber: e.target.value})
                                    }}>
                                        {BuildReportModal.getPeriodOptions(this.state.period)}
                                    </Input>
                                </FormGroup>
                        }
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onConfirm.bind(this)}>确认</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>取消</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
