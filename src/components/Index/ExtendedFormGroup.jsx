import React from "react";
import PropTypes from "prop-types";
import {InfoTooltip} from "../Utils/InfoTooltip";
import {Col, FormGroup, FormText, Input, Row} from 'reactstrap';

export default class ExtendedFormGroup extends React.Component {
    static propTypes = {
        /**
         * 传递给到Input的onChange函数
         * @type {function(Event)}
         */
        onChange: PropTypes.func,
        inputDisabled: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.any,
        label: PropTypes.string.isRequired,
        editorShow: PropTypes.bool,
        tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
        helpText: PropTypes.string,
        valueDisplayName: PropTypes.func,
        defaultValue: PropTypes.any
    };

    static defaultProps = {
        inputDisabled: false,
        editorShow: false,
        type: "text",
        valueDisplayName: val => val,
        defaultValue: undefined
    };

    constructor(props) {
        super(props);
    }

    render() {
        let valueDisplayName = this.props.valueDisplayName(this.props.value);
        return (this.props.editorShow ?
                <FormGroup>
                    <label>
                        {this.props.label}
                        {this.props.tooltip ?
                            <InfoTooltip>
                                {this.props.tooltip}
                            </InfoTooltip>
                            : null}
                    </label>
                    <Input type={this.props.type} onChange={this.props.onChange} value={this.props.value}
                           disabled={this.props.inputDisabled} defaultValue={this.props.defaultValue}>
                        {this.props.children}
                    </Input>
                    {this.props.helpText ?
                        <FormText>{this.props.helpText}</FormText>
                        : null
                    }
                </FormGroup>
                :
                <>
                    <Row>
                        <Col xs={3}>
                            {this.props.label}
                            {this.props.tooltip ?
                                <InfoTooltip>
                                    {this.props.tooltip}
                                </InfoTooltip>
                                : null}
                        </Col>
                        <Col>
                            {valueDisplayName ? valueDisplayName : "未设置"}
                        </Col>
                    </Row>
                </>
        );
    }
}
