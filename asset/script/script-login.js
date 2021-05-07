//--------------------------------------------- ENVOI FORMULAIRE CONNEXION ---------------------------------------------

let submitFormLogin = document.getElementById('submitFormLogin');


submitFormLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    let email= document.getElementById('email');
    let password= document.getElementById('password');

    let dataLogin = {
        email: email.value,
        password: password.value
    }

    console.log(email.value);
    console.log(password.value);

    var body = JSON.stringify(dataLogin)
    var headers = { 'Content-Type': 'application/json; charset=UTF-8'};

    let myInit = { 
        method: 'POST',
        headers: headers,
        body: body,
        mode: 'cors',
    };

    fetch('https://lumikastream.herokuapp.com/users/login', myInit)
        .then(response => response.json())
        .then(response => {
            if (response.userId && response.token){
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("token", response.token);
                document.location.href = "/user.html";
            } else {
                window.alert('Email ou Mot de passe incorrect');
            }      
        })
        console.log(fetch);    
});
