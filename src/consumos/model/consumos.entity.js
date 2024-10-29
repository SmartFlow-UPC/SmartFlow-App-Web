export class Consumos {
    constructor(id, aparato, cantidad, potencia_watts, potencia_total, encendido) {
        this.id = id;
        this.aparato = aparato;
        this.cantidad = cantidad;
        this.potencia_watts = potencia_watts;
        this.potencia_total = potencia_total;
        this.encendido = encendido;
        this.status = this.encendido === true ? 'Encendido' : 'Apagado';
    }

    static fromDisplayableConsumos(displayableConsumos) {
        return new Consumos(
            displayableConsumos.id,
            displayableConsumos.aparato,
            displayableConsumos.cantidad,
            displayableConsumos.potencia_watts,
            displayableConsumos.potencia_total,
            displayableConsumos.status.label === 'Encendido');
    }

    static toDisplayableConsumos(consumos) {
        return {
            id: consumos.id,
            aparato: consumos.aparato,
            cantidad: consumos.cantidad,
            potencia_watts: consumos.potencia_watts,
            potencia_total: consumos.potencia_total,
            status: consumos.encendido === true ? 'Encendido' : 'Apagado'
        };
    }

}

