<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import RegistroItemCreateAndEditDialog from "../components/registro-item-create-and-edit-dialog.component.vue";
import {Registro} from "../model/registro.entity.js";
import {RegistrosApiService} from "../services/registro-api.service.js";

export default {
  name: "registro-management",
  components: {RegistroItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: { singular: 'Registro', plural: 'Registros' },
      registros: [],
      registro: {},
      selectedRegistros: [],
      statuses: [{label: 'Alto', value: 'alto'}, {label: 'Bajo', value: 'bajo'}],
      registroService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  methods: {

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
      return this.registros.findIndex((registro) => registro.id === id);
    },

    //#endregion Helper Methods

    //#region Data Manager Event Handlers

    onNewItemEventHandler() {
      this.registro = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItemEventHandler(item) {
      this.registro = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItemEventHandler(item) {
      this.registro = item;
      this.deleteRegistro();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedRegistros = selectedItems;
      this.deleteSelectedRegistros();
    },

    //#endregion Data Manager Event Handlers

    //#region Registro Item Create and Edit Dialog Event Handlers

    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.registro.title.trim()) {
        if (item.id) {
          this.updateRegistro();
        } else {
          this.createRegistro();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    //#endregion Data Manager Event Handlers

    //#region Data Actions

    // Create a new item

    createRegistro() {
      this.registro.id = 0;
      this.registro = Registro.fromDisplayableRegistro(this.registro);
      this.registrosService.create(this.registro)
          .then((response) => {
            this.registro = Registro.toDisplayableRegistro(response.data);
            this.registros.push(this.registro);
            this.notifySuccessfulAction("Registro Created");
          });
    },

    // Update an existing item

    updateRegistro() {
      this.registro = Registro.fromDisplayableRegistro(this.registro);
      this.registrosService
          .update(this.registro.id, this.registro)
          .then((response) => {
            this.registros[this.findIndexById(response.data.id)] =
                Registro.toDisplayableRegistro(response.data);
            this.notifySuccessfulAction("Registro Updated");
          });
    },

    // Delete a item

    deleteRegistro() {
      this.registrosService.delete(this.registro.id)
          .then(() => {
            this.registros = this.registros.filter((t) => t.id !== this.registro.id);
            this.registro = {};
            this.notifySuccessfulAction("Registro Deleted");
          });
    },

    // Delete selected registros

    deleteSelectedRegistros() {
      this.selectedRegistros.forEach((registro) => {
        this.registrosService.delete(registro.id).then(() => {
          this.registros = this.registros.filter((t) => t.id !== registro.id);
        });
      });
      this.notifySuccessfulAction("Registros Deleted");
    }

    //#endregion Data Actions
  },
  created() {
    this.registrosService = new RegistrosApiService();

    this.registrosService.getAll().then((response) => {
      console.log(response.data);
      let registros = response.data;
      this.registros = registros.map((registro) => Registro.toDisplayableRegistro(registro));
    });
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Registro Data Manager -->
    <data-manager
        :title=title
        v-bind:items="registros"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id"          header="Id"           style="min-width: 12rem"/>
        <pv-column :sortable="true" field="title"       header="Title"        style="min-width: 16rem"/>
        <pv-column :sortable="true" field="description" header="Description"  style="min-width: 16rem"/>
        <pv-column :sortable="true" field="status"      header="Status"       style="min-width: 16rem">
          <template #body="slotProps">
            <pv-tag :severity="getSeverity(slotProps.data.status)" :value="slotProps.data.status"/>
          </template>
        </pv-column>
      </template>
    </data-manager>
    <!-- Registro Item Create and Edit Dialog -->
    <registro-item-create-and-edit-dialog
        :statuses="statuses"
        :item="registro"
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
  .registros {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>