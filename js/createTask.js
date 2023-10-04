const taskListAdd = JSON.parse(localStorage.getItem("taskListStorage"));

//refresh the page once when reloading
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

function createTask() {
    if (isEmpty("taskName") || isEmpty("taskDescription")) {
        console.log("error, fields not filled")
        document.getElementById("modal-text").innerHTML = `All fields have to be filled :(`;
        modal.style.display = "block";
    }
    else {
        // type
        typeOptions = document.getElementsByName("taskType");
        type = ""
        for (let option of typeOptions) {
            if (option.checked) {
                type = option.value;
            }
        }

        tagOptions = ["frontend", "backend", "api", "database", "framework", "testing", "ui", "ux"]
        tagSelected = []
        for (let tagValue of tagOptions) {
            if (document.getElementById(tagValue).checked){
                tagSelected.push(tagValue)
            }
        }
        if (tagSelected.length == 0) {
            console.log("error, no tags selected")
            document.getElementById("modal-text").innerHTML = `Please select at least 1 tag :(`;
            modal.style.display = "block";
            return
        }

        if (document.getElementById("storyPointsSlider").value != undefined) {
            storyPoints = document.getElementById("storyPointsSlider").value
        }
        
        // priority
        priorityLabels = document.getElementsByName("taskPriority");
        priority = ""
        for (let label of priorityLabels) {
            if (label.checked) {
                priority = label.value;
            }
        }

        let task = {
            taskName: document.getElementById("taskName").value,
            taskType: type,
            taskTag: tagSelected,
            taskPriority: priority,
            //taskAssignee: document.getElementById("assignee").value,
            taskStoryPoints: storyPoints,
            taskDescription: document.getElementById("taskDescription").value,
            taskProductionStage: "PLANNING",
            taskCreationDate: new Date().toLocaleDateString(),
            taskCompletion: "NotStarted",
        }
        if (typeof(Storage) != 'undefined'){
            console.log("Local storage available!");
            taskListAdd.push(task)
            localStorage.setItem('taskListStorage', JSON.stringify(taskListAdd)); //add it to local storage
            window.location.href=`./sprint-backlog.html`
        }
        else{
            console.log("localStorage is not supported by current browser.");
        }
    }
}

// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}