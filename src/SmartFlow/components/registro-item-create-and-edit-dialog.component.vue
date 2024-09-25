<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "registro-item-create-and-edit-dialog",
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
    resetForm() {
      this.submitted = false;
      this.item = {}; // Limpiar los datos del formulario
    },
    canceledEventHandler() {
      this.resetForm();
      this.$emit('canceled');
    },
    savedEventHandler() {
      this.submitted = true;
      if (this.item.title) {
        this.$emit('saved', this.item);
      }
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entityName="Tutorial" @canceled="canceledEventHandler"
                   @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="title">Pedido</label>
            <pv-input-text id="title" v-model="item.title" :class="{'p-invalid': submitted && !item.title}"/>
            <small v-if="submitted && !item.title" class="p-invalid">Title is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="description">Descripcion</label>
            <input id="description" v-model="item.description" class="p-inputtext p-component" type="text"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="status">Status</label>
            <pv-dropdown id="published" v-model="item.status" :options="statuses" optionLabel="label" placeholder="Select and Status">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <pv-tag :severity="getSeverity(slotProps.value.label)" :value="slotProps.value.value"/>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <pv-tag :severity="getSeverity(slotProps.value)" :value="slotProps.value"/>
                </div>
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
            </pv-dropdown>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
