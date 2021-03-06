var product = {};
var productComment = {};
var productRelated = {};

// Función que muestra la galeria de productos
    function showImagesGallery(array){

        let htmlContentToAppend = "";

        for(let i = 0; i < array.length; i++){
            let imageSrc = array[i];
            
            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
                </div>
            </div>
            `
           
            document.getElementById("product-image-container").innerHTML = htmlContentToAppend;
        }
    }

// Función que muestra los productos relacionados
    function showRelated(array){

        let htmlContentToAppend = "";

        for(let i = 0; i < array.length; i++){
            let related = array[i];

            if(related.imgSrc === "img/prod2.jpg"){
                htmlContentToAppend += `
                <a href="products.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-6">
                            <div class="d-block mb-4 h-100">
                                <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
                            </div>
                        </div>
                        <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ related.name +`</h4>
                                </div>
                                <p class="mb-1">` + related.description + `</p>
                        </div>
                    </div>
                </a>
                `
            }     
        }

        for(let i = 0; i < array.length; i++){
            let related = array[i];

            if(related.imgSrc === "img/prod4.jpg"){
                htmlContentToAppend += `
                <a href="products.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-6">
                            <div class="d-block mb-4 h-100">
                                <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
                            </div>
                        </div>
                        <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ related.name +`</h4>
                                </div>
                                <p class="mb-1">` + related.description + `</p>
                        </div>
                    </div>
                </a>
                `
            }     
        }
        document.getElementById("product-related-container").innerHTML = htmlContentToAppend;
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                product = resultObj.data;

                let productNameHTML  = document.getElementById("productName");
                let productCostNameHTML = document.getElementById("productCost")
                let productDescriptionHTML = document.getElementById("productDescription");
                let productCategoryHTML = document.getElementById("productCategory");
                let productCountHTML = document.getElementById("productSoldCount");
            
                productNameHTML.innerHTML = product.name;
                productCostNameHTML.innerHTML = product.cost + " " + product.currency;
                productDescriptionHTML.innerHTML = product.description;
                productCategoryHTML.innerHTML = product.category;
                productCountHTML.innerHTML = product.soldCount;

//Muestro las imagenes en forma de galería
                showImagesGallery(product.images);
            }
        });
        
    });

//Productos
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productRelated = resultObj.data;
// Función que muestra la relación de los productos
                showRelated(productRelated);
            }
        });    
    });

//Comentarios:
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productComment = resultObj.data;

            showComments(productComment);
        }
    }); 

//Función que lista los comentarios
    function showComments(array){

        let htmlContentToAppend = "";

        for(let i = 0; i < array.length; i++){
            let comment = array[i];

            A = `<span class= "fa fa-star checked"></span>`;
            a = A.repeat(comment.score);
            B = `<span class= "fa fa-star"></span>`;
            b = B.repeat(5 - comment.score);

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-4">
                            <h6 class="mb-1"><strong>`+ " " + comment.user +": " + `</strong> `+ a + b +` </h6>
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-10">`+ comment.description +`</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <small class="text-muted">`+ comment.dateTime +`</small>        
                    </div>
                </div>
                `       
        }
        document.getElementById("prod-comment-container").innerHTML = htmlContentToAppend;
    }
// Función que guarda los datos del formulario para un nuevo comentario
// Se almacena en sessionStorage
// Se realiza un push sobre el array de los comentarios del JSON
// Se llama a la Función que lista los comentarios

function up_comment(){    

        let new_comment = document.getElementById("new_comment").value;
        sessionStorage.setItem("new_coment", new_comment);

        let score = document.getElementById("score").value;
        sessionStorage.setItem("score", score);

        productComment.push ({
            "description": document.getElementById("new_comment").value,
            "user": sessionStorage.getItem("name"),
            "score": sessionStorage.getItem("score"),
            "dateTime": new Date()
        });

        showComments(productComment);
    }
