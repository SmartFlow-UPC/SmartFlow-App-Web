<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "control-item-create-and-edit-dialog",
  components: {CreateAndEdit},
  props: {
    item: null,
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    getSeverity(status) {
      switch (status) {
        case 'Alto':
          return 'success';
        case 'Bajo':
          return 'info';
        default:
          return null;
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },

    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entityName="Control" @canceled="canceledEventHandler"
                   @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="producto">Producto</label>
            <pv-input-text id="producto" v-model="item.producto" :class="{'p-invalid': submitted && !item.producto}"/>
            <small v-if="submitted && !item.producto" class="p-invalid">Producto is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="cantidad">Cantidad</label>
            <pv-input-text id="cantidad" v-model="item.cantidad" :class="{'p-invalid': submitted && !item.cantidad}"/>
            <small v-if="submitted && !item.cantidad" class="p-invalid">Cantidad is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="peso">Peso</label>
            <pv-input-text id="peso" v-model="item.peso" :class="{'p-invalid': submitted && !item.peso}"/>
            <small v-if="submitted && !item.peso" class="p-invalid">Peso is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="precio">Precio</label>
            <pv-input-text id="precio" v-model="item.precio" :class="{'p-invalid': submitted && !item.precio}"/>
            <small v-if="submitted && !item.precio" class="p-invalid">Precio is required.</small>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
