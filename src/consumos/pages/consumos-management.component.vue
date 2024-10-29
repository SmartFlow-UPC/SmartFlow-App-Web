<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import ConsumosItemCreateAndEditDialog from "../components/consumos-item-create-and-edit-dialog.component.vue";
import { Consumos } from "../model/consumos.entity.js";
import { ConsumosApiService } from "../services/consumos-api.service.js";

export default {
  name: "consumos-management",
  components: { ConsumosItemCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: 'Consumo', plural: 'Consumos' },
      consumos: [], // Arreglo que contiene todos los consumos
      currentConsumo: {}, // Objeto individual en edición o creación
      selectedConsumos: [],
      statuses: [{label: 'Encendido', value: 'encendido'}, {label: 'Apagado', value: 'apagado'}],
      consumosService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      showLimitDialog: false,
      limitePotencia: 5000,
      totalPotencia: 0 // Acumula la potencia total
    };
  },
  watch: {
    'currentConsumo.cantidad': 'calcularPotenciaTotal',
    'currentConsumo.potencia_watts': 'calcularPotenciaTotal'
  },
  methods: {
    calcularPotenciaTotal() {
      const { cantidad, potencia_watts } = this.currentConsumo;
      this.currentConsumo.potencia_total = (cantidad || 0) * (potencia_watts || 0);
      this.verificarLimite();
    },

    getSeverity(status) {
      switch (status) {
        case 'Encendido': return 'success';
        case 'Apagado': return 'info';
        default:  return null;
      }
    },

    actualizarLimite() {
      this.showLimitDialog = false;
      this.verificarLimite();
    },

    calcularTotalPotencia() {
      this.totalPotencia = this.consumos.reduce((total, consumo) => total + (consumo.potencia_total || 0), 0);
    },

    verificarLimite() {
      this.calcularTotalPotencia();
      if (this.totalPotencia >= this.limitePotencia) {
        // Mostrar advertencia
        this.$toast.add({
          severity: "warn",
          summary: "Alerta",
          detail: `La potencia total ha alcanzado o superado el límite establecido de ${this.limitePotencia} watts.`,
          life: 4000
        });

        // Cambiar estado de todos los aparatos a "Apagado"
        this.consumos.forEach(consumo => {
          consumo.status = 'Apagado';
        });
      }
    },

    // Crear un nuevo consumo
    createConsumos() {
      this.currentConsumo.id = 0;
      const newConsumo = Consumos.fromDisplayableConsumos(this.currentConsumo);
      this.consumosService.create(newConsumo)
          .then((response) => {
            const consumosData = Consumos.toDisplayableConsumos(response.data);
            this.consumos = [...this.consumos, consumosData]; // Agregar al arreglo de consumos
            this.notifySuccessfulAction("Consumo Creado");
            this.verificarLimite();
          });
    },

    // Actualizar consumo existente
    updateConsumos() {
      const updatedConsumo = Consumos.fromDisplayableConsumos(this.currentConsumo);
      this.consumosService.update(this.currentConsumo.id, updatedConsumo)
          .then((response) => {
            const index = this.consumos.findIndex(consumo => consumo.id === response.data.id);
            if (index !== -1) {
              this.consumos[index] = Consumos.toDisplayableConsumos(response.data);
              this.notifySuccessfulAction("Consumo Actualizado");
              this.verificarLimite();
            }
          });
    },

    // Eliminar consumo
    deleteConsumos(consumo) {
      this.consumosService.delete(consumo.id).then(() => {
        this.consumos = this.consumos.filter(c => c.id !== consumo.id);
        this.notifySuccessfulAction("Consumo Eliminado");
        this.verificarLimite();
      });
    },

    // Manejar el evento para eliminar un solo consumo
    onDeleteItemEventHandler(consumo) {
      this.deleteConsumos(consumo);
    },

    // Manejar el evento para eliminar múltiples consumos seleccionados
    onDeleteSelectedItemsEventHandler() {
      this.selectedConsumos.forEach(consumo => this.deleteConsumos(consumo));
      this.selectedConsumos = []; // Limpiar selección
    },

    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item) {
      this.currentConsumo = { ...item };
      this.submitted = true;
      if (this.currentConsumo.aparato && this.currentConsumo.aparato.trim()) {
        if (item.id) {
          this.updateConsumos();
        } else {
          this.createConsumos();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    onNewItemEventHandler() {
      this.currentConsumo = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItemEventHandler(item) {
      this.currentConsumo = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    }
  },
  created() {
    this.consumosService = new ConsumosApiService();
    this.consumosService.getAll().then((response) => {
      this.consumos = response.data.map((consumo) => Consumos.toDisplayableConsumos(consumo));
      this.calcularTotalPotencia();
    }).catch(error => {
      console.error("Error al obtener los consumos:", error);
      this.consumos = [];
    });
  }
};
</script>

<template>
  <div class="w-full">
    <!-- Botón para establecer el límite -->
    <button class="p-button p-button-secondary" @click="showLimitDialog = true">Límite</button>

    <!-- Diálogo para ingresar el límite -->
    <pv-dialog header="Límite de Potencia Total" :visible="showLimitDialog" @hide="showLimitDialog = false">
      <div class="p-field mt-5">
        <pv-float-label>
          <label for="limitePotencia">Límite (Potencia Total en Watts)</label>
          <pv-input-number v-model="limitePotencia" :min="0" mode="decimal" />
        </pv-float-label>
      </div>
      <div class="dialog-footer">
        <button @click="actualizarLimite" class="p-button p-button-success">Actualizar</button>
        <button @click="showLimitDialog = false" class="p-button p-button-secondary">Cancelar</button>
      </div>
    </pv-dialog>

    <!-- Consumos Data Manager -->
    <data-manager
        :title="title"
        :items="consumos"
        @new-item="onNewItemEventHandler"
        @edit-item="onEditItemEventHandler"
        @delete-item="onDeleteItemEventHandler"
        @delete-selected-items="onDeleteSelectedItemsEventHandler">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem" />
        <pv-column :sortable="true" field="aparato" header="Aparatos" style="min-width: 16rem" />
        <pv-column :sortable="true" field="cantidad" header="Cantidad" style="min-width: 16rem" />
        <pv-column :sortable="true" field="potencia_watts" header="Potencia (Watts)" style="min-width: 16rem" />
        <pv-column :sortable="true" field="potencia_total" header="Potencia Total" style="min-width: 16rem" />
        <pv-column :sortable="true" field="status"      header="Status"       style="min-width: 16rem" />
      </template>
    </data-manager>
    <!-- Consumos Item Create and Edit Dialog -->
    <consumos-item-create-and-edit-dialog
        :statuses="statuses"
        :item="currentConsumo"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler"/>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;

  }
}

@media (min-width: 1024px) {
  .consumos {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>