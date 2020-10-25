const dolar = 40;
var article1 = {};
var article2 = {};
var costUnit1 = 0;
var costUnit2 = 0;
var num = 0;
var num2 = 0;
var total1;
var total2;
var transfer = '';
var card = '';
var SUCCESS_MSG = "¡Se ha realizado la compra con éxito!";
var ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
var METHOD1 = "Transferencia Bancaria";
var METHOD2 = "Tarjeta de Credito";
let shippingPercentage = 0;
let msgToShowHTML = document.getElementById("resultSpan");
let msgToShow = "";


//Función que actualiza los costos de sub total, envio y total
function showCost(){
    let showP = document.getElementById("productCostText");
    let showE = document.getElementById("envioCost");
    let showT = document.getElementById("totalCost");
    let subtotal;
    let total;
    let envio;
    let conv = dolar * 12500;

    num = localStorage.getItem("number1");
    num2 = localStorage.getItem("number2");
    
    subtotal = (num * 100) + (conv * num2);
    envio = Math.round((shippingPercentage * subtotal));
    total = subtotal + envio;

    showP.innerHTML = 'UYU' + ' ' + subtotal;
    showE.innerHTML = 'UYU' + ' ' + envio;
    showT.innerHTML = 'UYU' + ' ' + total;
}

//Funciones que muestran los metodos de pago.
function showMethodT(){
    let showM = document.getElementById("method-pay");
    showM.innerHTML= METHOD1;
}

function showMethodC(){
    let showM = document.getElementById("method-pay");
    showM.innerHTML= METHOD2;
}

document.addEventListener("DOMContentLoaded", function (ex) {
    
//Función que obtiene el numero ingresado en el input, lo guarda en una variable.
    document.getElementById("number1").addEventListener("click", function () {
        num = document.getElementById("number1").value;
        localStorage.setItem("number1", num);
        showCost()
    });

//Función que obtiene el numero ingresado en el input, lo guarda en una variable.
    document.getElementById("number2").addEventListener("click", function () {
        num2 = document.getElementById("number2").value;
        localStorage.setItem("number2", num2);
        showCost()
    });

//Función que escucha el evento del button radio, calcula el porcentaje de envio y ejecuta otra función.
    document.getElementById("premiumradio").addEventListener("change", function(){
        shippingPercentage = 0.15;
        showCost();
    });

    document.getElementById("expressradio").addEventListener("change", function(){
        shippingPercentage = 0.07;
        showCost();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        shippingPercentage = 0.05;
        showCost();
    });

//Función que escucha el evento del button radio y ejecuta otra función para mostrar el metodo de pago.
    document.getElementById("trasnfer-bank-radio").addEventListener("change", function(){
        showMethodT();
    });
    document.getElementById("credit-card-radio").addEventListener("change", function(){
        showMethodC();
    });

//Función que evaluá el método de pago, captura la selección de los radiobutton
//Aplicando la habilitación o des habilitación de la opción de pago.

    document.getElementById("trasnfer-bank-radio").addEventListener("change",function(){
        let parentID = document.getElementById("form-transfer-bank");
        let childsID = parentID.querySelectorAll('*[id]');

        for(var i=0; i < childsID.length; ++i){
            childsID[i].disabled = false;
        }

        let parentID1 = document.getElementById("form-cart-number");
        let childsID1 = parentID1.querySelectorAll('*[id]');
        
        for(var i=0; i < childsID1.length; ++i){
            childsID1[i].disabled = true;
        }
    });

    document.getElementById("credit-card-radio").addEventListener("change",function(){
        let parentID = document.getElementById("form-cart-number");
        let childsID = parentID.querySelectorAll('*[id]');

        for(var i=0; i < childsID.length; ++i){
            childsID[i].disabled = false;
        }

        let parentID1 = document.getElementById("form-transfer-bank");
        let childsID1 = parentID1.querySelectorAll('*[id]');
        
        for(var i=0; i < childsID1.length; ++i){
            childsID1[i].disabled = true;
        }
    });

// Formulario ALert
//Se obtiene el formulario de publicación de producto.
    var sellForm = document.getElementById("sell-info");

//Se agrega una escucha en el evento 'submit' que será
//lanzado por el formulario cuando se seleccione 'Finalizar Compra'.
    sellForm.addEventListener("submit", function(e){

        let shippingName = document.getElementById("shippingName");
        let shippingE = document.getElementById("shippingE");
        let numberDoor = document.getElementById("numberDoor");
        let phoneNumber = document.getElementById("phoneNumber");
        let cantNumber1 = document.getElementById("number1");
        let cantNumber2 = document.getElementById("number2");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        shippingName.classList.remove('is-invalid');
        shippingE.classList.remove('is-invalid');
        numberDoor.classList.remove('is-invalid');
        phoneNumber.classList.remove('is-invalid');
        cantNumber1.classList.remove('is-invalid');
        cantNumber2.classList.remove('is-invalid');        

//Se realizan los controles necesarios,

        //Consulto por el nombre de la calle.
        if (shippingName.value === "")
        {
            shippingName.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la esquina.
        if (shippingE.value === "")
        {   
            shippingE.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el nombre número de puerta.
        if (numberDoor.value <=0)
        {
            numberDoor.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la cantidad de producto 1.
        if(cantNumber1.value <=0){
            cantNumber1.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la cantidad de producto 2.
        if(cantNumber2.value <=0){
            cantNumber2.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por número de télefono.
        if (phoneNumber.value <=0)
        {
            phoneNumber.classList.add('is-invalid');
            infoMissing = true;
        }
     
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles.

            getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";

                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                    document.getElementById("alertResult").classList.add('alert-success');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alertResult").classList.add('alert-danger');
                }

                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }

//Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
           // return true;
    });

    getJSONData(CART_TWO_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            art = resultObj.data;

            article1 = document.getElementById("art1");
            article2 = document.getElementById("art2");
            costUnit1 = document.getElementById("costUnit1");
            costUnit2 = document.getElementById("costUnit2");
            num = document.getElementById("number1");
            num2 = document.getElementById("number2");

            for (let i = 0; i < art.articles.length; i++) {
                article1.innerHTML = art.articles[0].name;
                costUnit1.innerHTML = + art.articles[0].unitCost + ` ` + art.articles[0].currency;
                num.value = art.articles[0].count;

                if (art.articles[i]) {
                    article2.innerHTML = art.articles[i].name;
                    costUnit2.innerHTML = + art.articles[i].unitCost + ` ` + art.articles[i].currency;
                    num2.value = art.articles[i].count;
                }
            }
        }
    });
});
