let sprintList = JSON.parse(localStorage.getItem("sprintListStorage"));
let spintArchive = JSON.parse(localStorage.getItem("archivedSprintListStorage"));

function displaySprintCard(listOfSprints){
    
    for (var i=0; i < listOfSprints.length; i++){
        document.getElementById("sprintID").innerHTML += 
            `
            <div class="column-large">
                <div class="card-item-big">
                    <div class="mb row" style="text-align:left;">
                        <h2>${listOfSprints[i].sprintName}</h2>
                    </div>
                    <div class="mb row">
                        <div class="col" style="text-align:left;">
                            <h5>Start Date: ${listOfSprints[i].sprintStartDate}</h5>
                        </div>
                    </div>
                    <div class="mb row">
                        <div class="col" style="text-align:left;">
                            <h5>End Date: ${listOfSprints[i].sprintEndDate}</h5>
                        </div>
                    </div>
    
                    <div class="mb row" style="text-align: left;">
                        <div class="btn-wrapper-sml" style="color: white;">
                            <button type="button" class="btn" id="primary" style="font-size: 14px;" onclick="(window.location.href='./sprint-backlog.html')">View</button>
                            <button type="button" class="btn" id="secondary" style="font-size: 14px;" onclick="archiveSprint(${i})">Archive</button>
                            <button type="button" class="btn" id="destructive" style="font-size: 14px;" onclick="deleteSprint(${i})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

displaySprintCard(sprintList);

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));    
    window.location ='edit-sprint.html';
}

let sprintIndex = 0;
var modal = document.getElementById("modal");

function deleteSprint(index){
    document.getElementById("modal-text").innerHTML = `Do you want to delete this sprint?`;
    modal.style.display = "block";
    sprintIndex = index;
}

function archiveSprint(index){
    document.getElementById("modal-text2").innerHTML = `Are you sure you want to archive this sprint?`;
    modal2.style.display = "block";
    sprintIndex = index;
}

function confirmArchiveSprint(index) {
    // Retrieve the selected sprint from the current list
    const selectedSprint = sprintList[index];
  
    // Add the selected sprint to the archived sprint list storage
    spintArchive.push(selectedSprint);
    localStorage.setItem('archivedSprintListStorage', JSON.stringify(spintArchive));
  
    // Remove the selected sprint from the current sprint list
    sprintList.splice(index, 1);
    localStorage.setItem('sprintListStorage', JSON.stringify(sprintList));
  
    // Reload the sprint view to reflect the changes
    location.reload();
  }

function confirmDelete(){
    sprintList.splice(sprintIndex, 1)
    localStorage.setItem("sprintListStorage", JSON.stringify(sprintList))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

function dismissArchive() {
    modal2.style.display = "none";
}


