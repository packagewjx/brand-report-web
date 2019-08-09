export default class IndustryStatistics {
    _statId;

    _industry;

    _year;

    _period;

    _periodTimeNumber;

    _total;

    _stats;


    constructor() {
        this.statId = "";
        this.industry = "";
        this.year = "";
        this.period = "";
        this.periodTimeNumber = 0;
        this.total = 0;
        this.stats = {};
    }

    static fromJson(json) {
        return Object.assign(new IndustryStatistics(), json);
    }

    get statId() {
        return this._statId;
    }

    set statId(value) {
        this._statId = value;
    }

    get industry() {
        return this._industry;
    }

    set industry(value) {
        this._industry = value;
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

    get periodTimeNumber() {
        return this._periodTimeNumber;
    }

    set periodTimeNumber(value) {
        this._periodTimeNumber = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get stats() {
        return this._stats;
    }

    set stats(value) {
        this._stats = value;
    }
}
