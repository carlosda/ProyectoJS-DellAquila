/* Datos para login de usuario */
const USER = "carlos@correo.com";
const PASS = "ingreso01";


/*
 *  Clase USUARIO: 
 *  Agrupa todos los datos y acciones referido a los usuarios.
 */

class Usuario {
    // Constructor usuario
    constructor(user,pass) {
        this.user = user;
        this.pass = pass;     
    }

    // Método para comparar usuarios. 
    verificaLogin(user,pass) {
        
        let login = false;
        
        if ((this.user == user) && (this.pass == pass)) {

            alert("Login exitoso!");
            login = true;
                        
        } else {
            alert("Usuario o contraseña incorrecto!, vuelca a intentar.");
            login = false;
        }

        return login;
    }     
}

const mUsuario = new Usuario(USER,PASS);
let user;
let pass;
let login = false;

do {

    user = prompt("Ingrese nombre de usuario");
    pass = prompt("Ingrese contraseña");
    login = mUsuario.verificaLogin(user,pass);

} while (!login);

/*
 * Clase Medición
 */
class Medicion {
    constructor(objLiteral) {
        this.time  = objLiteral.time;   // Formato hh:mm:ss,dd/MM/YYYY.
        this.value = objLiteral.value;  // Valor numerico.
        this.unit  = objLiteral.unit;   // Unidad de medida (v, mV, uv, etc.)
    }

    getTime() {
        return this.time;
    }

    getValue() {
        return this.value;
    }

    getUnit(){
        return this.unit;
    }
}

/* Array objeto con mediciones previas */
const medPrevias = [
    {
        time:"10:00:00, 25/05/2022",
        value:220,
        unit:"v",        
    },
    {
        time:"11:00:00, 25/05/2022",
        value:218,
        unit:"v",        
    },
    {
        time:"12:00:00, 25/05/2022",
        value:230,
        unit:"v",        
    },
    {
        time:"13:00:00, 25/05/2022",
        value:240,
        unit:"v",        
    },
    {
        time:"14:00:00, 25/05/2022",
        value:216,
        unit:"v",        
    },
    {
        time:"15:00:00, 25/05/2022",
        value:210,
        unit:"v",        
    },
    {
        time:"16:00:00, 25/05/2022",
        value:220,
        unit:"v",        
    }
];

/* Arrays para almacenar los valores previos y los que serán leídos por promt. */
const mediciones = [];

/* Cargo el arreglo previo */
for (const med of medPrevias) {
    mediciones.push(new Medicion(med));
}

do {
    // Ingreso del instante de tiempo de la medición.
    let time = prompt("Ingrese tiempo de la medicion (ESC para salir):");

    if ((time == "ESC") || (time == "Esc") || (time == "esc")) {
        condContinuar = false;
        console.log("Se finalizó la carga de valores");

    } else {

        // Ingreso valor de tensión.
        let tension = parseFloat(prompt("Ingrese valor tensión"));
        // Ingreso unidad de medida.
        let unit = prompt("Ingrese unidad de medida");
        // Creo un objeto de la clase medición. 
        let med = new Medicion({time:time,value:tension,unit:unit});
        // Agrego el objeto al array de mediciones.
        mediciones.push(med);
        condContinuar = true;
       }

} while (condContinuar);

console.log("Instante       Valor de Tensión    Unidad");
console.log("=========================================");



for(const med of mediciones) {
    console.log(med.getTime()+"     "+med.getValue()+"      "+med.getUnit());
}

class EstMediciones {
    constructor(objMediciones){
        this.mediciones = objMediciones;
    }

    getPromedio(){

        let acumula = 0;

        for(const med of this.mediciones) {
            acumula = acumula + med.getValue();
        }
        return (acumula/this.mediciones.length);
    }

    getMaximo() {

        let max = new Medicion({time:"",value:0,unit:""});        

        for(const med of this.mediciones) {
            if (max.getValue() < med.getValue()) { max = med; }                      
        }

        return max;
    }

    getMinimo() {
        let primeraMed = false;
        let min = new Medicion({time:"",value:0,unit:""});

        for(const med of this.mediciones) {
            if (primeraMed == false) {
                primeraMed = true;
                min = med;
            } else {
                if(med.getValue() < min.getValue()) { min = med; }
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
console.log("El promedio de los valores es "+ est.getPromedio() +" voltios.");
console.log("La medición de MAYOR valor fue: "+ est.getMaximo().getValue()+" voltios y ocurrió a las "+ est.getMaximo().getTime());
console.log("La medición de MENOR valor fue: "+ est.getMinimo().getValue() +" voltios y ocurrió a las "+est.getMinimo().getTime());

let rango = est.getMaximo().getValue() - est.getMinimo().getValue();
console.log("La diferencia de tensión entre el valor máximo y mínimo fue de: "+ rango +"voltios");











