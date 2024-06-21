<script setup>
import { useCategorysStore } from '@/@core/stores/categorys';
import { useConfigStore } from '@/@core/stores/config';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import ViewsCategory from '@/components/posts/ViewsCategory.vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';


definePage({
  meta: {
    action: "index",
    subject: 'CategoryController'
  },


})
const store = useCategorysStore()
const deleteDialog = ref(false)
const deleteIndex = ref(null)
const load = ref(false)
const configStore = useConfigStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const isDialogVisible = ref(false)
const itemData = ref({})
// headers
const headers = [
  { title: 'картина', key: 'image' },
  { title: 'Наименование', key: 'name' },
  { title: 'Действия', key: 'actions' },

]

const refresh = () => {
  store.fetchCategoryies()
}

onMounted(() => {

  refresh()



})


// delete post item 
const deleteItem = (id) => {
  deleteIndex.value = id
  deleteDialog.value = true
}

//  delete confirmation
const deleteItemConfirm = (res) => {
  store.deleteCategory(deleteIndex.value).then(() => {
    deleteDialog.value = false
    configStore.successToast('Kategoriya o\'chirildi')
    refresh()
  })
    .catch((error) => {
      deleteDialog.value = false
      configStore.errorToast(error.response._data.message)

    })

}
const viewItem = (item) => {
  itemData.value = item
  isDialogVisible.value = true

}
</script>

<template>
  <div>
    <!-- <pre>
      {{ store.categoryies }}

    </pre> -->
    <div class="d-flex gap-3  align-end justify-end mb-6 ">
      <!-- add post -->
      <VBtn class="" @click="$router.push('/category/create')">
        <VIcon icon="tabler-plus" v-if="$can('store', 'CategoryController')" /> добавить
      </VBtn>
    </div>



    <!-- 👉 Data Table  -->
    <VDataTable v-if="store.categoryies" :headers="headers" :items="store.categoryies" class="text-no-wrap"
      :loading="load">

      <!-- image -->
      <template #item.image="{ item }">
        <div class="py-1">
          <VAvatar rounded :image="baseUrl + item.image" class="categoryAvatar" />
        </div>
      </template>

      <!-- name  -->
      <template #item.name_uz="{ item }">

        {{ item.name_uz }}

      </template>

      <template #item.actions="{ item }">

        <!-- edit item -->
        <IconBtn @click="$router.push(`/category/edit/${item.id}`)" v-if="$can('update', 'CategoryController')"
          class="border mx-2" size="large">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>

        <!-- delete item -->
        <IconBtn @click="deleteItem(item.id)" v-if="$can('destroy', 'CategoryController')" class="border " size="large">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>


      </template>



      <!-- pagination -->
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex justify-end">

            <!-- <VTextField v-model="store.options.itemsPerPage" label="Rows per page:" type="number" min="-1" hide-details
              variant="underlined" style="max-inline-size: 8rem;min-inline-size: 5rem;" /> -->

            <VPagination v-if="store.categoryies.data" v-model="store.options.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.categoryies?.total / store.options.itemsPerPage)" />
          </div>
        </VCardText>
      </template>
    </VDataTable>

    <!-- delete dialog -->
    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />




  </div>
  <ViewsCategory v-model:is-dialog-visible="isDialogVisible" :itemData="itemData" />
</template>

<style>
.categoryAvatar {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 90px !important;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  height: 90px !important;
}
</style>
