import $ from 'jquery';
import React from "react";
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Row, Col} from 'reactstrap';
import {drawAspectLineChart} from "../../Report/ReportView/ChartUtils";
import 'bootstrap-notify'
import ContentWrapper from "../../Layout/ContentWrapper";

export default class AspectOfWordMouth extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            brandTitle: "请选择需要查看的品牌",
            brandKey: 0,
            brandMenuItems: [],
            aspectTitle: "请选择需要查看的Aspect",
            aspectKey: 0,
            aspectMenuItems: [],
            brandsInfo: [],
            aspectsInfo: [],
            brand_dropdownOpen: false,
            aspect_dropdownOpen: false,
        };
    }

    toggle1() {
        this.setState({
            brand_dropdownOpen: !this.state.brand_dropdownOpen,
        });
    }

    toggle2() {
        this.setState({
            aspect_dropdownOpen: !this.state.aspect_dropdownOpen
        });
    }

    componentDidMount() {
        let product_pinyin = this.props.product_pinyin;
        // 获取概要信息
        let url = 'http://localhost:5000/' + product_pinyin + '/aspect';
        $.get(url)
            .then((response) => {
                // console.log(response.data);
                let brandKey = 0;
                let aspectKey = 0;
                let brandMenuItems = [];
                let aspectMenuItems = [];
                if (response.data.brandsInfo.length > 0) {
                    brandKey = 1;
                    for (let i = 0; i < response.data.brandsInfo.length; i++) {
                        brandMenuItems.push(
                            <DropdownItem eventKey={String(i + 1)}
                                          onClick={() => this.handleBrandSelect(String(i + 1))}>{response.data.brandsInfo[i][i + 1]}</DropdownItem>
                        )
                    }
                }
                if (response.data.aspectsInfo.length > 0) {
                    for (let i = 0; i < response.data.aspectsInfo.length; i++) {
                        aspectKey = 1;
                        aspectMenuItems.push(
                            <DropdownItem eventKey={String(i + 1)}
                                          onClick={() => this.handleAspectSelect(String(i + 1))}>{response.data.aspectsInfo[i][i + 1]}</DropdownItem>
                        );
                    }
                }

                this.setState({
                    brandTitle: "请选择需要查看的品牌",
                    brandKey: brandKey,
                    brandMenuItems: brandMenuItems,
                    aspectTitle: "请选择需要查看的Aspect",
                    aspectKey: aspectKey,
                    aspectMenuItems: aspectMenuItems,
                    brandsInfo: response.data.brandsInfo,
                    aspectsInfo: response.data.aspectsInfo
                });
            });
    }

    handleBrandSelect = (eventKey, event) => {
        let brandId = parseInt(eventKey);
        let prodcut_name = this.state.brandsInfo[brandId - 1][brandId];
        if (this.state.aspectTitle != "请选择需要查看的Aspect") {
            let product_pinyin = this.props.product_pinyin;
            let url = 'http://localhost:5000/' + product_pinyin + '/aspect_trend/' + eventKey + '/' + this.state.aspectKey;
            // console.log(url);
            $.get(url)
                .then((response) => {
                    // console.log(response.data);
                    let titleName = this.props.product_name + "[" + prodcut_name + "]" + "\"" + this.state.aspectTitle + "\"" + "正负评论趋势图";
                    let datas = [
                        response.data.pos_data,
                        response.data.neg_data,
                    ];
                    let labels = response.data.time_data;
                    drawAspectLineChart(datas, labels, document.getElementById('brand_aspect_overview_chart'), titleName,
                        ['正性', '负向'], ['rgb(186, 46, 43)', 'rgb(41, 61, 74)']);
                    this.setState({
                        brandTitle: prodcut_name,
                        brandKey: eventKey,
                        brandMenuItems: this.state.brandMenuItems,
                        aspectTitle: "请选择需要查看的Aspect",
                        aspectKey: this.state.aspectKey,
                        aspectMenuItems: this.state.aspectMenuItems,
                        brandsInfo: this.state.brandsInfo,
                        aspectsInfo: this.state.aspectsInfo
                    });

                });

        } else {
            $.notify({status: 'info', message: '请选择需要查看的Aspect', timeout: 800});
            this.setState(
                {
                    brandTitle: prodcut_name,
                    brandKey: eventKey,
                    brandMenuItems: this.state.brandMenuItems,
                    aspectTitle: "请选择需要查看的Aspect",
                    aspectKey: this.state.aspectKey,
                    aspectMenuItems: this.state.aspectMenuItems,
                    brandsInfo: this.state.brandsInfo,
                    aspectsInfo: this.state.aspectsInfo
                })
        }
    };

    handleAspectSelect = (eventKey, event) => {
        let product_pinyin = this.props.product_pinyin;
        let aspectId = parseInt(eventKey);
        let aspect_name = this.state.aspectsInfo[aspectId - 1][aspectId];
        if (this.state.brandTitle != "请选择需要查看的品牌") {
            // alert(aspect_name);
            let product_pinyin = this.props.product_pinyin;
            let url = 'http://localhost:5000/' + product_pinyin + '/aspect_trend/' + this.state.brandKey + '/' + String(eventKey);
            // console.log(url);
            $.get(url)
                .then((response) => {
                    // console.log(response.data);
                    let titleName = this.props.product_name + "[" + this.state.brandTitle + "]" + "\"" + aspect_name + "\"" + "正负评论趋势图";
                    let datas = [
                        response.data.pos_data,
                        response.data.neg_data,
                    ];
                    let labels = response.data.time_data;
                    drawAspectLineChart(datas, labels, document.getElementById('brand_aspect_overview_chart'), titleName,
                        ['正性', '负向'], ['rgb(186, 46, 43)', 'rgb(41, 61, 74)']);
                    this.setState({
                        brandTitle: this.state.brandTitle,
                        brandKey: this.state.brandKey,
                        brandMenuItems: this.state.brandMenuItems,
                        aspectTitle: aspect_name,
                        aspectKey: eventKey,
                        aspectMenuItems: this.state.aspectMenuItems,
                        brandsInfo: this.state.brandsInfo,
                        aspectsInfo: this.state.aspectsInfo
                    });

                });
        } else {
            $.notify({status: 'info', message: '请选择需要查看的品牌', timeout: 800});
            this.setState(
                {
                    brandTitle: "请选择需要查看的品牌",
                    brandKey: this.state.brandKey,
                    brandMenuItems: this.state.brandMenuItems,
                    aspectTitle: aspect_name,
                    aspectKey: eventKey,
                    aspectMenuItems: this.state.aspectMenuItems,
                    brandsInfo: this.state.brandsInfo,
                    aspectsInfo: this.state.aspectsInfo
                })
        }

    };

    render() {
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
                        <Row>
                            <Col md={4}>
                                <Dropdown id="brands-select-aspect" direction="right"
                                          isOpen={this.state.brand_dropdownOpen} toggle={this.toggle1}>
                                    <DropdownToggle caret>{this.state.brandTitle}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>家电行业</DropdownItem>
                                        <DropdownItem divider/>
                                        {
                                            this.state.brandKey == 0 ? noDataMenuItems : this.state.brandMenuItems
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            <Col md={4}>
                                <Dropdown id="aspect-select-aspect" direction="right"
                                          isOpen={this.state.aspect_dropdownOpen} toggle={this.toggle2}>
                                    <DropdownToggle caret>{this.state.aspectTitle}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>产品类别</DropdownItem>
                                        <DropdownItem divider/>
                                        {
                                            this.state.aspectKey == 0 ? noDataMenuItems : this.state.aspectMenuItems
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <div style={{width: '80%'}}>
                            <canvas id="brand_aspect_overview_chart"/>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        );
    }
}

function getAspectTrendData(url) {
    // $.get
}