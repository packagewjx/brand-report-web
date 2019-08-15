export default class IndustryStatistics {
    statId;

    industry;

    year;

    period;

    periodTimeNumber;

    total;

    stats;


    constructor() {
        this.statId = "";
        this.industry = "";
        this.year = "";
        this.period = "";
        this.periodTimeNumber = 0;
        this.total = 0;
        this.stats = {};
    }

    static fromJson(json) {
        return Object.assign(new IndustryStatistics(), json);
    }
}
