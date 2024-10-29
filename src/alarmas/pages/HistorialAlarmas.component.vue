<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Historial de Alarmas</h1>

    <div class="mb-6 flex flex-wrap gap-4">
      <pv-input-text
          v-model="searchTerm"
          placeholder="Buscar por dispositivo"
          class="w-full sm:w-64"
      />
      <pv-dropdown
          v-model="tipoFilter"
          :options="tipoOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Filtrar por tipo"
          class="w-full sm:w-48"
      />
      <pv-dropdown
          v-model="estadoFilter"
          :options="estadoOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Filtrar por estado"
          class="w-full sm:w-48"
      />
    </div>

    <pv-data-table
        :value="sortedAlarmas"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        @sort="onSort"
        :sortField="sortField"
        :sortOrder="sortOrder"
    >
      <pv-column v-for="header in headers" :key="header.key" :field="header.key" :header="header.label" :sortable="true">
        <template #body="slotProps">
          <template v-if="header.key === 'estado'">
            <pv-tag :severity="slotProps.data.estado === 'Resuelta' ? 'success' : 'danger'">
              {{ slotProps.data.estado }}
            </pv-tag>
          </template>
          <template v-else-if="header.key === 'fecha'">
            {{ formatDate(slotProps.data.fecha) }}
          </template>
          <template v-else>
            {{ slotProps.data[header.key] }}
          </template>
        </template>
      </pv-column>
    </pv-data-table>

    <pv-dialog v-model:visible="isLoading" :closable="false" :showHeader="false" :modal="true">
      <div class="flex justify-center items-center">
        <pv-progress-spinner />
        <span class="ml-2">Cargando...</span>
      </div>
    </pv-dialog>

    <pv-toast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAlarmasService } from '../services/alarmas.service.js';
import { useToast } from "primevue/usetoast";

const alarmasService = useAlarmasService();
const toast = useToast();

const alarmas = ref([]);
const searchTerm = ref('');
const tipoFilter = ref('');
const estadoFilter = ref('');
const sortField = ref('fecha');
const sortOrder = ref(-1);
const isLoading = ref(false);

const headers = [
  { key: 'dispositivo', label: 'Dispositivo' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'valor', label: 'Valor' },
  { key: 'umbral', label: 'Umbral' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'estado', label: 'Estado' },
];

const tipoOptions = [
  { value: '', label: 'Todos los tipos' },
  { value: 'Electricidad', label: 'Electricidad' },
  { value: 'Agua', label: 'Agua' },
];

const estadoOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'Resuelta', label: 'Resuelta' },
  { value: 'No resuelta', label: 'No resuelta' },
];

onMounted(async () => {
  await fetchAlarmas();
});

const fetchAlarmas = async () => {
  isLoading.value = true;
  try {
    alarmas.value = await alarmasService.getAlarmas();
  } catch (error) {
    console.error('Error al cargar las alarmas:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las alarmas', life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

const filteredAlarmas = computed(() => {
  return alarmas.value.filter(alarma =>
      alarma.dispositivo.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      (tipoFilter.value === '' || alarma.tipo === tipoFilter.value) &&
      (estadoFilter.value === '' || alarma.estado === estadoFilter.value)
  );
});

const sortedAlarmas = computed(() => {
  return [...filteredAlarmas.value].sort((a, b) => {
    let modifier = sortOrder.value === 1 ? 1 : -1;
    if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
    if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
    return 0;
  });
});

const onSort = (event) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
</script>