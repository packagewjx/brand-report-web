import React from 'react'
import PropTypes from '_prop-types@15.7.2@prop-types';
import ContentWrapper from "../../Layout/ContentWrapper";
import {Col, Row, Table} from '_react-bootstrap@0.31.2@react-bootstrap';

export default class ExpertReview extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            "cmm" : [],
            "myCmm" : [],
        };
    }
    componentWillMount(){

        let params = this.props.location.state;
        let state = params[0];
        let comment = params[1];
        let status = Object.keys(params[2])[0];
        //当无评论数据时，直接返回，避免报错
        if(typeof(comment[state.abstract.brandName]) === "undefined") return;
        let cmm = comment[state.abstract.brandName].cmm;

        if(status>"0"){
            if(status==="1"){
                for(let i=1;i<cmm.length;i++){
                    this.state.cmm.push(cmm[i]);
                }
            }else{
                for(let i=0;i<cmm.length;i++){
                    this.state.cmm.push(cmm[i]);
                }
            }


            this.state.myCmm.push(cmm[0]);

        }else{
            for(let i=0;i<cmm.length;i++){
                this.state.cmm.push(cmm[i]);
            }

        }
    }

    render() {

        let self = this;
        let params = this.props.location.state;
        let status = Object.keys(params[2])[0];
        let state = params[0];

        // 从路由历史读取
        let channelPower = state.channelPower;
        let developPower = state.developPower;
        let managePower = state.managePower;
        let marketPower = state.marketPower;
        let productPower = state.productPower;
        let relationPower = state.relationPower;
        let spreadPower = state.spreadPower;
        let valuePower = state.valuePower;
        let abs = state.abstract;
        let abstract = {score: abs, brandName: abs.brandName, year: abs.year};



        // 暂时把meta放这里
        let abstractMeta = [new Meta('各项得分', 'score', {
            channelScore: '渠道力得分',
            developScore: '发展力得分',
            manageScore: '管理力得分',
            marketScore: '市场力得分',
            productScore: '产品力得分',
            relationScore: '关系力得分',
            spreadScore: '传播力得分',
            valueScore: '价值力得分',
        })];

        let channelMeta = [new Meta('渠道覆盖', 'channelCoverage', {
            channelRange: '渠道覆盖',
            channelType: '渠道种类',
            channelDirect: '直营店数量',
            channelAgent: '加盟代理店数量'
        }), new Meta('渠道品质', 'channelQuality', {
            offlineSales: '线下渠道销售额',
            onlineSales: '线上渠道销售额',
            inStock: '库存额'
        }), new Meta('渠道成长', 'channelGrowth', {
            offlineSaleGrowth: '线下渠道收入增速',
            offlineSaleRate: '线下渠道收入占比',
            onlineSaleGrowth: '线上渠道收入增速',
            onlineSaleRate: '线上渠道收入占比'
        })];

        let developMeta = [new Meta('发展能力', 'developGrowth', {
            assetGrowth: '总资产增长',
            assetGrowth3year: '三年资产平均增长',
            fixedAssetNew: '固定资产成新率',
            saleGrowth: '销售同增率',
            saleGrowth3year: '3年销售收入平均增长',
            stockGrowth: '股价增长率',
            netProfitGrowth: '净利润增长率'
        }), new Meta('保护能力', 'developProtect', {
            brandInfringement: '法律纠纷数量',
            negativeArticleRate: '负面报道占比',
            publicRelationExpenseRate: '公关费用占比'
        }),];
        let manageMeta = [new Meta('经营管理', 'manageOperation', {
            businessNumber: '业务种类',
            companyMerged: '有过企业并购',
            fixedAssetRate: '企业固定资产比率',
            honor: '商标荣誉',
            operationArea: '经营区域'
        }), new Meta('组织管理', 'manageOrganization', {
            companyCulture: '企业文化部分',
            companyPublication: '是否有企业内刊',
            computerRate: '计算机设施普及率',
            employeeTraining: '是否有员工培训',
            managementPart: '是否有专门的管理部门',
            managementPerson: '是否有专门的管理人才',
            mobileInternetSystemUniversalRate: '移动互联网系统普及率',
            trainingExpense: '员工培训费占总销售比例',
        })];
        let marketMeta = [new Meta('国际影响力', 'marketInternational', {
            brandOutput: '品牌产品出口总额',
            brandOutputProfit: '品牌产品出口利润率',
            brandOverseas: '品牌产品海外销售比例',
        }), new Meta('超值获利力', 'marketPremium', {
            brandAsset: '品牌资产报酬率',
            brandPremium: '品牌溢价率',
            brandProfit: '品牌销售利润率'
        }), new Meta('市场占有力', 'marketShare', {
            marketCover: '市场覆盖率'
        }), new Meta('市场稳定力', 'marketStable', {
            brandIncomeGrowth: '品牌销售收入增长率',
            brandProfitGrowth: '品牌销售利润增长率'
        })];
        let productMeta = [new Meta('创新能力', 'productInnovation', {
            activityLevelCity: '产学活动市级',
            activityLevelCountry: '产学活动国家级',
            activityLevelOther: '产学活动其他',
            activityLevelProvince: '产学活动省级',
            activityLevelWorld: '产学活动世界级',
            doctors: '博士数量',
            exchange: '三年内科技成果转化量',
            highTechnology: '是否是高新技术产业',
            innovationExpense: '创新支出',
            institutionLevelCity: '研发机构市级',
            institutionLevelCountry: '研发机构国家级',
            institutionLevelOther: '研发机构其他',
            institutionLevelProvince: '研发机构省级',
            institutionLevelWorld: '研发机构世界级',
            netAssetGrowth: '净资产增长率',
            patentApplied: '专利申请数',
            patentInvention: '发明专利',
            patentNew: '实用新型专利',
            patentOut: '外观设计专利',
            patentOver10: '投入10万以上的发明专利申请比',
            pctRate: 'pcT申请量',
            persons: '研发人员数量',
            rdExpense: '研发支出',
            standardCountry: '参与制定国家标准',
            turnoverGrowth: '主营业务收入增长率'
        }), new Meta('生产能力', 'productProduce', {
            allAsset: '总资产',
            employeeLevelJunior: '雇员初中学历比值',
            employeeLevelSenior: '雇员高中学历比值',
            employeeLevelUniversity: '雇员本科学历比值',
            fixedAsset: '固定资产',
            netAsset: '净资产',
            output: '出口额',
            productLevel: '产品技术水平',
            profit: '利润总额',
            rdInstitutionExpense: '研发机构投入',
            // 这个是第四层指标，显示错误
            // rdInstitutionNumber: '研发机构数量',
            registeredAsset: '注册资产',
            tax: '企业所得税',
            turnover: '营业总收入'
        })];
        let relationMeta = [new Meta('员工关系', 'relationEmployee', {
            contractRate: '签订合同率',
            hurtRate: '伤亡率',
            salary: '平均工资',
            salaryGrowth: '工资增长率'
        }), new Meta('政府关系', 'relationGovernment', {
            fundGovernment: '政府项目资助金额',
            highestHonor: '获得的最高级别的政府奖项',
            taxPaidRate: '税款上缴率',
            taxRate: '资产纳税率'
        }), new Meta('公益关系', 'relationPublic', {
            donation: '捐款支出',
            donationRate: '捐款支出占企业总收入比',
            employmentContribution: '就业贡献率'
        }), new Meta('社会关系', 'relationSocial', {
            qualityCredit: '是否有发布质量信用报告',
            socialCertification: '是否有社会责任体系认证',
            socialResponsibility: '是否有发布社会责任报告'
        }), new Meta('股东关系', 'relationStock', {
            earningShare: '每股收益',
            netAssetRate: '净资产收益率',
            productQualifiedGrowth: '产品合格变动率'
        }), new Meta('环保关系', 'relationEnvironment', {
            recycleExpense: '环保经费额',
            recycleExpenseGrowth: '环保经费增长率',
            recycleExpenseRate: '环保经费比'
        })];
        let spreadMeta = [new Meta('传播广度', 'spreadCoverage', {
            articleBrandNumber: '品牌媒体报道数',
            articleOfficialNumber: '官方媒体报道数',
            articleOtherNumber: '其他媒体报道数',
            articleSelfNumber: '自媒体报道数',
            baiduIndex: '百度搜索指数',
            mediaBrandNumber: '品牌媒体数量',
            mediaOfficeNumber: '官方媒体数量',
            mediaOtherNumber: '其他媒体数量',
            mediaSelfNumber: '自媒体数量'
        }), new Meta('传播精度', 'spreadPrecision', {
            actualSpreadInvest: '实际营销投入',
            adExpense: '广告投入',
            adLevel: '广告投放等级',
            adPosition: '广告投放地点',
            aiFei: '中国艾菲奖',
            brandSupport: '年度品牌赞助数量',
            chinaFourA: '中国4A奖',
            exhibition: '参加过最高的专业行业展会',
            gameSupport: '冠名比赛',
            gana: '戛纳奖',
            greatWall: '中国长城奖',
            huXiao: '中国虎啸奖',
            jinShuBiao: '中国金属标',
            jinTong: '中国金曈奖',
            jinTou: '中国金投奖',
            london: '伦敦广告节',
            longXi: '中国龙玺奖',
            mediaSelfFan: '自媒体粉丝数',
            mediaSelfNum: '自媒体账号数量',
            mediaSelfRead: '自媒体阅读量',
            movie: '年度影视植入数量',
            newYork: '纽约广告节',
            program: '年度赞助节目数量',
            spokespersonExpense: '代言人投入',
            spokespersonLevel: '代言人等级',
            spokespersonNum: '代言人数量',
            teamSupport: '年度赞助球队数量'
        })];
        let valueMeta = [new Meta('品牌知名度', 'valueFamous', {
            china500Rank: '中国500强',
            fanNumber: '微博/电商/旗舰店粉丝数',
            globalBrand500Rank: '世界品牌五百强排名',
            globalFortune500Rank: '世界财富五百强排名',
            interBrand: 'InterBrand排名'
        }), new Meta('品牌美誉度', 'valuePraise', {
            brandArticles: '品牌的资讯阅读量',
            honorNumber: '获得荣誉数量',
            productPositive: '商品好评量',
            storePositive: '店铺好评数'
        })];
        return(
            <ContentWrapper>
                <h3>{abstract.score.brandName}品牌{abstract.score.year}年度报告</h3>
                <div>
                    <CommentPanel onChange={val=>{
                        let newCmm = this.state.cmm;
                        newCmm.push({"author":"本人","content":val})
                        self.setState(newCmm);
                    }} status={status} myCmm={this.state.myCmm[0]}/>
                </div>
                <ExpertPanel comment = {self.state.cmm} />
                <Row id="row-report">
                    <Col md={6}>

                        <ReportPanel power={abstract} meta={abstractMeta} reportName={'品牌竞争力得分'}/>
                        <ReportPanel power={channelPower} meta={channelMeta} reportName={'渠道力报告'}/>
                        <ReportPanel power={developPower} meta={developMeta} reportName={'发展力报告'}/>
                        <ReportPanel power={managePower} meta={manageMeta} reportName={'管理力报告'}/>
                        <ReportPanel power={marketPower} meta={marketMeta} reportName={'市场力报告'}/>
                        <ReportPanel power={valuePower} meta={valueMeta} reportName={'价值力报告'}/>
                        <ReportPanel power={productPower} meta={productMeta} reportName={'产品力报告'}/>

                    </Col>
                    <Col md={6}>
                        <ReportPanel power={relationPower} meta={relationMeta} reportName={'关系力报告'}/>
                        <ReportPanel power={spreadPower} meta={spreadMeta} reportName={'传播力报告'}/>

                    </Col>
                </Row>
            </ContentWrapper>
        );

    }
}
class ExpertPanel extends React.Component {

    render() {
        let comment = this.props.comment;
        let rowArray = [];
        rowArray.push(<tr>
            <th>评审人</th>
            <th>评审内容</th>
        </tr>);
        for (let i = 0; i < comment.length; i++) {
            let rows = [];
            rows.push(
                <tr key={i}>
                    <td>{comment[i].author}</td>
                    <td>{comment[i].content}</td>
                </tr>
            );

            rowArray.push(rows);
        }




        return (
            <div className="panel panel-default">
                <div className="panel-heading">{"专家评审"}</div>
                <div className="panel-body">
                    <Table responsive striped bordered hover>
                        <tbody>
                        {rowArray}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
class CommentPanel extends React.Component{
    loadData(){

        if(typeof this.props.myCmm === "undefined") return "";
        return this.props.myCmm['content'];
    }

    render(){
        let readOnly = this.props.status==="1"?"readonly":"";
        let display = this.props.status==="2"?"none":""
        let disabled = this.props.status === "1"?"disabled":"";

        return (
            <div className="panel panel-default" style={{display:display}}>
                <div className="panel b m0">
                    <div className="panel-body">
                        <h3>您的评审:</h3>
                        <form method="post" action="" className="mb mt">
                            <textarea id="comment" rows="4" className="form-control" readOnly={readOnly}>{this.loadData()}</textarea>
                        </form>
                        <div className="clearfix">
                            <div className="pull-right">
                                <button disabled={disabled} type="button" className="btn btn-success" onClick={()=>{
                                    this.props.onChange($('#comment').val());
                                    $('#comment').val("");
                                    $.notify({status:'info',message:'提交成功,下拉可查看评审',timeout:800});
                                }}>提交</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export class Meta {
    /**
     * @member {string}
     */
    secondLevelName;

    /**
     * @member {string}
     */
    key;

    /**
     * @member {Object}
     */
    thirdLevelNameMap;


    constructor(secondLevelName, key, thirdLevelNameMap) {
        this.secondLevelName = secondLevelName;
        this.key = key;
        this.thirdLevelNameMap = thirdLevelNameMap;
    }
}

class ReportPanel extends React.Component {
    static propTypes = {
        power: PropTypes.object,
        meta: PropTypes.instanceOf(Meta),
        reportName: PropTypes.string,
    };

    render() {
        let reportName = this.props.reportName;
        let power = this.props.power;
        let meta = this.props.meta;
        let rowArray = [];

        for (let i = 0; i < meta.length; i++) {
            let rows = [];
            for (let metricName in meta[i].thirdLevelNameMap) {
                if (meta[i].thirdLevelNameMap.hasOwnProperty(metricName)) {
                    rows.push(
                        <tr key={metricName}>
                            <td>{meta[i].thirdLevelNameMap[metricName]}</td>
                            <td>{power[meta[i].key][metricName]}</td>
                        </tr>
                    )
                }
            }

            rowArray.push(<tr key={meta[i].secondLevelName}>
                <td colSpan={2}>
                    <div style={{textAlign: 'center'}}>{meta[i].secondLevelName}</div>
                </td>
            </tr>);
            rowArray.push(rows);

        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{reportName}</div>
                <div className="panel-body">
                    <Table responsive striped bordered hover>
                        <tbody>
                        {rowArray}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}