<script>

export default {
  name: "create-and-edit",
  props: {
    entity: null,
    visible: Boolean(),
    entityName: '',
    edit: Boolean(),
    size: 'default',
  },
  emits: ["save-action-requested", "cancel-action-cancel"],
  methods: {
    onCancel() {
      this.$emit("cancel-action-requested");
    },
    onSave() {
      this.$emit("save-action-requested", this.entity);
    },
    getHeaderTitle() {
      return `${this.edit ? 'Edit' : 'New'} ${this.entityName}`;
    },
    getSubmitLabel() {
      return this.edit ? 'Update' : 'Create';
    },
    getDialogStyle() {
      const defaultStyle = { width: '400px' };
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? { width: '600px' } : defaultStyle;
      dialogStyle = this.size === 'large' ? { width: '900px' } : defaultStyle;
      return dialogStyle;
    }
  }
}
</script>

<template>
  <pv-dialog :style="getDialogStyle()">
    <template #header>
      <div class="flex justify-content-start">
        <div>{{ getHeaderTitle() }}</div>
      </div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-start">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave" />
        <pv-button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>