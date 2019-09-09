export default class ChartAnnotations {
    /**
     * 绘图类型
     */
    chart_type = "default";

    /**
     * 若是true，则不绘制本图
     */
    chart_disable = "false";

    /**
     * 若为true，则不单独给低级指标绘图，而是绘制所有值指标的汇总图表
     * 仅支持绘制所有的雷达图，堆叠图
     */
    "chart_draw-all-sub-index" = "false";

    /**
     * 若为true，则不绘制所有子指标的图
     */
    "chart_disable-sub-index-graph" = "false";

    /**
     * 逗号分隔的string颜色列表，逗号之间不能有空格
     * @type {string | undefined}
     */
    "chart_colors";

    /**
     * 显示比例，若不给出，则默认不指定
     * @type {undefined | string}
     */
    "chart_aspect-ratio";

    /**
     *
     * @param {Index} index
     * @return {ChartAnnotations}
     */
    static fromIndex(index) {
        let a = new ChartAnnotations();
        a.chart_type = index.annotations.chart_type === undefined ? a.chart_type : index.annotations.chart_type;
        a.chart_disable = index.annotations.chart_disable === undefined ? a.chart_disable : index.annotations.chart_disable;
        a.chart_colors = index.annotations.chart_colors;
        a["chart_aspect-ratio"] = index.annotations["chart_aspect-ratio"];
        a["chart_draw-all-sub-index"] = index.annotations["chart_draw-all-sub-index"];
        a["chart_disable-sub-index-graph"] = index.annotations["chart_disable-sub-index-graph"] === undefined ?
            a["chart_disable-sub-index-graph"] : index.annotations["chart_disable-sub-index-graph"];
        return a;
    }

}
