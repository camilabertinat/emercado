//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function editprof(){
    let editprof = "";

    editprof += `
    <input class="formControl" type="file" id="inputFile" onchange="previewFile()" placeholder="">
        <img id="foto" src="" alt="Acá va la imagen" height="200">
        <button class="btn btn-primary" id="guardar" onclick="guardar()">Guardar</button>
 

    <h6>Nombres:</h6><input type="text" name="name" id="fs_name">
    <h6>Apellidos:</h6><input type="text" name="lname"id="l_name" >
    <h6>Edad:</h6><input type="number" name="age" min="18" id="p-age" >
    <h6>Teléfono de contacto</h6><input type="text" name="p-phone" id="p-phone"> <br><br>
    <button onclick="saveprofiledata(); chargeprofile(); " type="button" id="p_info" class="btn-me prof-btn" data-toggle="modal">Guardar datos</button>
    `
    document.getElementById("profile-info").innerHTML = editprof;
}


function saveprofiledata(){
    let pname = {
         pname: document.getElementById("fs_name").value  
    }
    let pname_json = JSON.stringify(pname);
    localStorage.setItem("pname", pname_json);


    let plname = {
        plname: document.getElementById("l_name").value
    }   
    let plname_json = JSON.stringify(plname);
    localStorage.setItem("plname", plname_json);

    let page = {
        page: document.getElementById("p-age").value
    }   
    let page_json = JSON.stringify(page);
    localStorage.setItem("page", page_json);

    let pphone = {
        pphone: document.getElementById("p-phone").value
    }   
    let pphone_json = JSON.stringify(pphone);
    localStorage.setItem("pphone", pphone_json);

}

function getName(){
    if (localStorage.getItem("pname")){
        pname_json = localStorage.getItem("pname");
        pname= JSON.parse(pname_json);
        document.getElementById("nombre").innerHTML += pname.pname;}
    return pname.pname;
}
function getLastName(){
    if (localStorage.getItem("plname")){
        plname_json = localStorage.getItem("plname");
        plname= JSON.parse(plname_json);
        document.getElementById("apellido").innerHTML += plname.plname;}
    return plname.plname;
}
function getAge(){
    if (localStorage.getItem("page")){
        page_json = localStorage.getItem("page");
        page = JSON.parse(page_json);
        document.getElementById("edad").innerHTML += page.page;}
    return page.page;
}
function getPhone(){
    if (localStorage.getItem("pphone")){
        pphone_json = localStorage.getItem("pphone");
        pphone = JSON.parse(pphone_json);
        document.getElementById("telefono").innerHTML += pphone.pphone;}
    return pphone.pphone;
}




function chargeprofile(){
    let profinfo="";
    profinfo +=`
    <img id="foto2" src="" alt="Acá va la imagen" height="200">
    <h5><span id="nombre">Nombre: </span> <br> <span id="apellido">Apellido: </span> </h5>
    <h6>Edad: <span id="edad"></span></h6>
    <h6 id="cemail">E-mail: </h6>
    <h6>Teléfono de contacto: <span id="telefono"></span></h6> <br>
    <button onclick="editprof()" type="button" id="p_info" class="btn-me prof-btn" data-toggle="modal">Edita tu perfil</button>
    </div>`
    document.getElementById("profile-info").innerHTML = profinfo;

    if (localStorage.getItem("correo")){
        correo_json = localStorage.getItem("correo");
        correo = JSON.parse(correo_json);
        document.getElementById("cemail").innerHTML += correo.e_mail;}

    getName();
    getLastName();
    getAge();
    getPhone();
    document.getElementById("foto2").src = (localStorage.getItem("laImagen"));
    
}

document.addEventListener("DOMContentLoaded", function (e){
    chargeprofile();
  
    });

function previewFile(){
        let preview = document.getElementById("foto");
        let file = document.getElementById("inputFile").files[0];

        let reader = new FileReader();

        reader.onload = function (){
            preview.src = reader.result;
        }

        if (file){
            reader.readAsDataURL(file)
        }
        else{
            preview.src = "img/avatar.png"

        }
    }

    function guardar(){
        let preview = document.getElementById("foto");
        localStorage.setItem("laImagen", JSON.stringify(preview.src))
        alert("imagen guardada");
    }

    