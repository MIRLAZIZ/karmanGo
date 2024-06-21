<script setup>
import { useProductsStore } from '@/@core/stores/products';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useConfigStore } from '@/@core/stores/config';
import ViewsProduct from '@/components/products/ViewsProduct.vue';

definePage({
  meta: {
    action: "index",
    subject: 'ProductController'
  },


})

const store = useProductsStore()
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
  { title: 'описание', key: 'description' },
  { title: 'расходы', key: 'price' },
  { title: 'Действия', key: 'actions' },

]



const refresh = () => {
  store.fetchProducts(store.options.page)
}

onMounted(() => {
  refresh()
})




// delete post item 
const deleteItem = (id) => {
  console.log(id);
  deleteIndex.value = id
  deleteDialog.value = true
}

//  delete confirmation
const deleteItemConfirm = (res) => {
  store.deleteProduct(deleteIndex.value).then(() => {
    deleteDialog.value = false
    configStore.successToast('Maxsulot o\'chirildi')
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


    <div class="d-flex gap-3  align-end justify-end mb-6 ">
      <!-- add post -->
      <VBtn class="" @click="$router.push('/product/create')" v-if="$can('store', 'ProductController')">
        <VIcon icon="tabler-plus" /> добавить
      </VBtn>
    </div>


    <VDataTable v-if="store.products?.data" :headers="headers" :items="store.products.data" class="text-no-wrap">
      <!-- tabel header action  permission template  -->

      <!-- <template #headers="{ actions }">
        {{ actions }}gdfgfsd
      </template> -->
      <template #item.description="{ item }">
        <p v-if="item?.description">
          {{ item.description.length > 50 ? item?.description.substring(0, 50) + '...' : item?.description }}
        </p>
        <p v-else>-</p>


      </template>


      <!-- image  -->
      <template #item.image="{ item }">

        <div class="py-2">
          <VAvatar rounded :image="baseUrl + item.image" class="categoryAvatar" />

        </div>
      </template>
      <!-- 👉 Data Table  -->
      <template #item.actions="{ item }">

        <!-- action buttons -->

        <!-- edit item -->
        <IconBtn @click="viewItem(item)" class="border mx-2" size="large">
          <VIcon icon="tabler-eye" color="success" />
        </IconBtn>


        <!-- edit item -->
        <IconBtn @click="$router.push(`/product/edit/${item.id}`)" class="border mx-2" size="large"
          v-if="$can('update', 'ProductController')">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>




        <!-- delete item -->
        <!-- permission can -->


        <IconBtn @click="deleteItem(item.id)" v-if="$can('destroy', 'ProductController')" class="border " size="large">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>


      </template>




      <!-- pagination -->
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex justify-end">



            <VPagination v-if="store.products" v-model="store.options.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.products.total / store.products.per_page)" @click="refresh" />
          </div>
        </VCardText>
      </template>


    </VDataTable>

    <!-- delete dialog -->
    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />

    <!-- views  -->
    <ViewsProduct v-model:is-dialog-visible="isDialogVisible" :item-data="itemData" />




  </div>
</template>

<style>
.categoryAvatar {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 90px !important;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  height: 90px !important;
}
</style>
