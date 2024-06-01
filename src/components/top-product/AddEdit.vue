<template>
  <div>
    <h2> top maxsulotlar</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendProductstop">

      <VRow>
        <!-- name -->
        <VCol cols="12" md="6">
          <AppSelect v-model="topProductData.top_id" :rules="[requiredValidator]" label="top nomi"
            :items="storeTopic.topics" item-title="name" item-value="id" />

        </VCol>

        <VCol cols="12" md="6">
          <VDataTable :headers="headers" :items="storeProduct.products?.data" show-select
            v-model="topProductData.products">
            <!-- <template #item.check="{ item }">
              <VCheckbox v-model="topProductData.products" :value="item.id" />
            </template> -->


            <template #item.name_uz="{ item }">

              <div class="py-2">


                <VAvatar rounded :image="baseUrl + item.image" class="categoryAvatar me-3" />

                {{ item.name_uz }}

              </div>

            </template>



            <!-- bottom pagination  -->
            <template #bottom>

              <VCardText class="pt-2">
                <div class="d-flex justify-end">
                  <VPagination v-if="storeProduct.products?.data" v-model="storeProduct.options.page"
                    @click="productRefresh" :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                    :length="Math.ceil(storeProduct.products?.total / storeProduct.products?.per_page)" />
                </div>
              </VCardText>

            </template>

          </VDataTable>




        </VCol>


        <VCol cols="12" class="d-flex justify-end">
          <VBtn variant="outlined" color="secondary" @click="closeNavigationDrawer">
            Cancel
          </VBtn>
          <VBtn type="submit" class="ml-3">
            {{ $route.params.id ? 'Saqlash' : 'Qo\'shish' }}
          </VBtn>
        </VCol>
      </VRow>

    </VForm>


  </div>
</template>

<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { useConfigStore } from '@/@core/stores/config';
import { useProductsStore } from '@/@core/stores/products';
import { useTopProductStore } from '@/@core/stores/top_product';
import { useTopicsStore } from '@/@core/stores/topics';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/labs/VDataTable';


const route = useRoute().params.id
const router = useRouter()
const store = useTopProductStore()
const storeProduct = useProductsStore()
const storeTopic = useTopicsStore()
const storeConfig = useConfigStore()
const refForm = ref()
const topProductData = ref({
  top_id: null,
  products: [],
})
const products = ref([])
const baseUrl = import.meta.env.VITE_API_BASE_URL

const headers = [
  //{ title: 'Check', key: 'check' },
  {
    title: 'Nomi',
    key: 'name_uz',

  },

]

const sendProductstop = () => {
  refForm.value?.validate().then(({ valid }) => {
    let productsdata = {
      top_id: topProductData.value.top_id,
      products: []
    }
    if (valid) {


      topProductData.value.products.forEach((item) => {
        productsdata.products.push({ product_id: item })

      })

      if (route) {
        store.updateTopProduct(route, productsdata).then(() => {
          router.push({ name: 'top-products' })
            .then(() => {
              storeConfig.successToast('top maxsulot tahrirlandi')
            })
        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })

      } else {
        store.createTopProduct(productsdata).then(() => {
          router.push({ name: 'top-products' })
            .then(() => {
              storeConfig.successToast('top maxsulot qo\'shildi')
            })
        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })
      }


    }
  })
}

const closeNavigationDrawer = () => {
  refForm.value?.resetValidation()
  router.push({ name: 'top-products' })
}
const productRefresh = () => {
  storeProduct.fetchProducts(storeProduct.options.page).then((data) => {
    // topProductData.value = data.result
  })
}

onMounted(() => {


  productRefresh()
  storeTopic.fetchTopics()


  if (route) {
    store.fechtTopProductOne(route).then((data) => {


      data.result.forEach((item) => {
        console.log(item.product_id);

        topProductData.value.products.push(item.product_id)
        topProductData.value.top_id = data.result[0].top_id
      })
    })
  }






})
</script>


<style scoped>
.categoryImg {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 150px;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  height: 150px;
  /* stylelint-disable-next-line order/properties-order */
  border-radius: 10px;
}

.labelHeight {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 150px;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  height: 40px !important;
  border-radius: 5px;
  box-shadow: 5px 10px 20px 5px #7367F0 inset;
  /* stylelint-disable-next-line order/properties-order */
  background: #7367F0;
  color: #fff;
}
</style>
