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

        this.state = {
            activeTab: undefined
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
                <TabPane tabId={rootIndices[i].indexId}>
                    <ChildIndexDataViewer indices={this.props.indices} rootIndex={rootIndices[i]}
                                          industryReport={this.props.industryReport}/>
                </TabPane>
            )

        }

        return (
            <ContentWrapper>
                <h3>{this.props.industryReport.industry}行业报告</h3>
                <Card>
                    <Nav tabs>
                        {navItems}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        {tabPanes}
                    </TabContent>
                </Card>
            </ContentWrapper>
        );
    }
}



