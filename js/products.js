//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>                    
                    </div>
                    <div>
                        <p class ="mb-1"> `+ category.description + ` </p>   
                        <p class ="mb-1"> `+ category.cost + ' ' + category.currency + ` </p>
                    </div>    
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

showSpinner();
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
        hideSpinner();
    });
});