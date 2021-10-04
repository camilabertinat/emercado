//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("formu").addEventListener("submit", function(e){
        e.preventDefault();
        window.location.assign("inicio.html");
    });
    
});

function guardarDatos(){
    let correo = {
        e_mail: document.getElementById("email").value
    }   
    
    let correo_json = JSON.stringify(correo);
    
    localStorage.setItem("correo", correo_json);
}

function recuperarDatos(){
    if (localStorage.getItem("correo")){
        correo_json = localStorage.getItem("correo");
        correo = JSON.parse(n_usuario_json);
        document.getElementById("u_name").innerHTML =
        "Usuario: " + correo.e_mail;
    }
}

function borrarDatos(){
    localStorage.removeItem("correo");
}


