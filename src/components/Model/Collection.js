export default class Collection {
    static fromJson(json) {
        return Object.assign(new Collection(), json);
    }

    _collectionId;

    _year;

    _periodTimeNumber;

    _period;

    _data;


    get collectionId() {
        return this._collectionId;
    }

    set collectionId(value) {
        this._collectionId = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get periodTimeNumber() {
        return this._periodTimeNumber;
    }

    set periodTimeNumber(value) {
        this._periodTimeNumber = value;
    }

    get period() {
        return this._period;
    }

    set period(value) {
        this._period = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}
