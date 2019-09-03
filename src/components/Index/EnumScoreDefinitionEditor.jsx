import React from "react";
import PropTypes from "prop-types";
import {EnumScoreDefinition} from "../Model/IndexAnnotations/ScoreAnnotations";
import {Button, Col, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

export default class EnumScoreDefinitionEditor extends React.Component {
    static propTypes = {
        definition: PropTypes.instanceOf(EnumScoreDefinition),
        editorShow: PropTypes.bool,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            newKey: "",
            newScore: "",
            addError: "",
        }
    }

    addPair() {
        if (this.state.newKey.length === 0 || this.state.newScore.length === 0) {
            this.setState({addError: "不能有空"});
            return;
        }

        let definition = this.props.definition.definition;
        definition[this.state.newKey] = parseFloat(this.state.newScore);
        this.props.onChange(this.props.definition);
        this.setState({newKey: "", newScore: "", addError: ""});
    }

    render() {
        let definition = this.props.definition;
        let enumRow = [];
        Object.keys(definition.definition).forEach(key => {
            enumRow.push(
                <Row key={key}>
                    <Col xs={6} style={{margin: "auto 0"}}>
                        {key}
                    </Col>
                    <Col xs={3} style={{margin: "auto 0"}}>
                        {definition.definition[key]}
                    </Col>
                    {this.props.editorShow ?
                        <Col xs={3}>
                            <Button color="danger" title="删除" onClick={() => {
                                delete definition.definition[key];
                                this.props.onChange(definition);
                            }}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                        </Col>
                        : null}
                </Row>
            )
        });

        return (
            <Row>
                <Col xs={3}>
                    分数定义
                </Col>
                <Col>
                    <Row>
                        <Col xs={6}>
                            值
                        </Col>
                        <Col>
                            分数
                        </Col>
                    </Row>
                    {enumRow}
                    {this.props.editorShow ?
                        <Row>
                            <Col xs={6}>
                                <Input value={this.state.newKey}
                                       onChange={e => this.setState({newKey: e.target.value})}/>
                            </Col>
                            <Col xs={3}>
                                <Input value={this.state.newScore} type="number"
                                       onChange={e => this.setState({newScore: e.target.value})}/>
                            </Col>
                            <Col xs={3}>
                                <Button color="success" onClick={this.addPair.bind(this)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </Col>
                        </Row>
                        : null
                    }

                    {this.state.addError.length > 0 ?
                        <Row>
                            <Col>
                                <span className="text-danger">{this.state.addError}</span>
                            </Col>
                        </Row>
                        : null}
                </Col>
            </Row>
        );
    }
}
