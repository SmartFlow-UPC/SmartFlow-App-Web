<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import ControlItemCreateAndEditDialog from "../components/control-item-create-and-edit-dialog.component.vue";
import {Control} from "../model/control.entity.js";
import {ControlsApiService} from "../services/control-api.service.js";

export default {
  name: "control-management",
  components: {ControlItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: { singular: 'Control', plural: 'Controls' },
      controls: [],
      control: {},
      selectedControls: [],
      statuses: [{label: 'Alto', value: 'alto'}, {label: 'Bajo', value: 'bajo'}],
      controlService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      showMinDialog: false,
      minimoUnidades: 50, // Valor mínimo inicial, puedes cambiarlo o hacerlo persistente en un almacenamiento
      totalUnidades: 0 // Acumula la cantidad total de productos
    }
  },
  methods: {
    // Actualizar el valor mínimo
    actualizarMinimo() {
      this.showMinDialog = false;
      this.verificarMinimo();
    },

    // Sumar todas las unidades y verificar el mínimo
    calcularTotalUnidades() {
      this.totalUnidades = this.controls.reduce((total, control) => total + Number(control.cantidad || 0), 0);
    },
    verificarMinimo() {
      this.calcularTotalUnidades();
      if (this.totalUnidades >= this.minimoUnidades) {
        this.$toast.add({
          severity: "warn",
          summary: "Alerta",
          detail: `La cantidad total de unidades ha alcanzado o superado el mínimo establecido de ${this.minimoUnidades}.`,
          life: 4000,
        });
      }
    },
    //#region Helper Methods

    notifySuccessfulAction(message) {
      this.$toast.add({severity: "success", summary: "Success", detail: message, life: 3000,});
    },

    // Get the severity color according to status
    getSeverity(status) {
      switch (status) {
        case 'Alto': return 'success';
        case 'Bajo': return 'info';
        default:  return null;
      }
    },

    findIndexById(id) {
      return this.controls.findIndex((control) => control.id === id);
    },

    //#endregion Helper Methods

    //#region Data Manager Event Handlers

    onNewItemEventHandler() {
      this.control = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItemEventHandler(item) {
      this.control = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItemEventHandler(item) {
      this.control = item;
      this.deleteControl();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedControls = selectedItems;
      this.deleteSelectedControls();
    },

    //#endregion Data Manager Event Handlers

    //#region Control Item Create and Edit Dialog Event Handlers

    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item) {
      const producto = item.producto ? item.producto.trim() : '';
      const cantidad = item.cantidad ? item.cantidad.trim() : '';
      const peso = item.peso ? item.peso.trim() : '';
      const precio = item.precio ? item.precio.trim() : '';

      this.submitted = true;

      if (this.control && this.control.producto && this.control.producto.trim()) {
        if (item.id) {
          this.updateControl();
        } else {
          this.createControl();
        }
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    //#endregion Data Manager Event Handlers

    //#region Data Actions

    // Create a new item

    // Modificar el método `createControl` para que verifique el mínimo al agregar un nuevo control
    createControl() {
      this.control.id = 0;
      this.control = Control.fromDisplayableControl(this.control);
      this.controlsService.create(this.control)
          .then((response) => {
            this.control = Control.toDisplayableControl(response.data);
            this.controls.push(this.control);
            this.notifySuccessfulAction("Control Created");

            // Verificar el mínimo tras añadir el control
            this.verificarMinimo();
          });
    },

    // Update an existing item

    // Modificar el método `updateControl` para que verifique el mínimo al actualizar un control
    updateControl() {
      this.control = Control.fromDisplayableControl(this.control);
      this.controlsService.update(this.control.id, this.control)
          .then((response) => {
            this.controls[this.findIndexById(response.data.id)] = Control.toDisplayableControl(response.data);
            this.notifySuccessfulAction("Control Updated");

            // Verificar el mínimo tras actualizar el control
            this.verificarMinimo();
          });
    },

    // Delete a item

    // Modificar el método `deleteControl` para que verifique el mínimo al eliminar un control
    deleteControl() {
      this.controlsService.delete(this.control.id)
        .then(() => {
          this.controls = this.controls.filter((t) => t.id !== this.control.id);
          this.control = {};
          this.notifySuccessfulAction("Control Deleted");

          // Verificar el mínimo tras eliminar el control
          this.verificarMinimo();
        });
      }
    },

    // Delete selected controls

  deleteSelectedControls() {
    this.selectedControls.forEach((control) => {
      this.controlsService.delete(control.id).then(() => {
        this.controls = this.controls.filter((t) => t.id !== control.id);
      });
    });
    this.notifySuccessfulAction("Controls Deleted");

    // Verificar el mínimo tras eliminar los controles seleccionados
    this.verificarMinimo();
  },


    //#endregion Data Actions
  created() {
    this.controlsService = new ControlsApiService();

    this.controlsService.getAll().then((response) => {
      console.log(response.data);
      let controls = response.data;
      this.controls = controls.map((control) => Control.toDisplayableControl(control));
    });
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Botón para establecer el mínimo -->
    <button class="p-button p-button-secondary" @click="showMinDialog = true">Mínimo</button>

    <!-- Diálogo para ingresar el límite mínimo -->
    <pv-dialog header="Límite mínimo de producción" :visible="showMinDialog" @hide="showMinDialog = false">
      <div class="p-field mt-5">
        <pv-float-label>
          <label for="minimo">Mínimo (Unidades)</label>
          <pv-input-number v-model="minimoUnidades" :min="0" mode="decimal" />
        </pv-float-label>
      </div>
      <div class="dialog-footer">
        <button @click="actualizarMinimo" class="p-button p-button-success">Actualizar</button>
        <button @click="showMinDialog = false" class="p-button p-button-secondary">Cancelar</button>
      </div>
    </pv-dialog>
    <!-- Control Data Manager -->
    <data-manager
        :title=title
        v-bind:items="controls"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id"            header="Id"           style="min-width: 12rem"/>
        <pv-column :sortable="true" field="producto"       header="Producto"        style="min-width: 16rem"/>
        <pv-column :sortable="true" field="cantidad" header="Cantidad"  style="min-width: 16rem"/>
        <pv-column :sortable="true" field="peso" header="Peso"  style="min-width: 16rem"/>
        <pv-column :sortable="true" field="precio" header="Precio"  style="min-width: 16rem"/>
      </template>
    </data-manager>
    <!-- Control Item Create and Edit Dialog -->
    <control-item-create-and-edit-dialog
        :statuses="statuses"
        :item="control"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>
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
  .controls {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>