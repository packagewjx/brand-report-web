import React from 'react';
import ContentWrapper from "../Layout/ContentWrapper";
import {Button, ButtonToolbar, FormControl, FormGroup, Table} from "react-bootstrap";
import StepWizard from 'react-step-wizard';
import {Brands} from "./ReportView/ReportData/brand";

class StepOne extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let yearComponents = [];
        let nextStepEnabled = false;

        for (let i = 0; i < this.props.years.length; i++) {
            yearComponents.push(
                // 顶部margin有问题，因此强制设置为0
                <label key={i} className="checkbox c-checkbox checkbox-inline" style={{marginTop: 0}}>
                    <FormControl checked={this.props.value[this.props.years[i]]} onChange={e => {
                        let newValue = {};
                        Object.assign(newValue, this.props.value);
                        newValue[this.props.years[i]] = e.target.checked;
                        this.props.onChange(newValue);
                    }} type="checkbox"/>
                    <em className="fa fa-check"/>{this.props.years[i]}
                </label>
            );
            nextStepEnabled = nextStepEnabled || this.props.value[this.props.years[i]];
        }

        return (
            <div>
                <h4>选择报告年份</h4>
                <FormGroup controlId={"year"}>
                    {yearComponents}
                </FormGroup>
                <ButtonToolbar className="pull-right">
                    <Button bsStyle="default" onClick={this.props.previousStep}>前一步</Button>
                    <Button bsStyle="primary" disabled={!nextStepEnabled} onClick={this.props.nextStep}>下一步</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

function StepTwo(props) {
    let industryComponents = [];
    let nextStepEnabled = false;

    for (let i = 0; i < props.industries.length; i++) {
        industryComponents.push(
            <label key={i} className="checkbox c-checkbox checkbox-inline" style={{marginTop: 0}}>
                <FormControl type="checkbox" checked={props.value[props.industries[i]]} onChange={e => {
                    props.value[props.industries[i]] = e.target.checked;
                    props.onChange(props.value);
                }}/>
                <em className="fa fa-check"/>{props.industries[i]}
            </label>
        );
        nextStepEnabled = nextStepEnabled || props.value[props.industries[i]]
    }

    return (
        <div>
            <h4>选择行业</h4>
            <FormGroup controlId={"industry"}>
                {industryComponents}
            </FormGroup>
            <ButtonToolbar className="pull-right">
                <Button bsStyle="default" onClick={props.previousStep}>前一步</Button>
                <Button bsStyle="primary" disabled={!nextStepEnabled} onClick={props.nextStep}>下一步</Button>
            </ButtonToolbar>
        </div>
    );
}

function StepThree(props) {
    let brandComponents = [];
    let finishButtonEnable = [];

    for (let i = 0; i < props.brands.length; i++) {
        if (!!props.selectedIndustries[props.brands[i].industry]) {
            brandComponents.push(
                <label key={i} className="checkbox c-checkbox checkbox-inline" style={{marginTop: 0}}>
                    <FormControl type="checkbox" checked={props.value[props.brands[i].brand]} onChange={e => {
                        props.value[props.brands[i].brand] = e.target.checked;
                        props.onChange(props.value);
                    }}/>
                    <em className="fa fa-check"/>{props.brands[i].brand}
                </label>
            );
            finishButtonEnable = finishButtonEnable || props.value[props.brand[i]];
        }
    }

    return (
        <div>
            <h4>选择品牌</h4>
            <FormGroup controlId={"brand"}>
                {brandComponents}
            </FormGroup>
            <ButtonToolbar className="pull-right">
                <Button bsStyle="default" onClick={props.previousStep}>前一步</Button>
                <Button bsStyle="primary" disabled={!finishButtonEnable} onClick={props.onComplete}>生成</Button>
            </ButtonToolbar>
        </div>
    )
}

/**
 *
 * @param {Array.<string>} strings 字符串数组
 */
function commaSplitString(strings) {
    let result = "";
    for (let i = 0; i < strings.length - 1; i++) {
        result += strings[i] + ', ';
    }
    result += strings[strings.length - 1];
    return result;
}

export default class ReportGenerate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            industries: [],
            brands: [],
            years: [],
            brandLoading: false,
            selectedYears: {},
            selectedBrands: {},
            selectedIndustries: {},
            reports: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // 硬编码值
        let state = {
            industries: ["家电"],
            brands: [],
            years: [2018],
        };

        for (let i = 1; i <= 30; i++) {
            state.brands.push({industry: '家电', brand: Brands[i]});
        }

        state.selectedYears = {};
        state.selectedIndustries = {};
        state.selectedBrands = {};

        for (let i = 0; i < state.years.length; i++) {
            state.selectedYears[state.years[i]] = false;
        }
        for (let i = 0; i < state.industries.length; i++) {
            state.selectedIndustries[state.industries[i]] = false;
        }
        for (let i = 0; i < state.brands.length; i++) {
            state.selectedBrands[state.brands[i].brand] = false;
        }

        // 填入假报告
        state.reports = [
            {reportId: 1, year: 2018, industries: ["家电"], brands: ["美的", "海尔", "TCL", "格力"]},
            {reportId: 2, year: 2018, industries: ["家电"], brands: ["美的", "海尔"]},
        ];

        this.setState(state);
    }

    handleSubmit() {
        $.notify('报告生成请求已提交，请耐心等候服务器处理', 'info');
    }

    render() {
        let self = this;

        let reportTableRows = [];
        for (let i = 0; i < this.state.reports.length; i++) {
            let report = this.state.reports[i];
            reportTableRows.push(
                <tr onClick={() => {
                    $.notify({status: 'info', message: '请稍等', timeout: 800});
                    setTimeout(() => {
                        this.props.history.push('report-view');
                    }, 1000);
                }} style={{cursor: 'pointer'}}>
                    <td>{report.reportId}</td>
                    <td>{report.year}</td>
                    <td>{commaSplitString(report.industries)}</td>
                    <td>{commaSplitString(report.brands)}</td>
                </tr>
            )
        }

        return (
            <ContentWrapper>
                <div className="panel panel-success">
                    <div className="panel-heading">生成报告</div>
                    <div className="panel-body">
                        <StepWizard>
                            <StepOne years={self.state.years} value={self.state.selectedYears} onChange={val => {
                                self.setState({selectedYears: val})
                            }}/>
                            <StepTwo industries={self.state.industries} value={self.state.selectedIndustries}
                                     onChange={val => {
                                         self.setState({selectedIndustries: val})
                                     }}/>
                            <StepThree brands={self.state.brands} selectedIndustries={self.state.selectedIndustries}
                                       value={self.state.selectedBrands} onChange={val => {
                                self.setState({selectedBrands: val})
                            }} onComplete={this.handleSubmit}/>
                        </StepWizard>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">报告列表</div>
                    <div className="panel-body">
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>年份</th>
                                <th>行业</th>
                                <th>品牌</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportTableRows}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </ContentWrapper>
        );
    }

}
