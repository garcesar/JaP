const dolar = 40;
var article1 = {};
var article2 = {};
var costUnit1 = 0;
var costUnit2 = 0;
var num = 0;
var num2 = 0;
var total1;
var total2;
let comissionPercentage = 0.13;

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
    envio = Math.round((comissionPercentage * subtotal));
    total = subtotal + envio;

    showP.innerHTML = 'UYU' + ' ' + subtotal;
    showE.innerHTML = 'UYU' + ' ' + envio;
    showT.innerHTML = 'UYU' + ' ' + total;
}

document.addEventListener("DOMContentLoaded", function (ex) {
    
//Función que obtiene el numero ingresado en el input, lo guarda en una variable y se imprime en sub Total
    document.getElementById("number1").addEventListener("click", function () {
        num = document.getElementById("number1").value;
        localStorage.setItem("number1", num);
        total1 = num * 100;
        document.getElementById("subTotal").innerHTML ='UYU'  + ' ' + total1;
        showCost()
    });

//Función que obtiene el numero ingresado en el input, lo guarda en una variable y se imprime en sub Total
    document.getElementById("number2").addEventListener("click", function () {
        num2 = document.getElementById("number2").value;
        localStorage.setItem("number2", num2);
        total2 = (40 * 12500) * num2;
        document.getElementById("subTotal2").innerHTML ='UYU'  + ' ' + total2;
        showCost()
    });

//Función que calcula el costo de envio
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.15;
        showCost();
    });

    document.getElementById("expressradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        showCost();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.05;
        showCost();
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
    })
});
