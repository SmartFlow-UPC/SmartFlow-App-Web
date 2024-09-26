/**
 * Registro
 * @description Registro entity
 */
export class Registro {
    constructor(id, title, description, alto) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.alto = alto;
        this.status = this.alto === true ? 'Alto' : 'Bajo';
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
            displayableRegistro.description,
            displayableRegistro.status.label === 'Alto');
    }

    /**
     * Convert a item to a displayable item
     * @param registro - The item to convert
     * @returns {{description: *, id, title, status: (string)}}
     */
    static toDisplayableRegistro(registro) {
        return {
            id: registro.id,
            title: registro.title,
            description: registro.description,
            status: registro.alto === true ? 'Alto' : 'Bajo'
        };
    }

}