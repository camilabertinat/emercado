//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = []
var productoArray = []
function showProduct(product) {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div>
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + `</h4> 
                        <p> `+ product.description + `</p> <br><br>
                </div>
            </div>
            <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators ">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
    <div class="d-flex justify-content-center">
    <img src="img/${product.name}.jpg" + " alt="` + product.description + `" width=600 >  
    </div>
      </div>
    <div class="carousel-item">
    <div class="d-flex justify-content-center">
    <img src="img/${product.name}_1.jpg" + " alt="` + product.description + `" width=600 >  
    </div>
    </div>
    <div class="carousel-item">
    <div class="d-flex justify-content-center">
    <img src="img/${product.name}_2.jpg" + " alt="` + product.description + `" width=600 >  
    </div>
    </div>
    <div class="carousel-item">
    <div class="d-flex justify-content-center">
    <img src="img/${product.name}_3.jpg" + " alt="` + product.description + `" width=600 >  
    </div>
    </div>
    <div class="carousel-item">
    <div class="d-flex justify-content-center">
    <img src="img/${product.name}_4.jpg" + " alt="` + product.description + `" width=600 >  
    </div>
    </div>
  </div>
  <a class="carousel-control-prev caroucolor" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next caroucolor" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
                <br>
            <div>
                <p> Precio: `+ product.currency + ` ` + product.cost + `</p> 
                <p> Vendidos: `+ product.soldCount + `</p> 
                <p> Categoría: `+ product.category + `</p>
            </div>
        </div>
        <div>

        </div>
        `
    document.getElementById("desc").innerHTML = htmlContentToAppend;
}

function relProducts(product, productoArray) {
    let contenido = "";
    let related01 = product.relatedProducts[0];
    let related02 = product.relatedProducts[1];

    for (let i = 0; i < productoArray.length; i++) {
        let prod = productoArray[i];

        if (related01 === productoArray.indexOf(prod) || related02 === productoArray.indexOf(prod)) {
            contenido += `
            <a href="product-info.html" onclick="guardar('`+ prod.name + `')">
            <div class="list-group-item list-group-item-action">

                        <img src="`+ prod.imgSrc + `" width=200>
                        <h4>`+ prod.name + `</h4> <br> 
                        <p> `+ prod.description + `</p> <br><br>
                    </div>

            </div>
            </a>`

            document.getElementById("rel").innerHTML = contenido;
        }
    }
}

function showComments(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < commentsArray.length; i++) {
        let comment = commentsArray[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div>
                <p> <b>Usuario: `+ comment.user + `</b> en  <i>` + comment.dateTime + `</i></p>
                <p>`+ comment.description + `</p>
                <div class="star-rating2">
                    <input id="star-11" type="radio" name="rating" value="11"  />
                    <label for="star-11" title="11 stars">
                    <i id="1_${i}" class=" fa fa-star"></i>
                    </label>
  
                    <input id="star-22" type="radio" name="rating" value="22"/>
                    <label for="star-22" title="22 stars">
                    <i id="2_${i}" class=" fa fa-star"></i>
                    </label>
  
                    <input id="star-33" type="radio" name="rating" value="33"/>
                    <label for="star-33" title="33 stars">
                    <i id="3_${i}" class=" fa fa-star"></i>
                    </label>
  
                    <input id="star-44" type="radio" name="rating" value="44" />
                    <label for="star-44" title="44 stars">
                    <i id="4_${i}" class="fa fa-star"></i>
                    </label>
  
                    <input id="star-55" type="radio" name="rating" value="55" checked/>
                    <label for="star-55" title="55 star">
                    <i id="5_${i}" class=" fa fa-star"></i>
                    </label>
                </div> 
            </div>
        </div>
        `


        document.getElementById("comentarios").innerHTML = htmlContentToAppend;



    }

    for (let i = 0; i < commentsArray.length; i++) {
        let comment = commentsArray[i];

        let max = comment.score - 1
        let puntos = comment.score - (comment.score - 1)
        let p_array = [puntos]
        for (var x = 0; x < max; x++) {
            p_array.push(puntos + 1)
            puntos += 1;
        }

        for (let j = 0; j < p_array.length; j++) {
            let punto = p_array[j];
            document.getElementById(punto + "_" + i).classList.add("yellow");
        }


    }
}

function addComment(){
    correo_json = localStorage.getItem("correo");
    correo = JSON.parse(correo_json);
    const d = new Date();
    let yy = d.getFullYear();
    let mem = d.getMonth();
    let dd = d.getDate();
    let hh = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();



    if (document.getElementById("comdesc").value != ""){
        let myComment = {
            score: parseInt(document.getElementById('com')['rating'].value),
            description: document.getElementById("comdesc").value,
            user: correo.e_mail,
            dateTime: yy + "-" + mem + "-" + dd + " " + hh + ":" + mm + ":" + ss,
           }
           commentsArray.push(myComment)
           showComments(commentsArray)
           
    }
       document.getElementById("comdesc").value = "";
       document.getElementById('star-1').checked = true;
  
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoArray = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok")
            productsArray = resultObj.data; {
            resultObj.data.forEach(products => {
                if (products.name == JSON.parse(localStorage.getItem('id')).productname || products.name == JSON.parse(localStorage.getItem('id')).productnamey) {
                    product = products;
                    showProduct(product);
                    relProducts(product, productoArray)
                }
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    });



});
document.addEventListener("DOMContentLoaded", function (e) {

});
function guardar(id) {
    localStorage.setItem("id", JSON.stringify({ productnamey: id }));
}
