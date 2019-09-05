import React from "react";
import PropTypes from "prop-types";
import {ChartSetting} from "./ChartSetting";
import IndustryReport from "../../Model/IndustryReport";
import Brand from "../../Model/Brand";
import {generateRandomId} from "../../Utils/UtilFunctions";
import Index from "../../Model/Index";
import ChartJSDataConfigObject from "./ChartJSDataConfigObject";
import ChartJSDataSet from "./ChartJSDataSet";
import Chart from 'chart.js';

const SORT_ASC = "asc";
const SORT_DESC = "desc";
const COLOR = [
    '#23b7e5',
    '#7266ba',
    '#fad732',
    '#f532e5',
    'rgba(114,102,186,0.2)',
    'rgba(151,187,205,1)',
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)"
];

export class ChartDrawer extends React.Component {
    static propTypes = {
        chartSetting: PropTypes.instanceOf(ChartSetting),
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        visible: PropTypes.bool,
        style: PropTypes.any,
        height: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.canvasId = generateRandomId();
        this.doDraw = this.doDraw.bind(this);
        this.state = {
            dataConfig: null,
            type: null,
            sort: {
                index: null,
                order: null
            }
        }
    }

    static getDerivedStateFromProps(props, prevState) {
        if (prevState.dataConfig === null) {
            let type = ChartDrawer._getType(props.chartSetting);
            let {labels, data} = ChartDrawer._getLabelAndData(props.chartSetting, props.industryReport, props.brands);
            return {
                type: type,
                dataConfig: ChartDrawer._getChartDataConfig(type, labels, data, props.chartSetting.indices, props.chartSetting.colors),
            };
        }
        return null;
    }

    /**
     * 获取图的labels与各个指标对应的data
     * @param {ChartSetting} chartSetting
     * @param {IndustryReport} industryReport
     * @param {Brand[]} brands
     * @private
     * @return {{labels: string[], data: *[][]}} data的第i个元素，是第i个指标的所有品牌的数据，品牌数据的顺序，与labels的顺序相同
     */
    static _getLabelAndData(chartSetting, industryReport, brands) {
        let brandMap = new Map();
        for (let i = 0; i < brands.length; i++) {
            brandMap.set(brands[i].brandId, brands[i]);
        }

        let brandIds = Object.keys(industryReport.brandReports);
        let labels = [];
        let data = [];
        for (let i = 0; i < chartSetting.indices.length; i++) {
            data.push([]);
        }
        for (let p = 0; p < brandIds.length; p++) {
            if (brandMap.get(brandIds[p])) {
                labels.push(brandMap.get(brandIds[p]).brandName);
            } else {
                labels.push(brandIds[p]);
            }
            let brandReport = industryReport.brandReports[brandIds[p]];
            for (let j = 0; j < chartSetting.indices.length; j++) {
                data[j].push(
                    brandReport.data[chartSetting.indices[j].indexId]
                );
            }
        }
        return {
            labels,
            data
        }
    }

    /**
     * 判断绘图类型
     *
     * 单指标支持绘图类型：饼图（enum与bool类型限定），表格，条形图
     * 多指标支持绘图类型：饼图（enum与bool类型限定），表格，堆叠条形图，雷达图
     *
     * @param {ChartSetting} chartSetting
     * @private
     * @return {string | null} 绘图类型
     */
    static _getType(chartSetting) {
        let indexType = chartSetting.indices[0].type;
        for (let i = 1; i < chartSetting.indices.length; i++) {
            if (indexType !== chartSetting.indices[i].type) {
                throw new Error("类型不一致，不能绘图");
            }
        }
        if (chartSetting.indices.length === 1) {
            if (typeof chartSetting.type === "string" && chartSetting.type !== ChartSetting.TYPE_DEFAULT) {
                switch (chartSetting.type) {
                    case ChartSetting.TYPE_STACK_BAR:
                    case ChartSetting.TYPE_RADAR:
                    default:
                        throw new Error("单指标时不支持类型" + chartSetting.type);
                    case ChartSetting.TYPE_PIE:
                        if (indexType === Index.TYPE_ENUM) {
                            return chartSetting.type;
                        } else {
                            throw new Error("饼图仅支持枚举型指标");
                        }
                    case ChartSetting.TYPE_TABLE:
                    case ChartSetting.TYPE_SINGLE_BAR:
                        return chartSetting.type;
                }
            } else {
                // 实际判断
                switch (indexType) {
                    case Index.TYPE_INDICES:
                        throw new Error("错误，不能有指标集合");
                    case Index.TYPE_NUMBER:
                        return ChartSetting.TYPE_SINGLE_BAR;
                    case Index.TYPE_BOOL:
                    case Index.TYPE_ENUM:
                        return ChartSetting.TYPE_PIE;
                    default:
                        throw new Error("未知的指标类型");
                }
            }
        } else if (chartSetting.indices.length > 1) {
            if (typeof chartSetting.type === "string" && chartSetting.type !== ChartSetting.TYPE_DEFAULT) {
                switch (chartSetting.type) {
                    case ChartSetting.TYPE_STACK_BAR:
                    case ChartSetting.TYPE_RADAR:
                    case ChartSetting.TYPE_TABLE:
                        return chartSetting.type;
                    case ChartSetting.TYPE_PIE:
                    case ChartSetting.TYPE_SINGLE_BAR:
                        throw new Error("多指标时不支持" + chartSetting.type + "类型");
                    default:
                        throw new Error("非法绘图类型值");
                }
            } else {
                // 实际判断
                switch (indexType) {
                    case Index.TYPE_INDICES:
                        throw new Error("错误，不能有指标集合");
                    case Index.TYPE_NUMBER:
                        return ChartSetting.TYPE_STACK_BAR;
                    case Index.TYPE_BOOL:
                    case Index.TYPE_ENUM:
                        return ChartSetting.TYPE_PIE;
                    default:
                        throw new Error("未知的指标类型");
                }
            }
        } else /*长度为0*/ {
            throw new Error("绘图设置的indices长度不应该是0")
        }
    }

    /**
     *
     * @param {string} type 绘图类型
     * @param {string[]} labels 标签
     * @param {*[][]} data 数据，第一维度是指标，第二维度则是品牌对应的数据值
     * @param {Index[]} indices 指标数据
     * @param {string[]} colors 颜色值
     * @private
     * @return {ChartJSDataConfigObject} 能用于Chartjs绘图的数据集对象
     */
    static _getChartDataConfig(type, labels, data, indices, colors) {
        if (data.length !== indices.length) {
            throw new Error("数据的长度与指标数组长度不一致");
        }
        if (data.length === 0) {
            throw new Error("没有数据！");
        }
        if (colors === undefined) {
            colors = [];
        }

        let dataConfig = new ChartJSDataConfigObject();
        if (type === ChartSetting.TYPE_PIE) {
            // 重建标签
            let map = new Map();
            for (let i = 0; i < data[0].length; i++) {
                if (map.has(data[0][i])) {
                    map.set(data[0][i], map.get(data[0][i]) + 1);
                } else {
                    map.set(data[0][i], 1);
                }
            }
            let dataLabels = [];
            let pieData = [];
            map.forEach((value, key) => {
                dataLabels.push(key === undefined ? "无数据" : key);
                pieData.push(value);
            });
            dataConfig.labels = dataLabels;
            let dataset = new ChartJSDataSet();
            dataset.label = indices[0].displayName;
            dataset.data = pieData;
            dataset.backgroundColor = [];
            for (let i = 0; i < pieData.length; i++) {
                dataset.backgroundColor.push(colors[i] ? colors[i] : COLOR[i]);
            }
            dataConfig.datasets = [dataset];
        } else {
            dataConfig.labels = labels;
            dataConfig.datasets = [];
            for (let i = 0; i < indices.length; i++) {
                let dataset = new ChartJSDataSet();
                dataset.label = indices[i].displayName;
                dataset.backgroundColor = colors[i] ? colors[i] : COLOR[i];
                dataset.data = data[i];
                dataConfig.datasets.push(dataset);
            }
        }
        return dataConfig;
    }

    componentDidMount() {
        this.doDraw();
    }

    doDraw() {
        if (this.props.chartSetting.type === ChartSetting.TYPE_TABLE) {
            return;
        }

        let chartOption = {
            data: this.state.dataConfig,
            options: {
                maintainAspectRatio: this.props.chartSetting.maintainAspectRatio,
                aspectRatio: this.props.chartSetting.aspectRatio,
                animation: {
                    duration: 0,
                }
            }
        };
        switch (this.state.type) {
            case ChartSetting.TYPE_TABLE:
            default:
                throw new Error("类型未知");
            case ChartSetting.TYPE_SINGLE_BAR:
            case ChartSetting.TYPE_STACK_BAR:
                chartOption.type = "bar";
                break;
            case ChartSetting.TYPE_PIE:
                chartOption.type = "pie";
                break;
            case ChartSetting.TYPE_RADAR:
                chartOption.type = "radar";
                break;
        }

        this.chart = new Chart(this.canvas, chartOption);
    }

    componentWillUnmount() {
        if (this.props.chartSetting.type !== ChartSetting.TYPE_TABLE) {
            this.chart.destroy();
        }
    }

    render() {
        let type = ChartDrawer._getType(this.props.chartSetting);
        if (type === ChartSetting.TYPE_TABLE) {
            if (this.props.visible) {

            } else {
                return (
                    <div style={this.props.style}>
                        <h3>
                            {this.props.chartSetting.title}
                        </h3>
                    </div>
                );
            }
        } else {
            return (
                <div style={this.props.style}>
                    <h3>
                        {this.props.chartSetting.title}
                    </h3>
                    <div style={{height: this.props.height - 40}}>
                        <canvas ref={instance => this.canvas = instance} id={this.canvasId}/>
                    </div>
                </div>
            );
        }
    }
}
