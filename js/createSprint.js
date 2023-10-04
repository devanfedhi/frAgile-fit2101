const sprintListAdd = JSON.parse(localStorage.getItem("sprintListStorage"));

function isEmpty(elementID){
    return document.getElementById(elementID).value == ``;
}

function createSprint() {
    if (isEmpty("sprintName") || isEmpty("sprintDescription") || isEmpty("startDateInput") || isEmpty("endDateInput")) {
        console.log("error, fields not filled")
        document.getElementById("modal-text").innerHTML = `All fields have to be filled :(`;
        modal.style.display = "block";
        }
        else {
            let sprint = {
                sprintName: document.getElementById("sprintName").value,
                sprintDescription: document.getElementById("sprintDescription").value,
                sprintStartDate: document.getElementById("startDateInput").value,
                sprintEndDate: document.getElementById("endDateInput").value
            }

            if (typeof(Storage) != 'undefined'){
                console.log("Local storage available!");
                sprintListAdd.push(sprint)
                localStorage.setItem('sprintListStorage', JSON.stringify(sprintListAdd)); //add it to local storage
                window.location.href=`../views/sprint-view.html`
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