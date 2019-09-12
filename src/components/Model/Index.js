export default class Index {
    static TYPE_NUMBER = "number";

    static TYPE_INDICES = "indices";

    static TYPE_ENUM = "enum";

    static TYPE_BOOL = "bool";

    static TYPE_STRING = "string";

    static fromJson(json) {
        return Object.assign(new Index(), json);
    }

    indexId = "";

    displayName = "";

    parentIndexId = null;

    type;

    period;

    /**
     * @type {NumericRange|EnumRange}
     */
    range;

    description = "";

    unit = "";

    annotations = {};
}
