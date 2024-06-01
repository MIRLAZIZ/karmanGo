<template>
  <div>
    <div>
      <!-- <pre>      {{ store.top_product }}
</pre> -->
      <div class="d-flex gap-3  align-end justify-end mb-6 ">
        <VBtn class="" @click="$router.push('/top-products/create')">
          <VIcon icon="tabler-plus" /> Qo'shish
        </VBtn>
      </div>
    </div>

    <VDataTable :items="store.top_product" :headers="headers" :loading="load" class="">

      <template #item.name="{ item }" class="d-flex align-start">
        <div class=" h-100 ">

          <div class="mt-2">
            {{ item.name }}

          </div>

        </div>
      </template>
      <template #item.actions="{ item }">

        <!-- delete item -->
        <div class="h-100">
          <IconBtn @click="deleteItem(item.top_id)" class="border mt-2">
            <VIcon icon="tabler-trash" color="error" />
          </IconBtn>

        </div>


      </template>

      <!-- prooducts table  -->
      <template #item.products="{ item }">

        <div class="h-100  ">
          <div @click="producttoggelData(item.top_id)" class="my-2 cursor-pointer">
            Maxsulotlarni ko'rish
            <VIcon icon="tabler-chevron-down" />

          </div>
          <Transition name="slide-fade">

            <div class=" border rounded" v-if="productToggle === item.top_id">
              <div v-for="product in item.products" :key="product.id"
                class="pa-2 productContainer d-flex justify-space-between align-center">

                <div>
                  {{ product.name_uz }}
                </div>

                <div @click="deleteItem(item.top_id, product.id)">

                  <div class="h-100">
                    <IconBtn>
                      <VIcon icon="tabler-trash" color="error" />
                    </IconBtn>

                  </div>
                </div>


              </div>

            </div>

          </Transition>


        </div>





      </template>

      <!-- bottom pagination  -->
      <template #bottom>

        <VCardText class="pt-2">
          <div class="d-flex justify-end">
            <VPagination v-if="store.top_product?.data" v-model="store.page" @click="refresh"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.top_product?.total / store.top_product.per_page)" />
          </div>
        </VCardText>

      </template>

    </VDataTable>

    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />


  </div>

</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useTopProductStore } from '@/@core/stores/top_product';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/@core/stores/config';
import { Icon } from 'leaflet';


const store = useTopProductStore()
const deleteDialog = ref(false)
const deleteIndex = ref(null)
const load = ref(false)
const configStore = useConfigStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const isDialogVisible = ref(false)
const itemData = ref({})
const productToggle = ref(null)
const productId = ref(null)

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  },
})


const headers = [
  {
    title: 'Nomi', key: 'name',

  },
  {
    title: 'maxsulotlar', key: 'products',

  },
  {
    title: 'action', key: 'actions',
  }
]

const productHeaders = [
  {
    title: 'Nomi', key: 'name_uz',
  }]

const refresh = () => {
  store.getTopProducts(store.page)
}

const deleteItem = (id, idProduct) => {
  deleteIndex.value = id
  productId.value = idProduct

  deleteDialog.value = true
}
const deleteItemConfirm = () => {

  if (productId.value) {

    store.deleteProducts(deleteIndex.value, productId.value)
      .then(() => {
        configStore.successToast('Banner o\'chirildi')
        productId.value = null
        deleteDialog.value = false
        refresh()
      })
      .catch((error) => {
        deleteDialog.value = false
        configStore.errorToast(error.response._data.message)
      })
  } else {
    store.deleteTopProduct(deleteIndex.value)
      .then(() => {
        configStore.successToast('Banner o\'chirildi')
        deleteDialog.value = false
        refresh()
      })
      .catch((error) => {
        deleteDialog.value = false
        configStore.errorToast(error.response._data.message)
      })

  }







}

const producttoggelData = (id) => {
  if (productToggle.value === id) {
    productToggle.value = null
  } else {
    productToggle.value = id
  }

}
onMounted(() => {
  refresh()
})
</script>


<style scoped>
.productContainer {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  border-bottom: 1px solid #eee;
}


.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  /* stylelint-disable-next-line order/properties-order */
  opacity: 0;
}
</style>
