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
     * @type {Map<string, BrandReport>}
     */
    brandReports;

    static fromJson(json) {
        return Object.assign(new IndustryReport(), json);
    }
}
