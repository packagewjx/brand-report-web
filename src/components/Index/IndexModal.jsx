import React from "react";
import PropTypes from "prop-types";
import Index from "../Model/Index";
import {
    BooleanScoreIndexAnnotations,
    EnumScoreIndexAnnotations,
    getScoreAnnotationFromIndex,
    LinearScoreIndexAnnotations,
    MultiplyScoreIndexAnnotations,
    RatioScoreIndexAnnotations,
    ScoreRatioScoreIndexAnnotations,
    ScoreStoreIndexAnnotations,
    StepScoreIndexAnnotations
} from "../Model/IndexAnnotations/ScoreAnnotations";
import StatisticsAnnotations from "../Model/IndexAnnotations/StatisticsAnnotations";
import {InfoTooltip} from "../Utils/InfoTooltip";
import {Button, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap'


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
    "store": "分数存储指标"
};

export class IndexModal extends React.Component {
    static propTypes = {
        index: PropTypes.instanceOf(Index),
        toggle: PropTypes.func,
        onChange: PropTypes.func,
        isOpen: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            indexDraft: undefined,
            prevOpen: false,
            enableEdit: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.prevOpen && props.isOpen) {
            // 打开时候
            return {
                enableEdit: false,
                prevOpen: true,
                indexDraft: Index.fromJson(JSON.parse(JSON.stringify(props.index)))
            }
        } else if (state.prevOpen && !props.isOpen) {
            // 关闭时候
            return {
                enableEdit: false,
                prevOpen: false,
                indexDraft: undefined
            }
        }
        return null;
    }

    static _getScoreDisplayElement(scoreAnnotation) {
        let scoreDisplayElement = <span>未设置</span>;
        if (scoreAnnotation !== null) {
            if (scoreAnnotation instanceof ScoreStoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.store}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                计分根指标
                                <InfoTooltip>
                                    计分根指标的所有下级指标的总分，将会加和存储到本指标的值中
                                </InfoTooltip>
                            </Col>
                            <Col>{scoreAnnotation["score_score-index-for"]}</Col>
                        </Row>
                    </>
                );
            } else if (scoreAnnotation instanceof BooleanScoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.bool}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>true分数</Col>
                            <Col>{scoreAnnotation["score_bool_true-score"]}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>false分数</Col>
                            <Col>{scoreAnnotation["score_bool_false-score"]}</Col>
                        </Row>
                    </>
                );
            } else if (scoreAnnotation instanceof StepScoreIndexAnnotations) {
                // 区间定义
                let definition = scoreAnnotation.definition;
                let interval = [];
                if ("true" === scoreAnnotation["score_step_lower-bound-exclusive"]) {
                    interval.push("(-∞, " + definition.intervalSplit[0] + ")");
                    for (let i = 0; i < definition.intervalSplit.length - 1; i++) {
                        interval.push("[" + definition.intervalSplit[i] + ", " + definition.intervalSplit[i + 1] + ")");
                    }
                    interval.push("[" + definition.intervalSplit[definition.intervalSplit.length - 1] + ", +∞)");
                } else {
                    interval.push("(-∞, " + definition.intervalSplit[0] + "]");
                    for (let i = 0; i < definition.intervalSplit.length - 1; i++) {
                        interval.push("(" + definition.intervalSplit[i] + ", " + definition.intervalSplit[i + 1] + "]");
                    }
                    interval.push("(" + definition.intervalSplit[definition.intervalSplit.length - 1] + ", +∞)");
                }
                let rows = [];
                for (let i = 0; i < interval.length; i++) {
                    rows.push(
                        <Row key={i}>
                            <Col xs={6}>{interval[i]}</Col>
                            <Col>{definition.intervalScore[i]}</Col>
                        </Row>
                    )
                }

                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.step}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>区间定义</Col>
                            <Col>
                                <Row>
                                    <Col xs={6}>区间</Col>
                                    <Col>分数</Col>
                                </Row>
                                {rows}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>是否包含下界</Col>
                            <Col>{scoreAnnotation["score_step_lower-bound-exclusive"]}</Col>
                        </Row>
                    </>
                )
            } else if (scoreAnnotation instanceof EnumScoreIndexAnnotations) {
                let definition = scoreAnnotation.definition;
                let rows = [];
                definition.definition.forEach((value, key) => {
                    rows.push(
                        <Row key={key}>
                            <Col xs={6}>{key}</Col>
                            <Col>{value}</Col>
                        </Row>
                    )
                });

                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.enum}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>值分数定义</Col>
                            <Col>
                                <Row>
                                    <Col xs={6}>值</Col>
                                    <Col>分数</Col>
                                </Row>
                                {rows}
                            </Col>
                        </Row>
                    </>
                )
            } else if (scoreAnnotation instanceof RatioScoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.ratio}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                总分
                                <InfoTooltip>
                                    若比值为1（百分比则为100%），则获得满分，否则将比值乘以总分得到最后得分
                                    整个行业的总值对应的分数，一个品牌指标值的占比乘以总分就是得分
                                </InfoTooltip>
                            </Col>
                            <Col>{scoreAnnotation["score_ratio_total-score"]}</Col>
                        </Row>
                    </>
                )
            } else if (scoreAnnotation instanceof MultiplyScoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.multiply}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                基准分
                                <InfoTooltip>
                                    基准分乘以指标的值则为得分
                                </InfoTooltip>
                            </Col>
                            <Col>{scoreAnnotation["score_multiply_multiplier"]}</Col>
                        </Row>
                    </>
                )
            } else if (scoreAnnotation instanceof ScoreRatioScoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName["score-ratio"]}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                总分
                                <InfoTooltip>
                                    整个行业的总值对应的分数，一个品牌指标值的占比乘以总分就是得分
                                </InfoTooltip>
                            </Col>
                            <Col>{scoreAnnotation["score_score-ratio_total-score"]}</Col>
                        </Row>
                    </>
                )
            } else if (scoreAnnotation instanceof LinearScoreIndexAnnotations) {
                scoreDisplayElement = (
                    <>
                        <Row>
                            <Col xs={3}>类型</Col>
                            <Col>{scoreTypeDisplayName.linear}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>斜率</Col>
                            <Col>{scoreAnnotation["score_linear_slope"]}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>截距</Col>
                            <Col>{scoreAnnotation["score_linear_intercept"]}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>上界</Col>
                            <Col>{scoreAnnotation["score_linear_x-upper-bound"] ? scoreAnnotation["score_linear_x-upper-bound"] : "未指定"}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>下界</Col>
                            <Col>{scoreAnnotation["score_linear_x-lower-bound"] ? scoreAnnotation["score_linear_x-lower-bound"] : "未指定"}</Col>
                        </Row>
                    </>
                )
            }

        }

        console.log(scoreAnnotation);
        return scoreDisplayElement;
    }

    render() {
        let index = this.props.index;
        if (index === null || !this.props.isOpen) {
            return null;
        }
        let statAnnotation = StatisticsAnnotations.fromIndex(index);
        let scoreAnnotation = getScoreAnnotationFromIndex(index);
        let scoreDisplayElement = IndexModal._getScoreDisplayElement(scoreAnnotation);

        let displayElement = (
            <>
                <h4>基本属性</h4>
                <Row>
                    <Col xs={3}>指标ID</Col>
                    <Col xs={9}>{index.indexId}</Col>
                </Row>
                <Row>
                    <Col xs={3}>显示名</Col>
                    <Col xs={9}>{index.displayName}</Col>
                </Row>
                <Row>
                    <Col xs={3}>上级指标ID</Col>
                    <Col xs={9}>{index.parentIndexId === null ? "根指标" : index.parentIndexId}</Col>
                </Row>
                <Row>
                    <Col xs={3}>指标描述</Col>
                    <Col
                        xs={9}>{index.description === null || typeof index.description === "undefined" || index.description.length === 0
                        ? "(空)" : index.description}</Col>
                </Row>
                <Row>
                    <Col xs={3}>数据类型</Col>
                    <Col xs={9}>{TypeDisplayName[index.type]}</Col>
                </Row>
                <Row>
                    <Col xs={3}>统计周期</Col>
                    <Col xs={9}>{PeriodDisplayName[index.period]}</Col>
                </Row>
                <Row>
                    <Col xs={3}>单位</Col>
                    <Col xs={9}>{index.unit}</Col>
                </Row>
                <h4>统计设置</h4>
                <Row>
                    <Col xs={3}>
                        不纳入统计
                        <InfoTooltip>
                            是否在进行行业统计时，纳入本指标的统计。<br/>
                            若设置值（最低级）类型指标，则该值不进行统计。若设置中间等级指标，则其下级指标均不列入统计。
                        </InfoTooltip>
                    </Col>
                    <Col xs={9}>{"true" === statAnnotation["statistics_no-count"] ? "是" : "否"}</Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        空值为0
                        <InfoTooltip>
                            若是，当值为null或没有值的时候，认为该值是0，纳入到统计当中。若否，则不计入统计。
                        </InfoTooltip>
                    </Col>
                    <Col xs={9}>{"true" === statAnnotation["statistics_null-as-zero"] ? "是" : "否"}</Col>
                </Row>
                <h4>计分设置</h4>
                {scoreDisplayElement}
                <h4>绘图设置</h4>
            </>
        );

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}> {index.displayName}指标详情</ModalHeader>
                <ModalBody>
                    {this.state.enableEdit ?
                        <IndexEditForm index={this.state.indexDraft}/> :
                        displayElement}
                </ModalBody>
                <ModalFooter>
                    {this.state.enableEdit ?
                        <>
                            <Button color="primary">保存</Button>
                            <Button color="warning" onClick={() => {
                                this.setState({
                                    enableEdit: false,
                                    indexDraft: Index.fromJson(JSON.parse(JSON.stringify(this.props.index)))
                                })
                            }}>取消</Button>
                        </>
                        :
                        <Button color="warning"
                                onClick={() => this.setState({enableEdit: true})}>编辑</Button>
                    }
                    {' '}
                    <Button color="secondary" onClick={this.props.toggle}>关闭</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class IndexEditForm extends React.Component {
    static propTypes = {
        index: PropTypes.instanceOf(Index)
    };

    render() {
        let index = this.props.index;
        return (
            <form>
                <FormGroup>
                    <label>指标ID</label>
                    <Input disabled={true} value={index.indexId}/>
                </FormGroup>
                <FormGroup>
                    <label>显示名</label>
                    <Input type="password" placeholder="Password"/>
                </FormGroup>
                <div className="checkbox c-checkbox">
                    <label>
                        <Input type="checkbox" defaultChecked=""/>
                        <span className="fa fa-times"></span>Check me out</label>
                </div>
                <button className="btn btn-sm btn-secondary" type="submit">Submit</button>
            </form>
        )
    }

}
