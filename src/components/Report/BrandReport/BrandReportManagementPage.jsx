import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import BrandReportTable from "./BrandReportTable";
import PropTypes from 'prop-types';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Card,
    CardBody,
    FormFeedback,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap'
import {faClipboardList, faEye, faPlus, faSync, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Brand from "../../Model/Brand";
import ApiClient from "../../Utils/ApiClient";
import $ from 'jquery';

export default class BrandReportManagementPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggleBuildModal = this.toggleBuildModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.state = {
            buildModal: false,
            brands: [],
            deleteModal: false,
            deleteReport: undefined,
        };

        this.tableApi = {};
    }

    toggleBuildModal() {
        this.setState({buildModal: !this.state.buildModal})
    }

    onDeleteButtonClick(row) {
        this.setState({
            deleteReport: row.original,
            deleteModal: true
        });
    }

    deleteBrandReport() {
        this.setState({deleteModal: false});
        ApiClient.delete("brand-report", this.state.deleteReport.reportId)
            .then((response) => {
                toast("删除成功", {type: "success", autoClose: 3000});
                this.fetchData(this.props.arg);
                this.setState({
                    deleteReport: undefined,
                });
            })
            .catch((status, xhr, err) => {
                toast("删除失败", {type: "success"});
                this.setState({
                    deleteReport: undefined,
                });
            })
    }

    toggleDeleteModal() {
        this.setState({deleteModal: !this.state.deleteModal})
    }

    onConfirmBuild(arg) {
        let url = process.env.REACT_APP_BACKEND_BASE_URL + "/brand-report";
        this.toggleBuildModal();
        toast("正在构建报告，请稍候", {autoClose: 2000});
        $.ajax({
            url: url,
            data: {
                build: true,
                "brand-id": arg.brandId,
                "period": arg.period,
                "period-time-number": arg.periodTimeNumber,
                "year": arg.year
            },
            method: "GET"
        }).done((value, status, xhr) => {
            ApiClient.insert("brand-report", value)
                .then(() => {
                    toast("构建成功，刷新以查看新报告", {type: "success", position: "top-right", autoClose: 2000});
                })
                .catch((status, xhr, err) => {
                    console.log(err);
                    toast("报告保存失败")
                });
        }).fail((xhr, status, err) => {
            console.log(err);
            toast("构建请求失败", {type: "danger", position: "top-right"});
        });
    }

    componentDidMount() {
        // 获取品牌列表
        ApiClient.getAll('brand')
            .then((response) => {
                let brands = [];
                let brandMap = {};
                for (let i = 0; i < response.length; i++) {
                    let brand = Brand.fromJson(response[i]);
                    brands.push(brand);
                    brandMap[brand.brandId] = brand;
                }
                this.setState({brands: brands, brandMap: brandMap})
            })
            .catch((xhr, status, err) => {
                console.log(xhr, status, err);
            });
    }

    render() {
        let additionalColumn = [
            {
                Header: "操作",
                Cell: row => <OperationButtons row={row} onDeleteButtonClick={this.onDeleteButtonClick.bind(this)}/>
            }
        ];

        return (
            <ContentWrapper>
                <h3>品牌报告管理</h3>
                <Card>
                    <CardBody>
                        {/*构建报告按钮与对话框*/}
                        <Button title="创建报告" onClick={this.toggleBuildModal}>
                            <span className="fa-layers fa-fw fa-2x">
                                <FontAwesomeIcon icon={faClipboardList} transform="left-4"/>
                                <FontAwesomeIcon icon={faPlus} transform="shrink-6 right-8"/>
                            </span>
                        </Button>
                        <BuildReportModal display={this.state.buildModal} toggleModal={this.toggleBuildModal}
                                          brands={this.state.brands} onSubmit={this.onConfirmBuild.bind(this)}/>
                        {' '}
                        <Button title="刷新" onClick={() => {
                            this.tableApi.refresh()
                        }}>
                            <FontAwesomeIcon fixedWidth size="2x" icon={faSync}/>
                        </Button>
                        <p/>
                        {/*品牌报告表*/}
                        <BrandReportTable api={this.tableApi} additionalColumn={additionalColumn}/>
                        <ToastContainer/>
                    </CardBody>
                </Card>
                {/*删除窗口*/}
                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                    <ModalBody>
                        {typeof this.state.deleteReport !== "undefined" ?
                            "确定要删除" + this.state.brandMap[this.state.deleteReport.brandId].brandName
                            + "在" + BrandReportTable.getTime(this.state.deleteReport)
                            + "的品牌报告(ID:" + this.state.deleteReport.brandId + ")吗？"
                            : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteBrandReport.bind(this)}>是</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteModal}>否</Button>
                    </ModalFooter>
                </Modal>
                {/*删除窗口结束*/}
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

// 操作按钮
class OperationButtons extends React.Component {
    static propTypes = {
        onDeleteButtonClick: PropTypes.func,
        row: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        let viewLink = {
            pathname: "/brand-report/" + this.props.row.original.reportId,
            state: {
                brandReport: this.props.row.original
            }
        };

        return (
            <span>
                <Link to={viewLink}>
                    <Button title="查看报告">
                        <FontAwesomeIcon icon={faEye}/>
                    </Button>
                </Link>
                <Button title="删除报告" onClick={() => {
                    this.props.onDeleteButtonClick(this.props.row);
                }}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </span>
        );
    }
}
