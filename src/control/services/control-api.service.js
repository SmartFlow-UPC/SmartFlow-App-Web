import http from "../../shared/services/http-common.js";

/**
 * ControlsApiService class
 * @description Service class for making HTTP requests to the API
 */

export class ControlsApiService {
    /**
     * Get all controls
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAll() {
        return http.get('/control');
    }

    /**
     * Get item by id
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getById(id) {
        return http.get(`/control/${id}`);
    }

    /**
     * Create a new item
     * @param controlResource - item object to create
     * @returns {Promise<AxiosResponse<any>>}
     */
    create(controlResource) {
        return http.post('/control', controlResource);
    }

    /**
     * Update a item
     * @param id - item id to update
     * @param controlResource - item object with data
     * @returns {Promise<AxiosResponse<any>>}
     */
    update(id, controlResource) {
        return http.put(`/control/${id}`, controlResource);
    }

    /**
     * Delete a item
     * @param id - item id to delete
     * @returns {Promise<AxiosResponse<any>>}
     */
    delete(id) {
        return http.delete(`/control/${id}`);
    }

    /**
     * Delete all controls that match the given title
     * @param producto - item title to apply as criteria
     * @returns {Promise<AxiosResponse<any>>}
     */
    findByProducto(producto) {
        return http.get(`/control?producto=${producto}`);
    }
}