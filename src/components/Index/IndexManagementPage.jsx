import React from 'react';
import {withRouter} from 'react-router-dom';
import SortableTree, {getVisibleNodeCount, removeNodeAtPath, toggleExpandedForAll} from 'react-sortable-tree';
import ContentWrapper from "../Layout/ContentWrapper";
import {Button, Card, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import ApiClient from "../Utils/ApiClient";
import Index from "../Model/Index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleDown,
    faAngleDoubleUp,
    faExclamationTriangle,
    faInfo,
    faPlus,
    faStream,
    faSync,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import 'react-sortable-tree/style.css';
import {IndexModal} from "./IndexModal";
import {toast, ToastContainer} from 'react-toastify';

const ROW_HEIGHT = 62;

class IndexManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this._fetchData = this._fetchData.bind(this);
        this.toggleThisNodeAllExpand = this.toggleThisNodeAllExpand.bind(this);

        this.state = {
            indices: null,
            treeData: null,
            canDrag: false,
            allExpanded: false,
            treeHeight: 0,
            operateIndex: null,
            indexModalOpen: false,
            operateIndexPath: [],
            createIndex: false,
            deleteModal: {
                open: false,
                indexNode: null,
            }
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
            if (parentNode === undefined) {
                toPut[i].title = "(父指标不存在)" + toPut[i].title;
                result.push(toPut[i]);
            } else {
                parentNode.children.push(toPut[i]);
            }
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
                this.doSetHeight = true;
                this.setState({treeData: nodes, indices});
            })
    }

    componentDidMount() {
        this._fetchData();
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

    /**
     *
     * @param node {Node} 节点
     * @param expanded {boolean} true则展开，false则关闭
     */
    toggleThisNodeAllExpand(node, expanded) {
        node.expanded = expanded;
        // noinspection JSValidateTypes
        node.children = toggleExpandedForAll({treeData: node.children, expanded});
        this.doSetHeight = true;
        this.setState({treeData: this.state.treeData});
    }

    onVisibilityToggle({treeData, node, expanded, path}) {
        this.doSetHeight = true;
    }

    generateNodeProps({node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus}) {
        return {
            buttons: [
                <Button size="xs" title="查看与编辑" onClick={() => {
                    this.setState({indexModalOpen: true, operateIndex: node.original, operateIndexPath: path})
                }}>
                    <FontAwesomeIcon fixedWidth={true} icon={faInfo}/>
                </Button>,
                node.children.length === 0 ? null :
                    node.expanded ?
                        <Button size="xs" title="收起本节点" onClick={() => {
                            this.toggleThisNodeAllExpand(node, false)
                        }}>
                            <FontAwesomeIcon fixedWidth={true} icon={faAngleDoubleUp}/>
                        </Button> :
                        <Button size="xs" title="展开本节点" onClick={() => {
                            this.toggleThisNodeAllExpand(node, true);
                        }}>
                            <FontAwesomeIcon fixedWidth={true} icon={faAngleDoubleDown}/>
                        </Button>,
                node.original.type === Index.TYPE_INDICES ?
                    <Button size="xs" title="新建子指标" onClick={this.createIndex.bind(this, node.original.indexId, path)}>
                        <FontAwesomeIcon icon={faPlus} fixedWidth={true}/>
                    </Button> : null,
                <Button size="xs" title="删除"
                        onClick={() => this.setState({
                            deleteModal: {open: true, indexNode: node},
                            operateIndexPath: path
                        })}>
                    <FontAwesomeIcon icon={faTrash} fixedWidth={true}/>
                </Button>
            ]
        }
    }

    toggleIndexModal() {
        this.setState({indexModalOpen: !this.state.indexModalOpen});
    }

    /**
     *
     * @param {Index} index
     */
    saveIndex(index) {
        if (this.state.createIndex) {
            ApiClient.insert("index", index)
                .then((response) => {
                    toast("修改成功", {type: "success", toastId: "index-page-toast"});
                    let newIndex = Index.fromJson(response);
                    let level = this.state.treeData;
                    for (let i = 0; i < this.state.operateIndexPath.length; i++) {
                        for (let j = 0; j < level.length; j++) {
                            if (level[j].original.indexId === this.state.operateIndexPath[i]) {
                                level = level[j].children;
                            }
                        }
                    }
                    let node = new Node();
                    node.original = newIndex;
                    node.title = newIndex.displayName;
                    node.subtitle = newIndex.indexId;
                    node.children = [];
                    level.push(node);
                    // 更新一下高度
                    this.doSetHeight = true;
                    this.setState({
                        operateIndex: null,
                        operateIndexPath: [],
                        createIndex: false,
                        indexModalOpen: false,
                        treeData: this.state.treeData
                    });
                })
                .catch(() => {
                    toast("修改失败", {type: "error", toastId: "index-page-toast"})
                })
        } else {
            ApiClient.update("index", index, index.indexId)
                .then((response) => {
                    let newIndex = Index.fromJson(response);
                    toast("修改成功", {type: "success", toastId: "index-modal-toast"});
                    let level = this.state.treeData;
                    let node = undefined;
                    for (let i = 0; i < this.state.operateIndexPath.length - 1; i++) {
                        for (let j = 0; j < level.length; j++) {
                            if (level[j].original.indexId === this.state.operateIndexPath[i]) {
                                level = level[j].children;
                            }
                        }
                    }
                    for (let i = 0; i < level.length; i++) {
                        if (level[i].original.indexId === this.state.operateIndexPath[this.state.operateIndexPath.length - 1]) {
                            node = level[i];
                        }
                    }
                    if (node === undefined) {
                        console.warn("找不到节点，错误");
                        this._fetchData();
                        return
                    }
                    node.original = newIndex;
                    node.title = newIndex.displayName;
                    this.doSetHeight = true;
                    this.setState({
                        operateIndex: newIndex,
                        treeData: this.state.treeData
                    })
                })
                .catch(() => {
                    toast("修改失败", {type: "error", toastId: "index-modal-toast"})
                })
        }
    }

    createIndex(parentIndexId, operateIndexPath) {
        let newIndex = new Index();
        newIndex.parentIndexId = parentIndexId;
        this.setState({
            createIndex: true,
            operateIndex: newIndex,
            operateIndexPath: operateIndexPath,
            indexModalOpen: true
        })
    }

    toggleDeleteModal() {
        this.setState(prevState => {
            let deleteModal = {
                ...prevState.deleteModal,
                open: !prevState.deleteModal.open
            };
            return {deleteModal};
        })
    }

    deleteIndex(indexNode) {
        let successHandler = () => {
            toast("删除成功", {type: "success", toastId: "index-page-toast"});
            let treeData = removeNodeAtPath({
                treeData: this.state.treeData,
                path: this.state.operateIndexPath,
                getNodeKey: ({node}) => node.original.indexId
            });
            this.doSetHeight = true;
            this.setState({
                deleteModal: {
                    open: false,
                    index: null
                },
                treeData: treeData
            })
        };

        if (indexNode.original.type === Index.TYPE_INDICES) {
            let promises = [];
            let queue = [indexNode];
            while (queue.length > 0) {
                let cur = queue.shift();
                queue = queue.concat(cur.children);
                promises.push(ApiClient.delete("index", cur.original.indexId));
            }
            Promise.all(promises)
                .then(successHandler)
                .catch(() => toast("删除失败", {type: "error", toastId: "index-page-toast"}));

        } else {
            ApiClient.delete("index", indexNode.original.indexId)
                .then(successHandler)
                .catch(() => toast("删除失败", {type: "error", toastId: "index-page-toast"})
                )
        }

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
                        <Button color="success" onClick={this.createIndex.bind(this, null)}>
                            <FontAwesomeIcon icon={faPlus}/>
                            新建根指标
                        </Button>
                        <Button onClick={this.toggleAllExpanded.bind(this)}>
                            {this.state.allExpanded ?
                                <span>
                                    <FontAwesomeIcon icon={faAngleDoubleUp}/>
                                    全部收起
                                </span> :
                                <span>
                                    <FontAwesomeIcon icon={faAngleDoubleDown}/>
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
                <IndexModal index={this.state.operateIndex} isOpen={this.state.indexModalOpen}
                            toggle={this.toggleIndexModal.bind(this)} onChange={this.saveIndex.bind(this)}
                            indices={this.state.indices} newIndex={this.state.createIndex}/>
                <Modal isOpen={this.state.deleteModal.open}>
                    <ModalHeader toggle={this.toggleDeleteModal.bind(this)}>
                        <FontAwesomeIcon icon={faExclamationTriangle} color="red"/>
                        确认删除
                    </ModalHeader>
                    <ModalBody>
                        确实要删除指标
                        {this.state.deleteModal.indexNode ?
                            this.state.deleteModal.indexNode.original.displayName + "(ID:" + this.state.deleteModal.indexNode.original.indexId + ")"
                            + (this.state.deleteModal.indexNode.original.type === Index.TYPE_INDICES ? "及其所有子指标" : "")
                            : ""}
                        吗？
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger"
                                onClick={this.deleteIndex.bind(this, this.state.deleteModal.indexNode)}>确认</Button>
                        <Button color="secondary" onClick={this.toggleDeleteModal.bind(this)}>
                            取消
                        </Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer id="index-page-toast"/>
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
