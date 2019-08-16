import $ from 'jquery'

const BACKEND_BASE_ADDRESS = process.env.REACT_APP_BACKEND_BASE_URL;

/**
 * 打包jQuery的defer对象为Promise
 * @param defer
 * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
 */
function wrap(defer) {
    return new Promise((resolve, reject) => {
        defer
            .done((response, status, xhr) => {
                if (status === "success") {
                    resolve(response);
                } else {
                    reject(status, xhr, new Error("获取失败，具体请查看status与xhr"));
                }
            })
            .fail((xhr, status, err) => {
                reject(status, xhr, err);
            })
    });
}

export default class ApiClient {

    /**
     * 根据ID获取单个资源
     * @param resource 资源类型名
     * @param id 资源ID
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static get(resource, id) {
        return wrap($.get(BACKEND_BASE_ADDRESS + '/' + resource + "/" + id));
    }

    /**
     * 获取所有资源
     * @param resource 资源类型名
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static getAll(resource) {
        return wrap($.get(BACKEND_BASE_ADDRESS + '/' + resource));
    }

    /**
     * 根据查询条件获取该条件的所有资源
     * @param resource 资源类型名
     * @param example 条件，键值对。会成为URL的参数，因此尽量使用字符串类型作为值类型保证无错误
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static getAllByExample(resource, example) {
        return wrap($.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource,
            method: "GET",
            dataType: "json",
            data: {
                action: "query",
                example: JSON.stringify(example)
            }
        }));
    }

    /**
     * 根据ID删除单个资源
     * @param resource 资源类型名
     * @param id 资源ID
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static delete(resource, id) {
        return wrap($.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource + '/' + id,
            method: "DELETE",
        }));
    }

    /**
     * 根据ID更新单个资源
     * @param resource 资源类型名
     * @param obj 更新后的资源对象
     * @param id 资源ID
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static update(resource, obj, id) {
        return wrap($.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource + '/' + id,
            method: "PUT",
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            processData: false
        }));
    }

    /**
     * 新增资源
     * @param resource　资源类型名
     * @param obj 新资源对象
     * @return {Promise<unknown>} then函数的参数即为所需对象，而catch函数的参数则为(textStatus, xhr, err)
     */
    static insert(resource, obj) {
        return wrap($.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource,
            method: "POST",
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            processData: false
        }))
    }
}

