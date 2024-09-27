<template>
  <div>
    <h1>Historial de Consumo</h1>
    <div>
      <label for="filtroFecha">Filtrar por Fecha:</label>
      <input type="date" v-model="fechaFiltro" id="filtroFecha" @change="filtrarPorFecha"/>
    </div>
    <table>
      <thead>
      <tr>
        <th>Fecha</th>
        <th>Consumo de Electricidad (kWh)</th>
        <th>Consumo de Agua (L)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(registro, index) in registrosFiltrados" :key="index">
        <td>{{ registro.fecha }}</td>
        <td>{{ registro.consumoElectricidad }}</td>
        <td>{{ registro.consumoAgua }}</td>
      </tr>
      <tr v-if="!registrosFiltrados.length">
        <td colspan="3" class="no-data">No hay registros disponibles.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistorialConsumo',
  data() {
    return {
      fechaFiltro: '',
      registros: [
        { fecha: '2024-09-01', consumoElectricidad: 120, consumoAgua: 30 },
        { fecha: '2024-09-02', consumoElectricidad: 150, consumoAgua: 40 },
        { fecha: '2024-09-03', consumoElectricidad: 100, consumoAgua: 20 },
        // Agrega más registros según sea necesario
      ],
    };
  },
  computed: {
    registrosFiltrados() {
      if (!this.fechaFiltro) {
        return this.registros;
      }
      return this.registros.filter(registro =>
          registro.fecha === this.fechaFiltro
      );
    },
  },
  methods: {
    filtrarPorFecha() {
      // Este método puede ser utilizado para realizar alguna acción adicional al filtrar
      console.log('Filtrando por fecha:', this.fechaFiltro);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.no-data {
  text-align: center;
  color: #888;
}
</style>
