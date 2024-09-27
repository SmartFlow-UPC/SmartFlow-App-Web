// services/DispositivoService.js
import axios from 'axios';

const API_URL = 'https://api.tuapp.com/dispositivos'; // Reemplaza con la URL de tu API

class DispositivoService {
    async obtenerDispositivos() {
        try {
            const response = await axios.get(API_URL);
            return response.data; // Devuelve un array de dispositivos
        } catch (error) {
            console.error('Error al obtener dispositivos:', error);
            throw error;
        }
    }
}

export default new DispositivoService();
