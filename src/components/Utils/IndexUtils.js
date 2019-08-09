/**
 * 计算指标中的根指标
 *
 * @param {array.<Index>}indices
 * @return {array.<Index>} 根指标
 */
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
