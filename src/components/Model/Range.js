export class BaseRange {
    /**
     * @type {string}
     */
    type;

    constructor(type) {
        this.type = type;
    }
}

export class NumericRange extends BaseRange {
    static DEFAULT_MIN = -1 / 0;
    static DEFAULT_MAX = 1 / 0;

    /**
     * @type {number}
     */
    min = NumericRange.DEFAULT_MIN;

    /**
     * @type {number}
     */
    max = NumericRange.DEFAULT_MAX;

    /**
     * @type {number|null}
     */
    step;

    constructor() {
        super("NumericRange");
    }
}

export class EnumRange extends BaseRange {
    /**
     * @type {Array}
     */
    allowableValues = [];

    constructor() {
        super("EnumRange")
    }
}
