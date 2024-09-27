<template>
  <div v-if="alertaVisible" class="alerta-consumo" :class="alertClass">
    <strong>Alerta de Consumo!</strong> {{ mensaje }}
    <button @click="ocultarAlerta" class="close-button">X</button>
  </div>
</template>

<script>
export default {
  props: {
    consumoElectricidad: {
      type: Number,
      required: true,
    },
    consumoAgua: {
      type: Number,
      required: true,
    },
    umbralElectricidad: {
      type: Number,
      default: 150, // Umbral por defecto
    },
    umbralAgua: {
      type: Number,
      default: 100, // Umbral por defecto
    },
  },
  data() {
    return {
      alertaVisible: false,
      mensaje: '',
    };
  },
  computed: {
    alertClass() {
      if (this.consumoElectricidad > this.umbralElectricidad) {
        return 'alerta-alta';
      } else if (this.consumoAgua > this.umbralAgua) {
        return 'alerta-alta';
      }
      return '';
    },
  },
  watch: {
    consumoElectricidad(newVal) {
      this.checkAlert(newVal, this.consumoAgua);
    },
    consumoAgua(newVal) {
      this.checkAlert(this.consumoElectricidad, newVal);
    },
  },
  methods: {
    checkAlert(electricidad, agua) {
      if (electricidad > this.umbralElectricidad) {
        this.mensaje = `El consumo de electricidad ha superado el límite: ${electricidad} kWh.`;
        this.alertaVisible = true;
      } else if (agua > this.umbralAgua) {
        this.mensaje = `El consumo de agua ha superado el límite: ${agua} L.`;
        this.alertaVisible = true;
      } else {
        this.alertaVisible = false;
      }
    },
    ocultarAlerta() {
      this.alertaVisible = false;
    },
  },
};
</script>

<style scoped>
.alerta-consumo {
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

.alerta-alta {
  background-color: #d9534f; /* Rojo para alertas altas */
}

.close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
}
</style>
