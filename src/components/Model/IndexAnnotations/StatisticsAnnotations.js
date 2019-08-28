export default class StatisticsAnnotations {
    /**
     * 统计时不会统计这个Index。类型是布尔值的英文，默认为false
     * @type {string}
     */
    "statistics_no-count";

    /**
     * 统计时把null值当成是0值，计算平均值时将会计入这个null。默认是false，忽略null值，不参与计算平均。
     * 值是布尔值的英文
     *
     * @type {string}
     */
    "statistics_null-as-zero";


    constructor() {
        this["statistics_no-count"] = "false";
        this["statistics_null-as-zero"] = "false";
    }

    /**
     * 从Index的annotations取值
     * @param index {Index}
     * @return {StatisticsAnnotations}
     */
    static fromIndex(index) {
        let a = new StatisticsAnnotations();
        if (typeof index.annotations === "undefined") {
            return a;
        }
        a["statistics_null-as-zero"] = typeof index.annotations["statistics_null-as-zero"] === "undefined" ?
            a["statistics_null-as-zero"] : index.annotations["statistics_null-as-zero"];
        a["statistics_no-count"] = typeof index.annotations["statistics_no-count"] === "undefined" ?
            a["statistics_no-count"] : index.annotations["statistics_no-count"];
        return a
    }
}
