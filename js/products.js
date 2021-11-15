//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];
var currentProductsArray = [];
var p_search; 

const precioAsc = "12";
const precioDesc = "21";
const cantidadVendidos = "Cant."



function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < productsArray.length; i++){ 
        let product = productsArray[i];
        
        htmlContentToAppend += `
        <div class="col-md-4 nomargin">
            
                <div class="card mb-4 shadow-">
                <a href="product-info.html" onclick="store('`+ product.name + `')">
                    <img class="card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `">
                    <div class="card-body">
                        <h5> `+ product.name + `</h5>
                        <p class="card-text">` + product.description + `</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                            <h6>` + product.currency + ` ` + product.cost + `</h6>
                            </div>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                    </div>
                </a>
                </div>
            
        </div>
        `
        
        
        document.getElementById("products").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});

var maxCost;
var minCost;

function showProducts(array){
    let listaprod="";
    for (let i=0; i< array.length; i++){
        let product=array[i];

        if(((minCost == undefined) || (parseInt(product.cost) >= minCost)) && 
        ((maxCost==undefined) || (parseInt(product.cost) <= maxCost))){

            if (p_search == undefined || product.name.toLowerCase().indexOf(p_search) != -1 || product.description.toLowerCase().indexOf(p_search) != -1 ) 
        listaprod+=`
        <div class="col-md-4 nomargin">
            
                <div class="card mb-4 shadow-">
                <a href="product-info.html" onclick="store('`+ product.name + `')">
                    <img class="card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `">
                    <div class="card-body">
                        <h5> `+ product.name + `</h5>
                        <p class="card-text">` + product.description + `</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                            <h6>` + product.currency + ` ` + product.cost + `</h6>
                            </div>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                    </div>
                </a>
                </div>
            
        </div>
        `
    
        }
        document.getElementById("products").innerHTML = listaprod; 
}    
}
document.getElementById("filtrocost").addEventListener("click", function (){
    minCost = document.getElementById("minc").value;
    maxCost = document.getElementById("maxc").value;

    
    if ((minCost!=undefined) && (minCost !="") && (parseInt(minCost) >=0)) {
        minCost=parseInt(minCost);
    }
    else {
        minCost=undefined;
    }

    if ((maxCost!=undefined) && (maxCost !="") && (parseInt(maxCost) >=0)) {
        maxCost=parseInt(maxCost);
    }
    else {
        maxCost=undefined;
    }

    showProducts(productsArray);
});

document.getElementById("limpiocost").addEventListener("click", function(){
    minCost = document.getElementById("minc").value = undefined;
    maxCost = document.getElementById("maxc").value = undefined;


    showProductsList(productsArray);
});


function sortProducts(criteria, array){
    let listaordenada = [];
  if (criteria === precioAsc)
   {
    result = array.sort(function(a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);
      return aCost - bCost;
    });
    }else if (criteria === precioDesc){
     result = array.sort(function(a, b) {
     let aCost = parseInt(a.cost);
     let bCost = parseInt(b.cost);
      return  bCost - aCost;
     });
  }else if (criteria === cantidadVendidos){
    result = array.sort(function(a, b) {
    let aCount = parseInt(a.soldCount);
    let bCount = parseInt(b.soldCount);
    if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    }); 
}

   return listaordenada;
}

function sortProductsandShow(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

    document.getElementById("ordenarAsc").addEventListener("click", function(){
    sortProductsandShow(precioAsc, productsArray);
    });

    document.getElementById("ordenarDesc").addEventListener("click", function(){
    sortProductsandShow(precioDesc, productsArray);
    });

    document.getElementById("ordenarVendidos").addEventListener("click", function(){
    sortProductsandShow(cantidadVendidos, productsArray);
    });

    document.getElementById("search").addEventListener('input', function () {

        p_search = document.getElementById("search").value.toLowerCase();

        showProducts(productsArray);

    });
    document.getElementById("c_search").addEventListener("click", function () {
        document.getElementById("search").value = "";
        p_search = undefined;
        showProducts(productsArray);
    });

function store(id){
        localStorage.setItem("id", JSON.stringify({productname:id}));
    }