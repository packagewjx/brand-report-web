import React from 'react';
import PropTypes from 'prop-types';
import IndustryReport from "../../Model/IndustryReport";
import Index from "../../Model/Index";
import Brand from "../../Model/Brand";
import ContentWrapper from "../../Layout/ContentWrapper";
import {Card, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import {constructIndexTree} from "../../Utils/IndexUtils";
import ChartAnnotations from "../../Model/IndexAnnotations/ChartAnnotations";
import {ChartSetting} from "./ChartSetting";
import RootIndexTabPane from "./RootIndexTabPane";

function setFromAnnotation(chartSetting, chartAnnotation) {
    chartSetting.aspectRatio = parseFloat(chartAnnotation["chart_aspect-ratio"]);
    chartSetting.maintainAspectRatio = !isNaN(chartSetting.aspectRatio);
    if (typeof chartAnnotation.chart_colors === "string") {
        let s = chartAnnotation.chart_colors.trim();
        s = s.replace(" ", "");
        chartSetting.colors = s.split(",");
    }
    chartSetting.type = typeof chartAnnotation.chart_type === "string" ? chartAnnotation.chart_type : ChartSetting.TYPE_DEFAULT;
}

/**
 *
 * @param {IndexNode} indexNode
 * @return {ChartSetting[]}
 */
function indexNodeTraversal(indexNode) {
    if (indexNode === undefined || indexNode === null) {
        return [];
    }

    let result = [];
    let chartAnnotation = ChartAnnotations.fromIndex(indexNode.index);
    if (chartAnnotation.chart_disable !== "true") {
        if (chartAnnotation["chart_draw-all-sub-index"] === "true") {
            let queue = [indexNode];
            let indices = [];
            while (queue.length > 0) {
                let node = queue.shift();
                queue = queue.concat(node.children);
                if (node.index.type !== Index.TYPE_INDICES) {
                    indices.push(node.index);
                }
            }
            let chartSetting = new ChartSetting(indices);
            setFromAnnotation(chartSetting, chartAnnotation);
            chartSetting.title = indexNode.index.displayName;
            result.push(chartSetting);
        } else if (indexNode.index.type !== Index.TYPE_INDICES) {
            let chartSetting = new ChartSetting([indexNode.index]);
            setFromAnnotation(chartSetting, chartAnnotation);
            chartSetting.title = indexNode.index.displayName;
            result.push(chartSetting);
        }
    }

    // 加入子节点的
    for (let i = 0; i < indexNode.children.length; i++) {
        result = result.concat(indexNodeTraversal(indexNode.children[i]));
    }

    return result;

}

/**
 *
 * @param {Index[]}indices
 * @return {Map.<Index, ChartSetting[]>}
 */
function getChartSettings(indices) {
    let indexTree = constructIndexTree(indices);
    let result = new Map();
    for (let i = 0; i < indexTree.length; i++) {
        let settings = indexNodeTraversal(indexTree[i]);
        result.set(indexTree[i].index, settings);
    }
    return result;
}


export default class IndustryReportViewer extends React.Component {
    static propTypes = {
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
    };

    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: undefined,
        }
    }


    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        let navItems = [];
        let tabPanes = [];

        let chartSettings = getChartSettings(this.props.indices);
        chartSettings.forEach((chartSettings, rootIndex) => {
            navItems.push(
                <NavItem key={rootIndex.indexId}>
                    <NavLink style={{cursor: "pointer"}}
                             className={classnames({active: this.state.activeTab === rootIndex.indexId})}
                             onClick={() => this.toggleTab(rootIndex.indexId)}>
                        {rootIndex.displayName}
                    </NavLink>
                </NavItem>
            );
            tabPanes.push(
                <RootIndexTabPane key={rootIndex.indexId} indices={this.props.indices} activeTab={this.state.activeTab}
                                  tabId={rootIndex.indexId} chartHeight={this.state.height}
                                  industryReport={this.props.industryReport} rootIndex={rootIndex}
                                  chartSettings={chartSettings} brands={this.props.brands}/>
            );
        });

        return (
            <ContentWrapper>
                <h3 id="page-heading">{this.props.industryReport.industry}行业报告</h3>
                <Card>
                    <Nav tabs>
                        {navItems}
                    </Nav>
                    <div id="tabs">
                        <TabContent activeTab={this.state.activeTab}>
                            {tabPanes}
                            <TabPane tabId={undefined}>
                                请选择需要查看的标签页
                            </TabPane>
                        </TabContent>
                    </div>
                </Card>
            </ContentWrapper>
        );
    }
}

