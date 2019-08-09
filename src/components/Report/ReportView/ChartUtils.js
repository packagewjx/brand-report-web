/**
 * @callback dataAccessor
 * @param obj 报告对象
 * @return {Number | string} 数据字段，通常是数字，字符串
 */

/**
 * 构建
 * @param {Array} powers 一种Power的数组
 * @param {dataAccessor} dataAccessor 函数，用于获取单个Power中的目标字段的值
 * @param {HTMLElement} domElement  绘图的DOM元素，应为<canvas>
 * @param {string} title 图标题
 * @param {* | undefined} color 条形图颜色，可为空
 * @return 图对象
 */
export function drawSingleDataHorizontalBarChart(powers, dataAccessor, domElement, title, color) {
    if (powers.length === 0) {
        return null;
    }

    if (typeof color === "undefined") {
        color = '#23b7e5';
    }
    var barData = {
        labels: undefined,
        datasets: [{
            backgroundColor: color,
            borderColor: color,
            data: undefined
        }]
    };

    var barOptions = {
        title: {
            display: true,
            text: title,
            fontSize: 20,
        },
        maintainAspectRatio: false,
        legend: {
            display: false
        }
    };

    barData.labels = getDataArray(powers, (power) => {
        return power['brandName']
    });
    barData.datasets[0].data = getDataArray(powers, dataAccessor);
    // console.log(title)
    // console.log(barData.datasets[0].data.length)
    // 设置画布的高度，根据数据列多少来算
    domElement.height = 20 * barData.datasets[0].data.length;
    return new Chart(domElement, {
        data: barData,
        type: 'horizontalBar',
        options: barOptions
    });
}

/**
 * 画堆叠图。堆叠图中有许多数据
 * @param {Array} powers 一种Power的数组
 * @param {Array.<dataAccessor>} dataAccessors 函数数组，每一个函数用于获取单个Power中的其中一个数据集的值
 * @param {Array.<string>} dataSetNames 多个数据集中，每个数据集的名字。注意，必须与dataAccessor的数量和顺序相同，否则会错误
 * @param {HTMLElement} domElement 绘图的DOM元素，应为<canvas>元素
 * @param {string} title 图标题
 * @param {Array.<string>} colors 每一个数据列的颜色
 * @return 图对象
 */
export function drawStackedHorizontalBarChart(powers, dataAccessors, dataSetNames, domElement, title, colors) {
    if (powers.length === 0) {
        return null;
    }

    var barData = {
        labels: undefined,
        datasets: []
    };

    barData.labels = getDataArray(powers, (power) => power.brandName);
    for (let i = 0; i < dataAccessors.length; i++) {
        let dataSet = {
            data: [],
            label: dataSetNames[i],
            backgroundColor: colors[i],
            borderColor: colors[i]
        };
        for (let j = 0; j < powers.length; j++) {
            dataSet.data.push(dataAccessors[i](powers[j]));
        }
        barData.datasets.push(dataSet);
    }

    // 设置画布的高度，根据数据列多少来算
    domElement.height = 20 * barData.labels.length;

    let barOptions = {
        title: {
            display: true,
            text: title,
            fontSize: 20,
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                stacked: true
            }]
        }
    };

    return new Chart(domElement, {
        data: barData,
        type: 'horizontalBar',
        options: barOptions
    })
}


/**
 * 画品牌口碑堆叠图。堆叠图中有许多数据
 * @param {Array} datas 不同种类的堆叠数据，每个元素又是一个数组，分别对应着不同的种类
 * @param {Array} dataSetNames 多个数据集中，每个数据集的名字。
 * @param {Array} labels 不同的品牌列表
 * @param {HTMLElement} domElement 绘图的DOM元素，应为<canvas>元素
 * @param {string} title 图标题
 * @param {Array.<string>} colors 每一个数据列的颜色
 * @returns 图对象
 */

export function drawWordMouthStackedHorizonBarChart(datas, dataSetNames, labels, domElement, title, colors, ) {
    if (datas.length === 0) {
        return null;
    }

    var barData = {
        labels: undefined,
        datasets: []
    };

    barData.labels = labels;


    for (let i = 0; i < datas.length; i++) {
        let dataSet = {
            data: [],
            label: dataSetNames[i],
            backgroundColor: colors[i],
            borderColor: colors[i]
        };

        for (let j = 0; j < datas[i].length; j++) {
            dataSet.data.push(datas[i][j]);
        }
        barData.datasets.push(dataSet);
    }

    // 设置画布的高度，根据数据列多少来算
    domElement.height = 20 * barData.labels.length;

    let barOptions = {
        title: {
            display: true,
            text: title,
            fontSize: 20,
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                stacked: true
            }]
        }
    };

    return new Chart(domElement, {
        data: barData,
        type: 'horizontalBar',
        options: barOptions
    })

}

/**
 * 画口碑饼图。
 * @param {Array} datas 不同类别的数据
 * @param {Array} labels 不同类别数据对应的label
 * @param domElement 绘图的DOM元素，应为<canvas>元素
 * @param {string} title 图标题
 * @param {Array.<string>} colors每一个数据类别的颜色
 * @returns 图对象
 */

export function drawWordMouthPieChart(datas, labels, domElement, title, colors) {
    if (datas.length === 0) {
        return null;
    }

    let pieData = {
        labels: undefined,
        datasets: [{
            backgroundColor: [],
            data: [],
            label: undefined,
        }]
    };
    pieData.labels = labels;
    for (let i = 0; i < datas.length; i++) {
        pieData.datasets[0].data.push(datas[i]);
        pieData.datasets[0].backgroundColor.push(colors[i]);
        pieData.datasets[0].label = labels[i];
    }

    let pieOptions = {
        title: {
            display: true,
            text: title,
            fontSize: 20,
        }
    };

    return new Chart(domElement, {
            type: 'pie',
            data: pieData,
            options: pieOptions
        }
    )
}
/**
 * 画口碑趋势图。
 * @param {Array} datas 不同类别的数据
 * @param {Array} labels 不同类别数据对应的label
 * @param domElement 绘图的DOM元素，应为<canvas>元素
 * @param {string} title 图标题
 * @param {Array} dataSetNames 子标题
 * @param {Array.<string>} colors每一个数据类别的颜色
 * @returns 图对象
 */
export function drawAspectLineChart(datas, labels, domElement, title, dataSetNames, colors) {
    if (datas.length === 0) {
        return null;
    }

    let lineData = {
        labels: undefined,
        datasets: []
    };
    lineData.labels = labels;
    for (let i = 0; i < datas.length; i++) {
        let dataSet = {
            data: [],
            label: dataSetNames[i],
            backgroundColor: colors[i],
            borderColor: colors[i],
            fill: false
        };
        for (let j=0; j<datas[i].length; j++){
            dataSet.data.push(datas[i][j]);
        }
        lineData.datasets.push(dataSet);
    }
    // console.log(lineData.datasets);
    // domElement.height = 35 * lineData.labels.length;
    let lineOptions = {
        responsive: true,
        title: {
            display: true,
            text: title,
            fontSize: 20,
        }
    };

    return new Chart(domElement, {
            type: 'line',
            data: lineData,
            options: lineOptions
        }
    )
}


/**
 *
 * @param {Array} array
 * @param {dataAccessor} dataAccessor
 * @return {Array} 使用dataAccessor之后组成的数组
 */
function getDataArray(array, dataAccessor) {
    if (!array instanceof Array || array.length === 0) {
        return [];
    }

    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(dataAccessor(array[i]));
    }
    return result;
}


