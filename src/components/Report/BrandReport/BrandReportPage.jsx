import React from 'react'
import Brand from "../../Model/Brand";
import BrandReport from "../../Model/BrandReport";
import IndustryStatistics from "../../Model/IndustryStatistics";
import BrandReportViewer from "./BrandReportViewer";
import PropTypes from 'prop-types';
import BrandReportComment from "../../Model/BrandReportComment";
import ApiClient from "../../Utils/ApiClient";
import {toast, ToastContainer} from 'react-toastify';
import Index from "../../Model/Index";
import {withRouter} from 'react-router-dom';
import {getCurrentUserId} from "../../Utils/UserUtils";

/**
 * 处理参数与网络请求的品牌报告页
 *
 * 有两种方式传入报告，第一是通过react router的location的state的brandReport传入，第二是通过props传入，或者通过设置id，来获取
 * 报告
 */
class BrandReportPage extends React.Component {
    static propTypes = {
        brandReport: PropTypes.instanceOf(BrandReport),
        reportId: PropTypes.string,
    };

    static defaultProps = {
        brandReport: null,
        reportId: "",
    };

    constructor(props) {
        super(props);

        this.state = {
            brand: new Brand(),
            brandReport: new BrandReport(),
            indices: [],
            comments: [],
            industryStatistics: new IndustryStatistics(),
            loading: true
        };
    }

    componentDidMount() {
        // 若成功，返回brandReport
        // 若失败，则返回status, xhr, err
        let reportPromise = new Promise((resolve, reject) => {
            // 获取报告顺序：props, location.state.brandReport, props.reportId, location.match.params.id
            if (this.props.brandReport !== null) {
                resolve(this.props.brandReport);
            } else if (typeof this.props.location.state !== "undefined" && typeof this.props.location.state.brandReport !== "undefined") {
                resolve(this.props.location.state.brandReport);
            } else {
                let id = "";
                if (typeof this.props.reportId !== "undefined" && this.props.reportId !== "") {
                    id = this.props.reportId;
                } else if (typeof this.props.match.params.id !== "undefined" && this.props.match.params.id !== "") {
                    id = this.props.match.params.id;
                } else {
                    toast("参数错误", {type: "error"});
                    reject();
                }
                ApiClient.get("brand-report", id)
                    .then((brandReport) => {
                        resolve(brandReport);
                    })
                    .catch((status, xhr, err) => {
                        toast("获取报告失败", {type: "error"});
                        console.error(status, xhr, err);
                        reject(status, xhr, err);
                    });
            }
        });

        reportPromise
            .then((report) => {
                report = BrandReport.fromJson(report);
                let result = {
                    indices: [],
                    brand: new Brand(),
                    industryStatistics: new IndustryStatistics(),
                    comments: [],
                };
                // 获取指标，品牌，行业统计，与评论数据
                let indexPromise = ApiClient.getAll("index")
                    .then((response) => {
                        let indices = [];
                        for (let i = 0; i < response.length; i++) {
                            indices.push(Index.fromJson(response[i]));
                        }
                        result.indices = indices;
                    });

                let brandPromise = ApiClient.get("brand", report.brandId)
                    .then((brand) => {
                        brand = Brand.fromJson(brand);
                        result.brand = brand;
                        return brand;
                    })
                    .catch((status, xhr, err) => {
                        toast("获取品牌信息失败", {type: "error"});
                        console.log(status, xhr, err);
                    })
                    .then((brand) => {
                        // 有了品牌之后才能获取行业统计
                        let example = new IndustryStatistics();
                        example.industry = brand.industry;
                        example.total = undefined;
                        example.period = report.period;
                        example.periodTimeNumber = report.periodTimeNumber;
                        example.year = report.year;
                        return ApiClient.getAllByExample("industry-statistics", example)
                    })
                    .then((response) => {
                        if (response.length > 0) {
                            result.industryStatistics = IndustryStatistics.fromJson(response[0]);
                        }
                    })
                    .catch((status, xhr, err) => {
                        toast("获取行业数据失败", {type: "error"});
                        console.error(status, xhr, err);
                    });

                let commentExample = new BrandReportComment();
                commentExample.brandReportId = report.reportId;
                commentExample.userId = undefined;
                commentExample.dataComment = undefined;
                commentExample.overallComment = undefined;
                commentExample.commentId = undefined;
                let commentPromise = ApiClient.getAllByExample("brand-report-comment", commentExample)
                    .then((response) => {
                        let comments = [];
                        for (let i = 0; i < response.length; i++) {
                            comments[i] = BrandReportComment.fromJson(response[i]);
                        }
                        result.comments = comments;
                    })
                    .catch((status, xhr, err) => {
                        toast("获取评论数据失败", {type: "error"});
                        console.error(status, xhr, err);
                    });

                Promise.all([brandPromise, commentPromise, indexPromise])
                    .then(() => {
                        this.setState({
                            brand: result.brand,
                            brandReport: report,
                            indices: result.indices,
                            comments: result.comments,
                            industryStatistics: result.industryStatistics,
                            loading: false
                        })
                    });
            });
    }

    onDataCommentUpdate(index, value) {
        this.updateMyComment(index, value);
    }

    /**
     *
     * @param index 若为null，则修改整体评价，否则修改具体评价
     * @param value 评价内容
     */
    updateMyComment(index, value) {
        let userId = getCurrentUserId();

        let comments = this.state.comments;
        let myComment = null;
        let pos = 0;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].userId === userId) {
                myComment = comments[i];
                pos = i;
                break;
            }
        }

        if (myComment === null) {
            // 找不到的话则新建一个，并插入
            myComment = new BrandReportComment();
            myComment.dataComment = {};
            myComment.userId = userId;
            myComment.brandReportId = this.props.brandReport.reportId;
            if (index === null) {
                myComment.overallComment = value;
            } else {
                myComment.dataComment[index.indexId] = value;
            }
            ApiClient.insert("brand-report-comment", myComment)
                .then((response) => {
                    comments.push(BrandReportComment.fromJson(response));
                    toast("评论修改成功", {type: "success", autoClose: 2000});
                    this.setState({comments: comments});
                });
        } else {
            if (index === null) {
                myComment.overallComment = value;
            } else {
                myComment.dataComment[index.indexId] = value;
            }
            ApiClient.update("brand-report-comment", myComment, myComment.commentId)
                .then((response) => {
                    comments[pos] = BrandReportComment.fromJson(response);
                    toast("评论修改成功", {type: "success", autoClose: 2000});
                    this.setState({comments: comments});
                })
        }
    }

    onOverallCommentUpdate(value) {
        this.updateMyComment(null, value);
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    读取中
                </div>
            )
        } else {
            return (
                <>
                    <BrandReportViewer indices={this.state.indices} brandReport={this.state.brandReport}
                                       brand={this.state.brand} industryStatistics={this.state.industryStatistics}
                                       comments={this.state.comments} enableCommentEditing={true}
                                       onDataCommentUpdate={this.onDataCommentUpdate.bind(this)}
                                       onOverallCommentUpdate={this.onOverallCommentUpdate.bind(this)}/>
                    <ToastContainer/>
                </>);
        }
    }
}

export default withRouter(BrandReportPage);
