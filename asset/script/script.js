"use strict";

// --------------------------------------------- DECLARATION DES VARIABLES ---------------------------------------------

let menuIcon = document.getElementById("menu-icon");
let menuBtn = document.getElementById("menu-btn");
let navBurger = document.getElementById("nav-burger");
let body = document.body;
let actualisation = window.sessionStorage;

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
let file = document.querySelector('input[type=file]').files;
let preview = document.getElementById('preview-image');
// let reader = new FileReader();
console.log(file);
console.log(file.type);
// console.log(reader);

let fileTypes = [
    'image/jpeg', 
    'image/png', 
    'image/jpg' 
]

btn.addEventListener("change", previewFile);


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


console.log(window.URL.createObjectURL(file[0]))

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