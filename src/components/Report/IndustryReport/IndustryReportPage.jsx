import React from 'react';
import {withRouter} from 'react-router-dom';
import IndustryReport from "../../Model/IndustryReport";
import PropTypes from 'prop-types';
import Brand from "../../Model/Brand";
import ApiClient from "../../Utils/ApiClient";
import {equalsObj} from "../../Utils/UtilFunctions";
import IndustryReportViewer from "./IndustryReportViewer";
import Index from "../../Model/Index";


/**
 * 行业报告展示页。包含获取逻辑
 * 数据的获取，首先从路由的state中获取，然后从props中获取，最后都没有的话，请求网络。
 * 需要的数据为
 * <ul>
 *     <li>industryReport</li>
 *     <li>indices</li>
 *     <li>brands</li>
 * </ul>
 *
 */
class IndustryReportPage extends React.Component {
    static propTypes = {
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
    };

    constructor(props) {
        super(props);

        this.localPromise = this.localPromise.bind(this);

        this.state = {
            loading: false,
            industryReport: null,
            brands: [],
            indices: [],
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({loading: true});

        let industryReportPromise = this.localPromise("industryReport", nextProps)
            .then((industryReport) => {
                if (typeof industryReport === "undefined" || this.props.match.id !== nextProps.match.id) {
                    return new Promise((resolve, reject) => {
                        ApiClient.get("industry-report", nextProps.match.id)
                            .then((response) => {
                                resolve(IndustryReport.fromJson(response));
                            })
                            .catch((status, xhr, err) => {
                                reject(status, xhr, err);
                            });
                    });
                } else {
                    return industryReport;
                }
            });

        let brandPromise = this.localPromise("brands", nextProps)
            .then((brands) => {
                if (typeof brands === "undefined") {
                    return new Promise((resolve, reject) => {
                        ApiClient.getAll("brand")
                            .then((response) => {
                                let b = [];
                                for (let i = 0; i < response.length; i++) {
                                    b.push(Brand.fromJson(response[i]));
                                }
                                resolve(b);
                            })
                            .catch((status, xhr, err) => {
                                reject(status, xhr, err);
                            })
                    })
                } else {
                    return brands;
                }
            });

        let indexPromise = this.localPromise("indices", nextProps)
            .then((indices) => {
                if (typeof indices === "undefined") {
                    return new Promise((resolve, reject) => {
                        ApiClient.getAll("index")
                            .then((response) => {
                                let index = [];
                                for (let i = 0; i < response.length; i++) {
                                    index.push(Index.fromJson(response[i]))
                                }
                                resolve(index);
                            })
                            .catch((status, xhr, err) => {
                                reject(status, xhr, err);
                            })
                    })
                } else {
                    return indices;
                }
            });

        Promise.all([industryReportPromise, brandPromise, indexPromise])
            .then((industryReport, brands, indices) => {
                let state = {loading: false};
                if (typeof industryReport !== "undefined") {
                    state.industryReport = industryReport;
                }
                if (typeof brands !== "undefined") {
                    state.brands = brands;
                }
                if (typeof indices !== "undefined") {
                    state.indices = indices;
                }
                this.setState(state);
            });
    }


    localPromise(name, props) {
        return new Promise(resolve => {
            let val = this.state[name];
            if (typeof props.location.state[name] !== "undefined") {
                if (!equalsObj(props.location.state[name], val)) {
                    resolve(props.location.state[name]);
                } else {
                    // 不变，则返回空
                    resolve();
                }
            }
            if (typeof props[name] !== "undefined") {
                if (!equalsObj(props[name], val)) {
                    resolve(props[name]);
                } else {
                    resolve();
                }
            }
            resolve();
        })
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
                <IndustryReportViewer industryReport={this.state.industryReport} brands={this.state.brands}
                                      indices={this.state.indices}/>
            );
        }
    }
}

export default withRouter(IndustryReportPage);
