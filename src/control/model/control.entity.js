export class Control {
    constructor(id, producto, cantidad, peso, precio) {
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.peso = peso;
        this.precio = precio;
    }

    static fromDisplayableControl(displayableControl) {
        return new Control(
            displayableControl.id,
            displayableControl.producto,
            displayableControl.cantidad,
            displayableControl.peso,
            displayableControl.precio );
    }

    static toDisplayableControl(control) {
        return {
            id: control.id,
            producto: control.producto,
            cantidad: control.cantidad,
            peso: control.peso,
            precio: control.precio
        };
    }

}

