export default class Index {
    static TYPE_NUMBER = "number";

    static TYPE_INDICES = "indices";

    static TYPE_ENUM = "enum";

    static TYPE_BOOL = "bool";

    static TYPE_STRING = "string";

    static fromJson(json) {
        return Object.assign(new Index(), json);
    }

    _indexId;

    get indexId() {
        return this._indexId;
    }

    set indexId(value) {
        this._indexId = value;
    }

    get displayName() {
        return this._displayName;
    }

    set displayName(value) {
        this._displayName = value;
    }

    get parentIndexId() {
        return this._parentIndexId;
    }

    set parentIndexId(value) {
        this._parentIndexId = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get period() {
        return this._period;
    }

    set period(value) {
        this._period = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        this._unit = value;
    }

    get annotations() {
        return this._annotations;
    }

    set annotations(value) {
        this._annotations = value;
    }

    _displayName;

    _parentIndexId;

    _type;

    _period;

    _description;

    _unit;

    _annotations;
}
