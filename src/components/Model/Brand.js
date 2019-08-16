export default class Brand {
    brandId;

    brandName;

    industry;

    static fromJson(json) {
        return Object.assign(new Brand(), json);
    }
}
