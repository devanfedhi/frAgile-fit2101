let indexToEdit = JSON.parse(localStorage.getItem("editIndex"));
let taskList = JSON.parse(localStorage.getItem("taskListStorage"))

//adding place holder and values
document.getElementById("taskName").value = taskList[indexToEdit].taskName;

const typeOptions = document.getElementsByName("taskType");
for (let option of typeOptions) {
    if (option.value == taskList[indexToEdit].taskType) {
        option.checked = true;
    }
}

const tagOptions = ["frontend", "backend", "api", "database", "framework", "testing", "ui", "ux"]
tagSelected = taskList[indexToEdit].taskTag;
for (let tagValue of tagSelected) {
    document.getElementById(tagValue).checked = true;
}

// priority
const priorityLabels = document.getElementsByName("taskPriority");
for (let label of priorityLabels) {
    if (label.value == taskList[indexToEdit].taskPriority) {
        label.checked = true;
    }
}

document.getElementById("storyPoints").value = taskList[indexToEdit].taskStoryPoints;

const productionStages = document.getElementsByName("taskProductionStage");
for (let stage of productionStages) {
    if (stage.value == taskList[indexToEdit].taskProductionStage) {
        stage.checked = true;
    }
}

document.getElementById('assignee').value = taskList[indexToEdit].taskAssignee;

// document.getElementById("taskProductionStage").options[0].textContent = taskList[indexToEdit].taskProductionStage

document.getElementById('taskDescription').value = taskList[indexToEdit].taskDescription;

taskCreationDate = taskList[indexToEdit].taskCreationDate;

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

//Saving the edited task, similar to creating
function saveEditTask(){
    if (isEmpty("taskName") || isEmpty("assignee") || isEmpty("taskDescription")) {
        console.log("error, fields not filled")
        document.getElementById("modal-text").innerHTML = `All fields have to be filled :(`;
        modal.style.display = "block";
    }
    else{
        // type
        newType = ""
        for (let option of typeOptions) {
            if (option.checked) {
                type = option.value;
            }
        }

        newTagSelected = []
        for (let tagValue of tagOptions) {
            if (document.getElementById(tagValue).checked){
                newTagSelected.push(tagValue)
            }
        }

        if (tagSelected.length == 0) {
            console.log("error, no tags selected")
            document.getElementById("modal-text").innerHTML = `Please select at least 1 tag :(`;
            modal.style.display = "block";
            return
        }

        // priority
        priority = ""
        for (let label of priorityLabels) {
            if (label.checked) {
                priority = label.value;
            }
        }

        // priority
        stage = ""
        for (let stageOption of productionStages) {
            if (stageOption.checked) {
                stage = stageOption.value;
            }
        }

        let editedTask = {
            taskName: document.getElementById("taskName").value,
            taskType: type,
            taskTag: newTagSelected,
            taskPriority: priority,
            taskAssignee: document.getElementById("assignee").value,
            taskStoryPoints: document.getElementById("storyPoints").value,
            taskDescription: document.getElementById("taskDescription").value,
            taskProductionStage: stage,
            taskCreationDate: taskCreationDate,
            taskCompletion: taskList[indexToEdit].taskCompletion,
        }

        if (typeof(Storage) != 'undefined'){
            console.log("Local storage available!");
            taskList.splice(indexToEdit, 1);
            taskList.splice(indexToEdit, 0, editedTask);
            localStorage.setItem('taskListStorage', JSON.stringify(taskList)); //add it to local storage
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