import React from 'react'
import Brand from "../../Model/Brand";
import BrandReport from "../../Model/BrandReport";
import IndustryStatistics from "../../Model/IndustryStatistics";
import {ABrand, ABrandReport, ABrandReportComment, AnIndustryStatistics, IndexArray} from './data';
import BrandReportViewer from "./BrandReportViewer";
import Index from "../../Model/Index";
import BrandReportComment from "../../Model/BrandReportComment";

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

    onCommentUpdate(index, value) {
        // 测试用
        let userId = "wujunxian";

        let comments = this.state.comments;
        let myComment = null;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].userId === userId) {
                myComment = comments[i];
                break;
            }
        }

        if (myComment === null) {
            // 找不到的话则新建一个
            myComment = new BrandReportComment();
            myComment.dataComment = {};
            myComment.userId = userId;
            myComment.brandReportId = this.props.brandReport.reportId;
            comments.push(myComment);
        }

        myComment.dataComment[index.indexId] = value;
        this.setState({comments: comments});
    }

    render() {
        return <BrandReportViewer indices={this.state.indices} brandReport={this.state.brandReport}
                                  brand={this.state.brand} industryStatistics={this.state.industryStatistics}
                                  comments={this.state.comments} enableCommentEditing={true}
                                  onDataCommentUpdate={this.onCommentUpdate.bind(this)}/>
    }
}
