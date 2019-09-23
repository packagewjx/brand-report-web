import React from "react";
import {drawWordMouthStackedHorizonBarChart, drawWordMouthPieChart} from "../../Report/ReportView/ChartUtils";
import {Row, Col} from 'reactstrap'
import RankListPanel from './WordMouthRankView'
import ReactDOM from 'react-dom';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import $ from 'jquery';

export default class AbstractOfWordMouth extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: {}};
    }

    componentDidMount() {
        let self = this;
        let product_pinyin = this.props.product_pinyin;
        // 获取概要信息
        let url = 'http://localhost:5000/' + product_pinyin + '/home';
        $.get(url)
            .then((response) => {
                // 画图
                // console.log(response.data);
                self.setState({data: response.data});
                let datas = [
                    this.state.data.pos_list_str,
                    this.state.data.neu_list_str,
                    this.state.data.neg_list_str
                ];
                let labels = this.state.data.brand_list_str;
                drawWordMouthStackedHorizonBarChart(datas, ['正性', '中性', '负向'], labels,
                    document.getElementById('brand_comment_overview_chart'), '各品牌评论关于该产品正负比例对比', ['rgb(186, 46, 43)', 'rgb(41, 61, 74)', 'rgb(255, 144, 43)']);

                datas = [
                    this.state.data.pos_list_str_a,
                    this.state.data.neu_list_str_a,
                    this.state.data.neg_list_str_a
                ];
                drawWordMouthStackedHorizonBarChart(datas, ['正性', '中性', '负向'], labels,
                    document.getElementById('brand_article_overview_chart'), '各品牌资讯关于该产品正负比例对比', ['rgb(186, 46, 43)', 'rgb(41, 61, 74)', 'rgb(255, 144, 43)']);

                datas = this.state.data.polarity_data; //
                drawWordMouthPieChart(datas, ['正向评论', '中性评论', '负向评论'], document.getElementById('brand_comment_polarity_chart'),
                    '产品总正负评论比例图', ['rgb(186, 46, 43)', 'rgb(41, 61, 74)', 'rgb(255, 144, 43)']
                );

                datas = this.state.data.article_polarity_data; //
                drawWordMouthPieChart(datas, ['正向资讯', '中性资讯', '负向资讯'], document.getElementById('brand_article_polarity_chart'),
                    '产品总正负资讯比例图', ['rgb(186, 46, 43)', 'rgb(41, 61, 74)', 'rgb(255, 144, 43)']
                );
                //排行榜
                ReactDOM.render((
                    <RankListPanel rankName={'品牌评论好评榜'} proportions={this.state.data.good_proportions}
                                   colNames={['排名', '品牌名称', '评论数量', '好评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('good_proportions'));

                ReactDOM.render((
                    <RankListPanel rankName={'品牌资讯好评榜'} proportions={this.state.data.good_proportions_a}
                                   colNames={['排名', '品牌名称', '资讯数量', '好评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('good_proportions_a'));

                ReactDOM.render((
                    <RankListPanel rankName={'品牌评论差评榜'} proportions={this.state.data.bad_proportions}
                                   colNames={['排名', '品牌名称', '评论数量', '差评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('bad_proportions'));

                ReactDOM.render((
                    <RankListPanel rankName={'品牌资讯差评榜'} proportions={this.state.data.bad_proportions_a}
                                   colNames={['排名', '品牌名称', '资讯数量', '差评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('bad_proportions_a'));

                ReactDOM.render((
                    <RankListPanel rankName={'品牌评论关注榜'} proportions={this.state.data.num_rank}
                                   colNames={['排名', '品牌名称', '评论数量', '好评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('num_ranks'));

                ReactDOM.render((
                    <RankListPanel rankName={'品牌资讯关注榜'} proportions={this.state.data.num_rank_a}
                                   colNames={['排名', '品牌名称', '资讯数量', '好评率']}
                                   brandsInfo={this.state.data.brandsInfo}
                                   statistic_data={this.state.data.statistic_data}/>
                ), document.getElementById('num_ranks_a'));

                let divWords = [];

                for (let i = 0; i < this.state.data.zh_keyword.length; i++) {
                    let wordfontSize = Math.floor(Math.random() * 27) + 8;
                    let wordRotate = Math.floor(Math.random() * 90) + 0;
                    let styles = {
                        fontSize: undefined
                    };
                    styles.fontSize = wordfontSize;
                    divWords.push(
                        <div style={styles} rotate={wordRotate}>{this.state.data.zh_keyword[i]}</div>
                    )
                }
                // console.log(divWords.length)
                ReactDOM.render((
                    <TagCloud
                        style={{
                            fontFamily: 'sans-serif',
                            fontSize: 30,
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            color: () => randomColor(),
                            padding: 5,
                            width: '100%',
                            height: '100%'
                        }}>
                        {divWords}
                    </TagCloud>
                ), document.getElementById('product-keywords'));

            });

    }

    componentWillUnmount() {

    }

    render() {
        let product_real_name = this.props.product_name;
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <colgroup>
                            <col className="col-xs-1"/>
                            <col className="col-xs-7"/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>
                                总评论数
                            </td>
                            <td>{this.state.data.product_review_nums}</td>
                        </tr>
                        <tr>
                            <td>
                                总资讯数
                            </td>
                            <td>{this.state.data.product_article_nums}</td>
                        </tr>
                        <tr>
                            <td>
                                {product_real_name}相关品牌数量
                            </td>
                            <td>{this.state.data.app_num}</td>
                        </tr>
                        <tr>
                            <td>
                                数据收集日期范围
                            </td>
                            <td>
                                2019-02-25~2019-04-23
                            </td>
                        </tr>
                        <tr>
                            <td>
                                评论来源
                            </td>
                            <td>京东 | 苏宁 | 国美 | 天猫</td>
                        </tr>
                        <tr>
                            <td>
                                资讯来源
                            </td>
                            <td>数智网 | 中国家电网 | 慧聪网 | 今日头条 | 一点资讯 | 新华网 | 人民网 | 央视网 | 新浪文章</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*<div id="brand_comment_overview" style={{width: "80%", height:750}}> </div>*/}
                {/*<div id="brand_article_overview" style={{width: "80%", height:750}}> </div>*/}
                <div>
                    <canvas id="brand_comment_overview_chart"/>
                </div>
                <div>
                    <canvas id="brand_article_overview_chart"/>
                </div>
                <Row>
                    <Col md={6}>
                        <div>
                            <canvas id="brand_comment_polarity_chart"/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <canvas id="brand_article_polarity_chart"/>
                        </div>
                    </Col>
                </Row>

                <h4>品牌各类排行榜</h4>
                <Row id="row-table">
                    <Col md={6}>
                        <div id="good_proportions"></div>
                        <div id="bad_proportions"></div>
                        <div id="num_ranks"></div>
                    </Col>
                    <Col md={6}>
                        <div id="good_proportions_a"></div>
                        <div id="bad_proportions_a"></div>
                        <div id="num_ranks_a"></div>
                    </Col>
                </Row>
                <h4>{product_real_name + '关键词云'}</h4>
                <div id='product-keywords' style={{width: '450px', height: '450px'}}>

                </div>
                {/*<div id="product-keywords" style={{ width: '600px', height: '600px'}}>*/}
                {/*</div>*/}


            </div>


        );
    }
}

