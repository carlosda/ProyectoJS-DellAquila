/* Datos para login de usuario */
const USER = "carlos@correo.com";
const PASS = "ingreso01";


/*
 *  Clase USUARIO: 
 *  Agrupa todos los datos y acciones referido a los usuarios.
 */

class Usuario {
    // Constructor usuario
    constructor(user, pass) {
        this.user = user;
        this.pass = pass;
    }

    // Método para comparar usuarios. 
    verificaLogin(user, pass) {

        let login = false;

        if ((this.user == user) && (this.pass == pass)) {

            //alert("Login exitoso!");
            login = true;

        } else {
            //alert("Usuario o contraseña incorrecto!, vuelca a intentar.");
            login = false;
        }

        return login;
    }
}

/*
 * Clase Medición
 */
class Medicion {
    constructor(objLiteral) {
        this.time = objLiteral.time;   // Formato hh:mm:ss,dd/MM/YYYY.
        this.value = parseFloat(objLiteral.value);  // Valor numerico.
        this.unit = objLiteral.unit;   // Unidad de medida (v, mV, uv, etc.)
    }

    getTime() {
        return this.time;
    }

    getValue() {
        return this.value;
    }

    getUnit() {
        return this.unit;
    }
}

/* Array objeto con mediciones previas */
const medPrevias = [
    {
        time: "10:00:00, 25/05/2022",
        value: 220,
        unit: "v",
    },
    {
        time: "11:00:00, 25/05/2022",
        value: 218,
        unit: "v",
    },
    {
        time: "12:00:00, 25/05/2022",
        value: 230,
        unit: "v",
    },
    {
        time: "13:00:00, 25/05/2022",
        value: 240,
        unit: "v",
    },
    {
        time: "14:00:00, 25/05/2022",
        value: 216,
        unit: "v",
    },
    {
        time: "15:00:00, 25/05/2022",
        value: 210,
        unit: "v",
    },
    {
        time: "16:00:00, 25/05/2022",
        value: 220,
        unit: "v",
    }
]; 


/* Lee las mediciones almacenadas, si no están carga una por defecto. */
const medAlmacenadas = JSON.parse(localStorage.getItem("mediciones")) || medPrevias;

/* Arrays para almacenar los valores previos y los que serán leídos por promt. */
const mediciones = [];

/* Cargo el arreglo previo */
for (const med of medAlmacenadas) {
    mediciones.push(new Medicion(med));
}

/* Creo Tabla HTML */
/* Genero la tabla */
let tabla = document.createElement("table");
tabla.className = "tabla";
tabla.id = "tablaValores";

/* Creo usuario por defecto */
const mUsuario = new Usuario(USER, PASS);
let login = false;


/* Oculta el contenido de la página y solo muestra el login */
let secInputData = document.getElementById("inputData");
secInputData.style.display = "none";

let secMuestraData = document.getElementById("muestraData");
secMuestraData.style.display = "none";

/* Formulario de login */
let inputUser = document.getElementById("inputUsuario");
let inputPass = document.getElementById("inputPassword");
let submitLogin = document.getElementById("loginForm");

submitLogin.addEventListener("submit", loginEvt);

function loginEvt(e) {
    e.preventDefault();
    let user = inputUser.value;
    let pass = inputPass.value;
    login = mUsuario.verificaLogin(user, pass);

    if (login) {

        /* Oculta la sección de login una vez que el mismo fue exitoso */
        let loginSec = document.getElementById("login");
        loginSec.style.display = "none";

        /* Muestra el resto de los elementos de la página */
        secInputData.style.display = "flex";
        secMuestraData.style.display = "flex";

        actualizaTabla();

    } else {

        let loginMal = document.getElementById("loginMal");
        loginMal.style.display = "block";
    }

    console.log("Login Exitoso");



}

/* Control de formulario para ingreso manual de los datos */
let inputInstante = document.getElementById("inputInstante");
let inputValor = document.getElementById("inputValor");
let inputUnidad = document.getElementById("inputUnidad");
let formCargaManual = document.getElementById("cargaManual");

formCargaManual.addEventListener("submit", cargaEvt);

function cargaEvt(e) {

    e.preventDefault();
    let time = inputInstante.value;
    let tension = inputValor.value;
    let unit = inputUnidad.value;

    let med = new Medicion({ time: time, value: tension, unit: unit });
    // Agrego el objeto al array de mediciones.
    mediciones.push(med);
    //  Almaceno mediciones.
    localStorage.setItem("mediciones", JSON.stringify(mediciones))
    // Actualiza tabla
    actualizaTabla();

    Swal.fire({
        title:'Nueva mediciòn cargada',
        icon: 'success',
        timer: 1500,
        showConfirmButton:false       
    }); 

}


class EstMediciones {
    constructor(objMediciones) {
        this.mediciones = objMediciones;
    }

    getPromedio() {

        let acumula = 0;

        for (const med of this.mediciones) {
            let { value } = med;
            acumula = acumula + value;
        }
        return (acumula / this.mediciones.length);
    }

    getMaximo() {

        let values = this.mediciones.map((el) => el.value);

        // obtengo el valor máximo.
        let max_value = Math.max(...values);

        let max = mediciones.find((el) => el.value == max_value);

        return max;
    }

    getMinimo() {
        let primeraMed = false;
        let min = new Medicion({ time: "", value: 0, unit: "" });

        for (const med of this.mediciones) {

            if (primeraMed == false) {
                primeraMed = true;
                min = med;
            } else {
                (med.getValue() < min.getValue()) ? min = med : null;
            }
        }

        return min;
    }
}


let est = new EstMediciones(mediciones);


/* Muestro por consola el resumen de los resultados */

console.log("=====================================================================================");
console.log("                               RESUMEN DE MEDICIONES                                 ");
console.log("=====================================================================================");
console.log("El promedio de los valores es " + est.getPromedio() + " voltios.");
console.log("La medición de MAYOR valor fue: " + est.getMaximo().getValue() + " voltios y ocurrió a las " + est.getMaximo().getTime());
console.log("La medición de MENOR valor fue: " + est.getMinimo().getValue() + " voltios y ocurrió a las " + est.getMinimo().getTime());

let rango = est.getMaximo().getValue() - est.getMinimo().getValue();
console.log("La diferencia de tensión entre el valor máximo y mínimo fue de: " + rango + "voltios");


/* Se muestran por consola los valores de tensión que se encuentran por debajo de 220v */
let menores220 = mediciones.filter((el) => el.getValue() < 220);

console.log("Los Valores por debajo de 220v son: ");
console.log("Instante       Valor de Tensión    Unidad");
console.log("=========================================");
menores220.forEach((el) => console.log(el.getTime() + "     " + el.getValue() + "      " + el.getUnit()));


/* Vinculación con html */
function actualizaTabla() {
    /* Genero la tabla */
    let tabla = document.getElementById("tablaValores");
    tabla.innerHTML = ``;

    // Genero el encabezado de la table.
    let tablaTr = document.createElement("tr");
    tablaTr.className = "tablaHeader";
    tablaTr.innerHTML = `
    <td>Instante</td>
    <td>Valor Tensión</td>
    <td>Unidad</td>`;
    tabla.append(tablaTr);

    // Genero los valores de la tabla.
    for (const med of mediciones) {
        let filaMed = document.createElement("tr");
        filaMed.className = "filasValores";
        filaMed.innerHTML = `
    <td>${med.getTime()}</td>
    <td>${med.getValue()}</td>
    <td>${med.getUnit()}</td>`;

        tabla.append(filaMed);
    }
}

// AJAX y API

const pedirPrecioTarifa = async () => {
    const resp = await fetch('https://api.preciodelaluz.org/v1/prices/max?zone=PCB')
    const data = await resp.json()

   console.log("El precio de la tarifa es:"+data.price+" "+data.units);  
   
    
}

pedirPrecioTarifa();
