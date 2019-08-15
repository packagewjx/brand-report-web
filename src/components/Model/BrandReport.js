export default class BrandReport {
    reportId;

    brandId;

    year;

    period;

    createTime;

    data;

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
}
