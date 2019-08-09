import React from 'react';
import PropTypes from 'prop-types';
import ManagePower from "../../ApiClient/model/ManagePower";
import {drawSingleDataHorizontalBarChart} from "./ChartUtils";
import NormalTable from "./NormalTable";

export default class ManageReport extends React.Component{
    static propTypes = {
        managePowers: PropTypes.arrayOf(PropTypes.instanceOf(ManagePower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let managePowers = this.props.managePowers;

        // 已获得的荣誉值

        // 首先按照降序排列
        managePowers.sort((a, b) => a.manageOperation.honor >= b.manageOperation.honor ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(managePowers, (power) => {
            return power.manageOperation.honor;
        }, document.getElementById('chartjs-manage-type'), '企业已经获得的商标荣誉(单位: 个数)');

        //企业固定资产比率
        managePowers.sort((a, b) => a.manageOperation.fixedAssetRate >= b.manageOperation.fixedAssetRate ? -1 : 1);

        drawSingleDataHorizontalBarChart(managePowers,(power)=>{
            return parseFloat((power.manageOperation.fixedAssetRate*100).toFixed(3));
        },document.getElementById('chartjs-fixed-asset-rate'),'企业固定资产比率(单位: %)');




        //计算机设施普及率
        managePowers.sort((a, b) => a.manageOrganization.computerRate >= b.manageOrganization.computerRate ? -1 : 1);

        drawSingleDataHorizontalBarChart(managePowers,(power)=>{
            return parseFloat((power.manageOrganization.computerRate*100).toFixed(3));
        },document.getElementById('chartjs-computer-rate'),'计算机设施普及率(单位: %)');

        //移动互联网系统普及率
        managePowers.sort((a, b) => a.manageOrganization.mobileInternetSystemUniversalRate >= b.manageOrganization.mobileInternetSystemUniversalRate ? -1 : 1);

        drawSingleDataHorizontalBarChart(managePowers,(power)=>{
            return parseFloat((power.manageOrganization.mobileInternetSystemUniversalRate*100).toFixed(3));
        },document.getElementById('chartjs-mobile-internet-system-universal-rate'),'移动互联网系统普及率(单位: %)');

        //员工培训费占比
        managePowers.sort((a, b) => a.manageOrganization.trainingExpense >= b.manageOrganization.trainingExpense ? -1 : 1);

        drawSingleDataHorizontalBarChart(managePowers,(power)=>{
            return parseFloat((power.manageOrganization.trainingExpense*100).toFixed(3));
        },document.getElementById('chartjs-training-expense'),'员工培训费占当年总销售费用比例(单位: %)');
    }

    render() {

        return (
            <div>
                {/*企业并购*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>企业并购(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否" maxRange={-1} type_one="manageOperation" type_two="companyMerged"/>
                </div>

                {/*商标荣誉数量*/}
                <div>
                    <canvas id="chartjs-manage-type"/>
                </div>

                {/*经营业务种类*/}
                <div>

                    <h4 style={{textAlign: 'center'}}>经营业务种类(单位: 个数)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="种类数" maxRange={3} type_one="manageOperation" type_two="businessNumber" content={{1:1,2:2,3:"3及以上"}}/>
                </div>

                {/*经营区域*/}
                <div>

                    <h4 style={{textAlign: 'center'}}>经营区域</h4>

                    <NormalTable powers={this.props.managePowers}  typeName="经营区域" maxRange={3} type_one="manageOperation" type_two="operationArea" content={{1:"世界范围", 2:"国内范围", 3:"其他"}}/>

                </div>

                {/*固定资产比率*/}
                <div>
                    <canvas id="chartjs-fixed-asset-rate"/>
                </div>

                {/*品牌管理部门*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>品牌管理部门(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否有管理部门" maxRange={-1} type_one="manageOrganization" type_two="managementPart" />
                </div>

                {/*品牌管理人才*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>品牌管理人才(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否有专门管理人才" maxRange={-1} type_one="manageOrganization" type_two="managementPerson" />
                </div>

                {/*计算机设施普及率*/}
                <div>
                    <canvas id="chartjs-computer-rate"/>
                </div>

                {/*移动互联网系统普及率*/}
                <div>
                    <canvas id="chartjs-mobile-internet-system-universal-rate"/>
                </div>

                {/*企业文化部分*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>拥有企业文化部分(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否拥有企业文化部分" maxRange={-1} type_one="manageOrganization" type_two="companyCulture" />
                </div>

                {/*定期员工培训*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>定期进行员工培训(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否定期进行员工培训" maxRange={-1} type_one="manageOrganization" type_two="employeeTraining" />
                </div>

                {/*企业内刊*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>拥有企业内刊(是/否)</h4>
                    <NormalTable powers={this.props.managePowers}  typeName="是/否拥有企业内刊" maxRange={-1} type_one="manageOrganization" type_two="companyPublication" />
                </div>

                {/*培训费占总销售费用比率*/}
                <div>
                    <canvas id="chartjs-training-expense"/>
                </div>
            </div>
        );
    }
}
