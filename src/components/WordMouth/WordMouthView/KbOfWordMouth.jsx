import React from "react";
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle,} from 'reactstrap';
import {WordMouth} from "../WordMouth";
import $ from 'jquery';
import ContentWrapper from "../../Layout/ContentWrapper";

export default class KbOfWordMouth extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);

        this.state = {
            aspectKbKey: 0,
            menuKbItems: [],
            tableKbTrs: [],
            aspectKbTitle: "请选择需要查看的类别",
            aspectKbsInfo: [],
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    componentDidMount() {
        let product_pinyin = this.props.product_pinyin;
        // 获取概要信息
        let url = 'http://110.64.66.203:5000/' + product_pinyin + '/aspect';
        $.get(url)
            .then((response) => {
                // this.setState({data:response.data})
                let aspectKey = 0;
                let menuItems = [];
                // console.log(response.data);
                if (response.data.aspectsInfo.length > 0) {
                    aspectKey = 1;
                    for (let i = 0; i < response.data.aspectsInfo.length; i++) {
                        menuItems.push(
                            <DropdownItem eventKey={String(i + 1)}
                                          onClick={() => this.handleKbSelect(String(i + 1))}>{response.data.aspectsInfo[i][i + 1]}</DropdownItem>
                        )
                    }
                }
                this.setState({
                    aspectKbKey: aspectKey,
                    menuKbItems: menuItems,
                    tableKbTrs: [],
                    aspectKbTitle: "请选择需要查看的类别",
                    aspectKbsInfo: response.data.aspectsInfo,
                });
            });
    }

    handleKbSelect = (eventKey, event) => {
        let product_pinyin = this.props.product_pinyin;
        let url = 'http://110.64.66.203:5000/' + product_pinyin + '/kb/' + String(eventKey);
        // console.log(url);
        let aspectId = parseInt(eventKey);
        let aspect_name = this.state.aspectKbsInfo[aspectId - 1][aspectId];
        $.get(url)
            .then((response) => {
                // console.log(response.data);
                let tables = [];
                for (let i = 0; i < response.data.category_pair.length; i++) {
                    tables.push(
                        <tr>
                            <td>
                                {response.data.category_pair[i]}
                            </td>
                            <td>
                                <td><a style={{cursor: "pointer"}} onClick={() => (WordMouth.click_add_product())}>移动</a> <a style={{cursor: "pointer"}} onClick={() => (WordMouth.clike_delete_pair())}>删除</a></td>
                            </td>
                        </tr>
                    )
                }
                this.setState({
                    aspectKbKey: eventKey,
                    menuKbItems: this.state.menuKbItems,
                    tableKbTrs: tables,
                    aspectKbTitle: aspect_name,
                    aspectKbsInfo: this.state.aspectKbsInfo,
                })
            });
    };

    render() {
        let noDataMenuItems = [];
        if (this.state.aspectKbKey == 0) {
            noDataMenuItems.push(
                <DropdownItem disabled>没有选项</DropdownItem>
            )
        }
        return (
            <ContentWrapper>
            <div className="panel panel-default">
                <div className="panel-body">
                    <Dropdown id="aspect-select-kb" direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                        <DropdownToggle caret>{this.state.aspectKbTitle}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>家电行业</DropdownItem>
                            <DropdownItem divider/>
                            {
                                this.state.aspectKbKey == 0 ? noDataMenuItems : this.state.menuKbItems
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <br/>
                </div>
                <div className="table-responsive"
                     style={{display: this.state.tableKbTrs.length == 0 ? 'none' : 'block', marginTop: 5}}>
                    <table className="table table-bordered table-striped">
                        <colgroup>
                            <col className="col-xs-3"/>
                            <col className="col-xs-4"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>Pair</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tableKbTrs}
                        </tbody>
                    </table>
                </div>
            </div>
            </ContentWrapper>

        );
    }
}