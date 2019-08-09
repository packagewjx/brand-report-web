// 测试用途
import BrandReportComment from "../../Model/BrandReportComment";

export const IndexArray = [
    {
        "indexId": "advertising-expense",
        "displayName": "广告投入费用",
        "parentIndexId": "advertising",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "元",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "advertising-level",
        "displayName": "广告投放等级",
        "parentIndexId": "advertising",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\": {\"入选国品计划\":100,\"无\":0}}"
        }
    },
    {
        "indexId": "annual-brand-support-number",
        "displayName": "年度品牌赞助数量",
        "parentIndexId": "spread-activity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,3],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "annual-product-placement",
        "displayName": "年度影视植入数量",
        "parentIndexId": "spread-activity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,3],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "annual-team-support",
        "displayName": "年度赞助球队数量",
        "parentIndexId": "spread-activity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,3],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "annual-title-sponsor",
        "displayName": "冠名体育赛事",
        "parentIndexId": "spread-activity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,3],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "annual-tv-show-support",
        "displayName": "年度冠名赞助综艺节目数量",
        "parentIndexId": "spread-activity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,3],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "asset-growth",
        "displayName": "资产增长",
        "parentIndexId": "develop-growth",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "baidu-index",
        "displayName": "百度搜索指数",
        "parentIndexId": "internet-search-index",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "brand-award",
        "displayName": "获得相关殊荣、称号",
        "parentIndexId": "brand-favorite",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "个",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,10,30],\"intervalScore\":[0,25,75,100]}"
        }
    },
    {
        "indexId": "brand-awareness",
        "displayName": "品牌知名度",
        "parentIndexId": "value-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "brand-fan-number",
        "displayName": "粉丝数量",
        "parentIndexId": "brand-awareness",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "advertising",
        "displayName": "广告投放",
        "parentIndexId": "spread-precision",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "brand-marketing-and-public-welfare",
        "displayName": "品牌营销&公益活动",
        "parentIndexId": "brand-favorite",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "brand-favorite",
        "displayName": "品牌美誉度",
        "parentIndexId": "value-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "brand-media",
        "displayName": "品牌媒体",
        "parentIndexId": "media-channel",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "50",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "brand-media-article-number",
        "displayName": "品牌媒体报道数",
        "parentIndexId": "media-article",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "则",
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "500",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "brand-premium",
        "displayName": "品牌溢价率",
        "parentIndexId": "market-premium",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "brand-news-read-count",
        "displayName": "该品牌对应的资讯阅读量",
        "parentIndexId": "brand-marketing-and-public-welfare",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "abstract",
        "displayName": "品牌竞争力得分",
        "parentIndexId": null,
        "type": "indices",
        "period": "default",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "advertising-area",
        "displayName": "广告投放地点",
        "parentIndexId": "advertising",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\": {\"国际\": 100,\"全国\": 80,\"省\": 60,\"市区\": 40,\"县\": 30}}"
        }
    },
    {
        "indexId": "brand-rank",
        "displayName": "品牌综合排名",
        "parentIndexId": "brand-awareness",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "business-area",
        "displayName": "企业经营的区域",
        "parentIndexId": "operation-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"世界\":  100, \"国内\": 80, \"其他\": 60}}"
        }
    },
    {
        "indexId": "business-kind-number",
        "displayName": "企业经营业务的种类",
        "parentIndexId": "operation-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "种",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,2,3],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "cannes-lions",
        "displayName": "戛纳广告奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "100"
        }
    },
    {
        "indexId": "celebrity",
        "displayName": "品牌代言人",
        "parentIndexId": "spread-precision",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-cover-area",
        "displayName": "渠道范围",
        "parentIndexId": "channel-coverage",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"大区\":  20, \"省\": 40, \"市\": 60, \"县\": 80, \"村\": 100}}"
        }
    },
    {
        "indexId": "channel-coverage",
        "displayName": "渠道覆盖",
        "parentIndexId": "channel-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-growth",
        "displayName": "渠道成长",
        "parentIndexId": "channel-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-number",
        "displayName": "渠道数量",
        "parentIndexId": "channel-coverage",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-offline-sales",
        "displayName": "线下渠道销售额",
        "parentIndexId": "channel-sales",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[200,600],\"intervalScore\":[40,80,100]}"
        }
    },
    {
        "indexId": "channel-offline-sales-growth-rate",
        "displayName": "线下渠道收入增速",
        "parentIndexId": "channel-sales-growth-rate",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,60],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "channel-offline-sales-ratio",
        "displayName": "线下渠道收入占比",
        "parentIndexId": "channel-sales-ratio",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[30,50,80],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "channel-online-sales",
        "displayName": "线上渠道销售额",
        "parentIndexId": "channel-sales",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[100,500],\"intervalScore\":[40,80,100]}"
        }
    },
    {
        "indexId": "channel-online-sales-growth-rate",
        "displayName": "线上渠道收入增速",
        "parentIndexId": "channel-sales-growth-rate",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,60],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "channel-online-sales-ratio",
        "displayName": "线上渠道收入占比",
        "parentIndexId": "channel-sales-ratio",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[30,50,80],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "channel-power",
        "displayName": "渠道力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-quality",
        "displayName": "渠道品质",
        "parentIndexId": "channel-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-sales",
        "displayName": "渠道产品销售额",
        "parentIndexId": "channel-quality",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-sales-growth-rate",
        "displayName": "渠道收入增速",
        "parentIndexId": "channel-growth",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-sales-ratio",
        "displayName": "渠道收入占比",
        "parentIndexId": "channel-growth",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "channel-score",
        "displayName": "渠道力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "channel-power"
        }
    },
    {
        "indexId": "channel-type",
        "displayName": "渠道类型",
        "parentIndexId": "channel-coverage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "种",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[5,8,10],\"intervalScore\":[30,60,90,100]}"
        }
    },
    {
        "indexId": "china-4a",
        "displayName": "中国4A金印奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "celebrity-expense",
        "displayName": "代言人投入费用",
        "parentIndexId": "celebrity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "元",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "celebrity-level",
        "displayName": "代言人影响力层级",
        "parentIndexId": "celebrity",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"一线明星\":100,\"二线明星\":70,\"行业精英\":60,\"其他\":30}}"
        }
    },
    {
        "indexId": "celebrity-number",
        "displayName": "代言人数量",
        "parentIndexId": "celebrity",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "名",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3],\"intervalScore\":[0,60,100]}"
        }
    },
    {
        "indexId": "china-500-rank",
        "displayName": "中国500强",
        "parentIndexId": "brand-rank",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "位",
        "annotations": {
            "score_type": "linear",
            "score_linear_slope": "-2",
            "score_linear_intercept": "10",
            "score_linear_x-lower-bound": "1"
        }
    },
    {
        "indexId": "china-advertising-great-wall-awards",
        "displayName": "中国广告长城奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "china-content-marketing-awards",
        "displayName": "金瞳奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "china-effie-award",
        "displayName": "中国艾菲奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "computer-rate",
        "displayName": "企业计算机设施普及率",
        "parentIndexId": "organization-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[70,90],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "direct-sale-store-number",
        "displayName": "直营店数量",
        "parentIndexId": "channel-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[50, 200],\"intervalScore\":[40,80,100]}"
        }
    },
    {
        "indexId": "doctor-number",
        "displayName": "博士数量",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "名",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "60"
        }
    },
    {
        "indexId": "donation",
        "displayName": "捐赠支出额",
        "parentIndexId": "public-welfare-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[5,10,20],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "donation-rate",
        "displayName": "捐赠收入比",
        "parentIndexId": "public-welfare-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "earning-per-share",
        "displayName": "每股收益",
        "parentIndexId": "shareholders-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "employee-above-bachelor-ratio",
        "displayName": "雇员本科学历比值",
        "parentIndexId": "employee-level-of-education",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "score-ratio",
            "score_score-ratio_total-score": "100"
        }
    },
    {
        "indexId": "employee-average-salary",
        "displayName": "员工人均工资",
        "parentIndexId": "employee-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[4000,7000,10000],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "employee-contract-rate",
        "displayName": "劳动合同签订率",
        "parentIndexId": "employee-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[75,85,95],\"intervalScore\":[0,50,80,100]}"
        }
    },
    {
        "indexId": "employee-hurt-rate",
        "displayName": "职工伤亡率",
        "parentIndexId": "employee-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0.1,0.5,1],\"intervalScore\":[100,80,50,0]}"
        }
    },
    {
        "indexId": "employee-junior-ratio",
        "displayName": "雇员初中及以下学历比值",
        "parentIndexId": "employee-level-of-education",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "score-ratio",
            "score_score-ratio_total-score": "60"
        }
    },
    {
        "indexId": "employee-level-of-education",
        "displayName": "企业员工文化程度",
        "parentIndexId": "produce-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "employee-relation",
        "displayName": "员工关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "employee-salary-grow-rate",
        "displayName": "员工工资增长率",
        "parentIndexId": "employee-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "employee-senior-ratio",
        "displayName": "雇员高中、大专学历比值",
        "parentIndexId": "employee-level-of-education",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "score-ratio",
            "score_score-ratio_total-score": "80"
        }
    },
    {
        "indexId": "employment-contribution",
        "displayName": "就业贡献率",
        "parentIndexId": "public-welfare-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "enterprise-growth",
        "displayName": "企业成长性",
        "parentIndexId": "innovation-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "enterprise-income-tax",
        "displayName": "企业所得税",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1000,2000],\"intervalScore\":[30,60,100]}"
        }
    },
    {
        "indexId": "environment-relation",
        "displayName": "环保关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "develop-growth",
        "displayName": "成长能力",
        "parentIndexId": "develop-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "develop-power",
        "displayName": "发展力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "develop-score",
        "displayName": "发展力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "develop-power"
        }
    },
    {
        "indexId": "environmental-protection-fund-growth-rate",
        "displayName": "环保经费增长率",
        "parentIndexId": "environment-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "environmental-protection-fund-rate",
        "displayName": "环保经费比",
        "parentIndexId": "environment-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "environmental-protection-funds",
        "displayName": "环保经费额",
        "parentIndexId": "environment-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[5,10,20],\"intervalScore\":[20,50,80,100]}"
        }
    },
    {
        "indexId": "export-amount",
        "displayName": "出口额",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,5000,10000],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "fixed-asset",
        "displayName": "固定资产",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,5000,10000],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "global-brand-500-rank",
        "displayName": "世界品牌五百强排名",
        "parentIndexId": "brand-rank",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "位",
        "annotations": {
            "score_type": "linear",
            "score_linear_slope": "-2",
            "score_linear_intercept": "32",
            "score_linear_x-lower-bound": "1"
        }
    },
    {
        "indexId": "global-fortune-500-rank",
        "displayName": "世界五百强",
        "parentIndexId": "brand-rank",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "位",
        "annotations": {
            "score_type": "linear",
            "score_linear_slope": "-2",
            "score_linear_intercept": "42",
            "score_linear_x-lower-bound": "1"
        }
    },
    {
        "indexId": "golden-mouse-award",
        "displayName": "金鼠标奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "government-fund",
        "displayName": "获得政府项目资助金额",
        "parentIndexId": "government-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,50,100],\"intervalScore\":[10,30,50,100]}"
        }
    },
    {
        "indexId": "government-relation",
        "displayName": "政府关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "has-company-culture",
        "displayName": "是否拥有企业文化部分",
        "parentIndexId": "organization-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-company-publication",
        "displayName": "是否拥有企业内刊",
        "parentIndexId": "organization-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-employee-training",
        "displayName": "是否定期进行员工培训",
        "parentIndexId": "organization-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-manage-department",
        "displayName": "是否有专门的品牌管理部门",
        "parentIndexId": "organization-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-manage-expert",
        "displayName": "是否有专门的品牌管理人才",
        "parentIndexId": "organization-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-mergers-and-acquisitions",
        "displayName": "是否进行过企业并购",
        "parentIndexId": "operation-manage",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-publish-csr",
        "displayName": "自主发布社会责任报告",
        "parentIndexId": "social-relation",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-publish-quality-credit-report",
        "displayName": "自主发布质量信用报告",
        "parentIndexId": "social-relation",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-social-accountability",
        "displayName": "获得社会责任体系认证",
        "parentIndexId": "social-relation",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "has-standard",
        "displayName": "企业参与编制国家标准、行业标准、检测方法、技术规范情况",
        "parentIndexId": "intellectual-property",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "highest-government-award",
        "displayName": "获得政府奖项或荣誉",
        "parentIndexId": "government-relation",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"省级及以上\":  100, \"市级\": 80, \"县级\": 50}}"
        }
    },
    {
        "indexId": "industry-academia-research",
        "displayName": "产学研合作",
        "parentIndexId": "rd-organization-management",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "industry-academia-research-city",
        "displayName": "市级产学研合作",
        "parentIndexId": "industry-academia-research",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "40"
        }
    },
    {
        "indexId": "fixed-asset-new-rate",
        "displayName": "固定资产成新率",
        "parentIndexId": "asset-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "fixed-asset-rate",
        "displayName": "企业的固定资产比率",
        "parentIndexId": "operation-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[30,50,80,100],\"intervalScore\":[100,100,80,70,0]}"
        }
    },
    {
        "indexId": "franchise-store-number",
        "displayName": "加盟代理店数量",
        "parentIndexId": "channel-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[100,400],\"intervalScore\":[40,80,100]}"
        }
    },
    {
        "indexId": "industry-academia-research-country",
        "displayName": "国家级产学研合作",
        "parentIndexId": "industry-academia-research",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "industry-academia-research-other",
        "displayName": "其他产学研合作",
        "parentIndexId": "industry-academia-research",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "20"
        }
    },
    {
        "indexId": "industry-academia-research-province",
        "displayName": "省级产学研合作",
        "parentIndexId": "industry-academia-research",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "60"
        }
    },
    {
        "indexId": "industry-academia-research-world",
        "displayName": "世界级产学研合作",
        "parentIndexId": "industry-academia-research",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "100"
        }
    },
    {
        "indexId": "industry-exhibition",
        "displayName": "专业行业展会",
        "parentIndexId": "spread-precision",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"世界级\":100,\"国家级\":80,\"省市级\":50,\"其他\":20}}"
        }
    },
    {
        "indexId": "interbrand-rank",
        "displayName": "InterBrand排名",
        "parentIndexId": "brand-rank",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "位",
        "annotations": {
            "score_type": "linear",
            "score_linear_slope": "-2",
            "score_linear_intercept": "22",
            "score_linear_x-lower-bound": "1"
        }
    },
    {
        "indexId": "internet-search-index",
        "displayName": "网络搜索指数",
        "parentIndexId": "spread-coverage",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "inventory-value",
        "displayName": "库存额",
        "parentIndexId": "channel-quality",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[50,100,500],\"intervalScore\":[100,80,50,20]}"
        }
    },
    {
        "indexId": "is-high-tech",
        "displayName": "是否为高新技术企业",
        "parentIndexId": "intellectual-property",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "legal-dispute-number",
        "displayName": "法律纠纷数量",
        "parentIndexId": "protect-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "宗",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,20],\"intervalScore\":[100,50,0]}"
        }
    },
    {
        "indexId": "london-international-award",
        "displayName": "伦敦广告节",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "100"
        }
    },
    {
        "indexId": "longxi-award",
        "displayName": "龙玺奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "main-business-revenue-growth-rate",
        "displayName": "主营业务收入增长率",
        "parentIndexId": "enterprise-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,5,15,25,35],\"intervalScore\":[0,20,40,60,80,100]}"
        }
    },
    {
        "indexId": "manage-power",
        "displayName": "管理力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "manage-score",
        "displayName": "管理力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "manage-power"
        }
    },
    {
        "indexId": "market-coverage",
        "displayName": "市场覆盖率",
        "parentIndexId": "market-share",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "market-international",
        "displayName": "国际影响力",
        "parentIndexId": "market-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "market-power",
        "displayName": "市场力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "market-premium",
        "displayName": "超值获利力",
        "parentIndexId": "market-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "market-score",
        "displayName": "市场力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "market-power"
        }
    },
    {
        "indexId": "market-share",
        "displayName": "市场占有力",
        "parentIndexId": "market-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "market-stable",
        "displayName": "市场稳定力",
        "parentIndexId": "market-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "marketing-award",
        "displayName": "品牌营销获奖次数",
        "parentIndexId": "spread-precision",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "innovation-ability",
        "displayName": "创新能力",
        "parentIndexId": "product-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "innovation-expense",
        "displayName": "创新支出",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,100,200,500],\"intervalScore\":[0,5,10,20,40]}"
        }
    },
    {
        "indexId": "intellectual-property",
        "displayName": "知识产权",
        "parentIndexId": "innovation-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "marketing-expense",
        "displayName": "实际营销投入",
        "parentIndexId": "spread-precision",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1000,5000,200000,500000,1000000,1500000],\"intervalScore\":[5,10,20,40,60,80,100]}"
        }
    },
    {
        "indexId": "media-article",
        "displayName": "媒体报道",
        "parentIndexId": "spread-coverage",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "media-channel",
        "displayName": "媒体渠道",
        "parentIndexId": "spread-coverage",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "mobile-internet-system-rate",
        "displayName": "企业移动互联网系统普及率",
        "parentIndexId": "organization-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[70,90],\"intervalScore\":[0,80,100]}"
        }
    },
    {
        "indexId": "negative-article-rate",
        "displayName": "媒体负面报道占报道总量比重",
        "parentIndexId": "public-relations",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[30,50],\"intervalScore\":[100,50,0]}"
        }
    },
    {
        "indexId": "new-york-festival-award",
        "displayName": "纽约广告奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "100"
        }
    },
    {
        "indexId": "official-media",
        "displayName": "官方媒体",
        "parentIndexId": "media-channel",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "100",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "official-media-article-number",
        "displayName": "官方媒体报道数",
        "parentIndexId": "media-article",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "则",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "40"
        }
    },
    {
        "indexId": "operation-manage",
        "displayName": "经营管理",
        "parentIndexId": "manage-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "organization-manage",
        "displayName": "组织管理",
        "parentIndexId": "manage-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "other-media",
        "displayName": "其他媒体",
        "parentIndexId": "media-channel",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "20",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "other-media-article-number",
        "displayName": "其他媒体报道数",
        "parentIndexId": "media-article",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "则",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "10"
        }
    },
    {
        "indexId": "overseas-sale-rate",
        "displayName": "品牌产品海外销售比例",
        "parentIndexId": "market-international",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,50,100],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "patent-applied",
        "displayName": "发明专利申请数",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "个",
        "annotations": {
            "score_type": "type",
            "score_step_score-definition": "{\"intervalSplit\":[0,3,5],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "patent-invest-over-100000",
        "displayName": "10万元R&D经费投入的发明专利申请量",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,5],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "patent-kind",
        "displayName": "专利类型数",
        "parentIndexId": "intellectual-property",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "patent-kind-design",
        "displayName": "外观设计专利量",
        "parentIndexId": "patent-kind",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "20"
        }
    },
    {
        "indexId": "patent-kind-invent",
        "displayName": "发明专利量",
        "parentIndexId": "patent-kind",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "50"
        }
    },
    {
        "indexId": "patent-kind-utility-model",
        "displayName": "实用新型专利量",
        "parentIndexId": "patent-kind",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "30"
        }
    },
    {
        "indexId": "pct-application",
        "displayName": "PCT国际专利申请量",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,5],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "produce-ability",
        "displayName": "生产能力",
        "parentIndexId": "product-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "product-level",
        "displayName": "产品技术水平",
        "parentIndexId": "produce-ability",
        "type": "enum",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"世界先进水平\":  100, \"国内先进水平\": 80, \"行业先进水平\": 60, \"其他\": 30}}"
        }
    },
    {
        "indexId": "product-power",
        "displayName": "产品力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "net-asset",
        "displayName": "净资产",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[800,1000],\"intervalScore\":[60,80,100]}"
        }
    },
    {
        "indexId": "net-asset-growth-rate",
        "displayName": "净资产增长率",
        "parentIndexId": "enterprise-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,5,15,25,35],\"intervalScore\":[0,20,40,60,80,100]}"
        }
    },
    {
        "indexId": "net-profit-growth-rate",
        "displayName": "净利润增长率",
        "parentIndexId": "sell-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "product-praise-number",
        "displayName": "商品好评量",
        "parentIndexId": "product-reputation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "条",
        "annotations": {
            "score_type": "score-ratio",
            "score_score-ratio_total-score": "100"
        }
    },
    {
        "indexId": "product-qualified-change-rate",
        "displayName": "产品合格变动率",
        "parentIndexId": "shareholders-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "product-reputation",
        "displayName": "产品口碑",
        "parentIndexId": "brand-favorite",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "product-score",
        "displayName": "产品力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "product-power"
        }
    },
    {
        "indexId": "profit-growth-rate",
        "displayName": "品牌销售利润增长率",
        "parentIndexId": "market-stable",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "public-relations-expense-rate",
        "displayName": "媒体公关费用占宣传费用比重",
        "parentIndexId": "public-relations",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[3,5],\"intervalScore\":[0,50,100]}"
        }
    },
    {
        "indexId": "public-welfare-relation",
        "displayName": "公益关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "rd-expense",
        "displayName": "研发经费",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,100,200,500],\"intervalScore\":[0,10,20,40,60]}"
        }
    },
    {
        "indexId": "rd-institution",
        "displayName": "研发机构数量",
        "parentIndexId": "produce-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "rd-institution-improve",
        "displayName": "研发机构-改进型数量",
        "parentIndexId": "rd-institution",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "rd-institution-independence",
        "displayName": "研发机构-自主型数量",
        "parentIndexId": "rd-institution",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "rd-institution-number",
        "displayName": "研究开发机构数量",
        "parentIndexId": "rd-organization-management",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "rd-institution-number-city",
        "displayName": "市级研究开发机构数量",
        "parentIndexId": "rd-institution-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "40"
        }
    },
    {
        "indexId": "rd-institution-number-country",
        "displayName": "国家级研究开发机构数量",
        "parentIndexId": "rd-institution-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "rd-institution-number-other",
        "displayName": "其他研究开发机构数量",
        "parentIndexId": "rd-institution-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "20"
        }
    },
    {
        "indexId": "rd-institution-number-province",
        "displayName": "省级研究开发机构数量",
        "parentIndexId": "rd-institution-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "60"
        }
    },
    {
        "indexId": "rd-institution-number-world",
        "displayName": "世界级研究开发机构数量",
        "parentIndexId": "rd-institution-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "100"
        }
    },
    {
        "indexId": "rd-institution-outside",
        "displayName": "研发机构-外围数量",
        "parentIndexId": "rd-institution",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "间",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "rd-investment",
        "displayName": "研发投入",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1000,2000],\"intervalScore\":[30,60,100]}"
        }
    },
    {
        "indexId": "rd-organization-management",
        "displayName": "研究开发组织管理水平",
        "parentIndexId": "innovation-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "rd-personnel-number",
        "displayName": "研发人员数量",
        "parentIndexId": "intellectual-property",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "名",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "40"
        }
    },
    {
        "indexId": "registered-asset",
        "displayName": "注册资本",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1000,5000],\"intervalScore\":[30,60,100]}"
        }
    },
    {
        "indexId": "relation-power",
        "displayName": "关系力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "profit-rate",
        "displayName": "品牌销售利润率",
        "parentIndexId": "market-premium",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "protect-ability",
        "displayName": "保护能力",
        "parentIndexId": "develop-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "public-relations",
        "displayName": "媒体公关",
        "parentIndexId": "protect-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "relation-score",
        "displayName": "关系力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "relation-power"
        }
    },
    {
        "indexId": "return-to-asset-rate",
        "displayName": "品牌资产报酬率",
        "parentIndexId": "market-premium",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "revenue-growth-rate",
        "displayName": "品牌销售收入增长率",
        "parentIndexId": "market-stable",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,30,50],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "roe",
        "displayName": "净资产收益率",
        "parentIndexId": "shareholders-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "roi-festival-award",
        "displayName": "金投奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "70"
        }
    },
    {
        "indexId": "self-media-number",
        "displayName": "自媒体账号数量",
        "parentIndexId": "self-media-operation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "个",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1],\"intervalScore\":[0,100]}"
        }
    },
    {
        "indexId": "self-media-operation",
        "displayName": "自媒体运营",
        "parentIndexId": "spread-precision",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "self-media-read-count",
        "displayName": "自媒体阅读量",
        "parentIndexId": "self-media-operation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "sell-growth",
        "displayName": "销售增长",
        "parentIndexId": "develop-growth",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "sell-growth-rate",
        "displayName": "销售同增率",
        "parentIndexId": "sell-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "sell-growth-rate-3-year",
        "displayName": "三年销售收入平均增长率",
        "parentIndexId": "sell-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "enum",
            "score_enum_score-definition": "{\"definition\":{\"高于行业平均\":100,\"低于行业平均且为正\":50,\"为负\":0}}"
        }
    },
    {
        "indexId": "share-growth-rate",
        "displayName": "股价增长率",
        "parentIndexId": "asset-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "shareholders-relation",
        "displayName": "股东关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "social-fan-number",
        "displayName": "社交类平台粉丝数量",
        "parentIndexId": "brand-fan-number",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "名",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "100"
        }
    },
    {
        "indexId": "social-relation",
        "displayName": "社会关系",
        "parentIndexId": "relation-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "spread-activity",
        "displayName": "品牌营销传播活动",
        "parentIndexId": "spread-precision",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "spread-coverage",
        "displayName": "传播广度",
        "parentIndexId": "spread-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "spread-power",
        "displayName": "传播力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "spread-precision",
        "displayName": "传播精度",
        "parentIndexId": "spread-power",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "spread-score",
        "displayName": "传播力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "spread-power"
        }
    },
    {
        "indexId": "store-praise-rate",
        "displayName": "店铺好评率",
        "parentIndexId": "product-reputation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "score-ratio",
            "score_score-ratio_total-score": "100"
        }
    },
    {
        "indexId": "tax-paid-rate",
        "displayName": "税款上缴率",
        "parentIndexId": "government-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[75,85,95],\"intervalScore\":[0,50,80,100]}"
        }
    },
    {
        "indexId": "tax-rate",
        "displayName": "资产纳税率",
        "parentIndexId": "government-relation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[75,85,95],\"intervalScore\":[0,50,80,100]}"
        }
    },
    {
        "indexId": "self-media",
        "displayName": "自媒体",
        "parentIndexId": "media-channel",
        "type": "bool",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {
            "score_type": "bool",
            "score_bool_true-score": "30",
            "score_bool_false-score": "0"
        }
    },
    {
        "indexId": "self-media-article-number",
        "displayName": "自媒体报道数",
        "parentIndexId": "media-article",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "则",
        "annotations": {
            "score_type": "ratio",
            "score_ratio_total-score": "20"
        }
    },
    {
        "indexId": "self-media-fan-count",
        "displayName": "自媒体粉丝数",
        "parentIndexId": "self-media-operation",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "名",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[20,50,100],\"intervalScore\":[30,70,80,100]}"
        }
    },
    {
        "indexId": "tiger-roar-award",
        "displayName": "虎啸奖",
        "parentIndexId": "marketing-award",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "次",
        "annotations": {
            "score_type": "multiply",
            "score_multiply_multiplier": "80"
        }
    },
    {
        "indexId": "total-asset",
        "displayName": "总资产",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[500,1000,2000],\"intervalScore\":[40,60,80,100]}"
        }
    },
    {
        "indexId": "total-asset-growth-rate",
        "displayName": "总资产增长率",
        "parentIndexId": "asset-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "total-asset-growth-rate-3-year",
        "displayName": "三年资产平均增长率",
        "parentIndexId": "asset-growth",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0, \"average\"],\"intervalScore\":[0, 50, 100]}"
        }
    },
    {
        "indexId": "total-export",
        "displayName": "品牌产品出口总额",
        "parentIndexId": "market-international",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,50,100],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "trademark-honor",
        "displayName": "企业已经获得的商标荣誉",
        "parentIndexId": "operation-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "个",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[100,300,500,1000],\"intervalScore\":[50,60,70,80,100]}"
        }
    },
    {
        "indexId": "training-expense",
        "displayName": "员工培训费用占当年总销售费用的比例",
        "parentIndexId": "organization-manage",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,8],\"intervalScore\":[30,50,80,100]}"
        }
    },
    {
        "indexId": "transform-in-3-year",
        "displayName": "三年内科技成果转化量",
        "parentIndexId": "transformation-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "项",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[1,3,5],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "transformation-ability",
        "displayName": "科技成果转化能力",
        "parentIndexId": "innovation-ability",
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "value-power",
        "displayName": "价值力",
        "parentIndexId": null,
        "type": "indices",
        "period": "year",
        "description": "",
        "unit": null,
        "annotations": {}
    },
    {
        "indexId": "value-score",
        "displayName": "价值力得分",
        "parentIndexId": "abstract",
        "type": "number",
        "period": "default",
        "description": "",
        "unit": "分",
        "annotations": {
            "score_score-index-for": "value-power"
        }
    },
    {
        "indexId": "total-export-profit-rate",
        "displayName": "品牌产品出口利润率",
        "parentIndexId": "market-international",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "%",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[10,50,100],\"intervalScore\":[10,50,80,100]}"
        }
    },
    {
        "indexId": "total-profit",
        "displayName": "利润总额",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[0,5000,10000],\"intervalScore\":[0,60,80,100]}"
        }
    },
    {
        "indexId": "total-revenue",
        "displayName": "营业总收入",
        "parentIndexId": "produce-ability",
        "type": "number",
        "period": "year",
        "description": "",
        "unit": "万元",
        "annotations": {
            "score_type": "step",
            "score_step_score-definition": "{\"intervalSplit\":[5000,10000],\"intervalScore\":[30,60,100]}"
        }
    }
];

export const ABrand = {
    "brandId": "5d27faaf830b32608a73d053",
    "brandName": "澳柯玛",
    "industry": "家电"
};

export const ABrandReport = {
    "reportId": null,
    "brandId": "5d27faaf830b32608a73d053",
    "year": 2018,
    "periodTimeNumber": 1,
    "period": "annual",
    "createTime": "2019-08-07T01:45:05.979+0000",
    "data": {
        "employee-average-salary": 0.7275402726146221,
        "golden-mouse-award": 0.0,
        "doctor-number": 1169.0,
        "annual-tv-show-support": 0.0,
        "net-profit-growth-rate": 1.359,
        "store-praise-rate": 0.9400000000000001,
        "global-fortune-500-rank": 0.0,
        "profit-growth-rate": 1.359,
        "china-content-marketing-awards": 0.0,
        "trademark-honor": 644.0,
        "marketing-expense": 1391659.0,
        "fixed-asset": 56813.0,
        "rd-institution-outside": 1.0,
        "training-expense": 0.05,
        "fixed-asset-new-rate": 0.5081591452072185,
        "transform-in-3-year": 5.0,
        "rd-expense": 11223.0,
        "industry-exhibition": "世界级",
        "franchise-store-number": 164.0,
        "inventory-value": 173.0,
        "social-fan-number": 56.0,
        "tax-paid-rate": 5.93776926759215,
        "has-manage-department": true,
        "other-media-article-number": 565.0,
        "official-media": 19.0,
        "patent-applied": 218.0,
        "rd-institution-number-city": 3.0,
        "industry-academia-research-other": 5.0,
        "innovation-expense": 6516.0,
        "employment-contribution": 3.6101917023015725E-6,
        "product-qualified-change-rate": 16.0,
        "enterprise-income-tax": 2477.0,
        "negative-article-rate": 0.38,
        "brand-media-article-number": 0.0,
        "industry-academia-research-world": 1.0,
        "has-standard": true,
        "donation": 1.0,
        "patent-kind-utility-model": 91.0,
        "rd-institution-number-other": 8.0,
        "overseas-sale-rate": 8.12,
        "manage-score": 990.0,
        "channel-offline-sales": 356.0,
        "environmental-protection-funds": 14.0,
        "business-area": "世界",
        "has-employee-training": true,
        "earning-per-share": 0.09,
        "main-business-revenue-growth-rate": 0.2109,
        "total-asset-growth-rate-3-year": 26.677633333333336,
        "share-growth-rate": 1.2499999999999998,
        "annual-team-support": 0.0,
        "has-company-culture": true,
        "china-500-rank": 0.0,
        "celebrity-expense": 1998.0,
        "sell-growth": 0.06387055567383436,
        "self-media-fan-count": 1184967.0,
        "business-kind-number": 2.0,
        "employee-senior-ratio": 0.24225526641883519,
        "government-fund": 96.0,
        "export-amount": 134663.0,
        "total-profit": 9976.0,
        "global-brand-500-rank": 0.0,
        "celebrity-number": 0.0,
        "has-mergers-and-acquisitions": true,
        "employee-hurt-rate": 0.0026332094175960346,
        "channel-online-sales-ratio": 0.91,
        "develop-score": 550.0,
        "cannes-lions": 2.0,
        "fixed-asset-rate": 0.11107374743151857,
        "net-asset-growth-rate": 0.0329,
        "roi-festival-award": 0.0,
        "has-publish-csr": true,
        "value-score": 1.7878803911281276E7,
        "total-export": 134663.0,
        "legal-dispute-number": 66.0,
        "net-asset": 201524.0,
        "tiger-roar-award": 0.0,
        "industry-academia-research-city": 3.0,
        "employee-above-bachelor-ratio": 0.19842007434944237,
        "total-asset-growth-rate": 0.0329,
        "employee-contract-rate": 0.6026951672862454,
        "advertising-expense": 3798.0,
        "annual-product-placement": 1.0,
        "interbrand-rank": 0.0,
        "self-media-article-number": 2174.0,
        "rd-institution-improve": 2.0,
        "total-revenue": 564516.0,
        "new-york-festival-award": 0.0,
        "rd-institution-number-province": 1.0,
        "mobileInternetSystemUniversalRate": 0.99,
        "return-to-asset-rate": 0.01366598304166854,
        "rd-institution-number-country": 0.0,
        "channel-offline-sales-ratio": 0.43,
        "self-media-read-count": 4693.0,
        "total-asset": 511489.0,
        "pct-application": 6.0,
        "advertising-level": "入选国品计划",
        "sell-growth-rate-3-year": 9.500300000000001,
        "patent-kind-invent": 64.0,
        "other-media": 21.0,
        "product-score": 2398.412146360397,
        "tax-rate": 0.04850153180224795,
        "longxi-award": 0.0,
        "employee-junior-ratio": 0.5593246592317225,
        "public-relations-expense-rate": 0.04,
        "patent-kind-design": 63.0,
        "is-high-tech": false,
        "patent-invest-over-100000": 3.0,
        "environmental-protection-fund-growth-rate": 3.6666666666666665,
        "industry-academia-research-province": 4.0,
        "self-media": 2.0,
        "revenue-growth-rate": 0.2109,
        "industry-academia-research-country": 0.0,
        "has-manage-expert": true,
        "registered-asset": 79918.0,
        "highest-government-award": "县级",
        "brand-award": 50.0,
        "advertising-area": "省",
        "rd-investment": 11223.0,
        "china-advertising-great-wall-awards": 0.0,
        "spread-score": 1484.963747108448,
        "environmental-protection-fund-rate": 2.4800005668572724E-5,
        "official-media-article-number": 448.0,
        "rd-institution-independence": 5.0,
        "channel-type": 15.0,
        "rd-institution-number-world": 0.0,
        "has-company-publication": true,
        "rd-personnel-number": 1171.0,
        "channel-online-sales-growth-rate": 0.66,
        "china-effie-award": 0.0,
        "product-praise-number": 178787.0,
        "channel-online-sales": 540.0,
        "london-international-award": 1.0,
        "computer-rate": 0.87,
        "annual-title-sponsor": 2.0,
        "baidu-index": 4431.9,
        "relation-score": 990.0,
        "brand-media": 0.0,
        "product-level": "国内先进水平",
        "roe": 0.0379,
        "direct-sale-store-number": 106.0,
        "market-score": 220.0,
        "has-social-accountability": true,
        "celebrity-level": "二线明星",
        "donation-rate": 1.771428976326623E-6,
        "has-publish-quality-credit-report": true,
        "brand-premium": 0.92,
        "china-4a": 1.0,
        "total-export-profit-rate": 11.04,
        "channel-cover-area": "村",
        "channel-score": 670.0,
        "brand-news-read-count": 8939.0,
        "channel-offline-sales-growth-rate": 0.5700000000000001,
        "market-coverage": 1.0,
        "annual-brand-support-number": 5.0,
        "profit-rate": 0.017671775467834393,
        "employee-salary-grow-rate": 0.06387055567383436
    }
};

export const AnIndustryStatistics = {
    "statId": null,
    "industry": "家电",
    "year": 2018,
    "periodTimeNumber": 1,
    "period": "annual",
    "total": 30,
    "stats": {
        "employee-average-salary": {
            "sum": 62.911192534288716,
            "average": 2.0970397511429573
        },
        "export-amount": {
            "sum": 3.9742965E7,
            "average": 1324765.5
        },
        "golden-mouse-award": {
            "sum": 16.0,
            "average": 0.5333333333333333
        },
        "total-profit": {
            "sum": 8471853.0,
            "average": 282395.1
        },
        "global-brand-500-rank": {
            "sum": 893.0,
            "average": 29.766666666666666
        },
        "celebrity-number": {
            "sum": 66.0,
            "average": 2.2
        },
        "doctor-number": {
            "sum": 38457.0,
            "average": 1281.9
        },
        "has-mergers-and-acquisitions": {
            "counts": {
                "false": 15,
                "true": 15
            }
        },
        "annual-tv-show-support": {
            "sum": 73.0,
            "average": 2.433333333333333
        },
        "employee-hurt-rate": {
            "sum": 0.17214818149369265,
            "average": 0.005738272716456422
        },
        "channel-online-sales-ratio": {
            "sum": 13.28,
            "average": 0.44266666666666665
        },
        "develop-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "cannes-lions": {
            "sum": 13.0,
            "average": 0.43333333333333335
        },
        "net-profit-growth-rate": {
            "sum": -19.623900000000003,
            "average": -0.6541300000000001
        },
        "fixed-asset-rate": {
            "sum": 4.0058775439128205,
            "average": 0.13352925146376068
        },
        "net-asset-growth-rate": {
            "sum": 2.0911,
            "average": 0.06970333333333333
        },
        "roi-festival-award": {
            "sum": 14.0,
            "average": 0.4666666666666667
        },
        "store-praise-rate": {
            "sum": 28.17,
            "average": 0.9390000000000001
        },
        "has-publish-csr": {
            "counts": {
                "false": 16,
                "true": 14
            }
        },
        "value-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "global-fortune-500-rank": {
            "sum": 822.0,
            "average": 27.4
        },
        "profit-growth-rate": {
            "sum": -19.623900000000003,
            "average": -0.6541300000000001
        },
        "total-export": {
            "sum": 3.9742965E7,
            "average": 1324765.5
        },
        "legal-dispute-number": {
            "sum": 6865.0,
            "average": 228.83333333333334
        },
        "china-content-marketing-awards": {
            "sum": 14.0,
            "average": 0.4666666666666667
        },
        "net-asset": {
            "sum": 4.185932E7,
            "average": 1395310.6666666667
        },
        "tiger-roar-award": {
            "sum": 13.0,
            "average": 0.43333333333333335
        },
        "industry-academia-research-city": {
            "sum": 87.0,
            "average": 2.9
        },
        "marketing-expense": {
            "sum": 2.9927126E7,
            "average": 997570.8666666667
        },
        "trademark-honor": {
            "sum": 25845.0,
            "average": 861.5
        },
        "employee-above-bachelor-ratio": {
            "sum": 5.867072049883023,
            "average": 0.1955690683294341
        },
        "total-asset-growth-rate": {
            "sum": 2.0911,
            "average": 0.06970333333333333
        },
        "employee-contract-rate": {
            "sum": 23.167121934627136,
            "average": 0.7722373978209045
        },
        "fixed-asset": {
            "sum": 1.2452065E7,
            "average": 415068.8333333333
        },
        "rd-institution-outside": {
            "sum": 68.0,
            "average": 2.2666666666666666
        },
        "advertising-expense": {
            "sum": 68727.0,
            "average": 2290.9
        },
        "training-expense": {
            "sum": 2.14,
            "average": 0.07133333333333333
        },
        "annual-product-placement": {
            "sum": 39.0,
            "average": 1.3
        },
        "fixed-asset-new-rate": {
            "sum": 18.43942761303229,
            "average": 0.6146475871010764
        },
        "transform-in-3-year": {
            "sum": 85.0,
            "average": 2.8333333333333335
        },
        "mobile-internet-system-rate": {
            "sum": 0.0,
            "average": "NaN"
        },
        "rd-expense": {
            "sum": 3174759.0,
            "average": 105825.3
        },
        "industry-exhibition": {
            "counts": {
                "世界级": 6,
                "其他": 5,
                "省市级": 8,
                "国家级": 11
            }
        },
        "franchise-store-number": {
            "sum": 10449.0,
            "average": 348.3
        },
        "interbrand-rank": {
            "sum": 91.0,
            "average": 3.033333333333333
        },
        "inventory-value": {
            "sum": 9527.0,
            "average": 317.56666666666666
        },
        "social-fan-number": {
            "sum": 7452.0,
            "average": 248.4
        },
        "self-media-article-number": {
            "sum": 57988.0,
            "average": 1932.9333333333334
        },
        "rd-institution-improve": {
            "sum": 70.0,
            "average": 2.3333333333333335
        },
        "tax-paid-rate": {
            "sum": 163.22750656119803,
            "average": 5.440916885373268
        },
        "total-revenue": {
            "sum": 1.05725779E8,
            "average": 3524192.6333333333
        },
        "new-york-festival-award": {
            "sum": 13.0,
            "average": 0.43333333333333335
        },
        "rd-institution-number-province": {
            "sum": 71.0,
            "average": 2.3666666666666667
        },
        "has-manage-department": {
            "counts": {
                "false": 0,
                "true": 30
            }
        },
        "return-to-asset-rate": {
            "sum": 1.2701350169123553,
            "average": 0.04233783389707851
        },
        "official-media": {
            "counts": {
                "false": 19,
                "true": 11
            }
        },
        "other-media-article-number": {
            "sum": 36051.0,
            "average": 1201.7
        },
        "rd-institution-number-country": {
            "sum": 46.0,
            "average": 1.5333333333333334
        },
        "patent-applied": {
            "sum": 4225.0,
            "average": 140.83333333333334
        },
        "channel-offline-sales-ratio": {
            "sum": 15.290000000000001,
            "average": 0.5096666666666667
        },
        "rd-institution-number-city": {
            "sum": 75.0,
            "average": 2.5
        },
        "self-media-read-count": {
            "sum": 89529.0,
            "average": 2984.3
        },
        "industry-academia-research-other": {
            "sum": 143.0,
            "average": 4.766666666666667
        },
        "total-asset": {
            "sum": 1.15470613E8,
            "average": 3849020.433333333
        },
        "pct-application": {
            "sum": 97.0,
            "average": 3.2333333333333334
        },
        "advertising-level": {
            "counts": {
                "无": 9,
                "入选国品计划": 21
            }
        },
        "innovation-expense": {
            "sum": 1248361.0,
            "average": 41612.03333333333
        },
        "employment-contribution": {
            "sum": 1.7921096556591166E-4,
            "average": 5.973698852197055E-6
        },
        "product-qualified-change-rate": {
            "sum": 42.922871661798276,
            "average": 1.4307623887266092
        },
        "enterprise-income-tax": {
            "sum": 1407068.0,
            "average": 46902.26666666667
        },
        "negative-article-rate": {
            "sum": 10.09,
            "average": 0.3363333333333333
        },
        "other-media": {
            "counts": {
                "false": 7,
                "true": 23
            }
        },
        "patent-kind-invent": {
            "sum": 1473.0,
            "average": 49.1
        },
        "sell-growth-rate-3-year": {
            "sum": 553.4796333333334,
            "average": 18.44932111111111
        },
        "product-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "brand-media-article-number": {
            "sum": 26279.0,
            "average": 875.9666666666667
        },
        "industry-academia-research-world": {
            "sum": 32.0,
            "average": 1.0666666666666667
        },
        "longxi-award": {
            "sum": 15.0,
            "average": 0.5
        },
        "tax-rate": {
            "sum": 1.4850535613417246,
            "average": 0.04950178537805749
        },
        "employee-junior-ratio": {
            "sum": 15.32004856193311,
            "average": 0.5106682853977703
        },
        "has-standard": {
            "counts": {
                "false": 14,
                "true": 16
            }
        },
        "public-relations-expense-rate": {
            "sum": 0.88,
            "average": 0.029333333333333333
        },
        "patent-kind-design": {
            "sum": 1392.0,
            "average": 46.4
        },
        "is-high-tech": {
            "counts": {
                "false": 13,
                "true": 17
            }
        },
        "patent-invest-over-100000": {
            "sum": 94.0,
            "average": 3.1333333333333333
        },
        "environmental-protection-fund-growth-rate": {
            "sum": 36.217054334554334,
            "average": 1.2072351444851444
        },
        "self-media": {
            "counts": {
                "false": 0,
                "true": 30
            }
        },
        "industry-academia-research-province": {
            "sum": 91.0,
            "average": 3.033333333333333
        },
        "revenue-growth-rate": {
            "sum": 3.3389,
            "average": 0.11129666666666667
        },
        "industry-academia-research-country": {
            "sum": 39.0,
            "average": 1.3
        },
        "has-manage-expert": {
            "counts": {
                "false": 0,
                "true": 30
            }
        },
        "registered-asset": {
            "sum": 6111113.0,
            "average": 203703.76666666666
        },
        "donation": {
            "sum": 374.0,
            "average": 12.466666666666667
        },
        "patent-kind-utility-model": {
            "sum": 1360.0,
            "average": 45.333333333333336
        },
        "highest-government-award": {
            "counts": {
                " ": 7,
                "无": 8,
                "县级": 7,
                "省级及以上": 3,
                "市级": 5
            }
        },
        "rd-institution-number-other": {
            "sum": 153.0,
            "average": 5.1
        },
        "sell-growth-rate": {
            "sum": 0.0,
            "average": "NaN"
        },
        "brand-award": {
            "sum": 766.0,
            "average": 25.533333333333335
        },
        "overseas-sale-rate": {
            "sum": 658.78,
            "average": 21.959333333333333
        },
        "advertising-area": {
            "counts": {
                "省": 8,
                "国际": 7,
                "市区": 8,
                "全国": 7
            }
        },
        "rd-investment": {
            "sum": 3174759.0,
            "average": 105825.3
        },
        "china-advertising-great-wall-awards": {
            "sum": 16.0,
            "average": 0.5333333333333333
        },
        "self-media-number": {
            "sum": 0.0,
            "average": "NaN"
        },
        "spread-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "environmental-protection-fund-rate": {
            "sum": 0.001699087444523781,
            "average": 5.66362481507927E-5
        },
        "official-media-article-number": {
            "sum": 4672.0,
            "average": 155.73333333333332
        },
        "manage-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "rd-institution-independence": {
            "sum": 88.0,
            "average": 2.933333333333333
        },
        "channel-type": {
            "sum": 216.0,
            "average": 7.2
        },
        "rd-institution-number-world": {
            "sum": 26.0,
            "average": 0.8666666666666667
        },
        "has-company-publication": {
            "counts": {
                "false": 7,
                "true": 23
            }
        },
        "rd-personnel-number": {
            "sum": 61152.0,
            "average": 2038.4
        },
        "channel-online-sales-growth-rate": {
            "sum": 14.92,
            "average": 0.49733333333333335
        },
        "china-effie-award": {
            "sum": 8.0,
            "average": 0.26666666666666666
        },
        "product-praise-number": {
            "sum": 8053823.0,
            "average": 268460.76666666666
        },
        "channel-online-sales": {
            "sum": 8734.0,
            "average": 291.1333333333333
        },
        "channel-offline-sales": {
            "sum": 13432.0,
            "average": 447.73333333333335
        },
        "environmental-protection-funds": {
            "sum": 368.0,
            "average": 12.266666666666667
        },
        "business-area": {
            "counts": {
                "国内": 7,
                "其他": 10,
                "世界": 13
            }
        },
        "has-employee-training": {
            "counts": {
                "false": 10,
                "true": 20
            }
        },
        "london-international-award": {
            "sum": 11.0,
            "average": 0.36666666666666664
        },
        "computer-rate": {
            "sum": 26.560000000000002,
            "average": 0.8853333333333334
        },
        "annual-title-sponsor": {
            "sum": 23.0,
            "average": 0.7666666666666667
        },
        "earning-per-share": {
            "sum": 22.26,
            "average": 0.7420000000000001
        },
        "baidu-index": {
            "sum": 91906.5,
            "average": 3063.55
        },
        "relation-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "brand-media": {
            "counts": {
                "false": 10,
                "true": 20
            }
        },
        "product-level": {
            "counts": {
                "国内先进水平": 10,
                "行业先进水平": 7,
                "其他": 8,
                "世界先进水平": 5
            }
        },
        "main-business-revenue-growth-rate": {
            "sum": 3.3389,
            "average": 0.11129666666666667
        },
        "roe": {
            "sum": 1.3115999999999999,
            "average": 0.043719999999999995
        },
        "direct-sale-store-number": {
            "sum": 4349.0,
            "average": 144.96666666666667
        },
        "total-asset-growth-rate-3-year": {
            "sum": 612.6103666666667,
            "average": 20.420345555555556
        },
        "market-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "has-social-accountability": {
            "counts": {
                "false": 17,
                "true": 13
            }
        },
        "celebrity-level": {
            "counts": {
                "行业精英": 8,
                "二线明星": 8,
                "其他": 9,
                "一线明星": 5
            }
        },
        "share-growth-rate": {
            "sum": -24.61215055681484,
            "average": -0.8204050185604946
        },
        "annual-team-support": {
            "sum": 22.0,
            "average": 0.7333333333333333
        },
        "has-company-culture": {
            "counts": {
                "false": 0,
                "true": 30
            }
        },
        "donation-rate": {
            "sum": 0.0015283450139388433,
            "average": 5.0944833797961446E-5
        },
        "has-publish-quality-credit-report": {
            "counts": {
                "false": 14,
                "true": 16
            }
        },
        "brand-premium": {
            "sum": 28.45,
            "average": 0.9483333333333334
        },
        "china-500-rank": {
            "sum": 744.0,
            "average": 24.8
        },
        "china-4a": {
            "sum": 10.0,
            "average": 0.3333333333333333
        },
        "celebrity-expense": {
            "sum": 43141.0,
            "average": 1438.0333333333333
        },
        "total-export-profit-rate": {
            "sum": 550.89,
            "average": 18.363
        },
        "self-media-fan-count": {
            "sum": 7.7550055E7,
            "average": 2585001.8333333335
        },
        "channel-cover-area": {
            "counts": {
                "村": 6,
                "省": 5,
                "市": 5,
                "大区": 5,
                "县": 9
            }
        },
        "channel-score": {
            "sum": 0.0,
            "average": "NaN"
        },
        "business-kind-number": {
            "sum": 76.0,
            "average": 2.533333333333333
        },
        "employee-senior-ratio": {
            "sum": 8.234840390969383,
            "average": 0.27449467969897945
        },
        "government-fund": {
            "sum": 1760.0,
            "average": 58.666666666666664
        },
        "brand-news-read-count": {
            "sum": 402693.0,
            "average": 13423.1
        },
        "annual-brand-support-number": {
            "sum": 91.0,
            "average": 3.033333333333333
        },
        "channel-offline-sales-growth-rate": {
            "sum": 16.27,
            "average": 0.5423333333333333
        },
        "market-coverage": {
            "sum": 28.46,
            "average": 0.9486666666666667
        },
        "employee-salary-grow-rate": {
            "sum": 0.5225209777270922,
            "average": 0.017417365924236407
        },
        "profit-rate": {
            "sum": 2.027730307135272,
            "average": 0.06759101023784239
        }
    }
};

export let ABrandReportComment = new BrandReportComment();
ABrandReportComment.overallComment = "这份报告做的非常好";
ABrandReportComment.userId = "wujunxian";
ABrandReportComment.dataComment = {
    "profit-rate": "利润率很高啊",
    "docker-number" : "博士真多",
    "employee-salary-grow-rate": "雇员工资长得飞快",
    "annual-brand-support-number": "赞助好多啊"
};
