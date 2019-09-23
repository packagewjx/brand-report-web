import React from "react";
import {Dropdown, DropdownMenu, DropdownItem,DropdownToggle, Row, Col} from 'reactstrap';
import {drawWordMouthPieChart, drawWordMouthStackedHorizonBarChart} from "../../Report/ReportView/ChartUtils";
import RankListPanel from './WordMouthRankView'
import ReactDOM from 'react-dom';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import $ from 'jquery';
import ContentWrapper from "../../Layout/ContentWrapper";

export default class BrandOfWordMouth extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            brandKey: 0,
            menuItems: [],
            tableTrs: [],
            brandTitle: "请选择需要查看的品牌",
            brandsInfo: [],
            firstPartPie: [],
            secondPartPie: [],
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    componentDidMount() {
        let product_pinyin = this.props.product_pinyin;
        // 获取概要信息
        let url = 'http://localhost:5000/' + product_pinyin + '/aspect';
        $.get(url)
            .then((response) => {
                // this.setState({data:response.data})
                let brandKey = 0;
                let menuItems = [];
                // console.log(response.data);
                if (response.data.brandsInfo.length > 0) {
                    brandKey = 1;
                    for (let i = 0; i < response.data.brandsInfo.length; i++) {
                        menuItems.push(
                            <DropdownItem eventKey={String(i + 1)} onClick={() => this.handleSelect(String(i + 1))}>{response.data.brandsInfo[i][i + 1]}</DropdownItem>
                        )
                    }
                }

                this.setState({
                    brandKey: brandKey,
                    menuItems: menuItems,
                    brandTitle: '请选择需要查看的品牌',
                    brandsInfo: response.data.brandsInfo,
                    tableTrs: [],
                    firstPartPie: [],
                    secondPartPie: []
                });
            });


    }

    //处理选择事件
    handleSelect = (eventKey, event) => {
        // console.log(eventKey);
        let product_pinyin = this.props.product_pinyin;

        let url = 'http://localhost:5000/' + product_pinyin + '/aspect/' + String(eventKey);
        $.get(url)
            .then((response) => {
                // console.log(response.data)
                let brandId = parseInt(eventKey);
                let prodcut_name = this.state.brandsInfo[brandId - 1][brandId];
                let prodcut_name_des = "[" + prodcut_name + "]"
                let datas = [
                    response.data.pos_list_str,
                    response.data.neu_list_str,
                    response.data.neg_list_str
                ];
                let labels = response.data.category_list_str;
                drawWordMouthStackedHorizonBarChart(datas, ['正性', '中性', '负向'], labels,
                    document.getElementById('brand_aspect_chart'), prodcut_name_des + "各方面的正负比例对比", ['rgb(186, 46, 43)', 'rgb(41, 61, 74)', 'rgb(255, 144, 43)']);
                // console.log();
                let tables = [];
                let firstPartPie = [];
                let secondPartPie = [];
                let i = 0;
                for (let category_id_str in response.data.category) {
                    tables.push(
                        <tr>
                            <td>
                                {/*<a href={window.self.location.href + "#div" + category_id_str}>{response.data.category[category_id_str]}</a>*/}
                                <a >{response.data.category[category_id_str]}</a>
                            </td>
                            <td>
                                {response.data.statistic_data[category_id_str][0] + response.data.statistic_data[category_id_str][1] +
                                response.data.statistic_data[category_id_str][2]}
                            </td>
                            {/*<td>*/}
                            {/*    <a href="javascript:void(0)" target="_blank">查看评论</a>*/}
                            {/*</td>*/}
                        </tr>
                    )
                    // 画图模块
                    let divId = "div" + category_id_str;
                    let canvasId = "brand_aspect_polarity_chart" + category_id_str;
                    if (i % 2 == 0) {
                        firstPartPie.push(
                            <div id={divId} style={{marginTop: 10}}>
                                <canvas id={canvasId}/>
                            </div>
                        )
                    } else {
                        secondPartPie.push(
                            <div id={divId} style={{marginTop: 10}}>
                                <canvas id={canvasId}/>
                            </div>
                        )
                    }
                    i = i + 1;
                }

                //排行榜
                ReactDOM.render((
                    <RankListPanel rankName={prodcut_name_des + '方面好评榜'} proportions={response.data.good_proportions}
                                   colNames={['排名', '方面', '评论数量', '好评率']}
                                   brandsInfo={response.data.category}
                                   statistic_data={response.data.statistic_data}/>
                ), document.getElementById('aspect_good_proportions'));

                ReactDOM.render((
                    <RankListPanel rankName={prodcut_name_des + '方面关注榜'} proportions={response.data.num_rank}
                                   colNames={['排名', '方面', '评论数量', '好评率']}
                                   brandsInfo={response.data.category}
                                   statistic_data={response.data.statistic_data}
                                   dict_good_proportions={response.data.dict_good_proportions}/>
                ), document.getElementById('aspect_num_ranks'));

                ReactDOM.render((
                    <RankListPanel rankName={prodcut_name_des + '方面差评榜'} proportions={response.data.bad_proportions}
                                   colNames={['排名', '方面', '评论数量', '差评榜']}
                                   brandsInfo={response.data.category}
                                   statistic_data={response.data.statistic_data}/>
                ), document.getElementById('aspect_bad_proportions'));

                let divWords = [];

                for (let i = 0; i < response.data.zh_keyword.length; i++) {
                    let wordfontSize = Math.floor(Math.random() * 27) + 8;
                    let wordRotate = Math.floor(Math.random() * 90) + 0;
                    let styles = {
                        fontSize: undefined
                    };
                    styles.fontSize = wordfontSize;
                    divWords.push(
                        <div style={styles} rotate={wordRotate}>{response.data.zh_keyword[i]}</div>
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
                ), document.getElementById('aspect-product-keywords'));

                //画图
                this.setState({
                    brandKey: eventKey,
                    menuItems: this.state.menuItems,
                    brandTitle: prodcut_name,
                    brandsInfo: this.state.brandsInfo,
                    tableTrs: tables,
                    firstPartPie: firstPartPie,
                    secondPartPie: secondPartPie
                });
                i = 1;
                for (let category_id_str in response.data.category) {
                    let canvasId = "brand_aspect_polarity_chart" + category_id_str;
                    let titleStr = prodcut_name_des + "\"" + response.data.category[category_id_str] + "\"" + "正负评论比例图";
                    let aspectDatas = response.data.statistic_data[category_id_str];
                    drawWordMouthPieChart(aspectDatas, ['中性评论', '正向评论', '负向评论'], document.getElementById(canvasId),
                        titleStr, ['rgb(41, 61, 74)', 'rgb(186, 46, 43)', 'rgb(255, 144, 43)']
                    );
                    i = i + 1;
                }
            });

    };

    render() {
        // $('.chosen-select').chosen();
        // this.state.data.brandTitle = "请选择需要查看的品牌1";
        let noDataMenuItems = [];
        if (this.state.brandKey == 0) {
            noDataMenuItems.push(
                <DropdownItem disabled>没有选项</DropdownItem>
            )
        }
        return (
            <ContentWrapper>
            <div className="panel panel-default">
                <div className="panel-body">
                    <Dropdown id="brands-select" direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret >{this.state.brandTitle}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>家电行业</DropdownItem>
                            <DropdownItem divider/>
                            {
                                this.state.brandKey == 0 ? noDataMenuItems : this.state.menuItems
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <br/>
                </div>
                <div>
                    <canvas id="brand_aspect_chart"/>
                </div>
                <br/>
                <div className="table-responsive"
                     style={{display: this.state.tableTrs.length == 0 ? 'none' : 'block', marginTop: 5}}>
                    <table className="table table-bordered table-striped">
                        <colgroup>
                            <col className="col-xs-3"/>
                            <col className="col-xs-2"/>
                            <col className="col-xs-2"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>产品类别</th>
                            <th>数量</th>
                            {/*<th>查看</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tableTrs}
                        </tbody>
                    </table>
                </div>
                <Row id="aspect-row-table" style={{marginTop: 10}}>
                    <Col md={6}>
                        <div id="aspect_good_proportions"></div>
                        <div id="aspect_num_ranks"></div>
                    </Col>
                    <Col md={6}>
                        <div id="aspect_bad_proportions"></div>
                    </Col>
                </Row>
                {/*方面饼图*/}
                <h4 style={{display: this.state.tableTrs.length == 0 ? 'none' : 'block'}}>该品牌各个Aspect对应的正负比例图</h4>
                <Row id="aspect-row-chart">
                    <Col md={6}>
                        {this.state.firstPartPie}
                    </Col>
                    <Col md={6}>
                        {this.state.secondPartPie}
                    </Col>
                </Row>
                <h4 style={{display: this.state.tableTrs.length == 0 ? 'none' : 'block'}}>该品牌对应的关键词云</h4>
                <div id='aspect-product-keywords' style={{width: '450px', height: '450px'}}>
                </div>

            </div>
            </ContentWrapper>
        );
    }
}