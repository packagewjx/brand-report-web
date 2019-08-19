import PropTypes from 'prop-types';
import Index from "../../Model/Index";
import BrandReport from "../../Model/BrandReport";
import BrandReportComment from "../../Model/BrandReportComment";
import IndustryStatistics from "../../Model/IndustryStatistics";
import Brand from "../../Model/Brand";
import React from 'react'
import {
    Button,
    Card,
    Input,
    Nav,
    NavItem,
    NavLink,
    Popover,
    PopoverBody,
    PopoverHeader,
    TabContent,
    Table,
    TabPane,
    Tooltip
} from 'reactstrap'
import {getIndexOfParent, getRootIndices} from "../../Utils/IndexUtils";
import ContentWrapper from "../../Layout/ContentWrapper";
import classnames from 'classnames';
import {getCurrentUserId} from "../../Utils/UserUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment, faPencilAlt, faPlus} from '@fortawesome/free-solid-svg-icons'

/**
 * 显示与编辑品牌报告的页面组件
 */
export default class BrandReportViewer extends React.Component {
    static propTypes = {
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)).isRequired,
        brandReport: PropTypes.instanceOf(BrandReport).isRequired,
        brand: PropTypes.instanceOf(Brand).isRequired,
        comments: PropTypes.arrayOf(PropTypes.instanceOf(BrandReportComment)),
        industryStatistics: PropTypes.instanceOf(IndustryStatistics),
        enableCommentEditing: PropTypes.bool,
        /**
         * 当有评论更新的时候的回调函数，不更改，仅展示
         *
         * @type {function(Index, string)}
         */
        onDataCommentUpdate: PropTypes.func,
        /**
         * 当总体评价更新时候的回调函数，传入参数为本次登录用户的评价
         */
        onOverallCommentUpdate: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: 0,
            toolTips: [],
            editMyComment: false
        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    onOverallCommentChange(value) {
        this.props.onOverallCommentUpdate(value);
    }

    onDataCommentChange(index, value) {
        this.props.onDataCommentUpdate(index, value);
    }

    render() {
        // 测试用UserId
        let userId = getCurrentUserId();

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
                                   enableCommentEditing={this.props.enableCommentEditing}
                                   onCommentUpdate={this.onDataCommentChange.bind(this)}/>
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
        if (this.props.enableCommentEditing || (typeof this.props.comments !== "undefined" && this.props.comments.length > 0)) {
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
            let hasMyComment = false;
            this.props.comments.forEach(comment => {
                if (comment.userId === userId) {
                    hasMyComment = true;
                    rows.push(
                        <tr key={comment.userId}>
                            <td className="index-name-td">{comment.userId}</td>
                            <td>
                                {this.state.editMyComment ?
                                    <CommentEditor value={comment.overallComment}
                                                   onCancel={() => this.setState({editMyComment: false})}
                                                   onChange={(value) => {
                                                       this.onOverallCommentChange(value);
                                                       this.setState({editMyComment: false})
                                                   }}/>
                                    :
                                    <>
                                        {comment.overallComment}
                                        {
                                            this.props.enableCommentEditing ?
                                                <span id={"edit-overall-comment"}
                                                      className="float-right"
                                                      style={{
                                                          verticalAlign: "top",
                                                          cursor: "pointer",
                                                      }} title={"修改评论"}
                                                      onClick={() => {
                                                          this.setState({editMyComment: true});
                                                      }}>
                                                    <span className="fa-layers" style={{fontSize: "18px"}}>
                                                        <FontAwesomeIcon icon={faComment}/>
                                                        <FontAwesomeIcon icon={faPencilAlt} inverse={true}
                                                                         transform="shrink-6 right-5 down-4"/>
                                                        <FontAwesomeIcon icon={faPencilAlt}
                                                                         transform="shrink-8 right-5 down-4"/>
                                                    </span>
                                                </span> :
                                                null
                                        }

                                    </>
                                }
                            </td>
                        </tr>
                    );
                } else {
                    rows.push((
                        <tr key={comment.userId}>
                            <td className="index-name-td">{comment.userId}</td>
                            <td>
                                {comment.overallComment}
                            </td>
                        </tr>
                    ))
                }
            });

            // 新建评论时使用
            if (!hasMyComment) {
                rows.push(
                    <tr key={"myComment"}>
                        <td className="index-name-td">{getCurrentUserId()}</td>
                        <td>
                            {this.state.editMyComment ?
                                <CommentEditor value={""}
                                               onCancel={() => this.setState({editMyComment: false})}
                                               onChange={(value) => {
                                                   this.onOverallCommentChange(value);
                                                   this.setState({editMyComment: false})
                                               }}/>
                                :
                                (
                                    this.props.enableCommentEditing ?
                                        <span id={"edit-overall-comment"}
                                              className="float-right"
                                              style={{
                                                  verticalAlign: "top",
                                                  cursor: "pointer",
                                              }} title={"添加总体评论"}
                                              onClick={() => {
                                                  this.setState({editMyComment: true});
                                              }}>
                                            <span className="fa-layers" style={{fontSize: "18px"}}>
                                                <FontAwesomeIcon icon={faComment}/>
                                                <FontAwesomeIcon icon={faPlus} inverse={true}
                                                                 transform="shrink-6 right-5 down-4"/>
                                                <FontAwesomeIcon icon={faPlus} transform="shrink-8 right-5 down-4"/>
                                            </span>
                                        </span> :
                                        null
                                )
                            }
                        </td>
                    </tr>
                );
            }

            tabPanes.push(
                <TabPane key={"comment"} tabId={"comment"}>
                    {/*设置fixed，以定义某些列的宽度*/}
                    <Table responsive bordered className="index-table">
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </TabPane>
            );
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
        this.getUserComment = this.getUserComment.bind(this);
        this.state = {
            statToolTipOpen: false,
            commentToolTipOpen: false,
            commentEditPopoverOpen: false,
            hover: false,
        }
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
     * @param target ToolTip的Target
     */
    getCommentToolTip(comments, index, target) {
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
        // 删除最后一个<br/>
        elements.splice(elements.length - 1, 1);
        if (elements.length > 0) {
            toolTip = (
                <Tooltip innerClassName="comment-tooltip" key={2} isOpen={self.state.commentToolTipOpen}
                         toggle={() => {
                             self.setState({commentToolTipOpen: !self.state.commentToolTipOpen})
                         }} target={target} placement="bottom"
                         modifiers={{flip: {behavior: ['bottom']}}}>
                    {elements}
                </Tooltip>
            );
            return toolTip;
        } else {
            return null;
        }
    }


    /**
     * 从评论中获取现在登录用户的评论，如果没有则返回null
     * @return {BrandReportComment|null}
     */
    getUserComment() {
        // 测试用UserID
        let userId = getCurrentUserId();

        for (let i = 0; i < this.props.comments.length; i++) {
            if (this.props.comments[i].userId === userId) {
                return this.props.comments[i];
            }
        }

        return null;
    }

    onCommentChange(newVal) {
        this.props.onCommentUpdate(this.props.index, newVal);
    }

    onCommentDelete() {
        this.props.onCommentUpdate(this.props.index, null);
    }

    render() {
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
                                   enableCommentEditing={this.props.enableCommentEditing}
                                   onCommentUpdate={this.props.onCommentUpdate}/>
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
            let popovers = [];

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

                // 评论Tooltip与图标构造
                if (typeof this.props.comments !== 'undefined') {
                    if (this.props.enableCommentEditing) {
                        let comment = this.getUserComment();
                        let dataComment = undefined;
                        if (comment !== null) {
                            dataComment = comment.dataComment[index.indexId];
                        }

                        // 若不存在评论，则显示添加按钮，否则显示修改按钮与ToolTip
                        if (typeof dataComment !== 'undefined') {
                            icons.splice(0, 0,
                                <span key={"edit-comment-" + index.indexId} id={"edit-comment-" + index.indexId}
                                      style={{
                                          verticalAlign: "top",
                                          cursor: "pointer",
                                      }} title={"修改评论"}>
                                    <span className="fa-layers" style={{fontSize: "18px"}}>
                                        <FontAwesomeIcon icon={faComment}/>
                                        <FontAwesomeIcon icon={faPencilAlt} inverse={true}
                                                         transform="shrink-6 right-5 down-4"/>
                                        <FontAwesomeIcon icon={faPencilAlt} transform="shrink-8 right-5 down-4"/>
                                    </span>
                                </span>,
                            );
                            toolTips.push(
                                this.getCommentToolTip(this.props.comments, index, "edit-comment-" + index.indexId)
                            );
                        } else {
                            icons.splice(0, 0,
                                <span key={"edit-comment-" + index.indexId} id={"edit-comment-" + index.indexId}
                                      title={"添加评论"}
                                      style={{
                                          verticalAlign: "top",
                                          cursor: "pointer",
                                          display: this.state.hover && this.props.enableCommentEditing ? null : "none"
                                      }}>
                                    <span className="fa-layers" style={{fontSize: "18px"}}>
                                        <FontAwesomeIcon icon={faComment}/>
                                        <FontAwesomeIcon icon={faPlus} inverse={true}
                                                         transform="shrink-6 right-5 down-4"/>
                                        <FontAwesomeIcon icon={faPlus} transform="shrink-8 right-5 down-4"/>
                                    </span>
                                </span>,
                            );
                        }

                        // 添加编辑框
                        popovers.push(
                            <CommentEditPopover key={"edit-comment-" + index.indexId} index={index}
                                                show={this.state.commentEditPopoverOpen}
                                                toggle={() => {
                                                    this.setState({commentEditPopoverOpen: !this.state.commentEditPopoverOpen})
                                                }}
                                                target={"edit-comment-" + index.indexId} value={dataComment}
                                                onDelete={this.onCommentDelete.bind(this)}
                                                onChange={this.onCommentChange.bind(this)}/>
                        )

                    } else {
                        let toolTip = this.getCommentToolTip(this.props.comments, index, "comment-" + index.indexId);
                        if (toolTip !== null) {
                            toolTips.push(toolTip);
                            icons.push(
                                <em key={2} id={"comment-" + index.indexId} style={{verticalAlign: "top", fontSize: "18px"}}
                                    className="fa fa-comments"/>
                            );
                        }
                    }
                }

                // 根据类型修改显示样式
                indexData = IndexTableRow.getDisplayableData(indexData);

                return (
                    <tr onMouseEnter={() => {
                        this.setState({hover: true})
                    }} onMouseLeave={() => {
                        this.setState({hover: false})
                    }}>
                        <td className="index-name-td">
                            {index.displayName}
                        </td>
                        <td className="index-value-td">
                            <span className="index-value">{indexData}{index.unit ? index.unit : null}</span>
                            <span className="float-right">
                                {icons}
                            </span>
                            {toolTips}
                            {popovers}
                        </td>
                    </tr>
                );
            } else {
                return null;
            }
        }
    }
}

class CommentEditPopover extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        index: PropTypes.instanceOf(Index),
        onChange: PropTypes.func,
        onDelete: PropTypes.func,
        show: PropTypes.bool,
        target: PropTypes.string,
        toggle: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.dirty = false;
        this.state = {
            commentVal: this.props.value,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.dirty) {
            this.setState({
                commentVal: nextProps.value
            });
        }
    }

    onSuccess(e) {
        this.dirty = false;
        this.props.onChange(this.state.commentVal);
        this.props.toggle(e);
    }

    onDelete(e) {
        this.dirty = false;
        this.props.onDelete();
        this.props.toggle(e);
    }

    onInputChange(e) {
        this.dirty = true;
        this.setState({
            commentVal: e.target.value
        })
    }

    onCancel(e) {
        this.dirty = false;
        this.props.toggle(e);
    }

    render() {
        return (
            <Popover placement="bottom" isOpen={this.props.show} target={this.props.target}
                     toggle={this.props.toggle} modifiers={{flip: {behavior: ['bottom']}}}
                     innerClassName="comment-edit-popover">
                <PopoverHeader>评论{this.props.index.displayName}</PopoverHeader>
                <PopoverBody>
                    <Input type="text" value={this.state.commentVal} onChange={this.onInputChange.bind(this)}/>
                    <div className="float-right">
                        <Button color="success" onClick={this.onSuccess.bind(this)}>确认</Button>
                        {" "}
                        <Button color="danger" onClick={this.onDelete.bind(this)}>删除</Button>
                        {" "}
                        <Button onClick={this.onCancel.bind(this)}>取消</Button>
                    </div>
                </PopoverBody>
            </Popover>
        );
    }

}

class CommentEditor extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        value: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            value: nextProps.value
        })
    }

    render() {
        return (
            <div>
                <Input type="textarea" name="comment" value={this.state.value} onChange={(e) => {
                    this.setState({value: e.target.value})
                }}/>
                <Button color="success" onClick={() => {
                    this.props.onChange(this.state.value)
                }}>确认</Button>
                <Button onClick={this.props.onCancel}>取消</Button>
            </div>
        );
    }
}
