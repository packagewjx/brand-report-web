import React from 'react'
import ContentWrapper from "../../Layout/ContentWrapper";
import {Brands} from "../ReportView/ReportData/brand";
import {Grid, Row, Col, Panel, Button, Table} from "react-bootstrap";
import {ChannelPowers} from "../ReportView/ReportData/channel_power";
import {DevelopPowers} from "../ReportView/ReportData/devel_power";
import {ManagePowers} from "../ReportView/ReportData/manage_power";
import {MarketPowers} from "../ReportView/ReportData/market_power";
import {ProductPowers} from "../ReportView/ReportData/product_power";
import {RelationPowers} from "../ReportView/ReportData/relation_power";
import {SpreadPowers} from "../ReportView/ReportData/spread_power";
import {ValuePowers} from "../ReportView/ReportData/value_power";
import {Review} from "./ReviewData/review"
import Abstract from "../../ApiClient/model/Abstract";

class BrandReport{
    brandName;
    year;
    reportId;
    brandArea;//品牌行业
    status;//评审状态:  待评价，待审核，已通过
    constructor(brandName,year,reportId,brandArea,status){
        this.brandArea = brandArea;
        this.reportId = reportId;
        this.brandName = brandName;
        this.year = year;
        this.status = status;
    }

}
export default class ExpertOverReview extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            brandReports: [],
        };
        this.loadDataAndGo = this.loadDataAndGo.bind(this);

    }

    componentWillMount() {
        //使用假数据生成表格

        let brands = Brands;
        let brandReports = [];
        for(let i = 1; i <= 30; i++){
            if(i%3===0)
                brandReports.push(new BrandReport(brands[i],2018,i,"家电",{0:"待评价"}));
            else if(i%3===1)
                brandReports.push(new BrandReport(brands[i],2018,i,"家电",{1:"待审核"}));
            else
                brandReports.push(new BrandReport(brands[i],2018,i,"家电",{2:"查看"}));

        }

        this.setState({brandReports:brandReports});

    }

    loadDataAndGo(brandReport){
        let state = {};
        let comment = {};
        let func = (powers, statePowerName) => {
            for (let i = 0; i < powers.length; i++) {
                if (powers[i].brandName === brandReport.brandName) {
                    state[statePowerName] = powers[i];
                }
            }
        };
        let reviewFunc = (brandName)=>{
            for(let i = 0 ;i < Review.length; i++){
                if(Review[i].brandName === brandName){
                    comment[brandName] = Review[i];
                }
            }
        };
        reviewFunc("万 家 乐");
        reviewFunc("万和电气");
        reviewFunc("四川长虹");
        reviewFunc("惠而浦");
        reviewFunc("莱克电气");
        reviewFunc("格力电器");
        reviewFunc("创维数字");
        reviewFunc("老板电器");
        reviewFunc("奋达科技");
        reviewFunc("科沃斯");
        reviewFunc("澳柯玛");
        func(ChannelPowers, 'channelPower');
        func(DevelopPowers, 'developPower');
        func(ManagePowers, 'managePower');
        func(MarketPowers, 'marketPower');
        func(ProductPowers, 'productPower');
        func(RelationPowers, 'relationPower');
        func(SpreadPowers, 'spreadPower');
        func(ValuePowers, 'valuePower');

        let abstract = new Abstract();
        abstract.valueScore = 100;
        abstract.spreadScore = 100;
        abstract.relationScore = 100;
        abstract.productScore = 100;
        abstract.marketScore = 100;
        abstract.manageScore = 100;
        abstract.developScore = 100;
        abstract.channelScore = 100;
        abstract.brandName = brandReport.brandName;
        abstract.year = brandReport.year;

        state.abstract = abstract;
        let params = [state,comment,brandReport.status];
        this.props.history.push('expert-review', params);
    }

    render(){
        let style = {
            0 : "inline wd-xxs label label-warning",
            1 : "inline wd-xxs label label-info",
            2 : "inline wd-xxs label label-success"
        }

        let brandsReport = this.state.brandReports;
        brandsReport.sort((a, b) => Object.keys(a.status)[0] >= Object.keys(b.status)[0] ? 1 : -1);

        let rowArray = [];
        for(let i = 0; i < brandsReport.length; i++){
            let num = Object.keys(brandsReport[i].status)[0];
            rowArray.push(
                <tr key={i} className="gradeX" style={{cursor:'pointer'}} onClick={
                    () =>{
                        $.notify({status:'info',message:'请稍等',timeout:800});
                        setTimeout(()=>{
                            this.loadDataAndGo(brandsReport[i]);
                        },1000)
                    }
                }>
                    <td>{brandsReport[i].brandName}</td>
                    <td>{brandsReport[i].year}</td>
                    <td>{brandsReport[i].brandArea}</td>
                    <td><div className={style[num]}>{brandsReport[i].status[num]}</div></td>
                </tr>
            );

        }
        return(
            <ContentWrapper>
                <Grid fluid>
                <Col lg={12}>
                    <Panel header="品牌报告列表|专家评审">
                        <Table id="datatable4" reponsive striped>
                            <thead>
                                <tr>
                                    <th style={{width:"20%"}}>品牌</th>
                                    <th style={{width:"25%"}}>年份</th>
                                    <th style={{width:"25%"}}>行业</th>
                                    <th style={{width:"15%"}}>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                            {rowArray}
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
                </Grid>
            </ContentWrapper>
        );
    }

};
