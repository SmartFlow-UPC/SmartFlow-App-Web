<template>
  <div>
    <h1>Configuración de Monitoreo</h1>
    <form @submit.prevent="guardarConfiguracion">
      <div>
        <label for="umbralElectricidad">Umbral de Electricidad (kWh):</label>
        <input
            type="number"
            v-model.number="configuracion.umbralElectricidad"
            id="umbralElectricidad"
            required
        />
      </div>
      <div>
        <label for="umbralAgua">Umbral de Agua (L):</label>
        <input
            type="number"
            v-model.number="configuracion.umbralAgua"
            id="umbralAgua"
            required
        />
      </div>
      <div>
        <label for="alertas">Activar Alertas:</label>
        <input
            type="checkbox"
            v-model="configuracion.alertas"
            id="alertas"
        />
      </div>
      <button type="submit">Guardar Configuración</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Configuracion',
  data() {
    return {
      configuracion: {
        umbralElectricidad: 100, // Valor por defecto
        umbralAgua: 50, // Valor por defecto
        alertas: false, // Valor por defecto
      },
    };
  },
  methods: {
    guardarConfiguracion() {
      // Aquí puedes guardar la configuración en tu base de datos o en localStorage
      console.log('Configuración guardada:', this.configuracion);
      alert('Configuración guardada con éxito!');
    },
  },
};
</script>

<style scoped>
/* Estilos para el formulario */
form {
  max-width: 400px;
  margin: 0 auto;
}

div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input[type="number"],
input[type="checkbox"] {
  width: 100%;
  padding: 0.5em;
}

button {
  padding: 0.5em 1em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
