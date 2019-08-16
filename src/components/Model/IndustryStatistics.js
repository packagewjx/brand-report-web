export default class IndustryStatistics {
    statId;

    industry;

    year;

    period;

    periodTimeNumber;

    total;

    stats;

    static fromJson(json) {
        return Object.assign(new IndustryStatistics(), json);
    }
}
