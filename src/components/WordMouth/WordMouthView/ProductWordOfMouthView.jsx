import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import {Button, CardBody, Card, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import AbstractOfWordMouth from "./AbstractOfWordMouth";
import BrandOfWordMouth from "./BrandOfWordMouth"
import AspectOfWordMouth from "./AspectOfWordMouth"
import KbOfWordMouth from "./KbOfWordMouth";
import classnames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faReply} from '@fortawesome/free-solid-svg-icons'

export default class ProductWordOfMouthView extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {activeTab: '1'};
    }

    componentDidMount() {
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (

            <ContentWrapper>
                <h3>{this.props.location.state.product_name}相关品牌口碑情况
                    {/*<small style={{marginTop: 12}}><Link to="/wordMouth-productlist">产品类型列表</Link></small>*/}
                </h3>

                <Card className="panel panel-default">
                    <CardBody>
                        <Button title={"返回产品类型列表"} href={"/wordMouth-productlist"}>
                            <span>
                            <FontAwesomeIcon size={"lg"} icon={faReply}/>
                            </span>
                        </Button>
                        <p/>
                        <Nav tabs>
                            <NavItem>
                                <NavLink style={{cursor: "pointer"}}
                                         className={classnames({active: this.state.activeTab === '1'})}
                                         onClick={() => {
                                             this.toggle('1');
                                         }}
                                >
                                    总体分析
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{cursor: "pointer"}}
                                         className={classnames({active: this.state.activeTab === '2'})}
                                         onClick={() => {
                                             this.toggle('2');
                                         }}
                                >
                                    基于品牌分析
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{cursor: "pointer"}}
                                         className={classnames({active: this.state.activeTab === '3'})}
                                         onClick={() => {
                                             this.toggle('3');
                                         }}
                                >
                                    方面趋势图
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{cursor: "pointer"}}
                                         className={classnames({active: this.state.activeTab === '4'})}
                                         onClick={() => {
                                             this.toggle('4');
                                         }}
                                >
                                    知识库管理
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                {/*${renderToString(<Hello />)}*/}
                                {/*${renderToString()}*/}

                                <div id="panelDemo7" className="panel panel-default">
                                    <div className="panel-heading">{this.props.location.state.product_name}口碑分析概况</div>
                                    <div className="panel-body">
                                        <AbstractOfWordMouth product_pinyin={this.props.location.state.product}
                                                             product_name={this.props.location.state.product_name}/>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <BrandOfWordMouth product_pinyin={this.props.location.state.product}
                                                  product_name={this.props.location.state.product_name}/>
                            </TabPane>
                            <TabPane tabId="3" title="方面趋势图">
                                <AspectOfWordMouth product_pinyin={this.props.location.state.product}
                                                   product_name={this.props.location.state.product_name}/>
                            </TabPane>
                            <TabPane tabId="4" title="知识库管理">
                                <KbOfWordMouth product_pinyin={this.props.location.state.product}
                                               product_name={this.props.location.state.product_name}/>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
};
