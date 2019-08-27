import React from 'react';
import PropTypes from 'prop-types';
import IndustryReport from "../../Model/IndustryReport";
import Index from "../../Model/Index";
import Brand from "../../Model/Brand";
import ChildIndexDataViewer from "./ChildIndexDataViewer";
import ContentWrapper from "../../Layout/ContentWrapper";
import {Card, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';

export default class IndustryReportViewer extends React.Component {
    static propTypes = {
        industryReport: PropTypes.instanceOf(IndustryReport),
        brands: PropTypes.arrayOf(PropTypes.instanceOf(Brand)),
        indices: PropTypes.arrayOf(PropTypes.instanceOf(Index)),
    };

    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.setHeight = this.setHeight.bind(this);

        this.state = {
            activeTab: undefined,
            height: 0
        }
    }

    componentDidMount() {
        this.setHeight();
        window.addEventListener("resize", ev => {
            // 窗口重调整时进行调整
            this.setHeight();
        })
    }

    setHeight() {
        let rect = this.divElement.getClientRects()[0];
        let footerHeight = document.getElementsByClassName("footer-container")[0].clientHeight;
        let newHeight = window.innerHeight - rect.top - footerHeight - 45;
        if (this.state.height === rect.top) {
            return
        }
        this.setState({height: newHeight});
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        let rootIndices = [];
        for (let i = 0; i < this.props.indices.length; i++) {
            if (this.props.indices[i].parentIndexId === null) {
                rootIndices.push(this.props.indices[i]);
            }
        }

        let navItems = [];
        let tabPanes = [];
        for (let i = 0; i < rootIndices.length; i++) {
            navItems.push(
                <NavItem key={i}>
                    <NavLink style={{cursor: "pointer"}}
                             className={classnames({active: this.state.activeTab === rootIndices[i].indexId})}
                             onClick={() => {
                                 this.toggleTab(rootIndices[i].indexId);
                             }}>
                        {rootIndices[i].displayName}
                    </NavLink>
                </NavItem>
            );
            tabPanes.push(
                <TabPane key={i} tabId={rootIndices[i].indexId}>
                    <ChildIndexDataViewer indices={this.props.indices} rootIndex={rootIndices[i]}
                                          industryReport={this.props.industryReport} height={this.state.height}/>
                </TabPane>
            )

        }

        return (
            <ContentWrapper>
                <h3 id="page-heading">{this.props.industryReport.industry}行业报告</h3>
                <Card>
                    <Nav tabs>
                        {navItems}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <div id="tabs" style={{height: this.state.height}} ref={instance => {
                            this.divElement = instance
                        }}>
                            {tabPanes}
                        </div>
                    </TabContent>
                </Card>
            </ContentWrapper>
        );
    }
}



