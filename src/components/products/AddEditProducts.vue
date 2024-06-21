<template>
  <div>

    <h2 class="mb-5">{{ $route.params.id ? 'Редактирование продукта' : 'Добавить продукт' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendPost">
      <VRow>



        <VCol cols="12">

          <!-- img -->
          <div>
            <img :src="image" alt="" class="categoryImg" v-if="image">

            <div class="text-center border mb-4 d-flex align-center categoryImg justify-center" v-else>
              Загрузите изображение продукта </div>
          </div>

          <label for="index" class="d-block  d-flex align-center justify-center labelHeight text-center bg-primary">

            {{ $route.params.id ? 'Изменить изображение' : 'Загрузить' }}
          </label>
          <input type="file" id="index" class="d-none" accept="image/png, image/jpeg, image/jpg, image/svg"
            @change="onFileChange($event, index)">


        </VCol>

        <!-- product category  -->
        <VCol cols="12" md="6">
          <AppSelect v-model="productData.category_id" :rules="[requiredValidator]" label="Категория"
            :items="store.categoryies" item-value="id" item-title="name" />
        </VCol>

        <!-- 👉 product name uz-->
        <VCol cols="12" md="6">
          <AppTextField v-model="productData.name" :rules="[requiredValidator]" label="Название" />
        </VCol>

        <!-- 👉 product name ru -->
        <!-- <VCol cols="12" md="6">
          <AppTextField v-model="productData.name_ru" :rules="[requiredValidator]" label="Nomi ru" />
        </VCol> -->

        <!-- 👉 product name en -->
        <!-- <VCol cols="12" md="6">
          <AppTextField v-model="productData.name_en" :rules="[requiredValidator]" label="Nomi en" />
        </VCol> -->


        <!-- price: null, //required -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.price" :rules="[requiredValidator]" label="Цена" type="number" />
        </VCol>


        <!-- quantity: null, //required -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.quantity" :rules="[requiredValidator]" label="Количество" type="number" />
        </VCol>

        <!-- discount: null, //nullable -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.discount" label="Скидка" type="number" />
        </VCol>
        <!-- by_sale: null, //required -->
        <!-- <VCol md="6" cols="12">
          <AppTextField v-model="productData.by_sale" :rules="[requiredValidator]" label="Продажа" type="number" />
        </VCol> -->
        <!-- prodduct_type: null, //required  -->
        <VCol md="6" cols="12">
          <AppTextField v-model="productData.product_type" :rules="[requiredValidator]" label="Тип продукта" />
        </VCol>





        <!-- 👉 discriprion  uz -->
        <VCol cols="12" md="6">
          <label class="">Описание</label>
          <VTextarea v-model="productData.description" rows="3" class="mt-1" />
        </VCol>

        <!-- 👉 discription ru -->
        <!-- <VCol cols="12" md="6">
          <label class="">Tafsif ru</label>
          <VTextarea v-model="productData.description_ru" rows="3" class="mt-1" />
        </VCol> -->

        <!-- 👉  discription en -->
        <!-- <VCol cols="12" md="6">
          <label class="">Tafsif en</label>
          <VTextarea v-model="productData.description_en" rows="3" class="mt-1" />
        </VCol> -->


        <!-- 👉 details_of_product_uz -->
        <VCol cols="12" md="6">
          <label class="">Подробности</label>
          <VTextarea v-model="productData.details_of_product" rows="3" class="mt-1" />
        </VCol>



        <!-- 👉 details_of_product_ru -->
        <!-- <VCol cols="12" md="6">
          <label class="">detils ru</label>
          <VTextarea v-model="productData.details_of_product_ru" rows="3" class="mt-1" />
        </VCol> -->

        <!-- 👉 details_of_product_en-->
        <!-- <VCol cols="12" md="6">
          <label class="">detils en</label>
          <VTextarea v-model="productData.details_of_product_en" rows="3" class="mt-1" />
        </VCol> -->










        <!-- btn group -->
        <VCol cols="12" class="d-flex justify-end">
          <hr />
          <VBtn variant="outlined" color="secondary" @click="closeNavigationDrawer">
            Отмена
          </VBtn>

          <VBtn type="submit" class="ml-3">
            {{ $route.params.id ? 'Сохранить' : 'Добавить' }}
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
  name: null, //required
  // name_ru: null, //required
  // name_en: null, //required
  description: null, //nullable
  // description_ru: null, //nullable
  // description_en: null, //nullable
  details_of_product: null, //nullable
  // details_of_product_ru: null, //nullable
  // details_of_product_en: null, //nullable
  price: null, //required
  quantity: null, //required
  discount: null, //nullable
  image: null, //required
  category_id: null, //required
  // by_sale: null, //required
  product_type: null, //required

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

      formData.append('name', productData.value.name)
      // formData.append('name_ru', productData.value.name_ru)
      // formData.append('name_en', productData.value.name_en)
      formData.append('description', productData.value.description)
      // formData.append('description_ru', productData.value.description_ru)
      // formData.append('description_en', productData.value.description_en)
      // formData.append('details_of_product_uz', productData.value.details_of_product_uz)
      // formData.append('details_of_product_ru', productData.value.details_of_product_ru)
      formData.append('details_of_product', productData.value.details_of_product)
      formData.append('price', productData.value.price)
      formData.append('quantity', productData.value.quantity)
      formData.append('discount', productData.value.discount)
      formData.append('image', productData.value.image)
      formData.append('category_id', productData.value.category_id)
      // formData.append('by_sale', productData.value.by_sale)
      formData.append('product_type', productData.value.product_type)

      if (route) {

        storeProduct.updataProduct(route, formData).then(() => {
          router.push('/')
            .then(() => {
              storeConfig.successToast('Товар добавлен')

            })

        }).catch((err) => {
          let errorResponse = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
          errorResponse.map(key => {
            storeConfig.errorToast(key)
          })

          // storeConfig.errorToast(errorResponse.map(key => {
          //   return key
          // }))
        })
      } else {

        storeProduct.createProduct(formData).then((res) => {
          router.push('/')
            .then(() => {

              storeConfig.successToast('Продукт отредактирован')

            })


        })
          .catch((err) => {
            let errorResponse = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
            errorResponse.map(key => {
              storeConfig.errorToast(key)
            })


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
  box-shadow: 5px 10px 20px 5px #EF233C inset;
  color: #fff;
}
</style>
