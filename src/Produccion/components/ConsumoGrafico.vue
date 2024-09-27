<template>
  <div>
    <h3>Consumo de Recursos</h3>
    <chart :data="datosConsumo"></chart>
  </div>
</template>

<script>
export default {
  props: {
    datosConsumo: {
      type: Array,
      required: true
    }
  }
};
</script>
