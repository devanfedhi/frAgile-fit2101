let taskList = JSON.parse(localStorage.getItem("taskListStorage"));

const priorityMap = {
    'LOW': 0,
    'MEDIUM': 1,
    'IMPORTANT': 2,
    'URGENT': 3,
};

function displayTaskCard(listOfTask){
    for (var i=0; i < listOfTask.length; i++){
        document.getElementById("taskID").innerHTML += 
            `
            <div class="card-item">
                <div class="titelBox" style="text-align:left;">
                    <h2 class="name">${listOfTask[i].taskName}</h2>
                </div>
                <div class="txt-box">
                    <div class="col" style="text-align:left;">
                        <h5>${listOfTask[i].taskType}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5 class="${listOfTask[i].taskPriority}">${listOfTask[i].taskPriority}</h5>
                    </div>
                    <div class="col" style="text-align:left;">
                        <h5>${listOfTask[i].taskProductionStage}</h5>
                    </div>
                </div>
                <div class="col tagContainer" id="tagID${i}" style="text-align:left;">
                </div>
                <div class="storyPointsBG">
                    <div style="width: 100%;">
                        <div class="storyPoints" style="width: ${listOfTask[i].taskStoryPoints*10}%;">&nbsp;</div>
                    </div>
                    <div class="storyPointsNum">
                        <h5>${listOfTask[i].taskStoryPoints}</h5>
                    </div>
                </div>
    
                <div class="card-footer" style="text-align: left;">
                    <button type="button" class="btn" id="primary" style="font-size: 14px;" onclick="toEditPage(${i})">Edit</button>
                    <button type="button" class="btn" id="destructive" style="font-size: 14px;" onclick="deleteTask(${i})">Delete</button>
                </div>
            </div>`;

        for(let tag of listOfTask[i].taskTag) {
            document.getElementById("tagID" + i).innerHTML += 
                `<p class="static-${tag}" style="display: inline;">
                    ${tag}
                </p>`;
        }
    }
    
}

sort();

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));    
    window.location ='edit-task.html';
}

let taskIndex = 0;
var modal = document.getElementById("modal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function deleteTask(index){
    document.getElementById("modal-text").innerHTML = `Do you want to delete this task?`;
    modal.style.display = "block";
    taskIndex = index;
}

function confirmDelete(){
    taskList.splice(taskIndex,1)
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

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

function sort(){
    document.getElementById("taskID").innerHTML = "";

    if (document.getElementById('sortOptions').value == "priorityHighest"){
        taskList = taskList.sort((a,b) => priorityMap[b.taskPriority] - priorityMap[a.taskPriority])
    }

    else if (document.getElementById('sortOptions').value == "priorityLowest"){
        taskList = taskList.sort((a,b) => priorityMap[a.taskPriority] - priorityMap[b.taskPriority])
    }
    localStorage.setItem("taskListStorage", JSON.stringify(taskList))
    displayTaskCard(taskList)
    
} 