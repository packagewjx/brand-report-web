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
        this._fetchData = this._fetchData.bind(this);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.state.data === null) {
            this._fetchData();
        }
    }

    _fetchData() {
        let industryReportPromise = this.localPromise("industryReport", this.props)
            .then((industryReport) => {
                if (typeof industryReport === "undefined") {
                    return new Promise((resolve, reject) => {
                        ApiClient.get("industry-report", this.props.match.id)
                            .then((response) => {
                                resolve(IndustryReport.fromJson(response));
                            })
                            .catch((status, xhr, err) => {
                                reject(status, xhr, err);
                            });
                    });
                } else {
                    return IndustryReport.fromJson(industryReport);
                }
            });

        let brandPromise = this.localPromise("brands", this.props)
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
                    let b = [];
                    for (let i = 0; i < brands.length; i++) {
                        b.push(Brand.fromJson(brands[i]));
                    }
                    return b;
                }
            });

        let indexPromise = this.localPromise("indices", this.props)
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
            .then((result) => {
                let data = new PageData();
                if (typeof result[0] !== "undefined") {
                    data.industryReport = result[0];
                }
                if (typeof result[1] !== "undefined") {
                    data.brands = result[1];
                }
                if (typeof result[2] !== "undefined") {
                    data.indices = result[2];
                }
                this.setState({data});
            });
    }

    localPromise(name, props) {
        return new Promise(resolve => {
            let val = this.state.data === null ? undefined : this.state.data[name];
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
        if (this.state.data === null) {
            return (
                <div>
                    读取中
                </div>
            )
        } else {
            return (
                <IndustryReportViewer industryReport={this.state.data.industryReport} brands={this.state.data.brands}
                                      indices={this.state.data.indices}/>
            );
        }
    }

}

export default withRouter(IndustryReportPage);

class PageData {
    /**
     * @type {Array.<Brand>}
     */
    brands;

    /**
     * @type {IndustryReport}
     */
    industryReport;

    /**
     * @type {Array.<Index>}
     */
    indices;


    constructor(brands, industryReport, indices) {
        this.brands = brands;
        this.industryReport = industryReport;
        this.indices = indices;
    }
}
