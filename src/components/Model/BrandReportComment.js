export default class BrandReportComment {
    static fromJson(json) {
        return Object.assign(new BrandReportComment(), json);
    }

    commentId;

    brandReportId;

    userId;

    overallComment;

    dataComment;
}
