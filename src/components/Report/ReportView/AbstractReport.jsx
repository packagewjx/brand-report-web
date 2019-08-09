import React from 'react';
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";

export default class AbstractReport extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    componentDidMount() {
        let abstracts = this.props.abstracts;

        // 分数比较雷达图
        let radarData = {
            labels: ['渠道力', '发展力', '管理力', '市场力', '产品力', '关系力', '传播力', '价值力'],
            datasets: []
        };
        for (let i = 0; i < abstracts.length; i++) {
            // 随机选颜色
            let red = 256 * Math.random();
            let blue = 256 * Math.random();
            let green = 256 * Math.random();

            radarData.datasets.push({
                label: abstracts[i].brandName,
                backgroundColor: `rgb(${red}, ${blue}, ${green}, 0.2)`,
                borderColor: `rgb(${red}, ${blue}, ${green}, 1)`,
                data: [abstracts[i].channelScore, abstracts[i].developScore, abstracts[i].manageScore, abstracts[i].marketScore, abstracts[i].productScore,
                    abstracts[i].relationScore, abstracts[i].spreadScore, abstracts[i].valueScore],
                hidden: true
            });
        }


        let radarChart = new Chart(document.getElementById('chartjs-score-radar'), {
            data: radarData,
            type: 'radar',
            options: {
                aspectRatio: 1.618122977,
                tooltips: {
                    callbacks: {
                        afterLabel: (tooltipItem, chart) => {
                            let num = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toString();
                            if (num.indexOf('.') !== -1) {
                                num = num.substr(0, num.indexOf('.') + 4);
                            }
                            return num;
                        },
                    }
                },
                scale: {
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10
                    }
                },
                title: {
                    display: true,
                    fontSize: 20,
                    text: '品牌竞争力得分'
                }
            }
        });


        // 总分
        for (let i = 0; i < abstracts.length; i++) {
            abstracts[i].totalScore = parseFloat((abstracts[i].channelScore + abstracts[i].developScore + abstracts[i].manageScore
                + abstracts[i].marketScore + abstracts[i].productScore + abstracts[i].relationScore + abstracts[i].spreadScore
                + abstracts[i].valueScore).toFixed(3));

        }
        abstracts.sort((a, b) => a.totalScore >= b.totalScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.totalScore, document.getElementById('chartjs-total-score'),
            '总分','rgb(54, 162, 235)');

        // 渠道力
        abstracts.sort((a, b) => a.channelScore >= b.channelScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.channelScore, document.getElementById('chartjs-channel-score'),
            '渠道力得分','rgb(54, 162, 235)');

        // 发展力
        abstracts.sort((a, b) => a.developScore >= b.developScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.developScore, document.getElementById('chartjs-develop-score'),
            '发展力得分','rgb(54, 162, 235)');

        // 管理力
        abstracts.sort((a, b) => a.manageScore >= b.manageScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.manageScore, document.getElementById('chartjs-manage-score'),
            '管理力得分','rgb(54, 162, 235)');

        // 市场力得分
        abstracts.sort((a, b) => a.marketScore >= b.marketScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.marketScore, document.getElementById('chartjs-market-score'),
            '市场力得分','rgb(54, 162, 235)');

        // 产品力得分
        abstracts.sort((a, b) => a.productScore >= b.productScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.productScore, document.getElementById('chartjs-product-score'),
            '产品力得分','rgb(54, 162, 235)');

        // 关系力得分
        abstracts.sort((a, b) => a.relationScore >= b.relationScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.relationScore, document.getElementById('chartjs-relation-score'),
            '关系力得分','rgb(54, 162, 235)');

        // 传播力得分
        abstracts.sort((a, b) => a.spreadScore >= b.spreadScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.spreadScore, document.getElementById('chartjs-spread-score'),
            '传播力得分','rgb(54, 162, 235)');

        // 价值力得分
        abstracts.sort((a, b) => a.valueScore >= b.valueScore ? -1 : 1);
        drawSingleDataHorizontalBarChart(abstracts, abs => abs.valueScore, document.getElementById('chartjs-value-score'),
            '价值力得分','rgb(54, 162, 235)');
    }

    render() {
        return (
            <div>
                <div>
                    <canvas id="chartjs-score-radar"/>
                </div>
                <div>
                    <canvas id="chartjs-total-score"/>
                </div>
                <div>
                    <canvas id="chartjs-channel-score"/>
                </div>
                <div>
                    <canvas id="chartjs-develop-score"/>
                </div>
                <div>
                    <canvas id="chartjs-manage-score"/>
                </div>
                <div>
                    <canvas id="chartjs-market-score"/>
                </div>
                <div>
                    <canvas id="chartjs-product-score"/>
                </div>
                <div>
                    <canvas id="chartjs-relation-score"/>
                </div>
                <div>
                    <canvas id="chartjs-spread-score"/>
                </div>
                <div>
                    <canvas id="chartjs-value-score"/>
                </div>
            </div>
        )
    }
}
