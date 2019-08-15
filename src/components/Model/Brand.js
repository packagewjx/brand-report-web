export default class Brand {
    brandId;

    brandName;

    industry;

    constructor() {
        this.brandId = "";
        this.brandName = "";
        this.industry = "";
    }

    static fromJson(json) {
        return Object.assign(new Brand(), json);
    }
}
