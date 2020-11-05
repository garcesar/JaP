const ORDER_ASC = "ASC";
const ORDER_DESC = "DES";
const ORDER_BY_PROD_COUNT = "Relevancia. ";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var alto =$(window).height();
var ancho =$(window).width();

// Comienzo de filtrado
    function sortCategories(criteria, array){
        let result = [];
        if (criteria === ORDER_ASC)
        {
            result = array.sort(function(a1, b2) {
                let a = parseInt(a1.cost);
                let b = parseInt(b2.cost);
                
                if ( a < b ){ return -1; }
                if ( a > b ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_DESC){
            result = array.sort(function(a1, b2) {
                let a = parseInt(a1.cost);
                let b = parseInt(b2.cost);

                if ( a > b ){ return -1; }
                if ( a < b ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_PROD_COUNT){
            result = array.sort(function(a, b) {
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);

                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            });
        }

        return result;
    }

//Función que muestra los productos.
    function showProductsList(){
        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductArray.length; i++){
            let product = currentProductArray[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))){
                
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos</small>
                            </div>
                            <p class="mb-1">` + product.description + `</p>
                            <p class ="mb-1"> `+ product.cost + ' ' + product.currency + ` </p>
                        </div>
                    </div>
                </a>
                ` 
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }

//Función que muestra los productos en formato de grilla cuando la pagina se redimensiona
    function showProductsList_redimen(){

        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductArray.length; i++){
            let product = currentProductArray[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))){
          
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                            <p class="mb-1">` + product.description + `</p>
                            <p class ="mb-1"> `+ product.cost + ' ' + product.currency + ` </p>
                        </div>
                    </div>
                </div>
                </a>
                `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }

    $(window).resize(function(){
        //aqui el codigo que se ejecutara cuando se redimencione la ventana
        alto=$(window).height();
        ancho=$(window).width();
        showProductsList_redimen();
        //alert("alto: "+alto+" ancho:"+ancho);
        })

// Spinner
    showSpinner();
    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                currentProductArray = resultObj.data;
                //Muestro las categorías ordenadas
                showProductsList(currentProductArray);
            }
            hideSpinner();
        });
    });

// Continua el filtrado

    function sortAndShowCategories(sortCriteria, categoriesArray){
        currentSortCriteria = sortCriteria;

        if(categoriesArray != undefined){
            currentProductArray = categoriesArray;
        }

        currentProductArray = sortCategories(currentSortCriteria, currentProductArray);
        
        //Aqui el codigo que se ejecutara cuando se redimencione la ventana
        //Muestro las categorías ordenadas
        if(alto <= 989 && ancho <= 508){
            showProductsList_redimen();
        }else{
            showProductsList();
        }
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowCategories(ORDER_ASC, resultObj.data);
            }
        });

        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_ASC);
        });

        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_DESC);
        });

        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowCategories(ORDER_BY_PROD_COUNT);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            minCount = undefined;
            maxCount = undefined;

            //Aqui el codigo que se ejecutara cuando se redimencione la ventana
            //Muestro las categorías ordenadas
            if(alto <= 989 && ancho <= 508){
                showProductsList_redimen();
            }else{
                showProductsList();
            }
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }

            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }

            //Aqui el codigo que se ejecutara cuando se redimencione la ventana
            //Muestro las categorías ordenadas
            if(alto <= 989 && ancho <= 508){
                showProductsList_redimen();
            }else{
                showProductsList();
            }
        });
    });