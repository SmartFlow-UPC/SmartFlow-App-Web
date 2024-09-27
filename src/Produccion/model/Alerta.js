class Alerta {
    constructor(dispositivo, limiteCritico) {
        this.dispositivo = dispositivo;
        this.limiteCritico = limiteCritico;
    }

    verificarAlerta(consumo) {
        return consumo > this.limiteCritico;
    }
}

export default Alerta;
