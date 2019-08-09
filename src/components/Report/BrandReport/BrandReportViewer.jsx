import PropTypes from 'prop-types';
import Index from "../../Model/Index";
import BrandReport from "../../Model/BrandReport";
import BrandReportComment from "../../Model/BrandReportComment";
import IndustryStatistics from "../../Model/IndustryStatistics";
import Brand from "../../Model/Brand";
import React from 'react'
import {getIndexOfParent, getRootIndices} from "../../Utils/IndexUtils";
import {Card, Nav, NavItem, NavLink, TabContent, Table, TabPane, Tooltip} from 'reactstrap'
import ContentWrapper from "../../Layout/ContentWrapper";
import classnames from 'classnames';


/**
 * 仅仅显示传入的品牌报告的页面组件
 */
export default class BrandReportViewer extends React.Component {
    static propTypes = {
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        brandReport: PropTypes.instanceOf(BrandReport).isRequired,
        brand: PropTypes.instanceOf(Brand).isRequired,
        comments: PropTypes.arrayOf(PropTypes.instanceOf(BrandReportComment)),
        industryStatistics: PropTypes.instanceOf(IndustryStatistics),
        enableCommentEditing: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: 0,
            toolTips: [],
        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        let rootIndices = getRootIndices(this.props.indices);

        let navItems = [];
        let tabPanes = [];

        for (let i = 0; i < rootIndices.length; i++) {
            let index = rootIndices[i];
            let childIndices = getIndexOfParent(index.indexId, this.props.indices);
            let rows = [];
            for (let j = 0; j < childIndices.length; j++) {
                rows.push(
                    <IndexTableRow key={j} brandReport={this.props.brandReport} indices={this.props.indices}
                                   index={childIndices[j]} industryStatistics={this.props.industryStatistics}
                                   comments={this.props.comments}
                                   enableCommentEditing={this.props.enableCommentEditing}/>
                );
            }
            navItems.push(
                <NavItem key={i}>
                    <NavLink style={{cursor: "pointer"}}
                             className={classnames({active: this.state.activeTab === i})}
                             onClick={() => {
                                 this.toggleTab(i);
                             }}>
                        {index.displayName}
                    </NavLink>
                </NavItem>
            );

            tabPanes.push(
                <TabPane key={i} tabId={i}>
                    <Table responsive bordered className="index-table">
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </TabPane>
            );
        }

        // 增加评论面板
        if (typeof this.props.comments !== "undefined" && this.props.comments.length > 0) {
            navItems.push(
                <NavItem key={"comment"}>
                    <NavLink style={{cursor: "pointer"}}
                             className={classnames({active: this.state.activeTab === "comment"})}
                             onClick={() => {
                                 this.toggleTab("comment");
                             }}>
                        行业专家评价
                    </NavLink>
                </NavItem>
            );
            let rows = [];
            this.props.comments.forEach(value => {
                rows.push(
                    <tr>
                        <td className="index-name-td">{value.userId}</td>
                        <td>{value.overallComment}</td>
                    </tr>
                );
            });
            tabPanes.push(
                <TabPane key={"comment"} tabId={"comment"}>
                    {/*设置fixed，以定义某些列的宽度*/}
                    <Table responsive bordered className="index-table">
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </TabPane>
            )
        }

        return (
            <ContentWrapper>
                <h3>{this.props.brand.brandName}品牌报告</h3>
                <Card>
                    <Nav tabs>
                        {navItems}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        {tabPanes}
                    </TabContent>
                    {this.state.toolTips}
                </Card>
            </ContentWrapper>
        );
    }
}

class IndexTableRow extends React.Component {
    static propTypes = {
        index: PropTypes.instanceOf(Index).isRequired,
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        brandReport: PropTypes.instanceOf(BrandReport).isRequired,
        comments: PropTypes.arrayOf(PropTypes.instanceOf(BrandReportComment)),
        industryStatistics: PropTypes.instanceOf(IndustryStatistics),
        enableCommentEditing: PropTypes.bool,
        /**
         * 评论更新时候调用的函数，
         * @type {function(Index, string)}
         */
        onCommentUpdate: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.getStatToolTip = this.getStatToolTip.bind(this);
        this.getCommentToolTip = this.getCommentToolTip.bind(this);
        this.state = {
            statToolTipOpen: false,
            commentToolTipOpen: false,
            hover: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.hover !== this.state.hover || nextState.statToolTipOpen !== this.state.statToolTipOpen || nextState.commentToolTipOpen !== this.state.commentToolTipOpen) {
            return true;
        }
        return !(nextProps.indices.length === this.props.indices.length && nextProps.index.indexId === this.props.index.indexId
            && nextProps.comments.length === this.props.comments.length && nextProps.brandReport.brandReportId === this.props.brandReport.brandReportId);
    }

    toggleOnHover() {
        this.setState({hover: !this.state.hover});
    }

    /**
     * 根据数据类型，设置合适的字符串或小数
     * @param indexData
     * @return {string|number}
     */
    static getDisplayableData(indexData) {
        if (indexData === true) {
            indexData = "是";
        } else if (indexData === false) {
            indexData = "否";
        } else if (typeof indexData === "number") {
            if (indexData % 1 !== 0) {
                // 这是小数，取小数点后两位
                indexData = indexData.toFixed(2);
            }
        }
        return indexData;
    }

    /**
     * 构造统计的ToolTip
     * @param indexData
     * @param index
     * @param stat
     */
    getStatToolTip(indexData, index, stat) {
        let self = this;
        let toolTip = null;
        switch (index.type) {
            case Index.TYPE_BOOL:
            case Index.TYPE_ENUM:
                // reactstrap 8.0.0的bug:https://github.com/reactstrap/reactstrap/issues/1482
                toolTip = (
                    <Tooltip innerClassName="stat-ratio-tooltip" key={1}
                             isOpen={self.state.statToolTipOpen}
                             toggle={() => {
                                 self.setState({statToolTipOpen: !self.state.statToolTipOpen})
                             }} target={"stat-" + index.indexId} placement="bottom"
                             modifiers={{flip: {behavior: ['bottom']}}}>
                        占比：{(stat.counts[indexData] ? stat.counts[indexData] / self.props.industryStatistics.total * 100 : 0).toFixed(2)}%
                    </Tooltip>
                );
                break;
            case Index.TYPE_NUMBER:
                let sum = typeof stat.sum === "number" ? stat.sum.toFixed(2) : "无数据";
                let average = typeof stat.average === "number" ? stat.average.toFixed(2) : "无数据";
                toolTip = (
                    <Tooltip innerClassName="stat-number-tooltip" key={1} isOpen={self.state.statToolTipOpen}
                             toggle={() => {
                                 self.setState({statToolTipOpen: !self.state.statToolTipOpen})
                             }} target={"stat-" + index.indexId} placement="bottom"
                             modifiers={{flip: {behavior: ['bottom']}}}>
                        行业总值：{sum}<br/>
                        行业均值：{average}
                    </Tooltip>
                );
                break;
        }
        return toolTip;
    }

    /**
     * 构造评论的ToolTip
     * @param comments
     * @param index
     */
    getCommentToolTip(comments, index) {
        let self = this;
        let elements = [];
        let toolTip = null;
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i].dataComment[index.indexId];
            if (typeof comment !== "undefined") {
                elements.push(
                    <span key={i}>{comments[i].userId}: {comments[i].dataComment[index.indexId]}</span>,
                    <br key={i}/>
                );
            }
        }
        // 删除最后一个
        elements.splice(elements.length - 1, 1);
        if (elements.length > 0) {
            toolTip = (
                <Tooltip innerClassName="comment-tooltip" key={2} isOpen={self.state.commentToolTipOpen}
                         toggle={() => {
                             self.setState({commentToolTipOpen: !self.state.commentToolTipOpen})
                         }} target={"comment-" + index.indexId} placement="bottom"
                         modifiers={{flip: {behavior: ['bottom']}}}>
                    {elements}
                </Tooltip>
            );
        }
        return toolTip;
    }

    render() {
        let self = this;
        let data = this.props.brandReport.data;
        let index = this.props.index;
        let indices = this.props.indices;

        if (this.props.index.type === "indices") {
            let rows = [];
            let childIndices = getIndexOfParent(index.indexId, indices);
            for (let i = 0; i < childIndices.length; i++) {
                rows.push(
                    <IndexTableRow key={i} brandReport={this.props.brandReport} comments={this.props.comments}
                                   index={childIndices[i]} indices={this.props.indices}
                                   industryStatistics={this.props.industryStatistics}
                                   enableCommentEditing={this.props.enableCommentEditing}/>
                )
            }
            return (
                <tr>
                    <td className="index-name-td">
                        {index.displayName}
                    </td>
                    <td style={{padding: 0}}>
                        <Table responsive className="index-table">
                            <tbody>
                            {rows}
                            </tbody>
                        </Table>
                    </td>
                </tr>
            )
        } else {
            // 显示单个数据的逻辑
            let indexData = data[index.indexId];

            // 显示图标，移动则会显示tooltip，显示更多数据
            let icons = [];
            let toolTips = [];

            if (typeof indexData !== "undefined") {
                // 统计数据ToolTip构造
                if (typeof this.props.industryStatistics !== "undefined") {
                    let stat = this.props.industryStatistics.stats[index.indexId];
                    if (typeof stat !== "undefined") {
                        toolTips.push(this.getStatToolTip(indexData, index, stat));
                        icons.push(
                            <em key={1} id={"stat-" + index.indexId} style={{verticalAlign: "top",}}
                                className="fa fas fa-2x fa-chart-bar"/>
                        );
                    }
                }

                // 评论Tooltip构造
                if (typeof this.props.comments !== 'undefined') {
                    let toolTip = this.getCommentToolTip(this.props.comments, index);
                    if (toolTip !== null) {
                        icons.push(
                            <em key={2} id={"comment-" + index.indexId} style={{verticalAlign: "top",}}
                                className="fa fas fa-2x fa-comments"/>
                        );
                        toolTips.push(toolTip);
                    }
                }

                // 根据类型修改显示样式
                indexData = IndexTableRow.getDisplayableData(indexData);

                return (
                    <tr onMouseEnter={this.toggleOnHover.bind(this)} onMouseLeave={this.toggleOnHover.bind(this)}>
                        <td className="index-name-td">
                            {index.displayName}
                        </td>
                        <td className="index-value-td">
                            <span className="index-value">{indexData}{index.unit ? index.unit : null}</span>
                            <span className="float-right">
                                {/*评论图标*/}
                                <span className="fa-stack fa-1x" style={{
                                    verticalAlign: "top",
                                    cursor: "pointer",
                                    display: this.state.hover && this.props.enableCommentEditing ? null : "none"
                                }} title={"添加评论"}>
                                    <i style={{color: "#00ff1b"}} className="fas fa-comment fa-stack-2x"/>
                                    <i className="fas fa-plus fa-stack-1x fa-inverse"/>
                                </span>
                                {icons}
                            </span>
                            {toolTips}
                        </td>
                    </tr>
                );
            } else {
                return null;
            }
        }
    }
}
