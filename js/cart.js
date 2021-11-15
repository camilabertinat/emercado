//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var b_productsArray = []



function cal_subtot() {
    let subtotal = 0;
    let subs = document.getElementsByClassName("artTot");
    for (let i = 0; i < subs.length; i++) {
        subtotal += parseInt(subs[i].innerHTML);
    }
    document.getElementById("subtot").innerHTML = "Subtotal: UYU " + subtotal;
}
function cal_shipping() {
    let subtotal = 0
    let subs = document.getElementsByClassName("artTot");
    for (let i = 0; i < subs.length; i++) {
        subtotal += parseInt(subs[i].innerHTML);
    }
    if (document.getElementById("premium").checked == true) {
        let s_cost = Math.round (subtotal * 0.15);
        document.getElementById("shipping").innerHTML = "Envío: UYU " + s_cost;
        let total = (s_cost + subtotal)
        document.getElementById("tot").innerHTML = "Total: UYU " + total;
    }
    else if (document.getElementById("express").checked == true) {
        let s_cost = Math.round (subtotal * 0.07);
        document.getElementById("shipping").innerHTML = "Envío: UYU " + s_cost;
        let total = (s_cost + subtotal)
        document.getElementById("tot").innerHTML = "Total: UYU " + total;
    }
    else {
        let s_cost =  Math.round (subtotal * 0.05);
        document.getElementById("shipping").innerHTML = "Envío: UYU " + s_cost;
        let total = (s_cost + subtotal)
        document.getElementById("tot").innerHTML = "Total: UYU " + total;
    }
    
}


function cal_artsub(cost, i) {
    let totalCount = parseInt(document.getElementById(`cantidad${i}`).value);
    prodTot = (totalCount * cost);
    document.getElementById(`articleTot${i}`).innerHTML = prodTot;
    cal_subtot();
    cal_shipping();
}

function delete_item(b_productsArray, i){  
    b_productsArray.splice(i, 1);
    showCart(b_productsArray);
}

function showCart(b_productsArray) {
    let cartcontent = "";
    for (let i = 0; i < b_productsArray.length; i++) {
        let b_product = b_productsArray[i];

        if (b_product.currency == "USD") {
            let uyuCost = (b_product.unitCost * 40)
            let prodTot = (b_product.count * uyuCost);
            cartcontent += `
        <tr>
            <td class="text-center"><button class="delete" onclick="delete_item(b_productsArray, ${i})"><i class="fa fa-times" aria-hidden="true"></i></button> </td>
            <td rowspan="2"><img width=150px src="${b_product.src}" alt="${b_product.name}" class="img-thumbnail"></td>
            <td><p  class="font-weight-bold">${b_product.name}</p> <br> <h6> UYU ${uyuCost}</h6> </td>
            <td class="text-center"><input onchange="cal_artsub(${uyuCost}, ${i})" type="number" id="cantidad${i}" value="${b_product.count}" style="width:50px;" min="1"></td>
            <td class="text-center">UYU <span class="artTot" id="articleTot${i}">${prodTot}</span></td>
            
        </tr> <br>
        `
        } else {
            let uyuCost = b_product.unitCost;
            let prodTot = (b_product.count * b_product.unitCost);
            cartcontent += `
            <tr>
             <td class="text-center"><button class="delete"  onclick="delete_item(b_productsArray, ${i})"})"><i class="fa fa-times" aria-hidden="true"></i></button> </td>
                <td rowspan="2"><img width=150px src="${b_product.src}" alt="${b_product.name}" class="img-thumbnail"></td>
                <td><p  class="font-weight-bold">${b_product.name}</p> <br> <h6> UYU ${b_product.unitCost}</h6> </td>
                <td class="text-center"><input onchange="cal_artsub(${uyuCost}, ${i})" type="number" id="cantidad${i}" value="${b_product.count}" style="width:50px;" min="1"></td>
                <td class="text-center">UYU <span class="artTot" id="articleTot${i}">${prodTot}</span></td>
                
            </tr> <br>
            `}
        
        document.getElementById("cartitems").innerHTML = cartcontent;
    }
    cal_subtot();
    cal_shipping();
}

function payment_form(){
    if(document.getElementById("bank").checked == true){
        document.getElementById("v_card").disabled = true;
        document.getElementById("n_card").disabled = true;
        document.getElementById("nt_card").disabled = true;
        document.getElementById("md_card").disabled = true;
        document.getElementById("yd_card").disabled = true;
        document.getElementById("n_bank").disabled = false;
    }
    else if (document.getElementById("card").checked == true){
        document.getElementById("n_bank").disabled = true;
        document.getElementById("v_card").disabled = false;
        document.getElementById("n_card").disabled = false;
        document.getElementById("nt_card").disabled = false;
        document.getElementById("md_card").disabled = false;
        document.getElementById("yd_card").disabled = false;
    }

}



function payment_validate(){
    let flag = true;
    let fb0 = "";
    let fb1 = "";
    let fb2 = "";
    let fb3 = "";


    if(document.getElementById("bank").checked == true){
        if(document.getElementById("n_bank").value == ""){
            flag = false;
            fb3 = "Debe ingresar un número de cuenta <br>"
        }
    }
    
    else if (document.getElementById("card").checked == true){
        if(document.getElementById("nt_card").value == ""){
            flag = false;
            fb0 = "Debe ingresar el nombre del titular <br>"
        }
        if(document.getElementById("n_card").value == ""){
            flag = false;
            fb1 = "Debe ingresar el número de la tarjeta <br>"
        }
        if( document.getElementById("v_card").value == "" ||  document.getElementById("v_card").value.length > 3 ||  document.getElementById("v_card").value.length < 3){
            flag = false;
            fb2 = "Debe ingresar un número de tres dígitos <br>"
        }
    }
    
    document.getElementById("fb0").innerHTML = fb0;
    document.getElementById("fb1").innerHTML = fb1;
    document.getElementById("fb2").innerHTML = fb2;
    document.getElementById("fb3").innerHTML = fb3;
    return flag;
  
}


function purchase_validate(){
    let flag02 = true;
    let fb0 = "";

    if(document.getElementById("street").value == "" || document.getElementById("numbering").value == "" || document.getElementById("s_corner").value == "" || document.getElementById("country").value == ""){
            flag02 = false;
            fb0 = "Todos los campos deben estar completos"
        }
    
    
    document.getElementById("p_val").innerHTML = fb0;
    return flag02;
} 


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            b_productsArray = resultObj.data.articles;
            showCart(b_productsArray);
        }
    });
});

          document.getElementById("f_compra").addEventListener('submit', function (event) {
            if (!purchase_validate()) {
                event.preventDefault()
                event.stopPropagation()
            }
            else if (document.getElementById("bank").checked != true && document.getElementById("card").checked != true)
            {
                event.preventDefault()
                event.stopPropagation()
                document.getElementById("p_val").innerHTML += "Debes elegir una forma de pago"
            }
            else if (!payment_validate()){
                event.preventDefault()
                event.stopPropagation()
                document.getElementById("p_val").innerHTML += "Debes completar el formulario de pagos"
            }
           
            else{
                document.getElementById("fb0").innerHTML = "";
                document.getElementById("f_payment").submit();
            }
        })