export default class BrandReportComment {
    static fromJson(json) {
        return Object.assign(new BrandReportComment(), json);
    }

    _commentId;

    _brandReportId;

    _userId;

    _overallComment;

    _dataComment;

    get commentId() {
        return this._commentId;
    }

    set commentId(value) {
        this._commentId = value;
    }

    get brandReportId() {
        return this._brandReportId;
    }

    set brandReportId(value) {
        this._brandReportId = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get overallComment() {
        return this._overallComment;
    }

    set overallComment(value) {
        this._overallComment = value;
    }

    get dataComment() {
        return this._dataComment;
    }

    set dataComment(value) {
        this._dataComment = value;
    }
}
