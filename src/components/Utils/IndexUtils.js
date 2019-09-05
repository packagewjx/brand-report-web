/**
 * 计算指标中的根指标
 *
 * @param {array.<Index>}indices
 * @return {array.<Index>} 根指标
 */
import IndexNode from "../Model/IndexNode";

export function getRootIndices(indices) {
    return indices.filter(value => {
        return value.parentIndexId === null || typeof value.parentIndexId === 'undefined';
    })
}

/**
 * 获取上级指标为parentIndexId的所有指标
 *
 * @param {string} parentIndexId 上级指标Id
 * @param {array.<Index>} indices 所有指标
 * @return {array.<Index>} 上级指标为parentIndexId的所有热
 */
export function getIndexOfParent(parentIndexId, indices) {
    return indices.filter(value => {
        return value.parentIndexId === parentIndexId;
    })
}

/**
 * 构造指标树
 * @param {Index[]} indices 所有指标
 * @return {IndexNode[]} 指标树
 */
export function constructIndexTree(indices) {
    let map = new Map();
    let toPut = [];
    let result = [];
    for (let i = 0; i < indices.length; i++) {
        let indexNode = new IndexNode();
        indexNode.index = indices[i];
        indexNode.children = [];
        map.set(indices[i].indexId, indexNode);
        if (indices[i].parentIndexId === null) {
            result.push(indexNode);
        } else {
            let parentNode = map.get(indices[i].parentIndexId);
            if (parentNode === undefined) {
                toPut.push(indexNode);
            } else {
                parentNode.children.push(indexNode);
            }
        }

    }
    for (let i = 0; i < toPut.length; i++) {
        let parentNode = map.get(toPut[i].index.parentIndexId);
        if (parentNode === undefined) {
            console.warn(toPut[i].indexId + "没有父节点");
            result.push(toPut[i]);
        } else {
            parentNode.children.push(toPut[i]);
        }
    }

    return result;
}
