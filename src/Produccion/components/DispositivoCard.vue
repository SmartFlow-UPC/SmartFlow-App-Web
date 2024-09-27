<template>
  <div class="dispositivo-card">
    <div class="header">
      <h3>{{ dispositivo.nombre }}</h3>
      <span :class="statusClass">{{ dispositivo.estado }}</span>
    </div>
    <p><strong>Consumo:</strong> {{ dispositivo.consumo }} kWh</p>
    <p><strong>Tipo de Recurso:</strong> {{ dispositivo.tipoDeRecurso }}</p>
    <button @click="handleClick" class="action-button">Detalles</button>
  </div>
</template>

<script>
export default {
  props: {
    dispositivo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusClass() {
      return {
        'status-activo': this.dispositivo.estado === 'Activo',
        'status-inactivo': this.dispositivo.estado === 'Inactivo',
        'status-alerta': this.dispositivo.estado === 'Alerta',
      };
    },
  },
  methods: {
    handleClick() {
      // Acción que deseas realizar al hacer clic en el botón
      alert(`Detalles de ${this.dispositivo.nombre}`);
    },
  },
};
</script>

<style scoped>
.dispositivo-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.dispositivo-card:hover {
  transform: scale(1.02);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-activo {
  color: green;
}

.status-inactivo {
  color: gray;
}

.status-alerta {
  color: red;
}

.action-button {
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
