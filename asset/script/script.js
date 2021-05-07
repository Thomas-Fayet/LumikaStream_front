"use strict";

// --------------------------------------------- DECLARATION DES VARIABLES ---------------------------------------------

let menuIcon = document.getElementById("menu-icon");
let menuBtn = document.getElementById("menu-btn");
let navBurger = document.getElementById("nav-burger");
let body = document.body;
let actualisation = window.sessionStorage;

var inputField = document.querySelector(".message_form__input");

// --------------------------------------------- GESTION DES BOUCLES / FONCTIONS / METHODES ---------------------------------------------

menuIcon.addEventListener('click', () => {
    if (menuBtn.checked == true) {
        body.style.overflow = "auto";
    } else {
        body.style.overflow = "hidden";
    }
})

menuIcon.addEventListener('onload', () => {
    if (menuBtn.checked == true) {
        body.style.overflow = "auto";
    } else {
        body.style.overflow = "hidden";
    }
})


actualisation.setItem("is_reloaded", true);

if (actualisation.getItem("is_reloaded")) {
    console.log("Reloaded");
    menuBtn.checked = false;

}

// --------------------------------------------- AFFICHAGE MINIATURE AVANT UPLOAD ---------------------------------------------

// --------------------------------------------- DECLARATION DES VARIABLES ---------------------------------------------

let btn = document.getElementById('profil-picture-btn');
let containerPicture = document.getElementById('profil-picture-container');
//let file = document.querySelector('input[type=file]').files;
let preview = document.getElementById('preview-image');
// let reader = new FileReader();
//console.log(file);
//console.log(file.type);
// console.log(reader);

let fileTypes = [
    'image/jpeg', 
    'image/png', 
    'image/jpg' 
]

//btn.addEventListener("change", previewFile);


// --------------------------------------------- GESTION DES BOUCLES / FONCTIONS / METHODES ---------------------------------------------

function previewFile() {
    if (file.length === 0) {
        let para = document.createElement('p');
        para.textContent = "Aucune image n'est sélectionnée";
        containerPicture.appendChild(para);
    } else {
        for (let i = 0; i < file.length; i++) {
            if (validFileType(file[i])) {
                preview.src = window.URL.createObjectURL(file[i]);
                console.log(preview.src);
            }
        }
    } 
}


//console.log(window.URL.createObjectURL(file[0]))

function validFileType(file) {
    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        } else {
            return false;
        }

    }
}


// if (file) {
//     reader.readAsDataURL(file);
// }

// reader.addEventListener("onload", () => {
//     preview.src = reader.result;
// })

// ------------------------------------------------ GESTION DU STREAM ------------------------------/

var stream = document.getElementById('stream')
stream.addEventListener('click', () => {
    stream.style.display = "none";
    fetch("http://localhost:3000")
        .then(response => {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: 'http://localhost:8000/live/STREAM_NAME.flv'
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }
        })
})

// ---------------------------------------------- GESTION DU CHAT --------------------------------------

if (!window.closed) {
    var socket = io('http://localhost:3000');
    var messageForm = document.querySelector(".message_form");
    var messageBox = document.querySelector(".messages__history");
    var inboxPeople = document.querySelector(".inbox__people");
    var fallback = document.querySelector(".fallback");


    let userName = "";

    var newUserConnected = (user) => {
        userName = user || `User${Math.floor(Math.random() * 1000)}`;
        socket.emit("new user", userName);
        addToUsersBox(userName);
    };

    var addToUsersBox = (userName) => {
        if (!!document.querySelector(`.${userName}-userlist`)) {
            return;
        }

        var userBox = `
        <div class="chat_ib ${userName}-userlist">
            <h5>${userName}</h5>
        </div>
        `;

        inboxPeople.innerHTML += userBox;
    };

    //new message
    var addNewMessage = ({ user, message }) => {
        var time = new Date();
        var formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

        var receivedMsg = `
        <div class="received__message">
            <p><span class="user-chat">${user} </span> : ${message}</p>
        </div>`;

        var myMsg = `
        <div class="sent__message">
            <p><span class="user-chat">${user} </span> : ${message}</p>
        </div>`;

        messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
    };

    // new user is created so we generate nickname and emit event
    newUserConnected();

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!inputField.value) {
        return;
        }
    
        socket.emit("chat message", {
        message: inputField.value,
        nick: userName,
        });
    
        inputField.value = "";
    });

    socket.on("new user", function (data) {
        data.map((user) => addToUsersBox(user));
    });

    socket.on("user disconnected", function (userName) {
        document.querySelector(`.${userName}-userlist`).remove();
    });
    
    socket.on("chat message", function (data) {
        addNewMessage({ user: data.nick, message: data.message });
    });
}