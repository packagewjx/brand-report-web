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
import {Table} from "reactstrap";
import ChartJSConfigObject from "./ChartJSConfigObject";

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
        chartSetting: PropTypes.instanceOf(ChartSetting).isRequired,
        industryReport: PropTypes.instanceOf(IndustryReport).isRequired,
        /**
         * 品牌ID与品牌的对应表
         * @type {Map.<string, Brand>}
         */
        brandMap: PropTypes.instanceOf(Map),
        style: PropTypes.any,
        width: PropTypes.number.isRequired,
        measure: PropTypes.func,
        onHeightChanged: PropTypes.func
    };

    static SIZES = {
        headerHeight: 40,
        barWidth: 24,
        tableRowHeight: 30,
    };

    constructor(props) {
        super(props);
        this.canvasId = generateRandomId();
        this.doDraw = this.doDraw.bind(this);
        this.state = {
            chartConfig: null,
            type: null,
            chartHeight: 0,
            addHeight: 0,
            sort: {
                index: null,
                order: null
            }
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps.width !== this.props.width) {
            this.props.onHeightChanged();
        }
    }

    static getDerivedStateFromProps(props, prevState) {
        let {chartHeight} = ChartDrawer.determineChartDrawerHeight(props.chartSetting, props.industryReport, props.width);
        if (props.chartSetting.type !== ChartSetting.TYPE_TABLE && prevState.chartConfig === null) {
            let type = ChartDrawer._getType(props.chartSetting);
            let {labels, data} = ChartDrawer._getLabelAndData(props.chartSetting, props.industryReport, props.brandMap);
            let dataConfig = ChartDrawer._getChartDataConfig(type, labels, data, props.chartSetting.indices, props.chartSetting.colors);
            let chartConfig = ChartDrawer._getChartConfig(type, dataConfig, props.chartSetting);
            return {
                type: type,
                chartConfig: chartConfig,
                chartHeight,
            };
        }
        if (chartHeight !== prevState.chartHeight) {
            return {
                chartHeight
            }
        }
        return null;
    }

    /**
     * 判断ChartDrawer组件的高度
     * @param {ChartSetting} chartSetting
     * @param {IndustryReport} industryReport
     * @param {number} width 组件的宽度
     * @return {{chartHeight: number}} chartHeight是图的高度，totalHeight是组件总高度，addHeight是额外组件的高度
     */
    static determineChartDrawerHeight(chartSetting, industryReport, width) {
        let type = ChartDrawer._getType(chartSetting);
        let brandCount = Object.keys(industryReport.brandReports).length + 1;
        switch (type) {
            case ChartSetting.TYPE_SINGLE_BAR:
            case ChartSetting.TYPE_STACK_BAR:
                return {chartHeight: ChartDrawer.SIZES.barWidth * brandCount};
            default:
                return {chartHeight: width / 1.617}
        }
    }

    /**
     * 获取图的labels与各个指标对应的data
     * @param {ChartSetting} chartSetting
     * @param {IndustryReport} industryReport
     * @param {Map.<string, Brand>} brandMap
     * @private
     * @return {{labels: string[], data: *[][]}} data的第i个元素，是第i个指标的所有品牌的数据，品牌数据的顺序，与labels的顺序相同
     */
    static _getLabelAndData(chartSetting, industryReport, brandMap) {
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
            data,
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
     * @param {string[]} brandNames 品牌名，与data[*]的数组的数据顺序对应
     * @param {*[][]} data 数据，第一维度是指标，第二维度则是品牌对应的数据值
     * @param {Index[]} indices 指标数据
     * @param {string[]} colors 颜色值
     * @private
     * @return {ChartJSDataConfigObject} 能用于Chartjs绘图的数据集对象
     */
    static _getChartDataConfig(type, brandNames, data, indices, colors) {
        if (data.length !== indices.length) {
            throw new Error("数据的长度与指标数组长度不一致");
        }
        if (data.length === 0) {
            throw new Error("没有数据！");
        }
        if (brandNames.length !== data[0].length) {
            throw new Error("品牌名长度与数据长度不一致");
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
        } else if (type === ChartSetting.TYPE_RADAR) {
            // 雷达图需要进行标准化工作
            let labels = [];
            let eachMax = [];
            for (let i = 0; i < indices.length; i++) {
                labels.push(indices[i].displayName);
                eachMax.push(0);
            }
            // 找出所有的最大值
            for (let i = 0; i < indices.length; i++) {
                let max = 0;
                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j] > max) {
                        max = data[i][j]
                    }
                }
                eachMax[i] = max;
            }
            let dataSets = [];
            for (let i = 0; i < brandNames.length; i++) {
                // 随机选颜色
                let red = 256 * Math.random();
                let blue = 256 * Math.random();
                let green = 256 * Math.random();
                let brandNormalizedData = [];
                let brandData = [];
                for (let j = 0; j < indices.length; j++) {
                    brandNormalizedData.push(data[j][i] / eachMax[j]);
                    brandData.push(data[j][i]);
                }
                let dataSet = new ChartJSDataSet();
                dataSet.label = brandNames[i];
                dataSet.data = brandNormalizedData;
                dataSet.backgroundColor = `rgb(${red}, ${blue}, ${green}, 0.2)`;
                // 默认不显示，防止图过于难看
                dataSet.hidden = true;
                dataSet.originalData = brandData;
                dataSets.push(dataSet);
            }
            dataConfig.datasets = dataSets;
            dataConfig.labels = labels;
        } else {
            dataConfig.labels = brandNames;
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

    /**
     * 获取chartOption
     * @param {string} type
     * @param {ChartJSDataConfigObject} dataConfig
     * @param {ChartSetting} chartSetting
     * @return {ChartJSConfigObject}
     * @private
     */
    static _getChartConfig(type, dataConfig, chartSetting) {
        let chartConfig = new ChartJSConfigObject();
        chartConfig.data = dataConfig;
        chartConfig.options = {
            maintainAspectRatio: chartSetting.maintainAspectRatio,
            aspectRatio: chartSetting.aspectRatio,
            animation: {
                duration: 0,
            },
        };

        switch (type) {
            case ChartSetting.TYPE_TABLE:
            default:
                throw new Error(`不支持${type}`);
            case ChartSetting.TYPE_SINGLE_BAR:
            case ChartSetting.TYPE_STACK_BAR:
                chartConfig.type = "horizontalBar";
                chartConfig.options.scales = {
                    xAxes: [{
                        ticks: {
                            callback: function (value, index, values) {
                                return value + chartSetting.indices[0].unit;
                            }
                        }
                    }],
                };
                chartConfig.options.tooltips = {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": "
                                + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                + chartSetting.indices[0].unit;
                        }
                    }
                };
                break;
            case ChartSetting.TYPE_PIE:
                chartConfig.type = "pie";
                break;
            case ChartSetting.TYPE_RADAR:
                chartConfig.type = "radar";
                // 雷达图是标准化过的，值的范围是0~1，因此需要显示原数据，而不是标准化后的
                chartConfig.options.tooltips = {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": "
                                + data.datasets[tooltipItem.datasetIndex].originalData[tooltipItem.index]
                                + chartSetting.indices[tooltipItem.index].unit;
                        }
                    }
                };
                // 关闭坐标轴，不显示标准化数据
                chartConfig.options.scale = {
                    ticks: {
                        beginAtZero: true,
                        display: false
                    }
                };
                break;
        }
        return chartConfig;
    }

    componentDidMount() {
        this.doDraw();
    }

    doDraw() {
        if (this.props.chartSetting.type === ChartSetting.TYPE_TABLE) {
            return;
        }

        this.chart = new Chart(this.canvas, this.state.chartConfig);
    }

    componentWillUnmount() {
        if (this.props.chartSetting.type !== ChartSetting.TYPE_TABLE) {
            this.chart.destroy();
        }
    }

    render() {
        let chartSetting = this.props.chartSetting;
        let type = ChartDrawer._getType(chartSetting);
        let brandMap = this.props.brandMap;

        if (type === ChartSetting.TYPE_TABLE) {
            let ths = [];
            for (let i = 0; i < chartSetting.indices.length; i++) {
                ths.push(
                    <th key={i}>
                        {chartSetting.indices[i].displayName}
                    </th>
                )
            }
            let trs = [];
            Object.entries(this.props.industryReport.brandReports).forEach(pair => {
                let tds = [];
                for (let i = 0; i < chartSetting.indices.length; i++) {
                    let data = pair[1].data[chartSetting.indices[i].indexId];
                    tds.push(
                        <td key={i}>
                            {data === undefined ? "无数据" : data}
                        </td>
                    )
                }
                trs.push(
                    <tr key={pair[0]}>
                        <td>{brandMap.get(pair[0]) === undefined ? pair[0] : brandMap.get(pair[0]).brandName}</td>
                        {tds}
                    </tr>
                )
            });


            return (
                <div style={this.props.style}>
                    <h3>
                        {chartSetting.title}
                    </h3>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>品牌</th>
                            {ths}
                        </tr>
                        </thead>
                        <tbody>
                        {trs}
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            let additionalElement = null;
            if (this.state.type === ChartSetting.TYPE_PIE) {
                // 为饼图添加品牌对应数据的表格
                if (chartSetting.indices.length > 1) {
                    throw new Error("饼图不支持多指标");
                }
                let map = new Map();
                let index = chartSetting.indices[0];
                let brandReports = this.props.industryReport.brandReports;
                Object.keys(brandReports).forEach(key => {
                    let datum = brandReports[key].data[index.indexId] === undefined ? "无数据" : brandReports[key].data[index.indexId];
                    let brandName = brandMap.has(brandReports[key].brandId) ?
                        brandMap.get(brandReports[key].brandId).brandName : brandReports[key].brandId;
                    if (map.has(datum)) {
                        map.get(datum).push(brandName);
                    } else {
                        map.set(datum, [brandName]);
                    }
                });
                let rows = [];
                map.forEach((brandNames, datum) => {
                    let s = JSON.stringify(brandNames);
                    rows.push(
                        <tr key={datum}>
                            <td>{datum}</td>
                            <td>{s.substr(1, s.length - 2)}</td>
                        </tr>
                    )
                });

                additionalElement = (
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>值</th>
                            <th>品牌</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                )
            }

            return (
                <div style={this.props.style}>
                    <h3>
                        {chartSetting.title}
                    </h3>
                    <div style={{height: this.state.chartHeight}}>
                        <canvas ref={instance => this.canvas = instance} id={this.canvasId}/>
                    </div>
                    {additionalElement}
                </div>
            );
        }
    }
}
