import $ from 'jquery'

const BACKEND_BASE_ADDRESS = process.env.REACT_APP_BACKEND_BASE_URL;


export default class ApiClient {
    static get(resource, id) {
        return $.get(BACKEND_BASE_ADDRESS + '/' + resource + "/" + id)
    }

    static getAll(resource) {
        return $.get(BACKEND_BASE_ADDRESS + '/' + resource)
    }

    static getAllByExample(resource, example) {
        let param = {};
        for (let key in example) {
            if (example.hasOwnProperty(key)) {
                // 将大写字符转换
                let newKey = "";
                for (let i = 0; i < key.length; i++) {
                    let char = key[i];
                    if (char <= 'Z' && char >= 'A') {
                        newKey += '-' + char;
                    } else {
                        newKey += char
                    }
                }
                param[newKey] = example[key];
            }
        }
        return $.get(BACKEND_BASE_ADDRESS + '/' + resource, {
            data: param
        })
    }

    static delete(resource, id) {
        return $.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource + '/' + id,
            method: "DELETE",
        })
    }

    static update(resource, obj, id) {
        return $.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource + '/' + id,
            method: "PUT",
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            processData: false
        })
    }

    static insert(resource, obj) {
        return $.ajax({
            url: BACKEND_BASE_ADDRESS + '/' + resource,
            method: "POST",
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            processData: false
        })
    }
}

