export default class CommentApplication {
    static STATE_APPLIED = "applied";

    static STATE_COMMENTING = "commenting";

    static STATE_FINISHED = "finished";

    applicationId;

    brandReportId;

    applicantId;

    expertUserIds;

    state;

    stateUpdate;

    static fromJson(json) {
        return Object.assign(new CommentApplication(), json);
    }
}
