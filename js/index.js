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

        let login = ((this.user == user) && (this.pass == pass)) ? true : false;

        return login;
    }
}

/*
 * Clase Medición
 */
class Medicion {
    constructor(objLiteral) {
        this.time = new Date(objLiteral.time);
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

/*
 * Clase objeto gráfico
 */
class Grafico {
    constructor(objGrafico) {

        /* TODO */
        this.objGrafico = objGrafico;

        /* Crea grafico en html. */
        this.grafico = document.getElementById(objGrafico.svgID);
        this.grafico.setAttribute('width', objGrafico.svgWidth);
        this.grafico.setAttribute('height', objGrafico.svgHeight);
        this.grafico.setAttribute('viewBox', objGrafico.svgViewBox);
    }

    creaAreaGrafico() {

        let x = (this.objGrafico.svgWidth - this.objGrafico.areaGraficoWidth) / 2;
        let y = (this.objGrafico.svgHeight - this.objGrafico.areaGraficoHeight) / 2;
      
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', this.objGrafico.areaGraficoWidth);
        rect.setAttribute('height', this.objGrafico.areaGraficoHeight);
        rect.setAttribute('stroke-width', this.objGrafico.borderWidth);
        rect.setAttribute('stroke', 'black');
        rect.setAttribute('fill', 'white');
        this.grafico.append(rect);
    }

    creaLineasVertical() {

        let step = (this.objGrafico.areaGraficoWidth - (2 * this.objGrafico.margenCeroX)) / (this.objGrafico.cantVerticalLines-1);

        let puntoInicialEjeY = ((this.objGrafico.svgHeight - this.objGrafico.areaGraficoHeight) / 2) + (this.objGrafico.borderWidth / 2);
        let puntoFinalEjeY = (this.objGrafico.svgHeight - this.objGrafico.areaGraficoHeight) / 2 + this.objGrafico.areaGraficoHeight - (this.objGrafico.borderWidth / 2);

        let xPrimerLinea = ((this.objGrafico.svgWidth - this.objGrafico.areaGraficoWidth) / 2) + this.objGrafico.margenCeroX;

        

        for (let i = 0; i < this.objGrafico.cantVerticalLines; i++) {

            let x = (i * step) + xPrimerLinea;
            
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', puntoInicialEjeY);
            line.setAttribute('x2', x);
            line.setAttribute('y2', puntoFinalEjeY);
            line.setAttribute('stroke', 'red');
            line.setAttribute('stroke-width', '0.75');
            this.grafico.append(line);
        }

        this.creaLabelX(step, xPrimerLinea, this.objGrafico.cantVerticalLines);
    }

    creaLabelX(step, xPrimerLinea, cantLabel) {

        for (let i = 0; i < cantLabel; i++) {

            let x = i * step + xPrimerLinea - step;

            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', this.objGrafico.svgHeight);
            text.setAttribute('fill', 'black');
            text.setAttribute('font-size', '10');
            let strTransform = "rotate(-45 " + x + "," + this.objGrafico.svgHeight + ")";
            text.setAttribute('transform', strTransform);
            text.innerHTML = `${this.objGrafico.xLabelData[i]}`;
            this.grafico.append(text);
        }
    }

    creaLineasHorizontal() {

        let step = (this.objGrafico.areaGraficoHeight - (2 * this.objGrafico.margenCeroY)) / (this.objGrafico.cantHorizontalLines-1);
        let puntoInicialEjeX = ((this.objGrafico.svgWidth - this.objGrafico.areaGraficoWidth) / 2) + (this.objGrafico.borderWidth / 2);
        let puntoFinalEjeX = (this.objGrafico.svgWidth - this.objGrafico.areaGraficoWidth) / 2 + this.objGrafico.areaGraficoWidth - (this.objGrafico.borderWidth / 2);

        let yPrimerLinea = this.objGrafico.svgHeight - ((this.objGrafico.svgHeight - this.objGrafico.areaGraficoHeight) / 2) - this.objGrafico.margenCeroX;

        for (let i = 0; i < this.objGrafico.cantHorizontalLines; i++) {

            let y = yPrimerLinea - i * step ;

            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', puntoInicialEjeX);
            line.setAttribute('y1', y);
            line.setAttribute('x2', puntoFinalEjeX);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'red');
            line.setAttribute('stroke-width', '0.75');
            this.grafico.append(line);

            this.creaLabelY(step, yPrimerLinea, this.objGrafico.cantHorizontalLines);
        }
    }

    creaLabelY(step, yPrimerLinea, cantLabel) {

        for (let i = 0; i < cantLabel; i++) {

            let y =  yPrimerLinea - i * step;

            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', 0);
            text.setAttribute('y', y);
            text.setAttribute('fill', 'black');
            text.setAttribute('font-size', '10');
            text.innerHTML = `${this.objGrafico.yLabelData[i]}`;
            this.grafico.append(text);
        }
    }

    /* actualiza valores */
    graficaPuntos(mediciones) {

        /* Colocar Valores */
        let xStep = (this.objGrafico.areaGraficoWidth - (2 * this.objGrafico.margenCeroX)) / (this.objGrafico.cantVerticalLines-1);
        let xPrimerLinea = ((this.objGrafico.svgWidth - this.objGrafico.areaGraficoWidth) / 2) + this.objGrafico.margenCeroX;
        let xResolucion = this.objGrafico.xResolucion;

        let yStep = (this.objGrafico.areaGraficoHeight - (2 * this.objGrafico.margenCeroY)) / (this.objGrafico.cantHorizontalLines-1);
        let yPrimerLinea = this.objGrafico.svgHeight - ((this.objGrafico.svgHeight - this.objGrafico.areaGraficoHeight) / 2) - this.objGrafico.margenCeroX;
        let yResolucion = this.objGrafico.yResolucion;

        /* 
           Busco el primer instante de medición. Es decir el valor de tiempo más chico.
           A partir de ello encuentro el día que inician las mediciones y ese será la 
           referencia del gráfico.
        */

        let timePoints = mediciones.map((el) => el.time);
        let timeMin = Math.min(...timePoints);

        let minDate = new Date(mediciones.find((el) => el.time.getTime() == timeMin).getTime());
        
        minDate.setHours(0);
        minDate.setMinutes(0);
        minDate.setSeconds(0);
        minDate.setMilliseconds(0);
        
        let labelDate = mediciones.find((el) => el.time.getTime() == timeMin).getTime();

        mediciones.forEach((el) => {

            let origin = minDate.getTime() + (this.objGrafico.xResolucion * (this.objGrafico.cantVerticalLines-1)) * this.objGrafico.offset;

            let xPos = ((xStep * (el.time.getTime() - origin)) / xResolucion) + xPrimerLinea;
            let yPos =  yPrimerLinea - ((yStep * el.value) / yResolucion);
            
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', xPos);
            line.setAttribute('y1', yPrimerLinea);
            line.setAttribute('x2', xPos);
            line.setAttribute('y2', yPos);
            line.setAttribute('stroke', 'blue');
            line.setAttribute('stroke-width', '0.75');
            grafico.append(line);

            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', xPos);
            circle.setAttribute('cy', yPos);
            circle.setAttribute('r', '3');
            circle.setAttribute('stroke-width', '0.5');
            circle.setAttribute('stroke', 'black');
            circle.setAttribute('fill', 'blue');
            grafico.append(circle);
        });

        this.actualizaTitulo(labelDate);
    }

    actualizaTitulo(minDate) {

        let auxDate = new Date();
        
        // para aumentar o decrementar la fecha que aparece en el título lo hace en milisegundos.
        auxDate.setTime(minDate.getTime() + this.objGrafico.offset*(3600000*24));

        let dia  = auxDate.getDate();
        let mes  = auxDate.getMonth() + 1;
        let anio = auxDate.getFullYear();
       
        let title = document.getElementById(objGraficoValores.tituloID);
        title.innerHTML = `Grafico Mediciones del día ${dia}/${mes}/${anio}`;

    }

    actualizaGrafico(mediciones) {

        grafico.innerHTML = ``;
    
        this.creaAreaGrafico();
        this.creaLineasVertical();
        this.creaLineasHorizontal();
        this.graficaPuntos(mediciones);
    }

    btnSiguiente(mediciones) {
        this.objGrafico.offset = this.objGrafico.offset + 1;
        this.actualizaGrafico(mediciones);
    }

    btnAnterior(mediciones) {
        this.objGrafico.offset = this.objGrafico.offset - 1;
        this.actualizaGrafico(mediciones);        
    }
}

/* Objeto para gráfico */
let objGraficoValores = {
    svgID: 'grafico',
    svgWidth: 500, // pixeles.
    svgHeight: 500, // pixeles. 
    svgViewBox: '0 0 500 500',
    areaGraficoWidth: 450, // pixeles.
    areaGraficoHeight: 450, // pixeles.
    borderWidth: 5, // pixeles.
    margenCeroX: 10, // pixeles.
    margenCeroY: 10, // pixeles.
    cantVerticalLines: 25,
    cantHorizontalLines: 45,
    xLabelData: '',
    xResolucion: 3600000,
    yLabelData: '',
    yResolucion: 10,
    tituloID: 'tituloGrafico',
    offset: 0
}

objGraficoValores.xLabelData = [];
for (let i = 0; i< objGraficoValores.cantVerticalLines ; i++) { objGraficoValores.xLabelData.push(i+":00"); }

objGraficoValores.yLabelData = [];
for (let i = 0; i< objGraficoValores.cantHorizontalLines; i++) { objGraficoValores.yLabelData.push(i*10); }

let medGrafico = new Grafico(objGraficoValores);

/* Asigno event listener a los botones Anterior y siguiente. */
let btnSiguiente = document.getElementById('btnSiguiente');
btnSiguiente.addEventListener('click',fBtnSiguiente);

let btnAnterior = document.getElementById('btnAnterior');
btnAnterior.addEventListener('click',fBtnAnterior);



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

        getMedPrev();

    } else {

        let loginMal = document.getElementById("loginMal");
        loginMal.style.display = "block";
    }

    console.log("Login Exitoso");
}

/* Arrays para almacenar los valores previos y los que serán leídos por promt. */
const mediciones = [];

/* Lee de un archivo JSON mediciones previas */
const getMedPrev = async () => {
    const resp = await fetch('/json/mediciones.json');
    const data = await resp.json();

    /* Cargo el arreglo previo */
    for (const med of data.mediciones) {
        mediciones.push(new Medicion(med));
    }

    // Actualizo tabla
    actualizaTabla(mediciones);
    // Actualiza tabla resumen
    let est = new EstMediciones(mediciones);
    actualizaTablaResumen(est);
    // Actualiza tabla menores de 220
    tablaMenores220(mediciones);
    // Actualiza grafico
    medGrafico.actualizaGrafico(mediciones);
}


/* Control de formulario para ingreso manual de los datos */
let inputInstante = document.getElementById("inputInstante");
let inputValor = document.getElementById("inputValor");
let inputUnidad = document.getElementById("inputUnidad");
let formCargaManual = document.getElementById("cargaManual");

formCargaManual.addEventListener("submit", cargaEvt);

function cargaEvt(e) {

    e.preventDefault();
    let time = new Date(inputInstante.value);
    let tension = inputValor.value;
    let unit = inputUnidad.value;

    let med = new Medicion({ time: time, value: tension, unit: unit });
    // Agrego el objeto al array de mediciones.
    mediciones.push(med);
    //  Almaceno mediciones.
    localStorage.setItem("mediciones", JSON.stringify(mediciones));
    // Actualiza tabla
    actualizaTabla(mediciones);
    // Actualiza tabla resumen
    let est = new EstMediciones(mediciones);
    actualizaTablaResumen(est);
    // Actualiza tabla menores de 220
    tablaMenores220(mediciones);
    // Actualiza grafico
    medGrafico.actualizaGrafico(mediciones);


    Swal.fire({
        title: 'Nueva mediciòn cargada',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

function fBtnSiguiente(e) {

    medGrafico.btnSiguiente(mediciones);

}


function fBtnAnterior(e) {

    medGrafico.btnAnterior(mediciones);

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

/* Vinculación con HTML tabla */
function actualizaTabla(mediciones) {
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
    <td>${med.getTime().toLocaleString()}</td>
    <td>${med.getValue()}</td>
    <td>${med.getUnit()}</td>`;

        tabla.append(filaMed);
    }
}

function actualizaTablaResumen(est) {
    /* Genero la tabla */
    let tabla = document.getElementById("tablaResumen");
    tabla.innerHTML = ``;

    // Genero el encabezado de la tabla.
    let tablaTr = document.createElement("tr");
    tablaTr.className = "tablaHeader";
    tablaTr.innerHTML = `
    <td>TABLA RESUMEN</td>`;
    tabla.append(tablaTr);

    let fila1 = document.createElement("tr");
    fila1.className = "filasValores";
    fila1.innerHTML = `<td>El promedio de los valores es ${est.getPromedio()} voltios.</td>`;
    tabla.append(fila1);

    let fila2 = document.createElement("tr");
    fila2.className = "filasValores";
    fila2.innerHTML = `<td>La medición de MAYOR valor fue: ${est.getMaximo().getValue()} voltios y ocurrió a las ${est.getMaximo().getTime()}</td>`;
    tabla.append(fila2);

    let fila3 = document.createElement("tr");
    fila3.className = "filasValores";
    fila3.innerHTML = `<td>La medición de MENOR valor fue: ${est.getMinimo().getValue()} voltios y ocurrió a las ${est.getMinimo().getTime()}</td>`;
    tabla.append(fila3);
}

function tablaMenores220(mediciones) {
    /* Genero la tabla */
    let tabla = document.getElementById("tablaMenores220");
    tabla.innerHTML = ``;

    // Genero el encabezado de la table.
    let tablaTr = document.createElement("tr");
    tablaTr.className = "tablaHeader";
    tablaTr.innerHTML = `
    <td>Instante</td>
    <td>Valor Tensión</td>
    <td>Unidad</td>`;
    tabla.append(tablaTr);

    let menores220 = mediciones.filter((el) => el.getValue() < 220);
    menores220.forEach((el) => {
        let filaMed = document.createElement("tr");
        filaMed.className = "filasValores";
        filaMed.innerHTML = `
        <td>${el.getTime().toLocaleString()}</td>
        <td>${el.getValue()}</td>
        <td>${el.getUnit()}</td>`;

        tabla.append(filaMed);
    });
}


// AJAX y API
const pedirPrecioTarifa = async () => {
    const resp = await fetch('https://api.preciodelaluz.org/v1/prices/max?zone=PCB')
    const data = await resp.json()

    console.log("El precio de la tarifa es:" + data.price + " " + data.units);
}

pedirPrecioTarifa();





































