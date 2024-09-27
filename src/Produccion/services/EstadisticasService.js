// services/EstadisticasService.js

import ConsumoService from './ConsumoService';

class EstadisticasService {
    async obtenerEstadisticas(fechaInicio, fechaFin) {
        const consumoElectricidad = await ConsumoService.obtenerConsumo(fechaInicio, fechaFin);
        // Realiza cálculos y manipula datos para generar estadísticas
        const totalElectricidad = consumoElectricidad.reduce((acc, curr) => acc + curr.cantidad, 0);

        return {
            totalElectricidad,
            // Agrega más estadísticas si es necesario
        };
    }
}

export default new EstadisticasService();
