<script>

import {Button as PvButton, Column as PvColumn, DataTable as PvDataTable} from "primevue";

export default {
  name: "data-manager",
  components: {PvButton, PvColumn, PvDataTable},
  props: {
    items: { type: Array, required: true },
    title: { type: { singular: '', plural: '' }, required: true },
    dynamic: { type: Boolean, default: false },
    columns: { type: Array, default: [] },
  },
  emits: ["new-item-requested", "edit-item-requested", "delete-item-requested", "delete-selected-items-requested"],
  data() {
    return {
      selectedItems: [],
      filters: null
    }
  },
  methods: {
    newItem() {
      this.$emit("new-item-requested");
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    editItem(item) {
      this.$emit("edit-item-requested", item);
    },
    confirmDeleteItem(item) {
      this.$confirm.require({
        message: `Are you sure you want to delete this ${this.title.singular}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',
        accept: () => this.$emit('delete-item-requested', item),
        reject: () => {}
      });
    },
    confirmDeleteSelected() {
      this.$confirm.require({
        message: `Are you sure you want to delete the selected ${this.title.plural}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',
        accept: () => this.$emit('delete-selected-items-requested'),
        reject: () => {}
      });
    }
  }
}
</script>

<template>
  <h3>Manage {{ title.plural }}</h3>

  <!-- Toolbar Section -->
  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem" />
      <pv-button :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" label="Delete" severity="danger" @click="confirmDeleteSelected" />
    </template>
    <template #end>
      <pv-button icon="pi pi-download" label="Export" severity="help" @click="exportToCSV($event)" />
    </template>
  </pv-toolbar>

  <!-- Data Table Section -->
  <pv-data-table
      ref="dt"
      v-model:selection="selectedItems"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[10,20,50]"
      :value="items"
      current-page-report-template="({currentPage} of {totalPages})"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">

    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem" />
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" />
    <pv-column :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)" />
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>