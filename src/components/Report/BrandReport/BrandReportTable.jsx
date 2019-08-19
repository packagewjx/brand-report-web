import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import ApiClient from "../../Utils/ApiClient";
import BrandReport from "../../Model/BrandReport";
import {equalsObj} from "../../Utils/UtilFunctions";

/**
 * 负责获取与显示品牌报告的表格，没有任何的操作
 */
export default class BrandReportTable extends React.Component {
    static propTypes = {
        arg: PropTypes.instanceOf(BrandReport),
        api: PropTypes.object,
        additionalColumn: PropTypes.array,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        arg: new BrandReport(),
        api: {},
        additionalColumn: [],
        loading: false
    };

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            data: [],
            brandMap: {},
            deleteModal: false,
            deleteReport: undefined,
        }
    }

    fetchData(arg) {
        this.setState({loading: true});
        let p1 = ApiClient.getAllByExample("brand-report", arg)
            .then((response) => {
                let reports = [];
                for (let i = 0; i < response.length; i++) {
                    reports.push(BrandReport.fromJson(response[i]));
                }
                return reports;
            })
            .catch((status, xhr, err) => {
                console.error("获取报告失败");
                console.error(status, xhr, err);
            });
        let p2 = ApiClient.getAll("brand")
            .then((brands) => {
                let brandMap = {};
                for (let i = 0; i < brands.length; i++) {
                    brandMap[brands[i].brandId] = brands[i];
                }
                return brandMap;
            })
            .catch((status, xhr, err) => {
                console.error("获取品牌失败");
                console.error(status, xhr, err);
            });
        Promise.all([p1, p2])
            .then(values => {
                this.setState({
                    data: values[0],
                    brandMap: values[1],
                    loading: false
                })
            })
    }

    componentDidMount() {
        this.fetchData(this.props.arg);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!equalsObj(this.props.arg, nextProps.arg)) {
            this.fetchData(nextProps.arg);
        }

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
            ...this.props.additionalColumn
        ];

        return (
            <ReactTable
                data={this.state.data}
                columns={columns}
                loading={this.state.loading || this.props.loading}
                style={{textAlign: 'center'}}
                defaultPageSize={10}
                getTdProps={() => {
                    return {
                        // 使文字内容居中
                        style: {
                            'textAlign': 'center',
                            'display': 'flex',
                            'flexDirection': 'column',
                            'justifyContent': 'center'
                        }
                    };
                }}
            />
        );
    }
}

