import React from 'react';
import PropTypes from 'prop-types';
import DevelopPower from "../../ApiClient/model/DevelopPower"
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";

export default class DevelopReport extends React.Component{
    static propTypes = {
        developPowers: PropTypes.arrayOf(PropTypes.instanceOf(DevelopPower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let developPowers = this.props.developPowers;
        // 销售同增率

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.saleGrowth >= b.developGrowth.saleGrowth ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return parseFloat(power.developGrowth.saleGrowth * 100).toFixed(3);
        }, document.getElementById('chartjs-dev-saleGrowth'), '销售同增率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.saleGrowth3year >= b.developGrowth.saleGrowth3year ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return power.developGrowth.saleGrowth3year.toFixed(3);
        }, document.getElementById('chartjs-dev-saleGrowth3year'), '三年销售收入平均增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.netProfitGrowth >= b.developGrowth.netProfitGrowth ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return power.developGrowth.netProfitGrowth.toFixed(3);
        }, document.getElementById('chartjs-dev-netProfitGrowth'), '净利润增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.assetGrowth >= b.developGrowth.assetGrowth ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return (power.developGrowth.assetGrowth * 100).toFixed(3);
        }, document.getElementById('chartjs-dev-assetGrowth'), '资产增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.assetGrowth3year >= b.developGrowth.assetGrowth3year ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return power.developGrowth.assetGrowth3year.toFixed(3);
        }, document.getElementById('chartjs-dev-assetGrowth3year'), '三年资产平均增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.fixedAssetNew >= b.developGrowth.fixedAssetNew ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return (power.developGrowth.fixedAssetNew * 100).toFixed(3);
        }, document.getElementById('chartjs-dev-fixedAssetNew'), '固定资产成新率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developGrowth.stockGrowth >= b.developGrowth.stockGrowth ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return power.developGrowth.stockGrowth.toFixed(3);
        }, document.getElementById('chartjs-dev-stockGrowth'), '股价增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        //
        // 首先按照降序排列
        developPowers.sort((a, b) => a.developProtect.brandInfringement >= b.developProtect.brandInfringement ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return power.developProtect.brandInfringement;
        }, document.getElementById('chartjs-dev-brandInfringement'), '法律纠纷数量(单位: 件数)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developProtect.publicRelationExpenseRate >= b.developProtect.publicRelationExpenseRate ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return (power.developProtect.publicRelationExpenseRate * 100).toFixed(3);
        }, document.getElementById('chartjs-dev-publicRelationExpenseRate'), '媒体公关费用占宣传费用(单位: %)');

        // 首先按照降序排列
        developPowers.sort((a, b) => a.developProtect.negativeArticleRate >= b.developProtect.negativeArticleRate ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(developPowers, (power) => {
            return (power.developProtect.negativeArticleRate * 100).toFixed(3);
        }, document.getElementById('chartjs-dev-negativeArticleRate'), '负面报道占比(单位: %)');

    }

    render() {
        return (
            <div>
                {/*<h3 className="mb-lg pv">销售同增率</h3>*/}
                <div>
                <canvas id="chartjs-dev-saleGrowth"/>
                </div>

                {/*<h3 className="mb-lg pv">三年销售收入平均增长率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-saleGrowth3year"/>
                </div>

                {/*<h3 className="mb-lg pv">净利润增长率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-netProfitGrowth"/>
                </div>

                {/*<h3 className="mb-lg pv">资产增长率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-assetGrowth"/>
                </div>

                {/*<h3 className="mb-lg pv">三年资产平均增长率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-assetGrowth3year"/>
                </div>

                {/*<h3 className="mb-lg pv">固定资产成新率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-fixedAssetNew"/>
                </div>

                {/*<h3 className="mb-lg pv">股价增长率</h3>*/}
                <div>
                    <canvas id="chartjs-dev-stockGrowth"/>
                </div>
                {/*保护能力*/}
                {/*<h3 className="mb-lg pv">法律纠纷数量</h3>*/}
                <div>
                    <canvas id="chartjs-dev-brandInfringement"/>
                </div>

                {/*<h3 className="mb-lg pv">媒体公关费用占宣传费用</h3>*/}
                <div>
                    <canvas id="chartjs-dev-publicRelationExpenseRate"/>
                </div>

                {/*<h3 className="mb-lg pv">负面报道占比</h3>*/}
                <div>
                    <canvas id="chartjs-dev-negativeArticleRate"/>
                </div>


            </div>

        );
        // return null;
    }
}
