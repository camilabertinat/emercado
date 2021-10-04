//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = []
function showProduct(product){
    let htmlContentToAppend = "";
        
        htmlContentToAppend += `
        <div>
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> <br><br>
                </div>
            </div>
            <div>
                <img src="img/${product.name}.jpg" + " alt="` + product.description + `" class="img-thumbnail" width=295 >
                <img src="img/${product.name}_1.jpg" + " alt="` + product.description + `" class="img-thumbnail" width=295>
                <img src="img/${product.name}_2.jpg" + " alt="` + product.description + `" class="img-thumbnail" width=295>
                <img src="img/${product.name}_3.jpg" + " alt="` + product.description + `" class="img-thumbnail" width=295>
                <img src="img/${product.name}_4.jpg" + " alt="` + product.description + `" class="img-thumbnail" width=295>
            </div>
            <div>
                <p> Precio: `+ product.currency +` `+ product.cost + `</p> 
                <p> Vendidos: `+ product.soldCount +`</p> 
                <p> Categoría: `+ product.category +`</p>
            </div>
        </div>
        <div>

        </div>
        `
        document.getElementById("desc").innerHTML = htmlContentToAppend; 
}

function relProducts(productsArray){
    let contenido = "";
    
    for (let i = 0; i < productsArray.length; i++){ 
        function productw() {
            let product = productsArray[i];
            return product;
        }

        let related1 = product.relatedProducts[0];
        let related2 = product.relatedProducts[1];

        if (related1 === productsArray.findIndex(productw) || productsArray.findIndex(productw) === related2){
        
        contenido +=`
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+ product.name +`</h4> 
                    <p> `+ product.description +`</p> <br><br>
                </div>
            </div>
        </div>
        </div>`

        document.getElementById("rel").innerHTML = contenido; 
    }
    }
}
function showComments(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < commentsArray.length; i++){ 
        let comment = commentsArray[i];
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div>
                <p> <b>Usuario: `+comment.user+`</b> en  <i>`+comment.dateTime+`</i></p>
                <p>`+comment.description+`</p>
                <p><strong>Calificación: `+comment.score+`/5</strong></p>
            </div>
        </div>
        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend; 
}
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") 
        productsArray = resultObj.data;{
            resultObj.data.forEach(products => {
                if (products.name == JSON.parse(localStorage.getItem('id')).productname) {
                    product = products;
                    showProduct(product);
                }
            });
        relProducts(productsArray);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    });


});
document.addEventListener("DOMContentLoaded", function (e) {
   
});
