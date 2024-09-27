<template>
  <tr>
    <td>{{ alarma.dispositivo }}</td>
    <td>{{ alarma.tipo }}</td>
    <td>{{ alarma.valor }}</td>
    <td>{{ alarma.umbral }}</td>
    <td>{{ formatDate(alarma.fecha) }}</td>
    <td>
      <span :class="{ 'text-green-500': alarma.estado === 'Resuelta', 'text-red-500': alarma.estado === 'No resuelta' }">
        {{ alarma.estado }}
      </span>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue';
import { Alarma} from "../model/Alarma.entity.js";

const props = defineProps({
  alarma: {
    type: Object,
    required: true,
    validator: (value) => value instanceof Alarma
  }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>