import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import ChannelPower from "../../ApiClient/model/ChannelPower";
import {drawSingleDataHorizontalBarChart, drawStackedHorizontalBarChart} from "./ChartUtils";

export default class ChannelReport extends React.Component {
    static propTypes = {
        channelPowers: PropTypes.arrayOf(PropTypes.instanceOf(ChannelPower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let channelPowers = this.props.channelPowers;

        // 渠道类型

        // 首先按照降序排列
        channelPowers.sort((a, b) => a.channelCoverage.channelType >= b.channelCoverage.channelType ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(channelPowers, (power) => {
            return power.channelCoverage.channelType;
        }, document.getElementById('chartjs-channel-type'), '渠道类型(单位: 种类)');

        // 渠道数量
        channelPowers.sort((a, b) => a.channelCoverage.channelDirect + a.channelCoverage.channelAgent >=
        b.channelCoverage.channelDirect + b.channelCoverage.channelAgent ? -1 : 1);
        let accessors = [
            (channelPower) => channelPower.channelCoverage.channelDirect,
            (channelPower) => channelPower.channelCoverage.channelAgent
        ];
        drawStackedHorizontalBarChart(channelPowers, accessors, ['直营店数量', '代理店数量'],
            document.getElementById('chartjs-channel-number'), '渠道数量(单位: 个数)', ['rgb(31, 174, 225)', 'rgb(255, 99, 132)']);

        // 渠道产品销售额
        channelPowers.sort((a, b) => a.channelQuality.onlineSales + a.channelQuality.offlineSales >=
        b.channelQuality.onlineSales + b.channelQuality.offlineSales ? -1 : 1);
        accessors = [
            channelPower => channelPower.channelQuality.onlineSales,
            channelPower => channelPower.channelQuality.offlineSales
        ];
        drawStackedHorizontalBarChart(channelPowers, accessors, ['线上渠道销售额', '线下渠道销售额'],
            document.getElementById('chartjs-channel-sales'), '渠道产品销售额(单位: 万元)', ['rgb(31, 174, 225)', 'rgb(255, 99, 132)']);

        // 库存额
        channelPowers.sort((a, b) => a.channelQuality.inStock >= b.channelQuality.inStock ? -1 : 1);
        drawSingleDataHorizontalBarChart(channelPowers, (power) => power.channelQuality.inStock,
            document.getElementById('chartjs-in-stock'), '库存额(单位: 万元)');

        // 渠道收入增速
        channelPowers.sort((a, b) => a.channelGrowth.onlineSaleGrowth + a.channelGrowth.offlineSaleGrowth >=
        b.channelGrowth.onlineSaleGrowth + b.channelGrowth.offlineSaleGrowth ? -1 : 1);
        accessors = [
            channelPower => channelPower.channelGrowth.onlineSaleGrowth * 100,
            channelPower => channelPower.channelGrowth.offlineSaleGrowth * 100
        ];
        drawStackedHorizontalBarChart(channelPowers, accessors, ['线上渠道销售增长', '线下渠道销售增长'],
            document.getElementById('chartjs-channel-growth'), '渠道收入增速(单位: %)', ['rgb(31, 174, 225)', 'rgb(255, 99, 132)']);

        // 渠道收入占比
        channelPowers.sort((a, b) => a.channelGrowth.onlineSaleRate + a.channelGrowth.offlineSaleRate >=
        b.channelGrowth.onlineSaleRate + b.channelGrowth.offlineSaleRate ? -1 : 1);
        accessors = [
            channelPower => channelPower.channelGrowth.onlineSaleRate * 100,
            channelPower => channelPower.channelGrowth.offlineSaleRate * 100
        ];
        drawStackedHorizontalBarChart(channelPowers, accessors, ['线上渠道收入占比', '线下渠道收入占比'],
            document.getElementById('chartjs-channel-income'), '渠道收入占比(单位: %)', ['rgb(31, 174, 225)', 'rgb(255, 99, 132)']);
    }

    render() {
        let range = {
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        };
        for (let i = 0; i < this.props.channelPowers.length; i++) {
            let power = this.props.channelPowers[i];
            range[power.channelCoverage.channelRange] += power.brandName + ', ';
        }
        range[1] = range[1].substr(0, range[1].length - 2);
        range[2] = range[2].substr(0, range[2].length - 2);
        range[3] = range[3].substr(0, range[3].length - 2);
        range[4] = range[4].substr(0, range[4].length - 2);
        range[5] = range[5].substr(0, range[5].length - 2);

        return (
            <div>
                {/*渠道类型*/}
                <div>
                    <canvas id="chartjs-channel-type"/>
                </div>
                {/*渠道数量*/}
                <div>
                    <canvas id="chartjs-channel-number"/>
                </div>
                {/*渠道范围*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>渠道范围</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>渠道范围</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>大区</td>
                            <td>{range[1]}</td>
                        </tr>
                        <tr>
                            <td>省</td>
                            <td>{range[2]}</td>
                        </tr>
                        <tr>
                            <td>市</td>
                            <td>{range[3]}</td>
                        </tr>
                        <tr>
                            <td>县</td>
                            <td>{range[4]}</td>
                        </tr>
                        <tr>
                            <td>村</td>
                            <td>{range[5]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                {/*渠道产品销售额*/}
                <div>
                    <canvas id="chartjs-channel-sales"/>
                </div>
                {/*库存额*/}
                <div>
                    <canvas id="chartjs-in-stock"/>
                </div>
                {/*渠道收入增速*/}
                <div>
                    <canvas id="chartjs-channel-growth"/>
                </div>
                {/*渠道收入占比*/}
                <div>
                    <canvas id="chartjs-channel-income"/>
                </div>
            </div>
        );
    }

}
