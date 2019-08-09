import React from 'react';
import PropTypes from 'prop-types';
import SpreadPower from "../../ApiClient/model/SpreadPower"
import {drawSingleDataHorizontalBarChart, drawStackedHorizontalBarChart} from "./ChartUtils";
import {Table} from 'react-bootstrap';

export default class SpreadReport extends React.Component {
    static propTypes = {
        spreadPowers: PropTypes.arrayOf(PropTypes.instanceOf(SpreadPower))
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let spreadPowers = this.props.spreadPowers;
        // 媒体数量
        spreadPowers.sort((a, b) => a.spreadCoverage.mediaOfficeNumber + a.spreadCoverage.mediaBrandNumber +  a.spreadCoverage.mediaSelfNumber +
        a.spreadCoverage.mediaOtherNumber >=
        b.spreadCoverage.mediaOfficeNumber + b.spreadCoverage.mediaBrandNumber +  b.spreadCoverage.mediaSelfNumber +
        b.spreadCoverage.mediaOtherNumber ? -1 : 1);
        let accessors = [
            (spreadPower) => spreadPower.spreadCoverage.mediaOfficeNumber,
            (spreadPower) => spreadPower.spreadCoverage.mediaBrandNumber,
            (spreadPower) => spreadPower.spreadCoverage.mediaSelfNumber,
            (spreadPower) => spreadPower.spreadCoverage.mediaOtherNumber,
        ];
        drawStackedHorizontalBarChart(spreadPowers, accessors, ['官方媒体数量', '品牌媒体数量', '自媒体数量', '其他媒体数量'],
            document.getElementById('chartjs-spr-mediaNumber'), '媒体数量(单位: 个数)', ['rgb(31, 174, 225)','rgb(35, 194, 76)', 'rgb(255, 144, 43)', 'rgb(255, 99, 132)']);

        // 媒体报道数量
        spreadPowers.sort((a, b) => a.spreadCoverage.articleOfficeNumber + a.spreadCoverage.articleBrandNumber +  a.spreadCoverage.articleSelfNumber +
        a.spreadCoverage.articleOtherNumber >=
        b.spreadCoverage.articleOfficeNumber + b.spreadCoverage.articleBrandNumber +  b.spreadCoverage.articleSelfNumber +
        b.spreadCoverage.articleOtherNumber ? -1 : 1);
        accessors = [
            (spreadPower) => spreadPower.spreadCoverage.articleOfficeNumber,
            (spreadPower) => spreadPower.spreadCoverage.articleBrandNumber,
            (spreadPower) => spreadPower.spreadCoverage.articleSelfNumber,
            (spreadPower) => spreadPower.spreadCoverage.articleOtherNumber,
        ];
        drawStackedHorizontalBarChart(spreadPowers, accessors, ['官方媒体报道数量', '品牌媒体报道数量', '自媒体报道数量', '其他媒体报道数量'],
            document.getElementById('chartjs-spr-articleNumber'), '媒体报道数量(单位: 个数)', ['rgb(31, 174, 225)','rgb(35, 194, 76)', 'rgb(255, 144, 43)', 'rgb(255, 99, 132)']);

        //百度指数
        spreadPowers.sort((a, b) => a.spreadCoverage.baiduIndex >= b.spreadCoverage.baiduIndex ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadCoverage.baiduIndex;
        }, document.getElementById('chartjs-spr-baiduIndex'), '百度指数');

        //广告投入费用
        spreadPowers.sort((a, b) => a.spreadPrecision.adExpense >= b.spreadPrecision.adExpense ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadPrecision.adExpense;
        }, document.getElementById('chartjs-spr-adExpense'), '广告投入费用(单位: 万元)');

        //代言人投入费用
        spreadPowers.sort((a, b) => a.spreadPrecision.spokespersonExpense >= b.spreadPrecision.spokespersonExpense ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadPrecision.spokespersonExpense;
        }, document.getElementById('chartjs-spr-spokespersonExpense'), '代言人投入费用(单位: 万元)');

        //自媒体阅读量
        spreadPowers.sort((a, b) => a.spreadPrecision.mediaSelfRead >= b.spreadPrecision.mediaSelfRead ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadPrecision.mediaSelfRead;
        }, document.getElementById('chartjs-spr-mediaSelfRead'), '自媒体阅读量(单位: 篇数)');

        //自媒体粉丝量
        spreadPowers.sort((a, b) => a.spreadPrecision.mediaSelfFan >= b.spreadPrecision.mediaSelfFan ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadPrecision.mediaSelfFan;
        }, document.getElementById('chartjs-spr-mediaSelfFan'), '自媒体粉丝量(单位: 个数)');

        //活动营销投入
        spreadPowers.sort((a, b) => a.spreadPrecision.activityExpense >= b.spreadPrecision.activityExpense ? -1 : 1);
        // 输入到工具函数中绘图
        drawSingleDataHorizontalBarChart(spreadPowers, (power) => {
            return power.spreadPrecision.activityExpense;
        }, document.getElementById('chartjs-spr-activityExpense'), '活动营销投入(单位: 万元)');
    }

    render() {
        let range = {
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        };
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            range[power.spreadPrecision.adPosition] += power.brandName + ', ';
        }
        range[1] = range[1].substr(0, range[1].length - 2);
        range[2] = range[2].substr(0, range[2].length - 2);
        range[3] = range[3].substr(0, range[3].length - 2);
        range[4] = range[4].substr(0, range[4].length - 2);
        range[5] = range[5].substr(0, range[5].length - 2);

        let ad_range = {
            1: '',
            2: '',
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if (power.spreadPrecision.adLevel == true){
                ad_range[1] += power.brandName + ', ';
            }
            if (power.spreadPrecision.adLevel == false){
                ad_range[2] += power.brandName + ', ';
            }
        }
        ad_range[1] = ad_range[1].substr(0, ad_range[1].length - 2);
        ad_range[2] = ad_range[2].substr(0, ad_range[2].length - 2);

        let spokesperson_range = {
            1: '',
            2: '',
            3: '',
            4: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            spokesperson_range[power.spreadPrecision.spokespersonLevel] += power.brandName + ', ';
        }
        spokesperson_range[1] = spokesperson_range[1].substr(0, spokesperson_range[1].length - 2);
        spokesperson_range[2] = spokesperson_range[2].substr(0, spokesperson_range[2].length - 2);
        spokesperson_range[3] = spokesperson_range[3].substr(0, spokesperson_range[3].length - 2);
        spokesperson_range[4] = spokesperson_range[4].substr(0, spokesperson_range[4].length - 2);

        let spokesperson_num_range = {
            1: '',
            2: '',
            3: '',
            4: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            spokesperson_num_range[power.spreadPrecision.spokespersonNum] += power.brandName + ', ';
        }
        spokesperson_num_range[1] = spokesperson_num_range[1].substr(0, spokesperson_num_range[1].length - 2);
        spokesperson_num_range[2] = spokesperson_num_range[2].substr(0, spokesperson_num_range[2].length - 2);
        spokesperson_num_range[3] = spokesperson_num_range[3].substr(0, spokesperson_num_range[3].length - 2);
        spokesperson_num_range[4] = spokesperson_num_range[4].substr(0, spokesperson_num_range[4].length - 2);

        let accout_range = {
            1: '',
            2: '',
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if (power.spreadCoverage.mediaSelfNumber != 0){
                accout_range[1] += power.brandName + ', ';
            }
            if (power.spreadCoverage.mediaSelfNumber == 0){
                accout_range[2] += power.brandName + ', ';
            }
        }
        accout_range[1] = accout_range[1].substr(0, accout_range[1].length - 2);
        accout_range[2] = accout_range[2].substr(0, accout_range[2].length - 2);


        let exhibition_range = {
            1: '',
            2: '',
            3: '',
            4: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            exhibition_range[power.spreadPrecision.exhibition] += power.brandName + ', ';
        }
        exhibition_range[1] = exhibition_range[1].substr(0, exhibition_range[1].length - 2);
        exhibition_range[2] = exhibition_range[2].substr(0, exhibition_range[2].length - 2);
        exhibition_range[3] = exhibition_range[3].substr(0, exhibition_range[3].length - 2);
        exhibition_range[4] = exhibition_range[4].substr(0, exhibition_range[4].length - 2);

        // 品牌营销传播活动
        // 品牌赞助数量
        let brandSupport_range = {
            1: '',
            2: '',
            3: ''
        }

        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if (power.spreadPrecision.brandSupport >= 3){
                brandSupport_range[3] += power.brandName + ', ';
            }else if(power.spreadPrecision.brandSupport == 1 || power.spreadPrecision.brandSupport == 2){
                brandSupport_range[2] += power.brandName + ', ';
            }else{
                brandSupport_range[1] += power.brandName + ', ';
            }
        }
        brandSupport_range[1] = brandSupport_range[1].substr(0, brandSupport_range[1].length - 2);
        brandSupport_range[2] = brandSupport_range[2].substr(0, brandSupport_range[2].length - 2);
        brandSupport_range[3] = brandSupport_range[3].substr(0, brandSupport_range[3].length - 2);

        // 节目次数
        let program_range = {
            1: '',
            2: '',
            3: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if(power.spreadPrecision.program>=3){
                program_range[3] += power.brandName + ', ';
            }else if(power.spreadPrecision.program == 1 || power.spreadPrecision.program == 2){
                program_range[2] += power.brandName + ', ';
            }else{
                program_range[1] += power.brandName + ', ';
            }

        }
        program_range[1] = program_range[1].substr(0, program_range[1].length - 2);
        program_range[2] = program_range[2].substr(0, program_range[2].length - 2);
        program_range[3] = program_range[3].substr(0, program_range[3].length - 2);

        //电影次数
        let movie_range = {
            1: '',
            2: '',
            3: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if(power.spreadPrecision.movie>=3){
                movie_range[3] += power.brandName + ', ';
            }else if(power.spreadPrecision.movie==1 || power.spreadPrecision.movie==2) {
                movie_range[2] += power.brandName + ', ';
            }else {
                movie_range[1] += power.brandName + ', ';
            }
        }
        movie_range[1] = movie_range[1].substr(0, movie_range[1].length - 2);
        movie_range[2] = movie_range[2].substr(0, movie_range[2].length - 2);
        movie_range[3] = movie_range[3].substr(0, movie_range[3].length - 2);

        //球队次数
        let teamSupport_range = {
            1: '',
            2: '',
            3: ''
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if(power.spreadPrecision.teamSupport>=3){
                teamSupport_range[3] += power.brandName + ', ';
            }else if(power.spreadPrecision.teamSupport==1 || power.spreadPrecision.teamSupport==2){
                teamSupport_range[2] += power.brandName + ', ';
            }else{
                teamSupport_range[1] += power.brandName + ', ';
            }

        }

        teamSupport_range[1] = teamSupport_range[1].substr(0, teamSupport_range[1].length - 2);
        teamSupport_range[2] = teamSupport_range[2].substr(0, teamSupport_range[2].length - 2);
        teamSupport_range[3] = teamSupport_range[3].substr(0, teamSupport_range[3].length - 2);

        //比赛次数
        let gameSupport_range = {
            1: '',
            2: '',
            3: '',
        }
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            if(power.spreadPrecision.gameSupport>=3){
                gameSupport_range[3] += power.brandName + ', ';
            }else if(power.spreadPrecision.gameSupport==1 || power.spreadPrecision.gameSupport==2){
                gameSupport_range[2] += power.brandName + ', ';
            }else {
                gameSupport_range[1] += power.brandName + ', ';
            }

        }
        gameSupport_range[1] = gameSupport_range[1].substr(0, gameSupport_range[1].length - 2);
        gameSupport_range[2] = gameSupport_range[2].substr(0, gameSupport_range[2].length - 2);
        gameSupport_range[3] = gameSupport_range[3].substr(0, gameSupport_range[3].length - 2);
        {/*品牌营销获奖次数*/}
        let honnest = []
        for (let i = 0; i < this.props.spreadPowers.length; i++) {
            let power = this.props.spreadPowers[i];
            honnest.push(
                <tr>
                    <td>{power.brandName}</td>
                    <td>{power.spreadPrecision.gana}</td>
                    <td>{power.spreadPrecision.newYork}</td>
                    <td>{power.spreadPrecision.london}</td>
                    <td>{power.spreadPrecision.greatWall}</td>
                    <td>{power.spreadPrecision.aiFei}</td>
                    <td>{power.spreadPrecision.jinTou}</td>
                    <td>{power.spreadPrecision.jinShuBiao}</td>
                    <td>{power.spreadPrecision.chinaFourA}</td>
                    <td>{power.spreadPrecision.huXiao}</td>
                    <td>{power.spreadPrecision.jinTong}</td>
                    <td>{power.spreadPrecision.longXi}</td>
                </tr>
            )
        }



        return (
            <div>
                {/*<h3 className="mb-lg pv">媒体数量</h3>*/}
                <div>
                    <canvas id="chartjs-spr-mediaNumber"/>
                </div>
                {/*<h3 className="mb-lg pv">媒体报道数量</h3>*/}
                <div>
                    <canvas id="chartjs-spr-articleNumber"/>
                </div>

                {/*<h3 className="mb-lg pv">百度指数</h3>*/}
                <div>
                    <canvas id="chartjs-spr-baiduIndex"/>
                </div>

                {/*广告主要覆盖区域*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>广告主要覆盖区域</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>广告主要覆盖区域</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>国际</td>
                            <td>{range[1] == ''? '--' : range[1]}</td>
                        </tr>
                        <tr>
                            <td>全国</td>
                            <td>{range[2] == ''? '--' : range[2]}</td>
                        </tr>
                        <tr>
                            <td>省</td>
                            <td>{range[3] == ''? '--' : range[3]}</td>
                        </tr>
                        <tr>
                            <td>市区</td>
                            <td>{range[4] == ''? '--' : range[4]}</td>
                        </tr>
                        <tr>
                            <td>县</td>
                            <td>{range[5] == ''? '--' : range[5]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*<h3 className="mb-lg pv">广告投入费用</h3>*/}
                <div>
                    <canvas id="chartjs-spr-adExpense"/>
                </div>

                {/*入选国品计划*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>入选国品计划</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>入选国品计划</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>是</td>
                            <td>{ad_range[1] == ''? '--' : ad_range[1]}</td>
                        </tr>
                        <tr>
                            <td>否</td>
                            <td>{ad_range[2] == ''? '--' : ad_range[2]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*代言人投入费用*/}
                <div>
                    <canvas id="chartjs-spr-spokespersonExpense"/>
                </div>

                {/*代言人影响力层级*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>代言人影响力层级</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>代言人影响力层级</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>一线明星</td>
                            <td>{spokesperson_range[1] == ''? '--' : spokesperson_range[1]}</td>
                        </tr>
                        <tr>
                            <td>二线明星</td>
                            <td>{spokesperson_range[2] == ''? '--' : spokesperson_range[2]}</td>
                        </tr>
                        <tr>
                            <td>行业精英</td>
                            <td>{spokesperson_range[3] == ''? '--' : spokesperson_range[3]}</td>
                        </tr>
                        <tr>
                            <td>其他</td>
                            <td>{spokesperson_range[4] == ''? '--' : spokesperson_range[4]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*代言人数量*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>代言人数量</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>代言人数量</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3个及以上</td>
                            <td>{spokesperson_num_range[1] == ''? '--' : spokesperson_num_range[1]}</td>
                        </tr>
                        <tr>
                            <td>1~2个</td>
                            <td>{spokesperson_num_range[2] == ''? '--' : spokesperson_num_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{spokesperson_num_range[3] == ''? '--' : spokesperson_num_range[3]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*公司自媒体账号有无*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>自媒体账号(有/无)</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>自媒体账号有无</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>是</td>
                            <td>{ad_range[1] == ''? '--' : ad_range[1]}</td>
                        </tr>
                        <tr>
                            <td>否</td>
                            <td>{ad_range[2] == ''? '--' : ad_range[2]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*<h3 className="mb-lg pv">自媒体阅读量</h3>*/}
                <div>
                    <canvas id="chartjs-spr-mediaSelfRead"/>
                </div>

                {/*<h3 className="mb-lg pv">自媒体粉丝量</h3>*/}
                <div>
                    <canvas id="chartjs-spr-mediaSelfFan"/>
                </div>

                {/*参加过最高的专业行业展会*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>参加过最高的专业行业展会</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>参加过最高的专业行业展会</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>世界级</td>
                            <td>{exhibition_range[1] == ''? '--' : exhibition_range[1]}</td>
                        </tr>
                        <tr>
                            <td>国家级</td>
                            <td>{exhibition_range[2] == ''? '--' : exhibition_range[2]}</td>
                        </tr>
                        <tr>
                            <td>省市级</td>
                            <td>{exhibition_range[3] == ''? '--' : exhibition_range[3]}</td>
                        </tr>
                        <tr>
                            <td>其他</td>
                            <td>{exhibition_range[4] == ''? '--' : exhibition_range[4]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*品牌赞助*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>年度品牌赞助</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>赞助次数</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3次及以上</td>
                            <td>{brandSupport_range[3] == ''? '--' : brandSupport_range[3]}</td>
                        </tr>
                        <tr>
                            <td>1~2次</td>
                            <td>{brandSupport_range[2] == ''? '--' : brandSupport_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{brandSupport_range[1] == ''? '--' : brandSupport_range[1]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*年度赞助节目数*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>年度赞助节目数</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>赞助次数</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3次及以上</td>
                            <td>{program_range[3] == ''? '--' : program_range[3]}</td>
                        </tr>
                        <tr>
                            <td>1~2次</td>
                            <td>{program_range[2] == ''? '--' : program_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{program_range[1] == ''? '--' : program_range[1]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*年度影视植入数量*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>年度影视植入数量</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>赞助次数</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3次及以上</td>
                            <td>{movie_range[3] == ''? '--' : movie_range[3]}</td>
                        </tr>
                        <tr>
                            <td>1~2次</td>
                            <td>{movie_range[2] == ''? '--' : movie_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{movie_range[1] == ''? '--' : movie_range[1]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*年度赞助球队数量*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>年度赞助球队数量</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>赞助次数</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3次及以上</td>
                            <td>{teamSupport_range[3] == ''? '--' : teamSupport_range[3]}</td>
                        </tr>
                        <tr>
                            <td>1~2次</td>
                            <td>{teamSupport_range[2] == ''? '--' : teamSupport_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{teamSupport_range[1] == ''? '--' : teamSupport_range[1]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*年度赞助比赛数量*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>年度赞助比赛数量</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>赞助次数</th>
                            <th>品牌名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3次及以上</td>
                            <td>{gameSupport_range[3] == ''? '--' : gameSupport_range[3]}</td>
                        </tr>
                        <tr>
                            <td>1~2次</td>
                            <td>{gameSupport_range[2] == ''? '--' : gameSupport_range[2]}</td>
                        </tr>
                        <tr>
                            <td>无</td>
                            <td>{gameSupport_range[1] == ''? '--' : gameSupport_range[1]}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {/*<h3 className="mb-lg pv">活动营销投入</h3>*/}
                <div>
                    <canvas id="chartjs-spr-activityExpense"/>
                </div>

                {/*品牌营销获奖次数*/}
                <div>
                    <h4 style={{textAlign: 'center'}}>品牌营销获奖次数</h4>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>品牌名称</th>
                            <th>戛纳奖</th>
                            <th>纽约广告奖</th>
                            <th>伦敦广告奖</th>
                            <th>中国长城广告奖</th>
                            <th>中国艾菲广告奖</th>
                            <th>中国金投广告奖</th>
                            <th>中国金属标广告奖</th>
                            <th>中国4A奖</th>
                            <th>中国虎啸奖</th>
                            <th>中国金曈奖</th>
                            <th>中国龙玺奖</th>
                        </tr>
                        </thead>
                        <tbody>
                        {honnest}
                        </tbody>
                    </Table>
                </div>


            </div>
        );
    }
}
