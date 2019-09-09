import React from "react";
import PropTypes from "prop-types";
import Index from "../Model/Index";
import {ChartSetting} from "../Report/IndustryReport/ChartSetting";
import {
    BooleanScoreIndexAnnotations,
    EnumScoreIndexAnnotations,
    getScoreAnnotationFromIndex,
    LinearScoreIndexAnnotations,
    MultiplyScoreIndexAnnotations,
    RatioScoreIndexAnnotations,
    ScoreIndexAnnotations,
    ScoreRatioScoreIndexAnnotations,
    ScoreStoreIndexAnnotations,
    setScoreAnnotationToIndex,
    StepScoreIndexAnnotations
} from "../Model/IndexAnnotations/ScoreAnnotations";
import ExtendedFormGroup from "./ExtendedFormGroup";
import StepScoreDefinitionEditor from "./StepScoreDefinitionEditor";
import EnumScoreDefinitionEditor from "./EnumScoreDefinitionEditor";
import {FormGroup, FormText, Input} from 'reactstrap';

const TypeDisplayName = {
    number: "数字",
    indices: "指标集合",
    enum: "枚举型",
    string: "字符串"
};

const PeriodDisplayName = {
    annual: "年度",
    monthly: "月度",
    quarterly: "季度",
    default: "缺省"
};

const scoreTypeDisplayName = {
    "enum": "枚举计分指标",
    "ratio": "比例计分指标",
    "linear": "线性计分指标",
    "step": "阶梯计分指标",
    "bool": "布尔值计分指标",
    "score-ratio": "总值比例计分指标",
    "multiply": "乘数计分指标",
    "store": "分数存储指标",
    "null": "无"
};

const chartTypeDisplayName = {
    [ChartSetting.TYPE_DEFAULT]: "自动选择",
    [ChartSetting.TYPE_PIE]: "饼图",
    [ChartSetting.TYPE_RADAR]: "雷达图",
    [ChartSetting.TYPE_SINGLE_BAR]: "条形图",
    [ChartSetting.TYPE_STACK_BAR]: "堆叠条形图",
    [ChartSetting.TYPE_TABLE]: "表格"
};

export default class IndexForm extends React.Component {
    static propTypes = {
        index: PropTypes.instanceOf(Index).isRequired,
        onChange: PropTypes.func.isRequired,
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        enableEdit: PropTypes.bool,
        newIndex: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.changeAnnotation = this.changeAnnotation.bind(this);
    }


    static typeOptions = (
        <>
            <option value="number">数字</option>
            <option value="enum">枚举型</option>
            <option value="indices">指标集合</option>
            <option value="string">字符串</option>
        </>
    );

    static periodOptions = (
        <>
            <option value="default">默认</option>
            <option value="annual">年度</option>
            <option value="monthly">月度</option>
            <option value="quarterly">季度</option>
        </>
    );

    static chartTypeOptions = (
        <>
            <option value={ChartSetting.TYPE_DEFAULT}>{chartTypeDisplayName[ChartSetting.TYPE_DEFAULT]}</option>
            <option value={ChartSetting.TYPE_SINGLE_BAR}>{chartTypeDisplayName[ChartSetting.TYPE_SINGLE_BAR]}</option>
            <option value={ChartSetting.TYPE_STACK_BAR}>{chartTypeDisplayName[ChartSetting.TYPE_STACK_BAR]}</option>
            <option value={ChartSetting.TYPE_TABLE}>{chartTypeDisplayName[ChartSetting.TYPE_TABLE]}</option>
            <option value={ChartSetting.TYPE_RADAR}>{chartTypeDisplayName[ChartSetting.TYPE_RADAR]}</option>
            <option value={ChartSetting.TYPE_PIE}>{chartTypeDisplayName[ChartSetting.TYPE_PIE]}</option>
        </>
    );

    static scoreTypeOptions = (
        <>
            <option value="enum">{scoreTypeDisplayName.enum}</option>
            <option value="ratio">{scoreTypeDisplayName.ratio}</option>
            <option value="linear">{scoreTypeDisplayName.linear}</option>
            <option value="step">{scoreTypeDisplayName.step}</option>
            <option value="bool">{scoreTypeDisplayName.bool}</option>
            <option value="score-ratio">{scoreTypeDisplayName["score-ratio"]}</option>
            <option value="multiply">{scoreTypeDisplayName.multiply}</option>
            <option value="store">{scoreTypeDisplayName.store}</option>
        </>
    );

    changeScoreType(type, event) {
        if (event.target.value === type) {
            return
        }
        switch (event.target.value) {
            case "store":
                setScoreAnnotationToIndex(this.props.index, ScoreStoreIndexAnnotations.getDefault());
                break;
            case "ratio":
                setScoreAnnotationToIndex(this.props.index, RatioScoreIndexAnnotations.getDefault());
                break;
            case "enum":
                setScoreAnnotationToIndex(this.props.index, EnumScoreIndexAnnotations.getDefault());
                break;
            case "bool":
                setScoreAnnotationToIndex(this.props.index, BooleanScoreIndexAnnotations.getDefault());
                break;
            case "step":
                setScoreAnnotationToIndex(this.props.index, StepScoreIndexAnnotations.getDefault());
                break;
            case "multiply":
                setScoreAnnotationToIndex(this.props.index, MultiplyScoreIndexAnnotations.getDefault());
                break;
            case "score-ratio":
                setScoreAnnotationToIndex(this.props.index, ScoreRatioScoreIndexAnnotations.getDefault());
                break;
            case "linear":
                setScoreAnnotationToIndex(this.props.index, LinearScoreIndexAnnotations.getDefault());
                break;
            case "null":
                // 清除
                let scoreAnnotationFromIndex = getScoreAnnotationFromIndex(this.props.index);
                Object.keys(scoreAnnotationFromIndex).forEach(key => delete this.props.index.annotations[key]);
                break;
            default:
                console.warn(event.target.value + "值无效")
        }
        this.props.onChange(this.props.index);
    }

    changeAnnotation(name, isCheckBox, event) {
        this.props.index.annotations[name] = isCheckBox ? (event.target.checked ? "true" : "false") : event.target.value;
        this.props.onChange(this.props.index);
    }

    _getScoreFormGroups(scoreAnnotation) {
        let type = undefined;
        if (scoreAnnotation instanceof ScoreStoreIndexAnnotations) {
            type = "store";
        } else if (scoreAnnotation instanceof ScoreIndexAnnotations) {
            type = scoreAnnotation.score_type;
        }

        let indexOptions = [];
        for (let i = 0; i < this.props.indices.length; i++) {
            let index = this.props.indices[i];
            indexOptions.push(
                <option key={index.indexId} value={index.indexId}>
                    {index.displayName}
                </option>
            )
        }

        let typeSelect = (
            <ExtendedFormGroup key="type" value={type} onChange={this.changeScoreType.bind(this, type)} type="select"
                               label="计分类型" editorShow={this.props.enableEdit}
                               valueDisplayName={val => scoreTypeDisplayName[val]}>
                <option value="null">无</option>
                {IndexForm.scoreTypeOptions}
            </ExtendedFormGroup>
        );
        let scoreForm = [typeSelect];
        if (scoreAnnotation instanceof ScoreStoreIndexAnnotations) {
            scoreForm.push(
                <ExtendedFormGroup key={"store"}
                                   onChange={this.changeAnnotation.bind(this, "score_score-index-for", false)}
                                   type="select" value={scoreAnnotation["score_score-index-for"]}
                                   label="计分根指标" editorShow={this.props.enableEdit}
                                   tooltip="计分根指标的所有下级指标的总分，将会加和存储到本指标的值中"
                                   valueDisplayName={(val) => {
                                       for (let i = 0; i < this.props.indices; i++) {
                                           if (this.props.indices[i].indexId === val) {
                                               return this.props.indices[i].displayName;
                                           }
                                       }
                                       return val;
                                   }}>
                    <option value={""}>请选择</option>
                    {indexOptions}
                </ExtendedFormGroup>
            );
        } else if (scoreAnnotation instanceof BooleanScoreIndexAnnotations) {
            scoreForm.push(
                <React.Fragment key="bool">
                    <ExtendedFormGroup onChange={this.changeAnnotation.bind(this, "score_bool_true-score", false)}
                                       type="number" value={scoreAnnotation["score_bool_true-score"]} label="true分数"
                                       editorShow={this.props.enableEdit}/>
                    <ExtendedFormGroup onChange={this.changeAnnotation.bind(this, "score_bool_false-score", false)}
                                       type="number" value={scoreAnnotation["score_bool_false-score"]} label="false分数"
                                       editorShow={this.props.enableEdit}/>
                </React.Fragment>
            )
        } else if (scoreAnnotation instanceof StepScoreIndexAnnotations) {
            scoreForm.push(
                <React.Fragment key="step">
                    <div className="checkbox c-checkbox">
                        <label>
                            <Input type="checkbox"
                                   checked={"true" === scoreAnnotation["score_step_lower-bound-exclusive"]}
                                   onChange={this.changeAnnotation.bind(this, "score_step_lower-bound-exclusive", true)}
                                   disabled={!this.props.enableEdit}/>
                            <span className="fa fa-check"/>区间不包含下界
                        </label>
                    </div>
                    <StepScoreDefinitionEditor editorShow={this.props.enableEdit}
                                               definition={scoreAnnotation.definition}
                                               lowerBoundExclusive={"true" === scoreAnnotation["score_step_lower-bound-exclusive"]}
                                               onChange={(definition) => {
                                                   this.props.index.annotations["score_step_score-definition"] = JSON.stringify(definition);
                                                   this.props.onChange(this.props.index);
                                               }}/>
                </React.Fragment>
            )
        } else if (scoreAnnotation instanceof EnumScoreIndexAnnotations) {
            scoreForm.push(
                <EnumScoreDefinitionEditor key="enum" definition={scoreAnnotation.definition}
                                           editorShow={this.props.enableEdit}
                                           onChange={(definition) => {
                                               this.props.index.annotations["score_enum_score-definition"] = JSON.stringify(definition);
                                               this.props.onChange(this.props.index);
                                           }}/>
            )
        } else if (scoreAnnotation instanceof LinearScoreIndexAnnotations) {
            scoreForm.push(
                <React.Fragment key="linear">
                    <ExtendedFormGroup label="斜率" value={scoreAnnotation.score_linear_slope} type="number"
                                       onChange={this.changeAnnotation.bind(this, "score_linear_slope", false)}
                                       editorShow={this.props.enableEdit}/>
                    <ExtendedFormGroup label="截距" value={scoreAnnotation.score_linear_intercept} type="number"
                                       onChange={this.changeAnnotation.bind(this, "score_linear_intercept", false)}
                                       editorShow={this.props.enableEdit}/>
                    <ExtendedFormGroup label="上界" helpText="包含本值" editorShow={this.props.enableEdit}
                                       value={scoreAnnotation["score_linear_x-upper-bound"]}
                                       type="number"
                                       onChange={this.changeAnnotation.bind(this, "score_linear_x-upper-bound", false)}/>
                    <ExtendedFormGroup label="下界" helpText="包含本值" editorShow={this.props.enableEdit}
                                       value={scoreAnnotation["score_linear_x-lower-bound"]}
                                       type="number"
                                       onChange={this.changeAnnotation.bind(this, "score_linear_x-lower-bound", false)}/>
                </React.Fragment>
            )
        } else if (scoreAnnotation instanceof MultiplyScoreIndexAnnotations) {
            scoreForm.push(
                <ExtendedFormGroup key="multiply" label="基准分" value={scoreAnnotation["score_multiply_multiplier"]}
                                   editorShow={this.props.enableEdit} type="number" tooltip="基准分乘以指标的值则为得分"
                                   onChange={this.changeAnnotation.bind(this, "score_multiply_multiplier", false)}/>
            )
        } else if (scoreAnnotation instanceof RatioScoreIndexAnnotations) {
            scoreForm.push(
                <ExtendedFormGroup key="ratio" label="总分" tooltip="若比值为1（百分比则为100%），则获得满分，否则将比值乘以总分得到最后得分
                                    整个行业的总值对应的分数，一个品牌指标值的占比乘以总分就是得分" editorShow={this.props.enableEdit}
                                   value={scoreAnnotation["score_ratio_total-score"]}
                                   onChange={this.changeAnnotation.bind(this, "score_ratio_total-score", false)}/>
            )
        } else if (scoreAnnotation instanceof ScoreRatioScoreIndexAnnotations) {
            scoreForm.push(
                <ExtendedFormGroup key="score-ratio" label="总分" tooltip="整个行业的总值对应的分数，一个品牌指标值的占比乘以总分就是得分"
                                   value={scoreAnnotation["score_score-ratio_total-score"]}
                                   editorShow={this.props.enableEdit}
                                   onChange={this.changeAnnotation.bind(this, "score_score-ratio_total-score")}/>
            )
        }

        return scoreForm;
    }

    render() {
        let index = this.props.index;
        let scoreAnnotation = getScoreAnnotationFromIndex(index);
        let scoreFormGroup = this._getScoreFormGroups(scoreAnnotation);

        return (
            <form className="index-form">
                <h4>基本设置</h4>
                <ExtendedFormGroup label="指标ID" editorShow={this.props.enableEdit} value={index.indexId}
                                   inputDisabled={!this.props.newIndex} onChange={e => {
                    index.indexId = e.target.value;
                    this.props.onChange(index);
                }}/>
                <ExtendedFormGroup label="显示名" value={index.displayName} onChange={(e) => {
                    index.displayName = e.target.value;
                    this.props.onChange(index);
                }} editorShow={this.props.enableEdit} type="text"/>
                <ExtendedFormGroup label="上级指标ID" editorShow={this.props.enableEdit} helpText="请在指标树中更改"
                                   inputDisabled={true}
                                   value={index.parentIndexId === null ? "根指标" : index.parentIndexId}/>
                <ExtendedFormGroup label="指标描述" value={index.description} editorShow={this.props.enableEdit}
                                   onChange={(e) => {
                                       index.description = e.target.value;
                                       this.props.onChange(index);
                                   }}/>
                <ExtendedFormGroup label="数据类型" value={index.type} editorShow={this.props.enableEdit}
                                   onChange={(e) => {
                                       index.type = e.target.value;
                                       this.props.onChange(index)
                                   }} type="select" valueDisplayName={val => TypeDisplayName[val]}>
                    <option value={undefined}>请选择</option>
                    {IndexForm.typeOptions}
                </ExtendedFormGroup>
                <ExtendedFormGroup label="统计周期" value={index.period} editorShow={this.props.enableEdit}
                                   onChange={e => {
                                       index.period = e.target.value;
                                       this.props.onChange(index)
                                   }} type="select" valueDisplayName={val => PeriodDisplayName[val]}>
                    <option value={undefined}>请选择</option>
                    {IndexForm.periodOptions}
                </ExtendedFormGroup>
                <ExtendedFormGroup label="单位" value={index.unit === null ? "" : index.unit}
                                   onChange={(e) => {
                                       index.unit = e.target.value;
                                       this.props.onChange(index)
                                   }}
                                   editorShow={this.props.enableEdit && this.props.index.type !== Index.TYPE_INDICES}/>
                <h4>统计设置</h4>
                <FormGroup>
                    <div className="checkbox c-checkbox">
                        <label>
                            <Input type="checkbox" checked={"true" === index.annotations["statistics_no-count"]}
                                   onChange={this.changeAnnotation.bind(this, "statistics_no-count", true)}
                                   disabled={!this.props.enableEdit}/>
                            <span className="fa fa-check"/>不纳入统计
                        </label>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="checkbox c-checkbox">
                        <label>
                            <Input type="checkbox" checked={"true" === index.annotations["statistics_null-as-zero"]}
                                   onChange={this.changeAnnotation.bind(this, "statistics_null-as-zero", true)}
                                   disabled={!this.props.enableEdit}/>
                            <span className="fa fa-check"/>空值为0
                        </label>
                    </div>
                </FormGroup>
                {Index.TYPE_INDICES === this.props.index.type ? null :
                    <>
                        <h4>计分设置</h4>
                        {scoreFormGroup}
                    </>
                }
                <h4>绘图设置</h4>
                <FormGroup>
                    <div className="checkbox c-checkbox">
                        <label>
                            <Input type="checkbox" checked={"true" === index.annotations["chart_disable"]}
                                   onChange={this.changeAnnotation.bind(this, "chart_disable", true)}
                                   disabled={!this.props.enableEdit}
                            />
                            <span className="fa fa-check"/>不绘制图表
                        </label>
                    </div>
                </FormGroup>
                {
                    "true" === index.annotations["chart_disable"] ? null :
                        <>
                            <ExtendedFormGroup label="绘图类型" value={index.annotations.chart_type}
                                               onChange={this.changeAnnotation.bind(this, "chart_type", false)}
                                               type="select" editorShow={this.props.enableEdit}
                                               defaultValue={ChartSetting.TYPE_DEFAULT}
                                               valueDisplayName={(val) => chartTypeDisplayName[val]}>
                                {IndexForm.chartTypeOptions}
                            </ExtendedFormGroup>
                            <FormGroup disabled={!this.props.enableEdit}>
                                <div className="checkbox c-checkbox">
                                    <label>
                                        <Input type="checkbox"
                                               checked={"true" === index.annotations["chart_draw-all-sub-index"]}
                                               onChange={this.changeAnnotation.bind(this, "chart_draw-all-sub-index", true)}
                                               disabled={!this.props.enableEdit}/>
                                        <span className="fa fa-check"/>绘制子指标总图
                                    </label>
                                </div>
                                <FormText>
                                    将子指标的集合起来，绘制到一个图中。<br/>
                                    仅支持雷达图、堆叠条形图、表格
                                </FormText>
                            </FormGroup>
                            <FormGroup disabled={!this.props.enableEdit}>
                                <div className="checkbox c-checkbox">
                                    <label>
                                        <Input type="checkbox"
                                               checked={"true" === index.annotations["chart_disable-sub-index-graph"]}
                                               onChange={this.changeAnnotation.bind(this, "chart_disable-sub-index-graph", true)}
                                               disabled={!this.props.enableEdit}/>
                                        <span className="fa fa-check"/>不绘制子指标图表
                                    </label>
                                </div>
                                <FormText>
                                    若启用，则不会绘制本指标树下子指标的图表
                                </FormText>
                            </FormGroup>
                            <ExtendedFormGroup label="指标颜色"
                                               value={index.annotations["chart_colors"]}
                                               editorShow={this.props.enableEdit}
                                               onChange={this.changeAnnotation.bind(this, "chart_colors", false)}
                            />
                            <ExtendedFormGroup label="宽高比例" value={index.annotations["chart_aspect-ratio"]}
                                               type="number" editorShow={this.props.enableEdit}
                                               onChange={this.changeAnnotation.bind(this, "chart_aspect-ratio", false)}/>
                        </>
                }
            </form>
        );
    }
}
