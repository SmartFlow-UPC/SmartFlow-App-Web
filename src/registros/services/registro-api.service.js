import http from "../../shared/services/http-common.js";

/**
 * RegistrosApiService class
 * @description Service class for making HTTP requests to the API
 */

export class RegistrosApiService {
    /**
     * Get all registros
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAll() {
        return http.get('/registros');
    }

    /**
     * Get item by id
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getById(id) {
        return http.get(`/registros/${id}`);
    }

    /**
     * Create a new item
     * @param registroResource - item object to create
     * @returns {Promise<AxiosResponse<any>>}
     */
    create(registroResource) {
        return http.post('/registros', registroResource);
    }

    /**
     * Update a item
     * @param id - item id to update
     * @param registroResource - item object with data
     * @returns {Promise<AxiosResponse<any>>}
     */
    update(id, registroResource) {
        return http.put(`/registros/${id}`, registroResource);
    }

    /**
     * Delete a item
     * @param id - item id to delete
     * @returns {Promise<AxiosResponse<any>>}
     */
    delete(id) {
        return http.delete(`/registros/${id}`);
    }

    /**
     * Delete all registros that match the given title
     * @param title - item title to apply as criteria
     * @returns {Promise<AxiosResponse<any>>}
     */
    findByTitle(title) {
        return http.get(`/registros?title=${title}`);
    }
}