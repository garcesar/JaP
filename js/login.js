//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

// Función que guarda los datos ingresados por el usuario en variable "user" y "pass".

function save_sessionStorage() {
    let user = document.getElementById("name").value;
    sessionStorage.setItem("name", user);

    let pass = document.getElementById("password").value;
    sessionStorage.setItem("password",pass);
}

//Función que obtiene los datos guardados en el sessionStorage
// Realiza una evaluación condicional, donde si hay datos cargados en el sessionStorage da la bienvenida al usuario
// si no, solicita que ingrese usuario y contraseña para registrarlos. 

function get_sessionStorage() {
    let user;
    let pass;

    if ( sessionStorage.getItem("name") && sessionStorage.getItem("password") ) {
        
        user = sessionStorage.getItem("name");
        pass = sessionStorage.getItem("password");
        alert('Bienvenido a e-MERCADO ' + user );
        rediret();
    }else if (user == null && pass == null) {
            alert('Por favor ingrese su usuario y contraseña para ingresar');    
        }
}

// Función que redirecciona a la página del index.
function rediret(){
        window.location.href = "index.html";
}
