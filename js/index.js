// Función que realiza una condicional, si los datos en el sessionStorage "user" y "pass" son nulos, redirecciona al login
// De esta manera se evalua so el usuario esta logueado o no.

function redirect(){
    let user = sessionStorage.getItem("name");
    let pass = sessionStorage.getItem("password");

    if (user == null && pass == null){
        window.location.href = "login.html";
    }
}
redirect();