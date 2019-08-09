import React from '_react@15.6.1@react';
import ContentWrapper from "../../Layout/ContentWrapper";
import {ChannelGrowth} from "../../ApiClient";
import ChannelReport from "./ChannelReport";
import {ChannelPowers} from "./ReportData/channel_power";
import DevelopReport from "./DevelopReport";
import {DevelopPowers} from "./ReportData/devel_power";
import SpreadReport from "./SpreadReport";
import {SpreadPowers} from "./ReportData/spread_power";
import ProductReport from "./ProductReport";
import {ProductPowers} from "./ReportData/product_power";
import ManageReport from "./ManageReport";
import {ManagePowers} from "./ReportData/manage_power";
import MarketReport from "./MarketReport";
import {MarketPowers} from "./ReportData/market_power";
import ValueReport from "./ValueReport";
import {ValuePowers} from "./ReportData/value_power";
import RelationReport from "./RelationReport";
import {RelationPowers} from "./ReportData/relation_power";
import AbstractReport from "./AbstractReport";
import Abstract from "../../ApiClient/model/Abstract";
import {Brands} from "./ReportData/brand";

export default class ReportView extends React.Component {
    constructor(props, context) {
        super(props, context);

        let growth = new ChannelGrowth();
        growth.offlineSaleGrowth = 1;

    }


    render() {
        let abstracts = [];
        for (let i = 1; i <= 30; i++) {
            let abs = new Abstract();
            abs.brandName = Brands[i];
            abs.year = 2018;
            abs.channelScore = parseFloat((35 * Math.random() + 65).toFixed(3)); //(40 * Math.random() + 60).toFixed(3);
            abs.developScore = parseFloat((35 * Math.random() + 65).toFixed(3));//(40 * Math.random() + 60).toFixed(3);
            abs.manageScore = parseFloat((35 * Math.random() + 65).toFixed(3)); //(40 * Math.random() + 60).toFixed(3);
            abs.marketScore = parseFloat((35 * Math.random() + 65).toFixed(3)); //(40 * Math.random() + 60).toFixed(3);
            abs.productScore = parseFloat((35 * Math.random() + 65).toFixed(3)); //(40 * Math.random() + 60).toFixed(3);
            abs.relationScore = parseFloat((35 * Math.random() + 65).toFixed(3));//(40 * Math.random() + 60).toFixed(3);
            abs.valueScore = parseFloat((35 * Math.random() + 65).toFixed(3)); //(40 * Math.random()+ 60).toFixed(3);
            abs.spreadScore = parseFloat((35 * Math.random() + 65).toFixed(3));//(40 * Math.random()+ 60).toFixed(3);
            abstracts.push(abs);
        }


        return (
            <ContentWrapper>
                <h3>行业报告</h3>
                <div className="panel panel-primary">
                    <div className="panel-heading">报告总览</div>
                    <div className="panel-body">
                        <AbstractReport abstracts={abstracts}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">渠道力</div>
                    <div className="panel-body">
                        <ChannelReport channelPowers={ChannelPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">发展力</div>
                    <div className="panel-body">
                        <DevelopReport developPowers={DevelopPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">传播力</div>
                    <div className="panel-body">
                        <SpreadReport spreadPowers={SpreadPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">产品力</div>
                    <div className="panel-body">
                        <ProductReport productPowers={ProductPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">管理力</div>
                    <div className="panel-body">
                        <ManageReport managePowers={ManagePowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">关系力</div>
                    <div className="panel-body">
                        <RelationReport relationPowers={RelationPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">市场力</div>
                    <div className="panel-body">
                        <MarketReport marketPowers={MarketPowers}/>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">价值力</div>
                    <div className="panel-body">
                        <ValueReport valuePowers={ValuePowers}/>
                    </div>
                </div>
            </ContentWrapper>
        );
    }
}
