"use strict";

// ---------------------------------------------GESION DU MENU DEROULANT---------------------------------------------

let inboxPeopleChat = document.getElementById('inbox__people');
let chatId = document.querySelectorAll('.chat_ib');
let arrow = document.getElementById('icon-arrow');

let nbClicks = 0;

inboxPeopleChat.addEventListener('click', () => scrolllingMenuApparition())

function scrolllingMenuApparition()
{
    nbClicks++;
    if (nbClicks%2 != 0)
    {
        chatId[0].style.display = "none";
        arrow.style.rotate = "-180deg";
        arrow.style.transition = "0.5s"; 
        
    }
    else
    {
        chatId[0].style.display = "block"; 
        arrow.style.rotate = "0deg";
        arrow.style.transition = "0.5s"; 
    }

    console.log(nbClicks);
}

// ---------------------------------------------GESION DU SCROLLING---------------------------------------------

function updateScroll() {
    let inboxContainer = document.getElementById('inbox-container');
    inboxContainer.scrollTop = inboxContainer.scrollHeight;
}

setInterval(updateScroll,1000);