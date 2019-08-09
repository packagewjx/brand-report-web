import React from 'react';
import {Table} from 'react-bootstrap';
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";

export default class RelationReport extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let relationPowers = this.props.relationPowers;

        // 员工人均工资
        relationPowers.sort((a, b) => a.relationEmployee.salary >= b.relationEmployee.salary ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, (relationPower) => parseFloat(relationPower.relationEmployee.salary.toFixed(3)),
            document.getElementById('chartjs-average-salary'), '员工人均工资(单位: 万元)');

        // 员工人均工资增长率
        relationPowers.sort((a, b) => a.relationEmployee.salaryGrowth >= b.relationEmployee.salaryGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationEmployee.salaryGrowth * 100).toFixed(3)),
            document.getElementById('chartjs-salary-growth'), '员工人均工资增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255,0,0)');

        // 职工伤亡率
        relationPowers.sort((a, b) => a.relationEmployee.hurtRate >= b.relationEmployee.hurtRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationEmployee.hurtRate * 100).toFixed(3)),
            document.getElementById('chartjs-hurt-rate'), '职工伤亡率(单位: %)');

        // 劳动合同签订率
        relationPowers.sort((a, b) => a.relationEmployee.contractRate >= b.relationEmployee.contractRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationEmployee.contractRate * 100).toFixed(3)),
            document.getElementById('chartjs-contract-rate'), '劳动合同签订率(单位: %)');

        // 资产纳税率
        relationPowers.sort((a, b) => a.relationGovernment.taxRate >= b.relationGovernment.taxRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationGovernment.taxRate * 100).toFixed(3)),
            document.getElementById('chartjs-tax-rate'), '资产纳税率(单位: %)');

        // 税款上缴率
        relationPowers.sort((a, b) => a.relationGovernment.taxPaidRate >= b.relationGovernment.taxPaidRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationGovernment.taxPaidRate *100).toFixed(3)),
            document.getElementById('chartjs-tax-paid-rate'), '税款上缴率(单位: %)');

        // 政府项目资助金额
        relationPowers.sort((a, b) => a.relationGovernment.fundGovernment >= b.relationGovernment.fundGovernment ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => relationPower.relationGovernment.fundGovernment * 100,
            document.getElementById('chartjs-fund-government'), '政府项目资助金额(单位: 万元)');

        // 就业贡献率
        relationPowers.sort((a, b) => a.relationPublic.employmentContribution >= b.relationPublic.employmentContribution ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationPublic.employmentContribution * 100).toFixed(3)),
            document.getElementById('chartjs-employment-contribution'), '就业贡献率(单位: %)');

        // 捐赠支出额
        relationPowers.sort((a, b) => a.relationPublic.donation >= b.relationPublic.donation ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => relationPower.relationPublic.donation,
            document.getElementById('chartjs-donation'), '捐赠支出额(单位: 万元)');

        // 捐赠收入比
        relationPowers.sort((a, b) => a.relationPublic.donationRate >= b.relationPublic.donationRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationPublic.donationRate * 100).toFixed(3)),
            document.getElementById('chartjs-donation-rate'), '捐赠收入比(单位: %)');

        // 环保经费额
        relationPowers.sort((a, b) => a.relationEnvironment.recycleExpense >= b.relationEnvironment.recycleExpense ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => relationPower.relationEnvironment.recycleExpense,
            document.getElementById('chartjs-recycle-expense'), '环保经费额(单位: 万元)');

        // 环保经费额
        relationPowers.sort((a, b) => a.relationEnvironment.recycleExpenseRate >= b.relationEnvironment.recycleExpenseRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationEnvironment.recycleExpenseRate * 100).toFixed(3)),
            document.getElementById('chartjs-recycle-expense-rate'), '环保经费比(单位: %)');

        // 环保经费增长率
        relationPowers.sort((a, b) => a.relationEnvironment.recycleExpenseGrowth >= b.relationEnvironment.recycleExpenseGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationEnvironment.recycleExpenseGrowth * 100).toFixed(3)),
            document.getElementById('chartjs-recycle-expense-growth'), '环保经费增长率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 每股收益
        relationPowers.sort((a, b) => a.relationStock.earningShare >= b.relationStock.earningShare);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => relationPower.relationStock.earningShare,
            document.getElementById('chartjs-earning-share'), '每股收益(单位: 元)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 净资产收益率
        relationPowers.sort((a, b) => a.relationStock.netAssetRate >= b.relationStock.netAssetRate ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat((relationPower.relationStock.netAssetRate).toFixed(3)),
            document.getElementById('chartjs-net-asset-rate'), '净资产收益率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)');

        // 产品合格变动率
        relationPowers.sort((a, b) => a.relationStock.productQualifiedGrowth >= b.relationStock.productQualifiedGrowth ? -1 : 1);
        drawSingleDataHorizontalBarChart(relationPowers, relationPower => parseFloat(relationPower.relationStock.productQualifiedGrowth.toFixed(3)),
            document.getElementById('chartjs-product-qualified-growth'), '产品合格变动率(单位: %)',
            (ctx) => ctx.dataset.data[ctx.dataIndex] > 0 ? 'rgb(31, 174, 225)' : 'rgb(255, 99, 132)')

    }

    render() {
        let relationPowers = this.props.relationPowers;

        // 社会关系的表格行
        let socialRelationComponents = [];
        for (let i = 0; i < relationPowers.length; i++) {
            socialRelationComponents.push(
                <tr key={i}>
                    <td>{relationPowers[i].brandName}</td>
                    <td>{relationPowers[i].relationSocial.socialCertification ? '是' : '否'}</td>
                    <td>{relationPowers[i].relationSocial.socialResponsibility ? '是' : '否'}</td>
                    <td>{relationPowers[i].relationSocial.qualityCredit ? '是' : '否'}</td>
                </tr>
            )
        }

        // 奖项
        let honor = {
            0: '',
            1: '',
            2: '',
            3: ''
        };
        for (let i = 0; i < relationPowers.length; i++) {
            honor[relationPowers[i].relationGovernment.highestHonor] += relationPowers[i].brandName + ', '
        }
        honor[0] = honor[0].substr(0, honor[0].length - 2);
        honor[1] = honor[1].substr(0, honor[1].length - 2);
        honor[2] = honor[2].substr(0, honor[2].length - 2);
        honor[3] = honor[3].substr(0, honor[3].length - 2);


        return (
            <div>
                {/*    社会关系*/}
                <h4 style={{textAlign: 'center'}}>社会关系</h4>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <td>品牌名</td>
                        <td>是否获得社会体系认证</td>
                        <td>是否自主发布社会责任报告</td>
                        <td>是否自主发布质量信用报告</td>
                    </tr>
                    </thead>
                    <tbody>
                    {socialRelationComponents}
                    </tbody>
                </Table>
                {/*    员工人均工资*/}
                <div>
                    <canvas id="chartjs-average-salary"/>
                </div>
                {/*    员工工资增长率*/}
                <div>
                    <canvas id="chartjs-salary-growth"/>
                </div>
                {/*职工伤亡率*/}
                <div>
                    <canvas id="chartjs-hurt-rate"/>
                </div>
                {/*劳动合同签订率*/}
                <div>
                    <canvas id="chartjs-contract-rate"/>
                </div>
                {/*    资产纳税率*/}
                <div>
                    <canvas id="chartjs-tax-rate"/>
                </div>
                {/*税款上缴率*/}
                <div>
                    <canvas id="chartjs-tax-paid-rate"/>
                </div>
                {/*获得的最高级别的政府奖项*/}
                <div>
                    <h3 style={{textAlign: 'center'}}>获得的最高级别的政府奖项</h3>
                    <Table>
                        <thead>
                        <tr>
                            <td>奖项级别</td>
                            <td>品牌名</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>省级以上</td>
                            <td>{honor[1]}</td>
                        </tr>
                        <tr>
                            <td>市级</td>
                            <td>{honor[2]}</td>
                        </tr>
                        <tr>
                            <td>县级</td>
                            <td>{honor[3]}</td>
                        </tr>
                        <tr>
                            <td>没有</td>
                            <td>{honor[0]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                {/*政府项目资助金额*/}
                <div>
                    <canvas id="chartjs-fund-government"/>
                </div>
                {/*就业贡献率*/}
                <div>
                    <canvas id="chartjs-employment-contribution"/>
                </div>
                {/*捐赠支出额*/}
                <div>
                    <canvas id="chartjs-donation"/>
                </div>
                {/*捐赠收入比*/}
                <div>
                    <canvas id="chartjs-donation-rate"/>
                </div>
                {/*环保经费额*/}
                <div>
                    <canvas id="chartjs-recycle-expense"/>
                </div>
                {/*环保经费比*/}
                <div>
                    <canvas id="chartjs-recycle-expense-rate"/>
                </div>
                {/*环保经费增长率*/}
                <div>
                    <canvas id="chartjs-recycle-expense-growth"/>
                </div>
                {/*每股收益*/}
                <div>
                    <canvas id="chartjs-earning-share"/>
                </div>
                {/*净资产收益率*/}
                <div>
                    <canvas id="chartjs-net-asset-rate"/>
                </div>
                {/*产品合格变动率*/}
                <div>
                    <canvas id="chartjs-product-qualified-growth"/>
                </div>

            </div>
        );
    }
}
