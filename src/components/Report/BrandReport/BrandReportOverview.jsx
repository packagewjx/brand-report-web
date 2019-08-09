import React from 'react';
import {Brands} from "../ReportView/ReportData/brand";
import ReactTable from 'react-table';
import ContentWrapper from "../../Layout/ContentWrapper";
import {ChannelPowers} from "../ReportView/ReportData/channel_power";
import {DevelopPowers} from "../ReportView/ReportData/devel_power";
import {ManagePowers} from "../ReportView/ReportData/manage_power";
import {MarketPowers} from "../ReportView/ReportData/market_power";
import {ProductPowers} from "../ReportView/ReportData/product_power";
import {RelationPowers} from "../ReportView/ReportData/relation_power";
import {SpreadPowers} from "../ReportView/ReportData/spread_power";
import {ValuePowers} from "../ReportView/ReportData/value_power";
import Abstract from "../../ApiClient/model/Abstract";

class BrandReport {
    brandName;

    year;

    reportId;

    constructor(brandName, year, reportId) {
        this.brandName = brandName;
        this.year = year;
        this.reportId = reportId;
    }
}

export default class BrandReportOverview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            brandReports: [],
        };

        this.loadDataAndGo = this.loadDataAndGo.bind(this);
    }

    componentDidMount() {
        // 使用假数据生成表格
        let brands = Brands;
        let brandReports = [];
        for (let i = 1; i <= 30; i++) {
            brandReports.push(new BrandReport(brands[i], 2018, i));
        }

        this.setState({brandReports: brandReports});
    }

    /**
     * 根据选中的brandReport查看详细报告
     * @param brandReport
     */
    loadDataAndGo(brandReport) {
        let state = {};

        let func = (powers, statePowerName) => {
            for (let i = 0; i < powers.length; i++) {
                if (powers[i].brandName === brandReport.brandName) {
                    state[statePowerName] = powers[i];
                }
            }
        };

        func(ChannelPowers, 'channelPower');
        func(DevelopPowers, 'developPower');
        func(ManagePowers, 'managePower');
        func(MarketPowers, 'marketPower');
        func(ProductPowers, 'productPower');
        func(RelationPowers, 'relationPower');
        func(SpreadPowers, 'spreadPower');
        func(ValuePowers, 'valuePower');

        let abstract = new Abstract();
        abstract.valueScore = 100;
        abstract.spreadScore = 100;
        abstract.relationScore = 100;
        abstract.productScore = 100;
        abstract.marketScore = 100;
        abstract.manageScore = 100;
        abstract.developScore = 100;
        abstract.channelScore = 100;
        abstract.brandName = brandReport.brandName;
        abstract.year = brandReport.year;

        state.abstract = abstract;

        this.props.history.push('report-brand', state);
    }

    render() {
        let router = this.props.history;

        const columns = [{
            Header: '报告年份',
            accessor: 'year',
        }, {
            Header: '品牌名',
            accessor: 'brandName'
        }];

        return (
            <ContentWrapper>
                <h3>品牌报告列表</h3>
                <ReactTable data={this.state.brandReports} columns={columns} defaultPageSize={15}
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        this.loadDataAndGo(rowInfo.original);
                                    }
                                }
                            }}/>
            </ContentWrapper>
        );
    }
}
