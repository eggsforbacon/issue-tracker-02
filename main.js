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
 
    fetchIssues();
    e.preventDefault(); 

}

function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
        issues[i].status = "Closed";
        }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    if (issues != null) {    
      for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        
        issuesList.innerHTML +=   '<div class="well">'+
                                  '<h6>Issue ID: ' + id + '</h6>'+
                                  '<p><span class="label label-info">' + status + '</span></p>'+
                                  '<h3>' + desc + '</h3>'+
                                  '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                  '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                  '</div>';
      }
    }
  }
