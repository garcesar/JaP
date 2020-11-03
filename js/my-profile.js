var SUCCESS_MSG = "¡Se han guardado los datos con exito!";
var l = localStorage;

//Se agrega una escucha a cada 'input' que será
//de forma tal que se almacene lo ingresado en localStorage.
    firstName.addEventListener("focusout", function() {
        l.setItem("firstName", firstName.value);
    })
    
    secondName.addEventListener("focusout", function() {
        l.setItem("secondName", secondName.value);
    })
    
    lastName.addEventListener("focusout",function(){
        l.setItem("lastName",lastName.value);
    })

    secondSurname.addEventListener("focusout",function(){
        l.setItem("secondSurname",secondSurname.value);
    })

    email.addEventListener("focusout", function() {
        l.setItem("email", email.value);
    })

    phoneNumber.addEventListener("focusout",function(){
        l.setItem("phoneNumber",phoneNumber.value);
    })

//Obtengo lo ingresado en el localStorage
    function getlocal_Storage(){
        firstName.value = l.getItem("firstName");
        secondName.value = l.getItem("secondName");
        lastName.value = l.getItem("lastName");
        secondSurname.value = l.getItem("secondSurname");
        email.value = l.getItem("email");
        phoneNumber.value = l.getItem("phoneNumber");
    }

//Se agrega una escucha en el evento 'submit' que será
//lanzado por el formulario cuando se seleccione 'Guardar Cambios'.
sellForm.addEventListener("submit", function(e){   

    let msgToShowHTML = document.getElementById("resultSpan");
    let msgToShow = "";

    msgToShow = SUCCESS_MSG;
    document.getElementById("alertResult").classList.add('alert-success');

    msgToShowHTML.innerHTML = msgToShow;
    document.getElementById("alertResult").classList.add("show");

    //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
    if (e.preventDefault) e.preventDefault();
    return true;
});

//Se agrega un escucha al documento HTML para cuando se termine de renderizar el contenido 
// ejecute la función que obtiene los datos del localStorage.
document.addEventListener("DOMContentLoaded", getlocal_Storage);