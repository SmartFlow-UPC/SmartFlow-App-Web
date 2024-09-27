export class Alarma {
    constructor(id, dispositivo, tipo, valor, umbral, fecha, estado) {
        this.id = id;
        this.dispositivo = dispositivo;
        this.tipo = tipo;
        this.valor = valor;
        this.umbral = umbral;
        this.fecha = fecha;
        this.estado = estado;
    }

    static fromJSON(json) {
        return new Alarma(
            json.id,
            json.dispositivo,
            json.tipo,
            json.valor,
            json.umbral,
            json.fecha,
            json.estado
        );
    }
}