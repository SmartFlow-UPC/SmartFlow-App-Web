import http from "../../shared/services/http-common.js";
export class ConsumosApiService {

    getAll() {
        return http.get('/consumos');
    }

    getById(id) {
        return http.get(`/consumos/${id}`);
    }

    create(consumosResource) {
        return http.post('/consumos', consumosResource);
    }

    update(id, consumosResource) {
        return http.put(`/consumos/${id}`, consumosResource);
    }

    delete(id) {
        return http.delete(`/consumos/${id}`);
    }

    findByAparato(aparato) {
        return http.get(`/consumos?aparato=${aparato}`);
    }
}