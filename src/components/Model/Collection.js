export default class Collection {
    static fromJson(json) {
        return Object.assign(new Collection(), json);
    }

    collectionId;

    year;

    periodTimeNumber;

    period;

    data;

}
