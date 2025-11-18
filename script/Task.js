class Task {
    // Propiedades
    #id;
    #titulo;
    #descripcion;
    #fechaLimite;
    #prioridad;
    #etiquetas;
    #estado;

    static #contadorId = 0; // Propiedad estática para llevar el conteo de IDs

    // Constructor
    constructor(titulo, descripcion, fechaLimite, prioridad, etiquetas, estado) {
        this.setId();
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setFechaLimite(fechaLimite);
        this.setPrioridad(prioridad);
        this.setEtiquetas(etiquetas);

        if (estado) {
            this.setEstado(estado);
        } else {
            this.setEstado("pendiente");
        }
    }


    // Getters y setters
    getId() {
        return this.#id;
    }
    setId() {
        this.#id = Task.#contadorId;
        Task.#contadorId++;
    }
    getTitulo() {
        return this.#titulo;
    }
    setTitulo(titulo) {
        this.#titulo = titulo;
    }
    getDescripcion() {
        return this.#descripcion;
    }
    setDescripcion(descripcion) {
        this.#descripcion = descripcion;
    }
    getFechaLimite() {
        return this.#fechaLimite;
    }
    setFechaLimite(fechaLimite) {
        this.#fechaLimite = fechaLimite;
    }
    getPrioridad() {
        return this.#prioridad;
    }
    setPrioridad(prioridad) {
        this.#prioridad = prioridad;
    }
    getEtiquetas() {
        return this.#etiquetas;
    }
    setEtiquetas(etiquetas) {
        this.#etiquetas = etiquetas;
    }
    getEstado() {
        return this.#estado;
    }
    setEstado(estado) {
        this.#estado = estado;
    }
}

export { Task };