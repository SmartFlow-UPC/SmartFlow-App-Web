<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import { RegistroApiService } from "../services/registro-api.service.js";
import { Registro } from "../model/registro.entity.js";
import { RegistroItemCreateAndEditDialog } from "../components/registro-item-create-and-edit-dialog.component.vue";

export default {
  name: "registros-management",
  components: { RegistroItemCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: 'Registro', plural: 'Registros' },
      registros: [],
      registro: {},
      selectedRegistros: [],
      statuses: [
        { label: 'Published', value: 'published' },
        { label: 'Unpublished', value: 'unpublished' }
      ],
      registrosService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    };
  },
  methods: {

    //#region Helper Methods

    notifySuccessfulAction(message) {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    },

    getSeverity(status) {
      switch (status) {
        case 'Published': return 'success';
        case 'Unpublished': return 'info';
        default: return null;
      }
    },

    findIndexById(id) {
      return this.registros.findIndex((registro) => registro.id === id);
    },

    //#endregion Helper Methods

    //#region Data Manager Event Handlers

    onNewItemEventHandler() {
      this.registro = {};
      this.$refs.registroItemCreateAndEditDialog.resetForm();  // Limpiar el formulario
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
        if (this.isEdit) {
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
      this.registrosService.create(this.registro)
          .then((response) => {
            this.registro = Registro.toDisplayableRegistro(response.data);
            this.registros.push(this.registro);
            this.notifySuccessfulAction("Registro Created");
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to create registro",
              life: 3000
            });
          });
    },

    updateRegistro() {
      this.registrosService.update(this.registro.id, this.registro)
        .then((response) => {
          const updatedRegistro = Registro.toDisplayableRegistro(response.data);
          this.registros = this.registros.map(registro =>
              registro.id === updatedRegistro.id ? updatedRegistro : registro
          );
          this.notifySuccessfulAction("Registro Updated");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update registro",
            life: 3000
          });
        });
    },

    // Delete a item

    deleteRegistro() {
      this.registrosService.delete(this.registro.id)
        .then(() => {
          this.registros = this.registros.filter((t) => t.id !== this.registro.id);
          this.registro = {};
          this.notifySuccessfulAction("Registro Deleted");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete registro",
            life: 3000
          });
        });
    },

    // Delete selected registros

    deleteSelectedRegistros() {
      const deletePromises = this.selectedRegistros.map((registro) =>
          this.registrosService.delete(registro.id)
      );

      Promise.all(deletePromises)
        .then(() => {
          this.registros = this.registros.filter(
              (t) => !this.selectedRegistros.some((registro) => registro.id === t.id)
          );
          this.selectedRegistros = [];
          this.notifySuccessfulAction("Registros Eliminados");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete selected registros",
            life: 3000
          });
        });
    },

    //#endregion Data Actions
  },
  created() {
    this.registrosService = new RegistroApiService();

    this.registrosService.getAll()
      .then((response) => {
        console.log(response.data);
        let registros = response.data;
        this.registros = registros.map((registro) => Registro.toDisplayableRegistro(registro));
      })
      .catch((error) => {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load registros",
          life: 3000
        });
      });
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Registro Data Manager -->
    <data-manager
        :title="title"
        :items="registros"
        @new-item="onNewItemEventHandler"
        @edit-item="onEditItemEventHandler"
        @delete-item="onDeleteItemEventHandler"
        @delete-selected-items="onDeleteSelectedItemsEventHandler"
    >
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem" />
        <pv-column :sortable="true" field="title" header="Title" style="min-width: 16rem" />
        <pv-column :sortable="true" field="descripcion" header="Description" style="min-width: 16rem" />
        <pv-column :sortable="true" field="cantidad" header="Cantidad" style="min-width: 16rem" />
        <pv-column :sortable="true" field="status" header="Status" style="min-width: 16rem">
          <template #body="slotProps">
            <pv-tag :severity="getSeverity(slotProps.data.status)" :value="slotProps.data.status" />
          </template>
        </pv-column>
      </template>
    </data-manager>

    <!-- Registro Item Create and Edit Dialog -->
    <registro-item-create-and-edit-dialog
      ref="registroItemCreateAndEditDialog"
      :statuses="statuses"
      :item="registro"
      :edit="isEdit"
      :visible="createAndEditDialogIsVisible"
      @canceled="onCanceledEventHandler"
      @saved="onSavedEventHandler($event)"
    />
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