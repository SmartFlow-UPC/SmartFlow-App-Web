// services/ConsumoService.js
import axios from 'axios';

const API_URL = 'https://api.tuapp.com/consumo'; // Reemplaza con la URL de tu API

class ConsumoService {
    async obtenerConsumo(fechaInicio, fechaFin) {
        try {
            const response = await axios.get(`${API_URL}`, {
                params: {
                    fechaInicio,
                    fechaFin,
                },
            });
            return response.data; // Suponiendo que tu API devuelve un array de registros
        } catch (error) {
            console.error('Error al obtener consumo:', error);
            throw error; // Lanzar el error para manejarlo en otro lugar
        }
    }

    async agregarConsumo(dispositivo, tipoDeRecurso, cantidad, fecha) {
        try {
            const response = await axios.post(`${API_URL}`, {
                dispositivo,
                tipoDeRecurso,
                cantidad,
                fecha,
            });
            return response.data; // Devuelve el registro creado
        } catch (error) {
            console.error('Error al agregar consumo:', error);
            throw error;
        }
    }
}

export default new ConsumoService();
