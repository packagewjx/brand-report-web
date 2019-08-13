import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import ApiClient from "../../Utils/ApiClient";
import BrandReport from "../../Model/BrandReport";

export default class BrandReportTable extends React.Component {
    static propTypes = {
        arg: PropTypes.instanceOf(BrandReport),
        notifyRefresh: PropTypes.func
    };

    static defaultProps = {
        arg: new BrandReport()
    };

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.state = {
            data: [],
            brandMap: {},
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

    componentDidMount() {
        this.fetchData(this.props.arg);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.fetchData(nextProps.arg);
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
            }
        ];

        return (
            <ReactTable
                data={this.state.data}
                columns={columns}
                loading={this.state.loading}
                style={{textAlign: 'center'}}
                defaultPageSize={10}
            />
        );

    }
}
