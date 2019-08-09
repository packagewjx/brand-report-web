import React from 'react';
import PropTypes from 'prop-types';
import MarketPower from "../../ApiClient/model/MarketPower";
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";

export default class MarketReport extends React.Component{
    static propTypes = {
        marketPowers: PropTypes.arrayOf(PropTypes.instanceOf(MarketPower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let marketPowers = this.props.marketPowers;

        //市场占有力
        marketPowers.sort((a, b) => a.marketShare.marketOver >= b.marketShare.marketOver ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return parseFloat((power.marketShare.marketOver * 100).toFixed(3));
        }, document.getElementById('chartjs-market-share'), '市场覆盖率(单位: %)');


        //超值获利力
        //1.品牌溢价率
        marketPowers.sort((a, b) => a.marketPremium.brandPremium >= b.marketPremium.brandPremium ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return parseFloat((power.marketPremium.brandPremium * 100).toFixed(3));
        }, document.getElementById('chartjs-brand-premium'), '品牌溢价率(单位: %)');

        //2.品牌资产报酬率
        marketPowers.sort((a, b) => a.marketPremium.brandAsset >= b.marketPremium.brandAsset ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketPremium.brandAsset * 100).toFixed(3);
        }, document.getElementById('chartjs-brand-asset'), '品牌资产报酬率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        //3.品牌销售利润率
        marketPowers.sort((a, b) => a.marketPremium.brandProfit >= b.marketPremium.brandProfit ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketPremium.brandProfit * 100).toFixed(3);
        }, document.getElementById('chartjs-brand-profit'), '品牌销售利润率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        //市场稳定力
        marketPowers.sort((a, b) => a.marketStable.brandProfitGrowth >= b.marketStable.brandProfitGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketStable.brandProfitGrowth).toFixed(3);
        }, document.getElementById('chartjs-brand-profit-growth'), '品牌销售收入增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        marketPowers.sort((a, b) => a.marketStable.brandIncomeGrowth >= b.marketStable.brandIncomeGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketStable.brandIncomeGrowth * 100).toFixed(3);
        }, document.getElementById('chartjs-brand-income-growth'), '品牌销售利润增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        //brandOutput
        marketPowers.sort((a, b) => a.marketInternational.brandOutput >= b.marketInternational.brandOutput ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketInternational.brandOutput).toFixed(3);
        }, document.getElementById('chartjs-brand-overseas'), '品牌产品出口总额(单位: 万元)');

        marketPowers.sort((a, b) => a.marketInternational.brandOutputProfit >= b.marketInternational.brandOutputProfit ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketInternational.brandOutputProfit).toFixed(3);
        }, document.getElementById('chartjs-brand-output-profit'), '品牌产品出口利润率(单位: %)');

        marketPowers.sort((a, b) => a.marketInternational.brandOverseas >= b.marketInternational.brandOverseas ? -1 : 1);
        drawSingleDataHorizontalBarChart(marketPowers, (power) => {
            return (power.marketInternational.brandOverseas).toFixed(3);
        }, document.getElementById('chartjs-brand-output'), '品牌产品海外销售比例(单位: %)');




    }


    render() {

        return(
            <div>
            {/*<h3 className="mb-lg pv">市场占有力</h3>*/}
            <div>                <canvas id="chartjs-market-share"/>            </div>
            {/*<h3 className="mb-lg pv">超值获利力</h3>*/}
            <div className={"chartjs-market-premium"}>
                <div>                <canvas id="chartjs-brand-premium"/>                </div>
                <div>                <canvas id="chartjs-brand-asset"/>                </div>
                <div>                <canvas id="chartjs-brand-profit"/>                </div>
            </div>
            {/*<h3 className="mb-lg pv">市场稳定力</h3>*/}
                <div className={"chartjs-market-stable"}>
                <div>                <canvas id="chartjs-brand-profit-growth"/>            </div>
                <div>                <canvas id="chartjs-brand-income-growth"/>            </div>
                </div>
            {/*<h3 className="mb-lg pv">国际影响力</h3>*/}
                <div className={"chartjs-market-international"}>
                    <div>                <canvas id="chartjs-brand-overseas"/>            </div>
                    <div>                <canvas id="chartjs-brand-output-profit"/>            </div>
                    <div>                <canvas id="chartjs-brand-output"/>            </div>
                </div>

            </div>
        );
    }
}
