// Variables
let actividades = [];
let contador = 0; // Variable para generar las IDs
let formAct = document.getElementById("añadir-actividad");
let actualizarAct = document.getElementById("actualizar-actividades");
let containerAct = document.getElementById("actividades");
let estadisticasCont = document.getElementById("estadisticas");

// Recuperamos la lista de actividades del localStorage si existe
if (localStorage.getItem('listaActividades')) {
    actividades = JSON.parse(localStorage.getItem('listaActividades')); 
}

// Función para añadir actividad
function añadirActividad() {
    // Recogemos los datos del formulario
    let tituloAct = document.getElementById("titulo").value
    let descripcionAct = document.getElementById("descripcion").value
    let fechaAct = document.getElementById("fecha").value
    let prioridadAct = document.getElementById("prioridad").value
    let etiquetaAct = document.getElementById("etiquetas").value
    let estado = "pendiente";

    // Añadimos la actividad en como una array dentro de la array actividades
    actividades.push([contador, tituloAct, descripcionAct, fechaAct, prioridadAct, etiquetaAct, estado]);
    contador++;

    // guardamos la lista en localStorage
    localStorage.setItem('listaActividades', JSON.stringify(actividades));

    console.log("Actividad añadida");
}

// Función para mostrar las actividades de la lista
function enseñarActividades() {
    // Vaciamos el contenedor de actividades
    containerAct.innerHTML = '';

    // Copiamos la lista para ordenarla si afectar a la original
    let actividadesCopia = actividades.slice();

    // filtros
    let filtroEstado = document.getElementById("filtro-estado").value;
    let filtroPrioridad = document.getElementById("filtro-prioridad").value;
    let orden = document.getElementById("orden").value;

    // Ordenamos las actividades según el criterio seleccionado
    if (orden == 'fecha') {
        actividadesCopia.sort((a, b) => new Date(a[3]) - new Date(b[3]));
    } else if (orden == 'prioridad') {
        const prioridadOrden = { 'hight': 1, 'medium': 2, 'low': 3 };
        actividadesCopia.sort((a, b) => prioridadOrden[a[4]] - prioridadOrden[b[4]]);
    } 

    // Por cada actividad creamos un bloque
    actividadesCopia.forEach(actividad => {
        if ((actividad[6] == filtroEstado || filtroEstado == 'todas') && (actividad[4] == filtroPrioridad || filtroPrioridad == 'todas')) {
            // Creamos el bloque
            let contActividad = document.createElement('div')
    
            // Cremos la información de la actividad
            let infoActividad = `
                <h2 class="actividad__titulo">${actividad[1]}</h2>
                <div class="actividad__content">
                    <p class="actividad__descripcion">${actividad[2]}</p>
                    <p class="actividad__fecha">${actividad[3]}</p>
                    <p class="actividad__prioridad">${actividad[4]}</p>
                    <p class="actividad__etiquetas">${actividad[5]}</p>
                </div>
                <button class="actividad__completada" data-id="${actividad[0]}">Marca como completada</button>
                <button class="actividad__eliminar" data-id="${actividad[0]}">Eliminar actividad</button>
            `;
    
            // Añadimo el contenido en el bloque
            contActividad.innerHTML = infoActividad;
    
            // Añadimo la clase al bloque
            contActividad.classList.add('actividad');
    
            // Añadimos el bloque al contenedor de actividades
            containerAct.appendChild(contActividad);
        }
    });
    actualizarEstadisticas();
    console.log(actividadesCopia);
    console.log("Actividades enseñadas");
}

// Función para buscar una actividad en la lista
function buscarActividad(id) {
    let index = 0;

    // Buscamos en la lista la actividad con la ID que nos pasan
    actividades.forEach(actividad => {
        if (actividad[0] === id) {
            index = actividades.indexOf(actividad); // Si se encuentra, guardamos el index
        }
    })

    return index;
}

// Función para marcar como completado
function marcarCompletado(id) {
    // Buscamos la actividad
    index = buscarActividad(id);

    // Marcamos como completada
    actividades[index][6] = "completada";

    // guardamos la lista en localStorage
    localStorage.setItem('listaActividades', JSON.stringify(actividades));

    console.log(`Actividad ${id} marcada como completada`);
}

// Función para marcar como completado
function eliminarActividad(id) {
    // Buscamos la actividad
    index = buscarActividad(id);

    // La quitamos de la lista de actividades
    actividades.splice(index, 1);

    // guardamos la lista en localStorage
    localStorage.setItem('listaActividades', JSON.stringify(actividades));

    console.log(`Actividad ${id} marcada como completada`);
}

function actualizarEstadisticas() {
    // Total de actividades
    let total = actividades.length;

    // Pendientes
    let pendientes = actividades.filter(act => act[6] === "pendiente").length;

    // Completadas
    let completadas = actividades.filter(act => act[6] === "completada").length

    // Porcentaje completado
    let porcentajeCompletadas = actividades.reduce((contador, act) => {
        return act[6] === "completada" ? contador + 1 : contador;
    }, 0) / total * 100;

    // Número de actividades por prioridad
    let actividadesHight   = actividades.filter(act => act[4] === "hight").length;
    let actividadesMedium = actividades.filter(act => act[4] === "medium").length;
    let actividadesLow    = actividades.filter(act => act[4] === "low").length;


    // Mostramos las actividades
    mostrarEstadisticas(total, pendientes, completadas, porcentajeCompletadas, actividadesHight, actividadesMedium, actividadesLow)
}

function mostrarEstadisticas(total, pendientes, completadas, porcentajeCompletadas, actividadesHight, actividadesMedium, actividadesLow) {
    // Vaciamos el contenedor
    estadisticasCont.innerHTML = '';

    // Creamos la plantilla de HTML
    let plantilla = `
        <p>Total de actividades: ${total}</p>
        <p>Actividades pendientes: ${pendientes}</p>
        <p>Actividades completadas: ${completadas}</p>
        <p>Porcentaje de actividades completadas: ${porcentajeCompletadas.toFixed(2)}%</p>
        <p>Actividades de alta prioridad: ${actividadesHight}</p>
        <p>Actividades de prioridad media: ${actividadesMedium}</p>
        <p>Actividades de baja prioridad: ${actividadesLow}</p>
    `;

    // Lo añadimos al contenedor
    estadisticasCont.innerHTML = plantilla;
}

// EVENTOS

// Añadir actividad
formAct.addEventListener('submit', (e) => {
    e.preventDefault();
    añadirActividad();
});
    
// Actualizar lista de actividades
actualizarAct.addEventListener('click', (e) => {
    e.preventDefault();
    enseñarActividades();

    // Guardamos los botones de completar y eliminar actividad
    let btnCompletado = document.querySelectorAll(".actividad__completada");
    let btnEliminar = document.querySelectorAll(".actividad__eliminar");

    // Añadimos evento para completar actividad
    btnCompletado.forEach(btn => {
        btn.addEventListener('click', (e) => {
            marcarCompletado(parseInt(btn.dataset.id));
            enseñarActividades()
            console.log('actividad marcada como completada');
            console.log(actividades);
            console.log(actividadesCompletadas);
        })
    });

    // Añadimos evento para eliminar actividad
    btnEliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            eliminarActividad(parseInt(btn.dataset.id))
            enseñarActividades()
            console.log('actividad eliminada');
            console.log(actividades);
        })
    })
});