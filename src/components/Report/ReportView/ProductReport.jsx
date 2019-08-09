import React from 'react';
import PropTypes from 'prop-types';
import ProductPower from "../../ApiClient/model/ProductPower";
import {drawSingleDataHorizontalBarChart, drawStackedHorizontalBarChart} from "./ChartUtils";
import NormalTable from "./NormalTable";


export default class ProductReport extends React.Component{

    static propTypes = {
        productPowers: PropTypes.arrayOf(PropTypes.instanceOf(ProductPower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let productPowers = this.props.productPowers;

        //1、生产能力
        //注册资本
        productPowers.sort((a, b) => a.productProduce.registeredAsset >= b.productProduce.registeredAsset ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.registeredAsset).toFixed(3);
        }, document.getElementById('chartjs-registered-asset'), '注册资本(单位: 万元)');
        //资产总额
        productPowers.sort((a, b) => a.productProduce.allAsset >= b.productProduce.allAsset ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.allAsset).toFixed(3);
        }, document.getElementById('chartjs-all-asset'), '资产总额(单位: 万元)');
        //净资产额
        productPowers.sort((a, b) => a.productProduce.netAsset >= b.productProduce.netAsset ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.netAsset).toFixed(3);
        }, document.getElementById('chartjs-net-asset'), '净资产额(单位: 万元)');
        //研发投入
        productPowers.sort((a, b) => a.productProduce.rdInstitutionExpense >= b.productProduce.rdInstitutionExpense ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.rdInstitutionExpense).toFixed(3);
        }, document.getElementById('chartjs-rdInstitution-expense'), '研发投入(单位: 万元)');
        //研发机构数量
        productPowers.sort((a, b) => a.productProduce.rdInstitutionNumber.institutionTypeImprove + a.productProduce.rdInstitutionNumber.institutionTypeOutside + a.productProduce.rdInstitutionNumber.institutionTypeSelf >= b.productProduce.rdInstitutionNumber.institutionTypeImprove + b.productProduce.rdInstitutionNumber.institutionTypeOutside + b.productProduce.rdInstitutionNumber.institutionTypeSelf ? -1 : 1);
        let accessors = [
            (productPower) => productPower.productProduce.rdInstitutionNumber.institutionTypeImprove,
            (productPower) => productPower.productProduce.rdInstitutionNumber.institutionTypeOutside,
            (productPower) => productPower.productProduce.rdInstitutionNumber.institutionTypeSelf,
        ];
        drawStackedHorizontalBarChart(productPowers, accessors, ['改进型','自主型','外围数量'],document.getElementById('chartjs-rdInstitution-number'),
            '研发机构数量(单位: 个数)',
            ['rgb(31, 174, 225)','rgb(35, 194, 76)', 'rgb(255, 144, 43)']);
        //产品技术水平
        productPowers.sort((a, b) => a.productProduce.productLevel >= b.productProduce.productLevel ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.productLevel).toFixed(3);
        }, document.getElementById('chartjs-product-level'), '产品技术水平(单位: 等级)');
        //企业员工文化程度
        productPowers.sort((a, b) => a.productProduce.employeeLevelSenior + a.productProduce.employeeLevelUniversity >= b.productProduce.employeeLevelSenior + b.productProduce.employeeLevelUniversity ? -1 : 1);
        accessors = [
            (productPower) => productPower.productProduce.employeeLevelUniversity,
            (productPower) => productPower.productProduce.employeeLevelSenior,
            (productPower) => productPower.productProduce.employeeLevelJunior,
        ];
        drawStackedHorizontalBarChart(productPowers, accessors, ['本科以上','高中、大专','初中及以下'], document.getElementById('chartjs-employee-level'),'企业员工文化程度(单位: %)',
            ['rgb(54, 162, 235)','rgb(35, 194, 76)', 'rgb(255, 144, 43)']);

        //营业总收入
        productPowers.sort((a, b) => a.productProduce.turnover >= b.productProduce.turnover ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.turnover).toFixed(3);
        }, document.getElementById('chartjs-turnover'), '营业总收入(单位: 万元)');
        //出口额
        productPowers.sort((a, b) => a.productProduce.output >= b.productProduce.output ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.output).toFixed(3);
        }, document.getElementById('chartjs-output'), '出口额(单位: 万元)');

        //利润总额
        productPowers.sort((a, b) => a.productProduce.profit >= b.productProduce.profit ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.profit).toFixed(3);
        }, document.getElementById('chartjs-profit'), '利润总额(单位: 万元)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');
        //企业所得税
        productPowers.sort((a, b) => a.productProduce.tax >= b.productProduce.tax ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.tax).toFixed(3);
        }, document.getElementById('chartjs-tax'), '企业所得税(单位: 万元)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');
        //固定资产
        productPowers.sort((a, b) => a.productProduce.fixedAsset >= b.productProduce.fixedAsset ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productProduce.fixedAsset).toFixed(3);
        }, document.getElementById('chartjs-fixed-asset'), '固定资产(单位: 万元)');


        //PCT国际专利申请量
        productPowers.sort((a, b) => a.productInnovation.pctRate >= b.productInnovation.pctRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.pctRate).toFixed(3);
        }, document.getElementById('chartjs-pctRate'), 'PCT国际专利申请量(单位: 个数)');
        //10万元R&D经费投入的发明专利申请量
        productPowers.sort((a, b) => a.productInnovation.patentOver10 >= b.productInnovation.patentOver10 ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.patentOver10).toFixed(3);
        }, document.getElementById('chartjs-patent-Over10'), '10万元R&D经费投入的发明专利申请量(单位: 个数)');
        //研发人员数量
        productPowers.sort((a, b) => a.productInnovation.persons >= b.productInnovation.persons ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.persons).toFixed(3);
        }, document.getElementById('chartjs-persons'), '研发人员数量(单位: 个数)');
        //博士毕业生数量
        productPowers.sort((a, b) => a.productInnovation.doctors >= b.productInnovation.doctors ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.doctors).toFixed(3);
        }, document.getElementById('chartjs-doctors'), '博士毕业生数量(单位: 个数)');
        //创新经费支出
        productPowers.sort((a, b) => a.productInnovation.innovationExpense >= b.productInnovation.innovationExpense ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.innovationExpense).toFixed(3);
        }, document.getElementById('chartjs-innovation-expense'), '创新经费支出(单位: 万元)');
        //研发经费支出
        productPowers.sort((a, b) => a.productInnovation.rdExpense >= b.productInnovation.rdExpense ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.rdExpense).toFixed(3);
        }, document.getElementById('chartjs-rdExpense'), '研发经费支出(单位: 万元)');
        //专利申请数
        productPowers.sort((a, b) => a.productInnovation.patentApplied >= b.productInnovation.patentApplied ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.patentApplied).toFixed(3);
        }, document.getElementById('chartjs-patent-applied'), '专利申请数(单位: 个数)');
        //专利类型数
        productPowers.sort((a, b) => a.productInnovation.patentApplied >= b.productInnovation.patentApplied ? -1 : 1);
        accessors = [
            (productPower) => productPower.productInnovation.patentInvention,
            (productPower) => productPower.productInnovation.patentNew,
            (productPower) => productPower.productInnovation.patentOut,
        ];
        drawStackedHorizontalBarChart(productPowers, accessors, ['发明专利','实用新型专利','外观设计专利量'],document.getElementById('chartjs-patent-invention-new-out'),'专利类型数(单位: 个数)', ['rgb(54, 162, 235)','rgb(35, 194, 76)', 'rgb(255, 144, 43)']);
        //是否为高新技术企业

        //企业参与编制国家标准、行业标准、检测方法、技术规范情况

        //近3年内科技成果转化量
        productPowers.sort((a, b) => a.productInnovation.exchange >= b.productInnovation.exchange ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.exchange).toFixed(3);
        }, document.getElementById('chartjs-exchange'), '近3年内科技成果转化量(单位: 个数)');

        //研究开发机构数量
        productPowers.sort((a, b) => a.productInnovation.institutionLevelWorld + a.productInnovation.institutionLevelCountry+ a.productInnovation.institutionLevelProvince + a.productInnovation.institutionLevelCity  >=
        b.productInnovation.institutionLevelWorld + b.productInnovation.institutionLevelCountry+ b.productInnovation.institutionLevelProvince + b.productInnovation.institutionLevelCity  ? -1 : 1);
        accessors = [
            (productPower) => productPower.productInnovation.institutionLevelWorld,
            (productPower) => productPower.productInnovation.institutionLevelCountry,
            (productPower) => productPower.productInnovation.institutionLevelProvince,
            (productPower) => productPower.productInnovation.institutionLevelCity,
            (productPower) => productPower.productInnovation.institutionLevelOther,
        ];
        drawStackedHorizontalBarChart(productPowers, accessors, ['世界级','国家级','省级','市级','其他'],document.getElementById('chartjs-institution-level-number'),
            '研究开发机构数量(单位: 个数)', ['rgb(31, 174, 225)','rgb(35, 194, 76)', 'rgb(255, 144, 43)', 'rgb(255, 99, 132)']);

        //开展多种形式产学研合作
        productPowers.sort((a, b) => a.productInnovation.activiityLevelWorld + a.productInnovation.activiityLevelCountry+ a.productInnovation.activiityLevelProvince + a.productInnovation.activiityLevelCity  >=
        b.productInnovation.activiityLevelWorld + b.productInnovation.activiityLevelCountry+ b.productInnovation.activiityLevelProvince + b.productInnovation.activiityLevelCity  ? -1 : 1);
        accessors = [
            (productPower) => productPower.productInnovation.activiityLevelWorld,
            (productPower) => productPower.productInnovation.activiityLevelCountry,
            (productPower) => productPower.productInnovation.activiityLevelProvince,
            (productPower) => productPower.productInnovation.activiityLevelCity,
            (productPower) => productPower.productInnovation.activiityLevelCity,
        ];
        drawStackedHorizontalBarChart(productPowers, accessors, ['世界级','国家级','省级','市级','其他'],document.getElementById('chartjs-activity-level-number'),
            '开展多种形式产学研合作(单位: 级别)',
            ['rgb(31, 174, 225)','rgb(35, 194, 76)', 'rgb(255, 144, 43)', 'rgb(255, 99, 132)']);
        //净资产增长率
        productPowers.sort((a, b) => a.productInnovation.netAssetGrowth >= b.productInnovation.netAssetGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.netAssetGrowth * 100).toFixed(3);
        }, document.getElementById('chartjs-net-asset-growth'), '净资产增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');
        //主营业务收入增长率
        productPowers.sort((a, b) => a.productInnovation.turnoverGrowth >= b.productInnovation.turnoverGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(productPowers, (power) => {
            return (power.productInnovation.turnoverGrowth * 100).toFixed(3);
        }, document.getElementById('chartjs-turnover-growth'), '主营业务收入增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');
    }

    render() {
        return (
            <div>
                {/*<h3 className="mb-lg pv">生产能力</h3>*/}
                <div className={"chartjs-product-produce"}>
                    <div>                <canvas id="chartjs-registered-asset"/>                </div>
                    <div>                <canvas id="chartjs-all-asset"/>                </div>
                    <div>                <canvas id="chartjs-net-asset"/>                </div>
                    <div>                <canvas id="chartjs-rdInstitution-expense"/>                </div>
                    <div>                <canvas id="chartjs-rdInstitution-number"/>                </div>
                    <div>                <canvas id="chartjs-product-level"/>                </div>
                    <div>                <canvas id="chartjs-employee-level"/>                </div>
                    <div>                <canvas id="chartjs-turnover"/>                </div>
                    <div>                <canvas id="chartjs-output"/>                </div>
                    <div>                <canvas id="chartjs-profit"/>                </div>
                    <div>                <canvas id="chartjs-tax"/>                </div>
                    <div>                <canvas id="chartjs-fixed-asset"/>                </div>
                </div>
                {/*<h3 className="mb-lg pv">创新能力</h3>*/}
                <div className={"chartjs-product-innovation"}>
                    {/*<h4 className="mb-lg pv">知识产权</h4>*/}
                    <div>                <canvas id="chartjs-pctRate"/>                </div>
                    <div>                <canvas id="chartjs-patent-Over10"/>                </div>
                    <div>                <canvas id="chartjs-persons"/>                </div>
                    <div>                <canvas id="chartjs-doctors"/>                </div>
                    <div>                <canvas id="chartjs-innovation-expense"/>                </div>
                    <div>                <canvas id="chartjs-rdExpense"/>                </div>
                    <div>                <canvas id="chartjs-patent-applied"/>                </div>
                    <div>                <canvas id="chartjs-patent-invention-new-out"/>                </div>
                    {/*<h4 className="mb-lg pv center-block">科技成果转化能力</h4>*/}
                    <div>
                        <h4 style={{textAlign: 'center'}}>为高新技术企业(是/否)</h4>
                        <NormalTable powers={this.props.productPowers}  typeName="是/否" maxRange={-1} type_one="productInnovation" type_two="highTechnology"/>
                    </div>
                    <div>
                        <h4 style={{textAlign: 'center'}}>参与编制国家标准(是/否)</h4>
                        <NormalTable powers={this.props.productPowers}  typeName="是/否" maxRange={-1} type_one="productInnovation" type_two="standardCountry"/>
                    </div>
                    <div>                <canvas id="chartjs-exchange"/>                </div>
                    {/*<h4 className="mb-lg pv">研究开发组织管理水平</h4>*/}
                    <div>                <canvas id="chartjs-institution-level-number"/>                </div>
                    <div>                <canvas id="chartjs-activity-level-number"/>                </div>
                    {/*<h4 className="mb-lg pv">企业成长性</h4>*/}
                    <div>                <canvas id="chartjs-net-asset-growth"/>                </div>
                    <div>                <canvas id="chartjs-turnover-growth"/>                </div>
                </div>

            </div>
        );
    }
}
