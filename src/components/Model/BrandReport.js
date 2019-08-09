export default class BrandReport {
    _reportId;

    _brandId;

    _year;

    _period;

    _createTime;

    _data;

    constructor() {
        this.reportId = "";
        this.brandId = "";
        this.year = "";
        this.period = "";
        this.createTime = "";
        this.data = "";
    }

    static fromJson(json) {
        return Object.assign(new BrandReport(), json);
    }

    get reportId() {
        return this._reportId;
    }

    set reportId(value) {
        this._reportId = value;
    }

    get brandId() {
        return this._brandId;
    }

    set brandId(value) {
        this._brandId = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get period() {
        return this._period;
    }

    set period(value) {
        this._period = value;
    }

    get createTime() {
        return this._createTime;
    }

    set createTime(value) {
        this._createTime = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}
