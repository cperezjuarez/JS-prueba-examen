// Imports
import { Task } from "./Task.js";
import { TaskManager } from "./TaskManager.js";

// Variables
let actualizarAct = document.getElementById("actualizar-actividades");
let formAct = document.getElementById("añadir-actividad");
let containerAct = document.getElementById("actividades");
let estadisticasCont = document.getElementById("estadisticas");

// creamos el gestor de tareas
let taskManager = new TaskManager([]);

// Recogemos las actividades guardadas en el localStorage
if (localStorage.getItem('actividades')) {
    let actividadesGuardadas = JSON.parse(localStorage.getItem('actividades'));

    // Recorremos las actividades y las añadimos al gestor de tareas
    actividadesGuardadas.forEach(actividad => {
        let tarea = new Task(actividad[0], actividad[1], actividad[2], actividad[3], actividad[4], actividad[5]);
        taskManager.addTask(tarea);
    });
}

// Función para añadir actividad
function añadirActividad(titulo, descripcion, fecha, prioridad, etiquetas) {
    // Diferenciamos si los datos vienen del formulario o de los parámetros
    if (!titulo || !descripcion || !fecha || !prioridad || !etiquetas) {
        // Recogemos los datos del formulario
        let tituloAct = document.getElementById("titulo").value
        let descripcionAct = document.getElementById("descripcion").value
        let fechaAct = document.getElementById("fecha").value
        let prioridadAct = document.getElementById("prioridad").value
        let etiquetaAct = document.getElementById("etiquetas").value

        // Creamos la nueva tarea
        let nuevaTarea = new Task(tituloAct, descripcionAct, fechaAct, prioridadAct, etiquetaAct);
    
        // Añadimos la tarea al gestor de tareas
        taskManager.addTask(nuevaTarea);

    } else {
        // Creamos la nueva tarea
        let nuevaTarea = new Task(titulo, descripcion, fecha, prioridad, etiquetas);
        // Añadimos la tarea al gestor de tareas
        taskManager.addTask(nuevaTarea);
    }


    // Actualizamos las estadísticas
    actualizarEstadisticas();

    guardarActividades();

    console.log("Actividad añadida");
}

// Función para mostrar las actividades de la lista
function enseñarActividades() {
    // Vaciamos el contenedor de actividades
    containerAct.innerHTML = '';

    // Obtenemos la lista del gestor de tareas
    let actividades = taskManager.showTasks();

    // // filtros
    let filtroEstado = document.getElementById("filtro-estado").value;
    let filtroPrioridad = document.getElementById("filtro-prioridad").value;
    // let orden = document.getElementById("orden").value;

    // // Ordenamos las actividades según el criterio seleccionado
    // if (orden == 'fecha') {
    //     actividades.sort((a, b) => new Date(a[3]) - new Date(b[3]));
    // } else if (orden == 'prioridad') {
    //     const prioridadOrden = { 'hight': 1, 'medium': 2, 'low': 3 };
    //     actividades.sort((a, b) => prioridadOrden[a[4]] - prioridadOrden[b[4]]);
    // } 

    // Por cada actividad creamos un bloque
    actividades.forEach(actividad => {
        if ((actividad.getEstado() == filtroEstado || filtroEstado == 'todas') && (actividad.getPrioridad() == filtroPrioridad || filtroPrioridad == 'todas')) {
            // Creamos el bloque
            let contActividad = document.createElement('div')
    
            // Cremos la información de la actividad
            let infoActividad = `
                <h2 class="actividad__titulo">${actividad.getTitulo()}</h2>
                <div class="actividad__content">
                    <p class="actividad__descripcion">${actividad.getDescripcion()}</p>
                    <p class="actividad__fecha">${actividad.getFechaLimite()}</p>
                    <p class="actividad__prioridad">${actividad.getPrioridad()}</p>
                    <p class="actividad__etiquetas">${actividad.getEtiquetas()}</p>
                </div>
                <button class="actividad__completada" data-id="${actividad.getId()}">Marca como completada</button>
                <button class="actividad__eliminar" data-id="${actividad.getId()}">Eliminar actividad</button>
            `;
    
            // Añadimo el contenido en el bloque
            contActividad.innerHTML = infoActividad;
    
            // Añadimo la clase al bloque
            contActividad.classList.add('actividad');
    
            // Añadimos el bloque al contenedor de actividades
            containerAct.appendChild(contActividad);
        }
    });

    // Actualizamos las estadísticas
    actualizarEstadisticas();

    console.log(actividades);
    console.log("Actividades enseñadas");
}

// Función para marcar como completado
function marcarCompletado(id) {
    taskManager.setCompleted(id);

    // Actualizamos las estadísticas
    actualizarEstadisticas();

    guardarActividades();

    console.log(`Actividad ${id} marcada como completada`);
}

// Función para marcar como completado
function eliminarActividad(id) {
    // Buscamos la actividad
    taskManager.deleteTask(id);

    // Actualizamos las estadísticas
    actualizarEstadisticas();

    guardarActividades();

    console.log(`Actividad ${id} marcada como completada`);
}

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    let estadisticas = taskManager.showStats();

    console.log(estadisticas);

    // Vaciamos el contenedor
    estadisticasCont.innerHTML = '';

    // Creamos la plantilla de HTML
    let plantilla = `
        <p>Total de actividades: ${estadisticas.total}</p>
        <p>Actividades pendientes: ${estadisticas.pendientes}</p>
        <p>Actividades completadas: ${estadisticas.completadas}</p>
        <p>Porcentaje de actividades completadas: ${estadisticas.porcentajeCompletadas.toFixed(2)}%</p>
        <p>Actividades de alta prioridad: ${estadisticas.actividadesHight}</p>
        <p>Actividades de prioridad media: ${estadisticas.actividadesMedium}</p>
        <p>Actividades de baja prioridad: ${estadisticas.actividadesLow}</p>
    `;

    // Lo añadimos al contenedor
    estadisticasCont.innerHTML = plantilla;
}

// Función para guardar las actividades en el localStorage al salir de la página
function guardarActividades() { 
    // Obtenemos la lista de actividades del gestor de tareas
    let actividades = taskManager.showTasks();
    
    // Creamos un array para guardar las actividades en formato simple
    let listaAct = [];

    // Recorremos las actividades y las añadimos al array
    actividades.forEach(actividad => {
        listaAct.push([
            actividad.getTitulo(),
            actividad.getDescripcion(),
            actividad.getFechaLimite(),
            actividad.getPrioridad(),
            actividad.getEtiquetas(),
            actividad.getEstado()
        ]);
    });
    // Guardamos el array en el localStorage
    localStorage.setItem('actividades', JSON.stringify(listaAct));
};


// Eventos

// Evento de añadir actividad
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