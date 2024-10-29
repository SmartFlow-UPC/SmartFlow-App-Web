import { ref } from 'vue';
import http from '../../shared/services/http-common.js';

export function useAlarmasService() {
    const alarmas = ref([]);

    const getAlarmas = async () => {
        try {
            const response = await http.get('/alarmas');
            console.log('Respuesta del servidor:', response.data);
            if (Array.isArray(response.data)) {
                alarmas.value = response.data.map(alarma => ({
                    ...alarma,
                    fecha: new Date(alarma.fecha).toLocaleString()
                }));
            } else {
                console.error('La respuesta del servidor no es un array:', response.data);
                alarmas.value = [];
            }
            return alarmas.value;
        } catch (error) {
            console.error('Error en getAlarmas:', error);
            throw error;
        }
    };

    return {
        getAlarmas
    };
}