//--------------------------------------------- Redirection Utilisateur ---------------------------------------------

let logs = document.querySelectorAll('.user-button');
console.log(logs[0]);

let profilButton = document.createElement('a');
profilButton.classList.add("user-button","profil-button", "register-button");
let divParent = logs[0].parentNode;

if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    logs[0].style.display = "none";
    logs[1].style.display = "none";

    let newButton = divParent.appendChild(profilButton);
    newButton.textContent = 'Profil';
    newButton.href = "http://localhost:3000/user.html";
}


