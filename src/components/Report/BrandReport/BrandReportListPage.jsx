import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import BrandReportTable from "./BrandReportTable";
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    FormFeedback
} from 'reactstrap'
import Brand from "../../Model/Brand";
import ApiClient from "../../Utils/ApiClient";

export default class BrandReportListPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modal: false,
            brands: []
        }
    }

    toggleModal() {
        this.setState({modal: !this.state.modal})
    }

    onConfirmBuild(arg) {
        console.log(arg);
        this.setState({modal: false})
    }

    componentDidMount() {
        // 获取品牌列表
        ApiClient.getAll('brand').done((response, status) => {
            if (status === 'success') {
                this.setState({brands: response})
            }
        });
    }

    render() {
        return (
            <ContentWrapper>
                <h3>品牌报告管理</h3>
                <Card>
                    <CardBody>
                        {/*构建报告按钮与对话框*/}
                        <Button onClick={this.toggleModal}>
                            构建报告
                        </Button>
                        <BuildReportModal display={this.state.modal} toggleModal={this.toggleModal}
                                          brands={this.state.brands} onSubmit={this.onConfirmBuild.bind(this)}/>
                        {' '}
                        <Button>
                            刷新
                        </Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <BrandReportTable/>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
}


class BuildReportModal extends React.Component {
    static propTypes = {
        // 控制是否能够选择品牌
        selectBrand: PropTypes.bool,
        onSubmit: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        display: PropTypes.bool,
        // 所有品牌，以显示品牌名，获取品牌ID
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand))
    };

    static defaultProps = {
        selectBrand: true,
        display: false,
        brands: [],
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            brandId: undefined,
            year: undefined,
            period: "annual",
            periodTimeNumber: 1,
            errors: {
                brandId: '',
                year: '',
            }
        }
    }

    handleChange(event) {
        let {name, value} = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "brandId":
                if (typeof value === "undefined") {
                    errors.brandId = "品牌不能为空"
                } else {
                    errors.brandId = "";
                }
                break;
            case "year":
                if (typeof value === "undefined") {
                    errors.year = "年份不能为空"
                } else if (value % 1 !== 0) {
                    errors.year = "年份应为整数";
                } else {
                    errors.year = "";
                }
                break;
        }
        this.setState({error: errors, [name]: value, dirty: true})
    }

    onSubmit() {
        let valid = true;
        for (let name in this.state.errors) {
            if (this.state.errors.hasOwnProperty(name)) {
                this.handleChange({target: {name: name, value: this.state[name]}});
            }
        }
        Object.values(this.state.errors).forEach((value => {
            valid = value.length <= 0
        }));

        if (valid) {
            this.props.onSubmit({
                brandId: this.state.brandId,
                year: this.state.year,
                period: this.state.period,
                periodTimeNumber: this.state.periodTimeNumber
            });
        }
    }

    render() {
        // 时间选项，根据period的值来确定
        let timeOptions = {
            "monthly": [
                <option value={1}>一月</option>,
                <option value={2}>二月</option>,
                <option value={3}>三月</option>,
                <option value={4}>四月</option>,
                <option value={5}>五月</option>,
                <option value={6}>六月</option>,
                <option value={7}>七月</option>,
                <option value={8}>八月</option>,
                <option value={9}>九月</option>,
                <option value={10}>十月</option>,
                <option value={11}>十一月</option>,
                <option value={12}>十二月</option>,
            ],
            "quarterly": [
                <option value={1}>第一季度</option>,
                <option value={2}>第二季度</option>,
                <option value={3}>第三季度</option>,
                <option value={4}>第四季度</option>,
            ]
        };

        // 品牌选项
        let brandOptions = [];
        for (let i = 0; i < this.props.brands.length; i++) {
            brandOptions.push(
                <option key={i} value={this.props.brands[i].brandId}>{this.props.brands[i].brandName}</option>
            )
        }

        let errors = this.state.errors;
        return (
            <Modal isOpen={this.props.display} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>构建报告</ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            <label>选择品牌</label>
                            <Input type="select" name="brandId" className="custom-select" value={this.state.brandId}
                                   onChange={this.handleChange} invalid={errors.brandId.length > 0}>
                                <option>请选择品牌</option>
                                {brandOptions}
                            </Input>
                            <FormFeedback>{errors.brandId}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <label>报告年份</label>
                            <Input name="year" type="number" value={this.state.year}
                                   onChange={this.handleChange} invalid={errors.year.length > 0}/>
                            <FormFeedback>{errors.year}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <label>统计时长</label>
                            <Input type="select" name="period" className="custom-select" value={this.state.period}
                                   onChange={this.handleChange}>
                                <option value="annual">年度</option>
                                <option value="monthly">月度</option>
                                <option value="quarterly">季度</option>
                            </Input>
                        </FormGroup>
                        {this.state.period !== "annual" ?
                            <FormGroup>
                                <label>时间</label>
                                <Input type="select" name="periodTimeNumber" className="custom-select"
                                       value={this.state.periodTimeNumber} onChange={this.handleChange}>
                                    {timeOptions[this.state.period]}
                                </Input>
                            </FormGroup>
                            : null}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit.bind(this)}>构建</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleModal}>取消</Button>
                </ModalFooter>
            </Modal>
        );
    }

}
