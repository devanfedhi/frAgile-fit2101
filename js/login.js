if (!localStorage.getItem("userStorage")) {
    localStorage.setItem("userStorage", JSON.stringify([])); // Initialize as an empty array
}

if (!localStorage.getItem("loggedInUser")) {
    localStorage.setItem("loggedInUser","None")
}

if (!localStorage.getItem("adminStorage")) {
    localStorage.setItem("adminStorage", JSON.stringify([]));
    let admin = {
        username: 'nisaldesilva',
        email: 'nisal.desilva1@monash.edu',
        fullname: 'Nisal De Silva',
        role: 'Admin',
        password: 'monash',
    }

    const adminAdd = JSON.parse(localStorage.getItem("adminStorage"));
    adminAdd.push(admin);
    localStorage.setItem('adminStorage', JSON.stringify(adminAdd));
}
const userAdd = JSON.parse(localStorage.getItem("userStorage")); 
const adminAdd = JSON.parse(localStorage.getItem("adminStorage")); 

function sendCode(){
    const email = document.getElementById("register-email").value;
    let ebody = `
    Use this token to verify your email address.

    ABC123

    frAgile
    `;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "fragile.fit2101@gmail.com",
        Password : "1C0CA019E08693BBF077055C94C558C7306E",
        To : email, 
        From : "fragile.fit2101@gmail.com",
        Subject : "frAgile - Your Verification Code",
        Body : ebody
    }).then(
        message => {
            if (message === "OK"){
                alert("Verification Code sent to " + email);
            }
        }
    );

}

function verifyCode(){
    const registerCode = document.getElementById("register-code").value;

    if (registerCode === "ABC123") {
        register();
    } else {
        alert("Code is incorrect")
    }
}


function register() {

    const registerUsername = document.getElementById("register-username").value;
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;
    const registerFullName = document.getElementById("register-fullname").value;
    const registerRole = document.getElementById("register-role").value;
    

    let user = {
        username: registerUsername,
        email: registerEmail,
        fullname: registerFullName,
        role: registerRole,
        password: registerPassword,
        
    }

    userAdd.push(user);
    localStorage.setItem('userStorage', JSON.stringify(userAdd)); //add it to local storage
    alert("Registration successful. You can now log in.");
    window.location.href=`../views/login.html`;
    }

function verifyCodeLogin(){
    const loginCode = document.getElementById("login-code").value;

    if (loginCode === "ABC123") {
        window.location.href = "../views/index.html";
    } else {
        localStorage.setItem("loggedInUser","None")
        alert("Code is incorrect")
    }
}
    


function login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;  

    let userExists = 0;
    let success = 0;


    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loginUsername) {
            userExists = 1;
            const storedPassword = userAdd[i].password;
            if (loginPassword === storedPassword) {
                localStorage.setItem("loggedInUser",loginUsername)
                success = 1;
                document.getElementById("output").innerText = "Login successful, please enter the code sent to your email address!";

                const email = userAdd[i].email;
                
                

                let ebody = `
                Use this token to verify your email address.

                ABC123

                frAgile
                `;
                

                Email.send({
                    Host : "smtp.elasticemail.com",
                    Username : "fragile.fit2101@gmail.com",
                    Password : "1C0CA019E08693BBF077055C94C558C7306E",
                    To : email, 
                    From : "fragile.fit2101@gmail.com",
                    Subject : "frAgile - Your Verification Code",
                    Body : ebody
                }).then(
                    message => {
                        alert(message)
                        if (message === "OK"){
                            alert("Verification Code sent to " + email);
                        }
                    }
                );
                

                
            } 

        }
    }    

    for (let i = 0; i < adminAdd.length; i++) {
        if (adminAdd[i].username == loginUsername) {
            userExists = 1;
            const storedPassword = adminAdd[i].password;
            if (loginPassword === storedPassword) {
                success = 1;
                localStorage.setItem("loggedInUser",loginUsername)
                document.getElementById("output").innerText = "Login successful, please enter the code sent to your email address";
                window.location.href = "../views/index.html";
            } 

        }
    }    

    if (!success){
        if (userExists){
            alert("Incorrect password. Please try again.");
        } else   {
            alert("Username not found. Please register first.");
        }
    }

}

function edit() {
    const loginUsername = document.getElementById("login-username").value;
    const editUsername = document.getElementById("edit-username").value;
    const editFullName = document.getElementById("edit-fullname").value;
    const editEmail = document.getElementById("edit-email").value;
    const editRole = document.getElementById("edit-role").value;
    const editPassword = document.getElementById("edit-password").value;

    let editedUser = {
        username: editUsername,
        email: editEmail,
        fullname: editFullName,
        role: editRole,
        password: editPassword,
    }

    let userFound = 0;

    for (let i = 0; i < userAdd.length; i++) {
        if (userAdd[i].username == loginUsername) {
            userFound = 1;
            userAdd.splice(i,1);
            break;
        }
    }

    if (userFound) {
        userAdd.push(editedUser);
        localStorage.setItem('userStorage', JSON.stringify(userAdd)); //add it to local storage
        alert("Edit successful.");
        window.location.href = "../views/admin.html";
    } else {
        alert("User not found.");
    }
    
}