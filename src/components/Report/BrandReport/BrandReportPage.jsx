import React from 'react'
import Brand from "../../Model/Brand";
import BrandReport from "../../Model/BrandReport";
import IndustryStatistics from "../../Model/IndustryStatistics";
import {ABrand, ABrandReport, ABrandReportComment, AnIndustryStatistics, IndexArray} from './data';
import BrandReportViewer from "./BrandReportViewer";
import Index from "../../Model/Index";

/**
 * 处理参数与网络请求的品牌报告页
 */
export default class BrandReportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: new Brand(),
            brandReport: new BrandReport(),
            indices: [],
            comments: [],
            industryStatistics: new IndustryStatistics()
        };
    }

    componentDidMount() {
        let indices = [];
        for (let i = 0; i < IndexArray.length; i++) {
            indices.push(Index.fromJson(IndexArray[i]));
        }

        this.setState({
            brand: Brand.fromJson(ABrand),
            brandReport: BrandReport.fromJson(ABrandReport),
            indices: indices,
            industryStatistics: IndustryStatistics.fromJson(AnIndustryStatistics),
            comments: [ABrandReportComment]
        })
    }


    render() {
        return <BrandReportViewer indices={this.state.indices} brandReport={this.state.brandReport}
                                  brand={this.state.brand} industryStatistics={this.state.industryStatistics}
                                  comments={this.state.comments}/>
    }
}
