import React from "react";
import PropTypes from "prop-types";
import {StepScoreDefinition} from "../Model/IndexAnnotations/ScoreAnnotations";
import {InfoTooltip} from "../Utils/InfoTooltip";
import {Button, Col, FormText, Input, Row} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

export default class StepScoreDefinitionEditor extends React.Component {
    static propTypes = {
        editorShow: PropTypes.bool,
        definition: PropTypes.instanceOf(StepScoreDefinition),
        lowerBoundExclusive: PropTypes.bool,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            intervalStart: "",
            intervalEnd: "",
            addError: '',
            hasDynamicVar: false,
            dynamicSplit: "",
        };

    }

    static getDerivedStateFromProps(props, state) {
        for (let i = 0; i < props.definition.intervalSplit.length; i++) {
            if (isNaN(parseInt(props.definition.intervalSplit[i]))) {
                return {
                    hasDynamicVar: true
                }
            }
        }
        return {hasDynamicVar: false};
    }

    addNumericInterval() {
        let split = this.props.definition.intervalSplit;
        let score = this.props.definition.intervalScore;
        if (this.state.intervalStart === "" || this.state.intervalEnd === "") {
            this.setState({addError: "不能有空值"});
            return;
        }
        if (split.length === 0) {
            split = [this.state.intervalStart, this.state.intervalEnd];
            score = [0, 0, 0];
        } else {
            let a = parseFloat(this.state.intervalStart);
            let b = parseFloat(this.state.intervalEnd);
            if (a >= b) {
                this.setState({addError: "区间值错误，前一个值必须小于后一个"});
                return;
            }

            for (let i = 0; i < split.length; i++) {
                let v = parseFloat(split[i]);
                if (a === v) {
                    if (i === split.length - 1) {
                        // 若是最后一个，则直接加入b
                        split.push(b);
                        score.push(0);
                    } else {
                        // 不是的话，则查看下一个数的情况
                        let next = parseFloat(split[i + 1]);
                        if (next === b) {
                            this.setState({addError: "已有相同区间，请重新输入"});
                            return
                        } else if (next < b) {
                            // [a, b]区间与[v(a), next]有交集，因此是错误的
                            this.setState({addError: "与区间(" + v + ", " + next + ")有交集，请重新输入"});
                            return
                        } else /*next > b*/ {
                            split.splice(i + 1, 0, b);
                            score.splice(i + 1, 0, 0);
                        }
                    }
                    break;
                } else if (a < v) {
                    if (b === v) {
                        split.splice(i, 0, a);
                        score.splice(i, 0, 0);
                    } else if (b > v) {
                        this.setState({addError: "与区间(" + (i > 1 ? split[i - 1] : "-∞") + ", " + v + ")有交集，请重新输入"});
                        return;
                    } else /*b < v*/ {
                        split.splice(i, 0, a, b);
                        score.splice(i, 0, 0, 0);
                    }
                    break;
                }
            }
        }

        this.props.definition.intervalSplit = split;
        this.props.definition.intervalScore = score;
        this.props.onChange(this.props.definition);
        this.setState({intervalStart: "", intervalEnd: "", addError: ""});
    }


    render() {
        let definition = this.props.definition;
        if (this.state.hasDynamicVar) {
            let split = definition.intervalSplit;
            let score = definition.intervalScore;
            let splitRow = [];
            let scoreRow = [];
            if (this.props.editorShow) {
                for (let i = 0; i < split.length; i++) {
                    splitRow.push(
                        <Row key={i}>
                            <Col xs={9}>
                                <Input value={split[i]} onChange={e => {
                                    split[i] = e.target.value;
                                    this.props.onChange(definition);
                                }}/>
                            </Col>
                            <Col xs={3}>
                                <Button color="danger" title="删除区间值" onClick={() => {
                                    split.splice(i, 1);
                                    score.splice(score.length - 1, 1);
                                    this.props.onChange(definition);
                                }}>
                                    <FontAwesomeIcon icon={faMinus}/>
                                </Button>
                            </Col>
                        </Row>
                    );
                }
                splitRow.push(
                    <Row key="last">
                        <Col xs={9}>
                            <Input value={this.state.dynamicSplit} onChange={e => {
                                this.setState({dynamicSplit: e.target.value})
                            }}/>
                        </Col>
                        <Col xs={3}>
                            <Button color="success" title="增加区间值" onClick={() => {
                                split.push(this.state.dynamicSplit);
                                score.push(0);
                                this.props.onChange(definition);
                                this.setState({dynamicSplit: ""})
                            }}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </Col>
                    </Row>
                );


                for (let i = 0; i < score.length; i++) {
                    scoreRow.push(
                        <Row key={i}>
                            <Col>
                                <Input value={score[i]} onChange={e => {
                                    score[i] = e.target.value;
                                    this.props.onChange(definition);
                                }}/>
                            </Col>
                        </Row>
                    )
                }
            } else {
                splitRow = (
                    <span>{JSON.stringify(split)}</span>
                );
                scoreRow = (
                    <span>{JSON.stringify(score)}</span>
                );
            }


            return (
                <>
                    <Row>
                        <Col xs={4}>
                            区间分界值
                            <InfoTooltip>
                                这是将[-∞, +∞]区间划分为多个计分区间的一系列值
                            </InfoTooltip>
                        </Col>
                        <Col>
                            {splitRow}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>区间分数</Col>
                        <Col>
                            {scoreRow}
                        </Col>
                    </Row>
                    {this.props.editorShow ?
                        <Row>
                            <Col xs={{size: 4, offset: 4}}>
                                <Button color="danger" onClick={() => {
                                    this.setState({hasDynamicVar: false});
                                    this.props.onChange(new StepScoreDefinition());
                                }}>
                                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                                    切换分数区间
                                </Button>
                            </Col>
                        </Row>
                        : null}

                </>
            );


        } else {
            let interval = [];
            if (definition.intervalScore.length > 0 && definition.intervalSplit.length > 0) {
                if (this.props.lowerBoundExclusive) {
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
            }

            let rows = [];
            for (let i = 0; i < interval.length - 1; i++) {
                rows.push(
                    <Row key={i}>
                        <Col xs={5}>{interval[i]}</Col>
                        <Col xs={4}>
                            {this.props.editorShow ?
                                <Input value={definition.intervalScore[i]} type="number" onChange={e => {
                                    definition.intervalScore[i] = e.target.value;
                                    this.props.onChange(definition);
                                }}/>
                                : definition.intervalScore[i]}
                        </Col>
                        {this.props.editorShow ?
                            <Col xs={{size: 1, offset: 1}}>
                                <Button color="danger" size="xs" title="删除区间"
                                        onClick={() => {
                                            definition.intervalScore.splice(i, 1);
                                            definition.intervalSplit.splice(i, 1);
                                            this.props.onChange(definition);
                                        }}>
                                    <FontAwesomeIcon icon={faMinus}/>
                                </Button>
                            </Col>
                            : null}
                    </Row>
                )
            }
            if (interval.length > 0) {
                rows.push(
                    <Row key={interval.length - 1}>
                        <Col xs={5}>{interval[interval.length - 1]}</Col>
                        <Col xs={4}>
                            {this.props.editorShow ?
                                <Input value={definition.intervalScore[interval.length - 1]} type="number"
                                       onChange={e => {
                                           definition.intervalScore[interval.length - 1] = e.target.value;
                                           this.props.onChange(definition);
                                       }}/>
                                : definition.intervalScore[interval.length - 1]}
                        </Col>
                    </Row>
                );
            }

            return (
                <>
                    <Row>
                        <Col xs={3}>区间定义</Col>
                        <Col>
                            <Row>
                                <Col xs={5}>区间</Col>
                                <Col>分数</Col>
                            </Row>
                            {rows}
                            {this.props.editorShow ?
                                <>
                                    <Row>
                                        <Col xs={1} style={{margin: "auto"}}>起始</Col>
                                        <Col xs={4}>
                                            <Input value={this.state.intervalStart} type="number"
                                                   onChange={e => this.setState({intervalStart: e.target.value})}/>
                                        </Col>
                                        <Col xs={1} style={{margin: "auto"}}>终止</Col>
                                        <Col xs={4}>
                                            <Input value={this.state.intervalEnd} type="number"
                                                   onChange={e => this.setState({intervalEnd: e.target.value})}/>
                                        </Col>
                                        <Col style={{margin: "auto"}}>
                                            <Button color="success" size="xs" title="添加区间"
                                                    onClick={this.addNumericInterval.bind(this)}>
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span className="text-danger">{this.state.addError}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button color="danger" onClick={e => {
                                                this.setState({hasDynamicVar: true});
                                                this.props.onChange(new StepScoreDefinition());
                                            }}>
                                                <FontAwesomeIcon icon={faExclamationTriangle}/>
                                                切换动态区间</Button>
                                            <FormText>动态区间包含特殊的由系统计算出来的数值，如行业平均值。此操作将将重设区间，请慎重切换</FormText>
                                        </Col>
                                    </Row>
                                </>
                                : null}
                        </Col>
                    </Row>
                </>
            );
        }
    }
}
