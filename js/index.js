/* Datos para login de usuario */
const USER = "carlos@correo.com";
const PASS = "ingreso01";

let user;
let pass;
let login = false;

do {
    user = prompt("Ingrese nombre de usuario");
    pass = prompt("Ingrese contraseña");

    if ((user == USER) && (pass == PASS)) {
        login = true;
        alert("Login exitoso!")
    } else {
        alert("Usuario o contraseña incorrecto!, vuelva a intentar");
    }

} while (!login);

/* Ingreso de valores de tensión eléctrica en voltios, VALOR y HORA */
let tension;
let hora;

let tensionAcumulado = 0.0;
let tensionMax = 0.0;
let tensionMin;

let horaMax;
let horaMin;

let cantValores = 0;
let condContinuar = true;
let primerMedicion = true;


console.log("Hora       Valor de Tensión");
console.log("===========================");


do {
    // Ingreso hora de medición.
    hora = prompt("Ingrese hora medición (ESC para salir):");

    if ((hora == "ESC") || (hora == "Esc") || (hora == "esc")) {
        condContinuar = false;
        console.log("Se finalizó la carga de valores");

    } else {

        // Ingreso valor de tensión.
        tension = parseFloat(prompt("Ingrese valor tensión"));

        cantValores++; // incremento cuenta de valores.

        // Muestro por consola un resúmen de los datos obtenidos.
        console.log(hora + "\t\t" + tension);

        // Determino si la nota minima.
        if (primerMedicion == true) {

            tensionMin = tension;
            horaMin = hora;
            primerMedicion = false;

            
        } else {

            
            if (tension < tensionMin) {
                tensionMin = tension;
                horaMin = hora;
            }
            
        }

        // Determino si la tensión es máxima.
        if (tension > tensionMax) {
            tensionMax = tension;
            horaMax = hora;
        }

        // Sumo la nota al promedio promedio.
        tensionAcumulado = tensionAcumulado + tension;
    }

} while (condContinuar);


/* Muestro por consola el resumen de los resultados */

console.log("=====================================================================================");
console.log("                               RESUMEN DE MEDICIONES                                 ");
console.log("=====================================================================================");
console.log("El promedio de los valores es "+getPromedio(tensionAcumulado,cantValores)+" voltios.");
console.log("La medición de MAYOR valor fue: "+tensionMax+"voltios y ocurrió a las "+horaMax);
console.log("La medición de MENOR valor fue: "+tensionMin+"voltios y ocurrió a las "+horaMin);
console.log("La diferencia de tensión entre el valor máximo y mínimo fue de: "+ getRango(tensionMax,tensionMin)+"voltios");

/*
 * Funciones auxiliares 
 */

/* Funcion para calcular el promedio de las mediciones */
function getPromedio(acumulado, cant) {
    let promedio;

    promedio = acumulado / cant;

    return promedio;
}

/* Función para calcular el rango de las mediciones */
function getRango(max,min) {

    return max-min;

}









