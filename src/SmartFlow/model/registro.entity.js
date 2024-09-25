/**
 * Registro
 * @description Registro entity
 */
export class Registro {
    constructor(id, title, descripcion, cantidad, published) {
        this.id = id;
        this.title = title;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.published = published;
        this.status = this.published === true ? 'Published' : 'Unpublished';
    }

    /**
     * Create a new Registro instance from a displayableRegistro
     * @param displayableRegistro - The displayableRegistro to create the Registro from
     * @returns {Registro}
     */
    static fromDisplayableRegistro(displayableRegistro) {
        return new Registro(
            displayableRegistro.id,
            displayableRegistro.title,
            displayableRegistro.descripcion,
            displayableRegistro.cantidad,
            displayableRegistro.status === 'Published'
        );
    }

    /**
     * Convert a item to a displayable item
     * @param registro - The item to convert
     * @returns {{descripcion: *, id, title, cantidad, status: (string)}}
     */
    static toDisplayableRegistro(registro) {
        return {
            id: registro.id,
            title: registro.title,
            descripcion: registro.descripcion,
            cantidad: registro.cantidad,
            status: registro.published === true ? 'Published' : 'Unpublished'
        };
    }
}
