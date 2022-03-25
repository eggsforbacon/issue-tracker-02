const ISSUES_STATUSES = ['Open', 'Pending', 'Closed'];

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {

    let issueId = chance.guid();
    let issueDescription = document.getElementById('issueDescInput');
    let issueSeverity = document.getElementById('issueSeverityInput');
    let issueAssignee = document.getElementById('issueAssignedToInput');
    let issueStatus = ISSUES_STATUSES[0];

    let issue = {
        id: issueId,
        description: issueDescription,
        severity: issueSeverity,
        assignee: issueAssignee,
        status: issueStatus
    };

    var issues;

    if (localStorage.getItem('issues') === null) {
        issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
 
    fetchIssues(); /* <-- Not yet implemented */
    e.preventDefault(); 

}
