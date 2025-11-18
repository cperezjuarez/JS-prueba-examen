class TaskManager {
    // Propiedades
    #tasks = [];

    // Constructor
    constructor(tasks) {
        this.setTasks(tasks);
    }

    // Métodos
    addTask(task) {
        this.#tasks.push(task);
    }

    showTasks() {
        return this.getTasks();
    }

    setCompleted(id) {
        this.getTasks().forEach(task => {
            if (task.getId() === id) {
                task.setEstado("completada");
            };
        });
    }

    deleteTask(id) {
        this.getTasks().forEach(task => {
            if (task.getId() === id) {
                let index = this.getTasks().indexOf(task);
                this.getTasks().splice(index, 1);
            };
        });
    }

    showStats() {
        // Total de actividades
        let total = this.getTasks().length;

        // Pendientes
        let pendientes = this.getTasks().filter(act => act[6] === "pendiente").length;

        // Completadas
        let completadas = this.getTasks().filter(act => act[6] === "completada").length

        // Porcentaje completado
        let porcentajeCompletadas = this.getTasks().reduce((contador, act) => {
            return act[6] === "completada" ? contador + 1 : contador;
        }, 0) / total * 100;

        // Número de actividades por prioridad
        let actividadesHight = this.getTasks().filter(act => act[4] === "hight").length;
        let actividadesMedium = this.getTasks().filter(act => act[4] === "medium").length;
        let actividadesLow = this.getTasks().filter(act => act[4] === "low").length;

        return { total, pendientes, completadas, porcentajeCompletadas, actividadesHight, actividadesMedium, actividadesLow };
    }

    // Getters y setters
    getTasks() {
        return this.#tasks;
    }
    setTasks(tasks) {
        this.#tasks = tasks;
    }
}

export { TaskManager };