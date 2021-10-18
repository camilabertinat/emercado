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

function cal_artsub(cost, i) {
    let totalCount = parseInt(document.getElementById(`cantidad${i}`).value);
    prodTot = (totalCount * cost)
    document.getElementById(`articleTot${i}`).innerHTML = prodTot;
    cal_subtot();
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
                <td rowspan="2"><img width=150px src="${b_product.src}" alt="${b_product.name}" class="img-thumbnail"></td>
                <td><p  class="font-weight-bold">${b_product.name}</p> <br> <h6> UYU ${b_product.unitCost}</h6> </td>
                <td class="text-center"><input onchange="cal_artsub(${uyuCost}, ${i})" type="number" id="cantidad${i}" value="${b_product.count}" style="width:50px;" min="1"></td>
                <td class="text-center">UYU <span class="artTot" id="articleTot${i}">${prodTot}</span></td>
            </tr> <br>
            `}

        document.getElementById("cartitems").innerHTML = cartcontent;
    }
    cal_subtot();
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            b_productsArray = resultObj.data.articles;
            showCart(b_productsArray);
        }
    });
});
