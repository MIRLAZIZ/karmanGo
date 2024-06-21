<template>
  <div>

    <h2 class="mb-5">{{ $route.params.id ? 'Редактирование категории' : 'Добавить категорию' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendPost">
      <VRow>

        <VCol cols="12" class="">
          <div>
            <img :src="image" alt="" class="categoryImg" v-if="image">
            <div class="categoryImg border mb-4 d-flex align-center justify-center" v-else>
              <p class="text-center"> Изображение категории</p>
            </div>

          </div>
          <label for="image"
            class="border d-block  p-3  d-flex align-center justify-center text-center labelHeight bg-primary">
            {{ $route.params.id ? 'Изменить изображение' : 'Загрузка' }}
          </label>

          <input type="file" @change="onFileChange" id="image" class="d-none" accept="image/png, image/jpeg">

        </VCol>


        <!-- 👉 category name uz -->
        <VCol cols="12" class="" md="6">
          <AppTextField v-model="categoryData.name" :rules="[requiredValidator]" label="Название категории" />
        </VCol>

        <!-- 👉 category name  ru-->
        <!-- <VCol cols="12" class="" md="6">
          <AppTextField v-model="categoryData.name_ru" :rules="[requiredValidator]" label="Kategoriya nomi ru" />
        </VCol> -->
        <!-- 👉 category name en -->
        <!-- <VCol cols="12" class="" md="6">
          <AppTextField v-model="categoryData.name_en" :rules="[requiredValidator]" label="Kategoriya nomi en" />
        </VCol> -->



        <!-- btn group -->
        <VCol cols="12" class="d-flex justify-end">
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
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';
import { useCategorysStore } from '@/@core/stores/categorys';
import { useConfigStore } from '@/@core/stores/config';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute().params.id
const router = useRouter()
const storeConfig = useConfigStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL


const categoryData = ref({
  name: null,
  // name_ru: null,
  // name_en: null,
  image: null,
})
// img object URL
const image = ref(null)

const store = useCategorysStore()
const refForm = ref()
// input file category img
const onFileChange = (event) => {
  categoryData.value.image = event.target.files[0]
  image.value = URL.createObjectURL(categoryData.value.image)

}
// send post method
const sendPost = () => {

  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      const formdata = new FormData()
      formdata.append('name', categoryData.value.name)
      // formdata.append('name_ru', categoryData.value.name_ru)
      // formdata.append('name_en', categoryData.value.name_en)
      formdata.append('image', categoryData.value.image)

      if (route) {

        store.updateCategory(route, formdata).then(() => {
          router.push('/categories')
            .then(() => {
              storeConfig.successToast('Kategoriya qo\'shildi')
            })

        }).catch((err) => {
          let error = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
          console.log(error);



          storeConfig.errorToast(error.map(key => {
            return key
          }))
        })
      } else {
        store.CreateCategory(formdata).then((res) => {
          router.push('/categories')
            .then(() => {

              storeConfig.successToast('Kategoriya tahrirlandi')


            })


        })
          .catch((err) => {
            // storeConfig.errorToast(Object.keys(err.response._data.message).map(key => err.response._data.message[key])[0]
            // )
          })
      }
    }
  })
}

// close page method
const closeNavigationDrawer = () => {
  refForm.value?.resetValidation()
  router.push('/categories')

}

// get one categoryData
const getData = () => {
  if (route) {
    store.getOneCategory(route).then(res => {
      categoryData.value.name = res.result.name
      // categoryData.value.name_ru = res.result.name_ru
      // categoryData.value.name_uz = res.result.name_uz
      image.value = baseUrl + res.result.image
    }
    )
  }
}







onMounted(() => {
  getData()




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
  /* stylelint-disable-next-line order/properties-order */
  background: #7367F0;
  color: #fff;
}
</style>
