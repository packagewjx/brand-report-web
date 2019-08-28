import React from 'react';
import {withRouter} from 'react-router-dom';
import SortableTree, {getVisibleNodeCount, toggleExpandedForAll} from 'react-sortable-tree';
import ContentWrapper from "../Layout/ContentWrapper";
import {Button, Card} from 'reactstrap';
import ApiClient from "../Utils/ApiClient";
import Index from "../Model/Index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faPlus, faPlusCircle, faStream, faSync} from '@fortawesome/free-solid-svg-icons';
import 'react-sortable-tree/style.css';

const ROW_HEIGHT = 62;

class IndexManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this._fetchData = this._fetchData.bind(this);

        this.state = {
            treeData: null,
            canDrag: false,
            allExpanded: false,
            treeHeight: 0
        }
    }

    /**
     * 将指标数组转换为react-sortable-tree适合的Node对象数组
     *
     * @param indices {Array.<Index>}
     * @private
     * @return {Array.<Node>}
     */
    static _getNodesFromIndices(indices) {
        let result = [];
        let map = new Map();
        let toPut = [];
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];
            let parentNode = map.get(index.parentIndexId);
            let node = new Node();
            node.original = index;
            node.title = index.displayName;
            node.subtitle = index.indexId;
            node.children = [];
            node.expanded = false;
            map.set(index.indexId, node);
            if (index.parentIndexId === null) {
                result.push(node);
            } else if (parentNode === undefined) {
                toPut.push(node)
            } else {
                parentNode.children.push(node);
            }
        }

        for (let i = 0; i < toPut.length; i++) {
            let parentNode = map.get(toPut[i].original.parentIndexId);
            parentNode.children.push(toPut[i]);
        }
        return result;
    }

    _fetchData() {
        ApiClient.getAll("index")
            .then((response) => {
                let indices = [];
                for (let i = 0; i < response.length; i++) {
                    indices.push(Index.fromJson(response[i]));
                }

                let nodes = IndexManagementPage._getNodesFromIndices(indices);
                this.setState({treeData: nodes});
            })
    }

    componentDidMount() {
        this._fetchData();
        // 在获取数据后，更新树
        this.doSetHeight = true;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.state.treeData === null) {
            this._fetchData();
        }
        if (this.doSetHeight) {
            this.setState({treeHeight: getVisibleNodeCount(this.state) * ROW_HEIGHT + 10});
            this.doSetHeight = false;
        }
    }

    toggleAllExpanded() {
        let treeData = toggleExpandedForAll({treeData: this.state.treeData, expanded: !this.state.allExpanded});
        this.doSetHeight = true;
        this.setState({allExpanded: !this.state.allExpanded, treeData})
    }

    onVisibilityToggle({treeData, node, expanded, path}) {
        this.doSetHeight = true;
    }

    generateNodeProps({node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus}) {

    }

    render() {
        return (
            <ContentWrapper>
                <h3 id="page-heading">指标管理</h3>
                <Card>
                    <div className="button-panel">
                        <Button color="primary" onClick={this._fetchData}>
                            <FontAwesomeIcon icon={faSync}/>
                            刷新
                        </Button>
                        <Button color={"warning"} onClick={() => {
                            this.setState({canDrag: !this.state.canDrag})
                        }}>
                            <FontAwesomeIcon icon={faStream}/>
                            {this.state.canDrag ?
                                "停止修改结构" :
                                "修改结构"
                            }
                        </Button>
                        <Button color="success">
                            <FontAwesomeIcon icon={faPlus}/>
                            新建根指标
                        </Button>
                        <Button onClick={this.toggleAllExpanded.bind(this)}>
                            {this.state.allExpanded ?
                                <span>
                                    <FontAwesomeIcon icon={faMinusCircle}/>
                                    全部收起
                                </span> :
                                <span>
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                    全部展开
                                </span>
                            }
                        </Button>
                    </div>
                    {this.state.treeData === null ? <div>读取中</div> :
                        <div style={{height: this.state.treeHeight}}>
                            <SortableTree
                                treeData={this.state.treeData}
                                onChange={treeData => this.setState({treeData})}
                                canDrag={this.state.canDrag}
                                getNodeKey={({node}) => node.original.indexId}
                                onVisibilityToggle={this.onVisibilityToggle.bind(this)}
                                generateNodeProps={this.generateNodeProps.bind(this)}
                                rowHeight={ROW_HEIGHT}
                            />
                        </div>

                    }

                </Card>
            </ContentWrapper>
        )
    }
}

export default withRouter(IndexManagementPage);

class Node {
    title;

    subtitle;

    /**
     * @type {Index}
     */
    original;

    /**
     * @type {Array.<Node>}
     */
    children;

    /**
     * @type {boolean}
     */
    expanded;

}
