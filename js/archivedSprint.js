let sprintList = JSON.parse(localStorage.getItem("sprintListStorage"));
let spintArchive = JSON.parse(localStorage.getItem("archivedSprintListStorage"));

function displaySprintCard(listOfSprints){
    
    for (var i=0; i < listOfSprints.length; i++){
        document.getElementById("sprintID").innerHTML += 
            `
            <div class="column">
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
                            <button type="button" class="btn" id="destructive" style="font-size: 14px;" onclick="deleteArchiveSprint(${i})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

displaySprintCard(spintArchive);

function toEditPage(indexEdit){
    localStorage.setItem('editIndex', JSON.stringify(indexEdit));    
    window.location ='edit-sprint.html';
}

let sprintIndex = 0;
var modal = document.getElementById("modal");

function deleteArchiveSprint(index){
    document.getElementById("modal-text").innerHTML = `Are you sure you want to delete archived sprint? This cannot be recovered.`;
    modal.style.display = "block";
    sprintIndex = index;
}

function confirmArchiveSprintDelete(sprintIndex){
    spintArchive.splice(sprintIndex, 1)
    localStorage.setItem("archivedSprintListStorage", JSON.stringify(spintArchive))
    location.reload()
}

function dismiss(){
    modal.style.display = "none";
}

function dismissArchive() {
    modal2.style.display = "none";
}
