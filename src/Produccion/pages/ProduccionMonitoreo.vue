<template>
  <div class="monitoreo-container">
    <h1 class="titulo">Monitoreo de Producción</h1>

    <div class="filtros">
      <div class="filtro">
        <label for="tipoProduccion">Tipo de Producción:</label>
        <select v-model="tipoProduccion" id="tipoProduccion" @change="actualizarDatos">
          <option value="electricidad">Electricidad</option>
          <option value="agua">Agua</option>
           <!-- Opción adicional -->
          <!-- Agrega más tipos de producción si es necesario -->
        </select>
      </div>

      <div class="filtro">
        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="date" v-model="fechaInicio" id="fechaInicio" @change="actualizarDatos" />
      </div>

      <div class="filtro">
        <label for="fechaFin">Fecha de Fin:</label>
        <input type="date" v-model="fechaFin" id="fechaFin" @change="actualizarDatos" />
      </div>

      <button @click="actualizarDatos" class="btn-actualizar">Actualizar</button>
    </div>

    <h2 class="subtitulo">Historial de Consumo - {{ tipoProduccion }}</h2>
    <line-chart :chart-data="consumoData" :options="chartOptions" class="grafico" />

    <div class="estadisticas">
      <h3>Estadísticas de Consumo</h3>
      <p><strong>Consumo Total de Electricidad:</strong> {{ totalConsumoElectricidad }} kWh</p>
      <p><strong>Consumo Total de Agua:</strong> {{ totalConsumoAgua }} L</p>
      <p v-if="tipoProduccion === 'gas'"><strong>Consumo Total de Gas:</strong> {{ totalConsumoGas }} m³</p> <!-- Estadística adicional -->
    </div>

    <div v-if="noData" class="no-data">
      <p>No hay datos disponibles para el rango de fechas seleccionado.</p>
    </div>


    <div class="alertas-container">
      <div
          v-for="dispositivo in dispositivos"
          :key="dispositivo.id"
          class="alerta-item"
      >
        <alerta-consumo
            :dispositivo="dispositivo"
            :limiteCritico="limiteCritico"
        />
      </div>
    </div>

    <h2 class="subtitulo">Dispositivos</h2>
    <div class="dispositivos-list">
      <dispositivo-card
          v-for="dispositivo in dispositivos"
          :key="dispositivo.id"
          :dispositivo="dispositivo"
      />
    </div>
  </div>
</template>

<script>

import DispositivoCard from "../components/DispositivoCard.vue";

export default {
  name: 'ProduccionMonitoreo',
  components: {
    DispositivoCard,
  },
  data() {
    return {
      tipoProduccion: 'electricidad', // Valor por defecto
      fechaInicio: '',
      fechaFin: '',
      consumoData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Consumo de Electricidad (kWh)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [50, 75, 100, 125, 150, 200],
          },
          {
            label: 'Consumo de Agua (L)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [30, 50, 60, 80, 90, 120],
          },
        ],
      },
      dispositivos: [
        { id: 1, nombre: 'Dispositivo 1', consumo: 120, tipoDeRecurso: 'Electricidad' },
        { id: 2, nombre: 'Dispositivo 2', consumo: 75, tipoDeRecurso: 'Agua' },
        // Puedes agregar más dispositivos según sea necesario
      ],
      limiteCritico: 100, // Ejemplo de límite crítico para las alertas
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      noData: false,
    };
  },
  computed: {
    totalConsumoElectricidad() {
      return this.consumoData.datasets[0].data.reduce((a, b) => a + b, 0);
    },
    totalConsumoAgua() {
      return this.consumoData.datasets[1].data.reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    actualizarDatos() {
      if (this.fechaInicio && this.fechaFin) {
        console.log('Actualizando datos desde', this.fechaInicio, 'hasta', this.fechaFin);
        this.simularActualizacionDatos();
      } else {
        this.noData = true; // Si no hay fechas, mostrar mensaje de no datos
      }
    },
    simularActualizacionDatos() {
      this.noData = false; // Resetear el estado de no datos
      // Simulando datos según el tipo de producción seleccionado
      if (this.tipoProduccion === 'electricidad') {
        this.consumoData.datasets[0].data = [60, 80, 90, 110, 130, 180]; // Simulando datos nuevos para electricidad
        this.consumoData.datasets[1].data = [0, 0, 0, 0, 0, 0]; // No hay datos de agua

      } else if (this.tipoProduccion === 'agua') {
        this.consumoData.datasets[0].data = [0, 0, 0, 0, 0, 0]; // No hay datos de electricidad
        this.consumoData.datasets[1].data = [40, 55, 70, 85, 100, 130]; // Simulando datos nuevos para agua
      } else {
        this.consumoData.datasets[0].data = [0, 0, 0, 0, 0, 0]; // No hay datos de electricidad
        this.consumoData.datasets[1].data = [0, 0, 0, 0, 0, 0]; // No hay datos de agua

      }
    },
  },
};
</script>

<style scoped>
.monitoreo-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.titulo {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.filtros {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filtro {
  display: flex;
  flex-direction: column;
}

.filtro label {
  margin-bottom: 5px;
}

.filtro select,
.filtro input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-actualizar {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-actualizar:hover {
  background-color: #45a049;
}

.subtitulo {
  margin-top: 30px;
  margin-bottom: 10px;
  color: #666;
}

.estadisticas {
  margin-bottom: 20px;
}

.no-data {
  color: red;
  text-align: center;
  margin: 20px 0;
}

.alertas-container {
  margin-bottom: 20px;
}

.dispositivos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
