// Consumo.js
class Consumo {
    constructor() {
        this.registros = []; // Almacena registros de consumo
    }

    // Método para agregar un registro de consumo
    agregarRegistro(dispositivo, tipoDeRecurso, cantidad, fecha) {
        const nuevoRegistro = {
            dispositivo,
            tipoDeRecurso,
            cantidad,
            fecha,
        };
        this.registros.push(nuevoRegistro);
    }

    // Método para obtener el consumo total de un tipo de recurso en un rango de fechas
    obtenerConsumoTotal(tipoDeRecurso, fechaInicio, fechaFin) {
        return this.registros
            .filter(registro => {
                const fecha = new Date(registro.fecha);
                return (
                    registro.tipoDeRecurso === tipoDeRecurso &&
                    fecha >= new Date(fechaInicio) &&
                    fecha <= new Date(fechaFin)
                );
            })
            .reduce((total, registro) => total + registro.cantidad, 0);
    }

    // Método para obtener registros de consumo en un rango de fechas
    obtenerRegistrosPorFechas(fechaInicio, fechaFin) {
        return this.registros.filter(registro => {
            const fecha = new Date(registro.fecha);
            return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
        });
    }

    // Método para obtener estadísticas generales de consumo
    obtenerEstadisticas() {
        const estadisticas = {
            totalElectricidad: this.obtenerConsumoTotal('Electricidad', '1970-01-01', new Date()),
            totalAgua: this.obtenerConsumoTotal('Agua', '1970-01-01', new Date()),
        };
        return estadisticas;
    }
}

export default new Consumo();
