<template>
  <div>

    <h2 class="mb-5">{{ $route.params.id ? 'Maxsulotni tahrirlash' : 'Maxsulot qo\'shish' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendPost">
      <VRow>



        <VCol cols="12">

          <!-- img -->
          <div>
            <img :src="image" alt="" class="categoryImg" v-if="image">

            <div class="text-center border mb-4 d-flex align-center categoryImg justify-center" v-else>
              Maxsulot rasmini yuklang </div>
          </div>

          <label for="index" class="d-block  d-flex align-center justify-center labelHeight text-center bg-primary">

            Yuklash</label>
          <input type="file" id="index" class="d-none" accept="image/png, image/jpeg, image/jpg, image/svg"
            @change="onFileChange($event, index)">


        </VCol>

        <!-- product category  -->
        <VCol cols="12" md="6">
          <AppSelect v-model="productData.category_id" :rules="[requiredValidator]" label="Maxsulot kategoriyasi"
            :items="store.categoryies?.data" item-value="id" item-title="name_uz" />
        </VCol>

        <!-- 👉 product name uz-->
        <VCol cols="12" md="6">
          <AppTextField v-model="productData.name_uz" :rules="[requiredValidator]" label="Nomi uz" />
        </VCol>

        <!-- 👉 product name ru -->
        <VCol cols="12" md="6">
          <AppTextField v-model="productData.name_ru" :rules="[requiredValidator]" label="Nomi ru" />
        </VCol>

        <!-- 👉 product name en -->
        <VCol cols="12" md="6">
          <AppTextField v-model="productData.name_en" :rules="[requiredValidator]" label="Nomi en" />
        </VCol>


        <!-- price: null, //required -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.price" :rules="[requiredValidator]" label="Narxi" type="number" />
        </VCol>


        <!-- quantity: null, //required -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.quantity" :rules="[requiredValidator]" label="Soni" type="number" />
        </VCol>

        <!-- discount: null, //nullable -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.discount" :rules="[requiredValidator]" label="Chegirma" type="number" />
        </VCol>
        <!-- by_sale: null, //required -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.by_sale" :rules="[requiredValidator]" label="Sotish" type="number" />
        </VCol>
        <!-- prodduct_type: null, //required  -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.prodduct_type" :rules="[requiredValidator]" label="Maxsulot turi" />
        </VCol>





        <!-- 👉 discriprion  uz -->
        <VCol cols="12" md="6">
          <label class="">Tafsif uz</label>
          <VTextarea v-model="productData.description_uz" rows="3" class="mt-1" />
        </VCol>

        <!-- 👉 discription ru -->
        <VCol cols="12" md="6">
          <label class="">Tafsif ru</label>
          <VTextarea v-model="productData.description_ru" rows="3" class="mt-1" />
        </VCol>

        <!-- 👉  discription en -->
        <VCol cols="12" md="6">
          <label class="">Tafsif en</label>
          <VTextarea v-model="productData.description_en" rows="3" class="mt-1" />
        </VCol>


        <!-- 👉 details_of_product_uz -->
        <VCol cols="12" md="6">
          <label class="">detils uz</label>
          <VTextarea v-model="productData.details_of_product_uz" rows="3" class="mt-1" />
        </VCol>



        <!-- 👉 details_of_product_ru -->
        <VCol cols="12" md="6">
          <label class="">detils ru</label>
          <VTextarea v-model="productData.details_of_product_ru" rows="3" class="mt-1" />
        </VCol>

        <!-- 👉 details_of_product_en-->
        <VCol cols="12" md="6">
          <label class="">detils en</label>
          <VTextarea v-model="productData.details_of_product_en" rows="3" class="mt-1" />
        </VCol>










        <!-- btn group -->
        <VCol cols="12" class="d-flex justify-end">
          <hr />
          <VBtn variant="outlined" color="secondary" @click="closeNavigationDrawer">
            Cancel
          </VBtn>

          <VBtn type="submit" class="ml-3">
            Submit
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';
import { useCategorysStore } from '@/@core/stores/categorys';
import { useConfigStore } from '@/@core/stores/config';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/@core/stores/products'

const route = useRoute().params.id
const router = useRouter()
const storeConfig = useConfigStore()
const store = useCategorysStore()
const storeProduct = useProductsStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL


// img object URL
const image = ref(null)

const productData = ref({
  name_uz: null, //required
  name_ru: null, //required
  name_en: null, //required
  description_uz: null, //nullable
  description_ru: null, //nullable
  description_en: null, //nullable
  details_of_product_uz: null, //nullable
  details_of_product_ru: null, //nullable
  details_of_product_en: null, //nullable
  price: null, //required
  quantity: null, //required
  discount: null, //nullable
  image: null, //required
  category_id: null, //required
  by_sale: null, //required
  prodduct_type: null, //required

})

const refForm = ref()
// input file category img
const onFileChange = (event) => {
  productData.value.image = event.target.files[0]
  image.value = URL.createObjectURL(productData.value.image)
}

// send post method
const sendPost = () => {

  refForm.value?.validate().then(({ valid }) => {
    if (valid) {


      const formData = new FormData();

      formData.append('name_uz', productData.value.name_uz)
      formData.append('name_ru', productData.value.name_ru)
      formData.append('name_en', productData.value.name_en)
      formData.append('description_uz', productData.value.description_uz)
      formData.append('description_ru', productData.value.description_ru)
      formData.append('description_en', productData.value.description_en)
      formData.append('details_of_product_uz', productData.value.details_of_product_uz)
      formData.append('details_of_product_ru', productData.value.details_of_product_ru)
      formData.append('details_of_product_en', productData.value.details_of_product_en)
      formData.append('price', productData.value.price)
      formData.append('quantity', productData.value.quantity)
      formData.append('discount', productData.value.discount)
      formData.append('image', productData.value.image)
      formData.append('category_id', productData.value.category_id)
      formData.append('by_sale', productData.value.by_sale)
      formData.append('product_type', productData.value.product_type)

      if (route) {

        store.updateCategory(route, formData).then(() => {
          router.push('/')
            .then(() => {
              setTimeout(() => {
                storeConfig.successToast('Kategoriya tahrirlandi')
              }, 1000);
            })

        }).catch((err) => {
          console.log(err.response);
          storeConfig.errorToast(err.response._data.message)
        })
      } else {

        storeProduct.createProduct(formData).then((res) => {
          router.push('/')
            .then(() => {
              setTimeout(() => {
                storeConfig.successToast('Kategoriya qo\'shildi')
              }, 1000);
            })


        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })
      }
    }
  })
}

// close page method
const closeNavigationDrawer = () => {
  refForm.value?.resetValidation()
  router.push('/')

}

// get one categoryData
const getData = () => {
  if (route) {
    storeProduct.fetchProduct(route).then(res => {
      console.log(res.result);
      productData.value = res.result
      image.value = baseUrl + res.result.image
      productData.value.image = null
    }
    )
  }
}



onMounted(() => {
  getData()
  store.fetchCategoryies()








})

</script>

<style>
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
