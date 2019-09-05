export class ChartSetting {
    /**
     * 绘制图所使用的所有Index
     * @type {Array.<Index>}
     */
    indices;

    /**
     * 指定图的类型。若不指定，则默认根据Index的数量与类型决定图的类型
     * @type {string}
     */
    type;

    /**
     * 默认，让绘图选择
     */
    static TYPE_DEFAULT = "default";

    /**
     * 单数据条形图
     */
    static TYPE_SINGLE_BAR = "singleBar";

    /**
     * 多数据堆叠图
     */
    static TYPE_STACK_BAR = "stackBar";

    /**
     * 饼图
     *
     * 通常是enum类型使用，显示所有数据的占比情况。并同步显示数据表格，以供查看各个品牌的取值
     */
    static TYPE_PIE = "pie";

    /**
     * 雷达图
     *
     * 多个指标结合使用，反应不同品牌各个维度上的差异
     */
    static TYPE_RADAR = "radar";

    /**
     * 不绘图，而制作表格，表格每一行是品牌，列则是对应指标的值
     */
    static TYPE_TABLE = "table";

    /**
     * 每个Index数据的标识颜色，若不指定，则自动设置。
     * 类型为table时无效
     * @type {Array.<String>}
     */
    colors;

    /**
     * 标题
     * @type {String}
     */
    title;

    /**
     * 是否维持图的宽高比例
     * @type {boolean}
     */
    maintainAspectRatio;

    /**
     * 宽高比例指定
     * @type {number}
     */
    aspectRatio;

    constructor(indices) {
        this.indices = indices;
        this.type = "default";
        this.colors = [];
        this.maintainAspectRatio = false;
        this.aspectRatio = undefined;
        this.title = "";
    }
}
