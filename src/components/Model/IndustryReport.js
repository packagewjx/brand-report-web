export default class IndustryReport {
    industryReportId;

    industry;

    period;

    periodTimeNumber;

    year;

    /**
     * @type {IndustryStatistics}
     */
    stat;

    /**
     * 键为品牌ID，值为品牌报告的映射表
     *
     * @type {Object.<string, BrandReport>}
     */
    brandReports;

    static fromJson(json) {
        return Object.assign(new IndustryReport(), json);
    }
}
