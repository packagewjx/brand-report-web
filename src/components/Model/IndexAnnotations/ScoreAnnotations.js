export class ScoreIndexAnnotations {
    /**
     * 注释中说明指标的分数计算类型
     */
    "score_type";

    constructor(score_type) {
        this.score_type = score_type;
    }
}

/**
 * 从Index中获取Annotation方便处理
 * @param {Index} index
 * @return {ScoreIndexAnnotations|ScoreStoreIndexAnnotations|null}
 */
export function getScoreAnnotationFromIndex(index) {
    if (typeof index.annotations.score_type !== "undefined") {
        let type = index.annotations.score_type;
        switch (type) {
            case "linear":
                return LinearScoreIndexAnnotations.fromIndex(index);
            case "bool":
                return BooleanScoreIndexAnnotations.fromIndex(index);
            case "step":
                return StepScoreIndexAnnotations.fromIndex(index);
            case "enum":
                return EnumScoreIndexAnnotations.fromIndex(index);
            case "score-ratio":
                return ScoreRatioScoreIndexAnnotations.fromIndex(index);
            case "multiply":
                return MultiplyScoreIndexAnnotations.fromIndex(index);
            case "ratio":
                return RatioScoreIndexAnnotations.fromIndex(index);
            default:
                console.warn("未知的计分类型", type);
                return null;
        }
    } else if (typeof index.annotations["score_score-index-for"] !== "undefined") {
        return new ScoreStoreIndexAnnotations(index.annotations["score_score-index-for"]);
    } else {
        return null;
    }
}

/**
 * 设置index的计分注解
 * @param {Index} index
 * @param {ScoreStoreIndexAnnotations| ScoreIndexAnnotations} scoreAnnotation
 */
export function setScoreAnnotationToIndex(index, scoreAnnotation) {
    let original = getScoreAnnotationFromIndex(index);
    if (original !== null) {
        // 清除本来的Annotation
        Object.keys(original).forEach(key => {
            delete index.annotations[key];
        });
    }
    Object.assign(index.annotations, scoreAnnotation);
}

export class BooleanScoreIndexAnnotations extends ScoreIndexAnnotations {
    "score_bool_true-score";

    "score_bool_false-score";

    static getDefault() {
        return new BooleanScoreIndexAnnotations("100", "0")
    }

    /**
     * @param {number|string} trueScore 真分数
     * @param {number|string} falseScore 假分数
     */
    constructor(trueScore, falseScore) {
        super("bool");
        this["score_bool_false-score"] = typeof falseScore === "number" ? "" + falseScore : falseScore.toString();
        this["score_bool_true-score"] = typeof trueScore === "number" ? "" + trueScore : trueScore.toString();
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        let annotation = index.annotations;
        return new BooleanScoreIndexAnnotations(annotation["score_bool_true-score"], annotation["score_bool_false-score"])
    }
}

export class EnumScoreIndexAnnotations extends ScoreIndexAnnotations {
    "score_enum_score-definition";

    static getDefault() {
        return new EnumScoreIndexAnnotations(new EnumScoreDefinition())
    }

    /**
     * @return {EnumScoreDefinition}
     */
    get definition() {
        return EnumScoreDefinition.fromJson(JSON.parse(this["score_enum_score-definition"]))
    }

    set definition(definition) {
        if (definition instanceof EnumScoreDefinition) {
            this["score_enum_score-definition"] = JSON.stringify(definition);
        } else if (typeof definition === "string") {
            this["score_enum_score-definition"] = definition
        } else {
            console.warn("值不是字符串或EnumScoreDefinition类型", definition);
            this["score_enum_score-definition"] = definition
        }
    }

    /**
     *
     * @param {EnumScoreDefinition|string} scoreDefinition 分数定义
     */
    constructor(scoreDefinition) {
        super("enum");
        this["score_enum_score-definition"] = scoreDefinition instanceof EnumScoreDefinition ?
            JSON.stringify(scoreDefinition) : scoreDefinition;
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        return new EnumScoreIndexAnnotations(index.annotations["score_enum_score-definition"]);
    }
}

export class EnumScoreDefinition {
    /**
     * 分数定义
     * @type {Map.<string, number>}
     */
    definition = new Map();

    static fromJson(json) {
        let def = new EnumScoreDefinition();
        def.definition = new Map(Object.entries(json.definition));
        return def;
    }
}

export class RatioScoreIndexAnnotations extends ScoreIndexAnnotations {
    "score_ratio_total-score";

    static getDefault() {
        return new RatioScoreIndexAnnotations("100")
    }

    /**
     *
     * @param {string|number} totalScore 总分
     */
    constructor(totalScore) {
        super("ratio");
        this["score_ratio_total-score"] = typeof totalScore === "number" ? "" + totalScore : totalScore;
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        return new RatioScoreIndexAnnotations(index.annotations["score_ratio_total-score"]);
    }
}

export class StepScoreIndexAnnotations extends ScoreIndexAnnotations {
    static getDefault() {
        return new StepScoreIndexAnnotations("false", new StepScoreDefinition());
    }

    /**
     *
     * @param {string|boolean|undefined} lowerBoundExclude 是否排除下界
     * @param {StepScoreDefinition|string|undefined} definition 分数定义
     */
    constructor(lowerBoundExclude, definition) {
        super("step");
        if (lowerBoundExclude === undefined) {
            this["score_step_lower-bound-exclusive"] = false;
        } else {
            this["score_step_lower-bound-exclusive"] = typeof lowerBoundExclude === "string" ? lowerBoundExclude : lowerBoundExclude.toString();
        }
        if (definition === undefined) {
            this["score_step_score-definition"] = new StepScoreDefinition();
        } else {
            this["score_step_score-definition"] = typeof definition === "string" ? definition : JSON.stringify(definition);
        }
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        return new StepScoreIndexAnnotations(index.annotations["score_step_lower-bound-exclusive"],
            index.annotations["score_step_score-definition"]);
    }

    /**
     * 区间是否排除下界。默认false，即包含下界，排除上界。若为true，则排除下界，包含上界
     */
    "score_step_lower-bound-exclusive";

    /**
     * 阶梯式分数的定义。值为json，类型参考StepScoreDefinition
     */
    "score_step_score-definition";

    /**
     *
     * @return {StepScoreDefinition}
     */
    get definition() {
        return StepScoreDefinition.fromJson(JSON.parse(this["score_step_score-definition"]));
    }

    set definition(definition) {
        if (typeof definition === "string") {
            this["score_step_score-definition"] = definition;
        } else if (definition instanceof StepScoreDefinition) {
            this["score_step_score-definition"] = JSON.stringify(definition);
        } else {
            console.warn("definition需要是string或StepScoreDefinition类型");
            this["score_step_score-definition"] = definition;
        }
    }
}

export class StepScoreDefinition {
    /**
     * 划分数字区间的数组。值可以是数字，也可以是变量名的字符串，实现类将会读取该变量指代的数字
     * <p>
     * 根据本数组，划分的区间为：[负无穷，第一个元素), [第一个元素, 第二个元素), ... , [最后一个元素，正无穷]
     * @type {Array.<string>}
     */
    intervalSplit = [];

    /**
     * 各个区间对应的分数值，大小应该是intervalSplit的大小加1。注意，这个分数值将会是使用intervalSplit划分出来的区间中，
     * 按顺序赋予区间分数，第一个区间赋予第一个分数，与intervalSplit的顺序无关。
     * @type {Array.<string>}
     */
    intervalScore = [];

    static fromJson(json) {
        return Object.assign(new StepScoreDefinition(), json);
    }
}

export class MultiplyScoreIndexAnnotations extends ScoreIndexAnnotations {
    static getDefault() {
        return new MultiplyScoreIndexAnnotations("1");
    }

    /**
     * @param {string|number}multiplier 乘法基准分。最终得分是指标的值乘以这个基准分
     */
    constructor(multiplier) {
        super("multiply");
        this.score_multiply_multiplier = typeof multiplier === "number" ? "" + multiplier : multiplier.toString();
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        return new MultiplyScoreIndexAnnotations(index.annotations.score_multiply_multiplier);
    }

    "score_multiply_multiplier";
}

export class ScoreRatioScoreIndexAnnotations extends ScoreIndexAnnotations {
    static getDefault() {
        return new ScoreRatioScoreIndexAnnotations("100");
    }

    /**
     * @param {string|number} totalScore 比例型分数的满分，若值是1，则拿满分，否则按比例乘以总分得到
     */
    constructor(totalScore) {
        super("score-ratio");
        this["score_score-ratio_total-score"] = totalScore;
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        return new ScoreRatioScoreIndexAnnotations(index.annotations["score_score-ratio_total-score"]);
    }

    "score_score-ratio_total-score";
}

export class LinearScoreIndexAnnotations extends ScoreIndexAnnotations {
    static getDefault() {
        return new LinearScoreIndexAnnotations("1", "0", undefined, undefined);
    }

    /**
     *
     * @param {string|number} slope 线性函数斜截式的斜率
     * @param {string|number} intercept 线性函数斜截式的截距
     * @param {string|number|undefined|null} xLowerBound x下界
     * @param {string|number|undefined|null} xUpperBound x上界
     */
    constructor(slope, intercept, xLowerBound, xUpperBound) {
        super("linear");
        this.score_linear_slope = typeof slope === "number" ? "" + slope : slope.toString();
        this.score_linear_intercept = typeof intercept === "number" ? intercept : intercept.toString();
        if (xLowerBound === undefined || xLowerBound === null) {
            this["score_linear_x-lower-bound"] = undefined;
        } else {
            this["score_linear_x-lower-bound"] = typeof xLowerBound === "number" ? "" + xLowerBound : xLowerBound.toString();
        }
        if (xUpperBound === undefined || xUpperBound === null) {
            this["score_linear_x-upper-bound"] = undefined;
        } else {
            this["score_linear_x-upper-bound"] = typeof xUpperBound === "number" ? "" + xUpperBound : xUpperBound.toString();
        }
    }

    /**
     *
     * @param {Index} index
     */
    static fromIndex(index) {
        let annotation = index.annotations;
        return new LinearScoreIndexAnnotations(annotation.score_linear_slope, annotation.score_linear_intercept,
            annotation["score_linear_x-lower-bound"], annotation["score_linear_x-upper-bound"]);
    }

    "score_linear_slope";

    "score_linear_intercept";

    "score_linear_x-lower-bound";

    "score_linear_x-upper-bound";
}

export class ScoreStoreIndexAnnotations {
    /**
     * 注释中表明本指标是保存分数的指标。值为根Index的ID，指标的值将会是这个根ID其下面的所有Index的总分
     */
    "score_score-index-for";

    static getDefault() {
        return new ScoreStoreIndexAnnotations("");
    }

    constructor(scoreRootIndex) {
        this["score_score-index-for"] = scoreRootIndex;
    }
}
