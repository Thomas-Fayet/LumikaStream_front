//--------------------------------------------- Redirection Utilisateur ---------------------------------------------

// On cherche à obtenir la position du dernier '/' dans l'URL en affichant l'url de la page en cours
let lastPositionUrl = document.location.href.lastIndexOf('/');
console.log(lastPositionUrl);

// On retourne la châine de caractère restante associé au dernier index '/' de l'url de la page en cours
let finUrl = document.location.href.slice(lastPositionUrl);
console.log(finUrl);

let logs = document.querySelectorAll('.user-button');
let profilButton = document.createElement('a');
profilButton.classList.add("user-button","profil-button", "register-button");
let divParent = logs[0].parentNode;

if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    logs[0].style.display = "none";
    logs[1].style.display = "none";

    let newButton = divParent.appendChild(profilButton);
    newButton.textContent = 'Profil';
    newButton.href = "https://lumikastream.netlify.app/user.html";
}

if ( ((finUrl === "/") || 
        (finUrl === "/inscription.html") || 
        (finUrl === "/index.html") || 
        (finUrl === "/stream.html") ||
        (finUrl === "/user-channels.html") ||
        (finUrl === "/user.html")) && (!localStorage.getItem("token") && !localStorage.getItem("userId")) ) {

        document.location.href = "/index.html";
    }



