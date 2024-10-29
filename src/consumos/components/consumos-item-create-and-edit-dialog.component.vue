<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "consumos-item-create-and-edit-dialog",
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
        case 'Encendido':
          return 'success';
        case 'Apagado':
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
  <create-and-edit :entity="item" :visible="visible" entityName="Consumos" @canceled="canceledEventHandler"
                   @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="aparato">Aparato</label>
            <pv-input-text
                id="aparato"
                v-model="item.aparato"
                :class="{ 'p-invalid': submitted && !item.aparato }"/>
            <small v-if="submitted && !item.aparato" class="p-invalid">Aparato is required.</small>
          </pv-float-label>
        </div>

        <div class="p-field mt-5">
          <pv-float-label>
            <label for="cantidad">Cantidad</label>
            <pv-input-text
                id="cantidad"
                v-model="item.cantidad"
                :class="{ 'p-invalid': submitted && !item.cantidad }"/>
            <small v-if="submitted && !item.cantidad" class="p-invalid">Cantidad is required.</small>
          </pv-float-label>
        </div>

        <div class="p-field mt-5">
          <pv-float-label>
            <label for="potencia_watts">Potencia watts</label>
            <pv-input-text
                id="potencia_watts"
                v-model="item.potencia_watts"
                :class="{ 'p-invalid': submitted && !item.potencia_watts }"/>
            <small v-if="submitted && !item.potencia_watts" class="p-invalid">Potencia watts is required.</small>
          </pv-float-label>

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
      </div>
    </template>
  </create-and-edit>
</template>
