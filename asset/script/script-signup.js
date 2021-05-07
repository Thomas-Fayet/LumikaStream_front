

//--------------------------------------------- ENVOI FORMULAIRE INSCRIPTION ---------------------------------------------



let submitForm = document.getElementById('submitForm');


submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userName = document.getElementById('userName');
    let familyName = document.getElementById('name');
    let firstName = document.getElementById('firstName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let data = {
        userName: userName.value,
        familyName: familyName.value, 
        firstName: firstName.value,
        email: email.value, 
        password: password.value
    }

    console.log(data);
    var body = JSON.stringify(data)
    var headers = { 'Content-Type': 'application/json; charset=UTF-8'};

    let myInit = { 
        method: 'POST',
        headers: headers,
        body: body,
        mode: 'cors',
    };

    fetch('https://lumikastream.herokuapp.com/users/signup', myInit)
        .then(response => response.json())
        .then(response => {
            if (response.message){
                document.location.href = "./user.html";
            } else {
                window.alert('Le profil existe déjà');
            }      
        })
});

