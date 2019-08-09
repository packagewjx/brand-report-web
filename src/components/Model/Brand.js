export default class Brand {
    _brandId;

    _brandName;

    _industry;

    constructor() {
        this.brandId = "";
        this.brandName = "";
        this.industry = "";
    }

    static fromJson(json) {
        return Object.assign(new Brand(), json);
    }

    get brandId() {
        return this._brandId;
    }

    set brandId(value) {
        this._brandId = value;
    }

    get brandName() {
        return this._brandName;
    }

    set brandName(value) {
        this._brandName = value;
    }

    get industry() {
        return this._industry;
    }

    set industry(value) {
        this._industry = value;
    }
}
