export default class BrandReport {
    reportId;

    brandId;

    year;

    period;

    createTime;

    data;

    static fromJson(json) {
        return Object.assign(new BrandReport(), json);
    }
}
