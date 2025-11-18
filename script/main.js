// Variables
let actividades = [];
let actividadesCompletada = [];
let contador = 0; // Variable para generar las IDs
let formAct = document.getElementById("añadir-actividad");
let actualizarAct = document.getElementById("actualizar-actividades");
let containerAct = document.getElementById("actividades");

// Función para añadir actividad
function añadirActividad() {
    // Recogemos los datos del formulario
    let tituloAct = document.getElementById("titulo").value
    let descripcionAct = document.getElementById("descripcion").value
    let fechaAct = document.getElementById("fecha").value
    let prioridadAct = document.getElementById("prioridad").value
    let etiquetaAct = document.getElementById("etiquetas").value

    // Añadimos la actividad a la lista
    actividades.push([contador, tituloAct, descripcionAct, fechaAct, prioridadAct, etiquetaAct]);
    contador++;

    console.log("Actividad añadida");
}

// Función para mostrar las actividades de la lista
function enseñarActividades() {
    // Por cada actividad creamos un bloque
    actividades.forEach(actividad => {
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
            <button class="actividad__completada" dataset-id="${actividad[0]}">Marca como completada</button>
            <button class="actividad__eliminar">Eliminar actividad</button>
        `;

        // Añadimo el contenido en el bloque
        contActividad.innerHTML = infoActividad;

        // Añadimo la clase al bloque
        contActividad.classList.add('actividad');

        // Añadimos el bloque al contenedor de actividades
        containerAct.appendChild(contActividad);
    });
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

    // La añadimos a la lista de actividades completadas
    actividadesCompletada.push(actividades[index])

    // La quitamos de la lista de actividades
    actividades.splice(index, 1);

    console.log(`Actividad ${id} marcada como completada`);
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

    // Guardamos los botones de completar
    let btnCompletado = document.querySelectorAll(".actividad__completada");

    // Añadimos evento a los botones
    btnCompletado.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target);
        })
    });
    
});