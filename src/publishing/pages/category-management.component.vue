<script>
import {Category} from "@/publishing/model/category.entity.js";
import {CategoryService} from "@/publishing/service/category.service.js";
import DataManager from "@/shared/components/data-manager.component.vue";
import {Column as PvColumn} from "primevue";
import CategoryItemCreateAndEditDialog from "@/publishing/components/category-item-create-and-edit.component.vue";
import categoryItemCreateAndEditComponent from "@/publishing/components/category-item-create-and-edit.component.vue";

export default {
  name: "category-management",
  computed: {
    categoryItemCreateAndEditComponent() {
      return categoryItemCreateAndEditComponent
    }
  },
  components: {CategoryItemCreateAndEditDialog, PvColumn, DataManager},
  data(){
    return {
      title: { singular: "Category", plural: "Categories" },
      categories: [],
      category: new Category({}),
      selectedCategories: [],
      isEdit: false,
      createAndEditDialogVisible: false,
      submitted: false,
      categoryService: null
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    },
    findIndexById(id) {
      return this.categories.findIndex(category => category.id === id);
    },
    onNewItem() {
      this.category = new Category({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogVisible = true;
    },
    onEditItem(item) {
      this.category = new Category(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogVisible = true;
    },
    onDeleteItem(item) {
      this.category = { ...item };
      this.deleteCategory();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedCategories();
    },
    onCancelRequested() {
      this.createAndEditDialogVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.category.name.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
        this.createAndEditDialogVisible = false;
        this.isEdit = false;
      }
    },
    createCategory() {
      this.categoryService.create(this.category)
          .then(response => {
            let category = new Category(response.data);
            this.categories.push(category);
            this.notifySuccessfulAction("Category created");
          }).catch(error => console.log(error));
    },
    updateCategory() {
      this.categoryService.update(this.category.id, this.category)
          .then(response => {
            let index = this.findIndexById(this.category.id);
            this.categories[index] = new Category(response.data);
            this.notifySuccessfulAction("Category updated");
          }).catch(error => console.log(error));
    },
    deleteCategory() {
      this.categoryService.delete(this.category.id)
          .then(() => {
            let index = this.findIndexById(this.category.id);
            this.categories.splice(index, 1);
            this.notifySuccessfulAction("Category deleted");
          }).catch(error => console.log(error));
    },
    deleteSelectedCategories() {
      this.selectedCategories.forEach((_category) => {
        this.categoryService.delete(_category.id)
            .then(() => {
              this.categories = this.categories
                                  .filter(t=> t.id !== _category.id);
            });
      });
      this.notifySuccessfulAction("Categories deleted");
    }
  },
  created() {
    this.categoryService = new CategoryService();
    this.categoryService.getAll().then(response => {
      this.categories = response.data.map(category => new Category(category));
      console.log(this.categories);
    }).catch(error => console.log(error));
  }
}
</script>

<template>
  <div class="w-full">
    <data-manager
        :title="title"
        :items="categories"
        @new-item-requested="onNewItem"
        @edit-item-requested="onEditItem($event)"
        @delete-item-requested="onDeleteItem($event)"
        @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" />
        <pv-column :sortable="true" field="name" header="Name" />
      </template>
    </data-manager>

    <category-item-create-and-edit-dialog
      :edit="isEdit"
      :item="category"
      :visible="createAndEditDialogVisible"
      @save-requested="onSaveRequested($event)"
      @cancel-requested="onCancelRequested"
    />
  </div>
</template>

<style scoped>

</style>