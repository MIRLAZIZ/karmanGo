<template>
  <div>
    <h2> {{ $route.params.id ? 'Редактировать баннер' : 'Добавить баннер' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendBanner">

      <VRow>



        <!-- image  -->
        <VCol cols="12">

          <!-- img -->
          <div>
            <img :src="image" alt="" class="categoryImg" v-if="image">

            <div class="text-center border mb-4 d-flex align-center categoryImg justify-center" v-else>
              Загрузите изображение баннера </div>
          </div>

          <label for="index" class="d-block  d-flex align-center justify-center labelHeight text-center bg-primary">

            {{ $route.params.id ? 'Изменить изображение' : 'Загрузка' }}</label>
          <input type="file" id="index" class="d-none" accept="image/png, image/jpeg, image/jpg, image/svg"
            @change="onFileChange($event, index)">

        </VCol>


        <!-- name -->
        <VCol cols="12" md="6">
          <AppTextField v-model="bannerData.alternative_text" :rules="[requiredValidator]" label="Название баннера" />
        </VCol>

        <!-- type -->
        <VCol cols="12" md="6">
          <AppSelect v-model="bannerData.type" :rules="[requiredValidator]" label="Тип" :items="['top', 'bottom']"
            title="items" />
        </VCol>


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
import { ref } from 'vue'
import { useBannersStore } from '@/@core/stores/banners';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { useConfigStore } from '@/@core/stores/config';


const route = useRoute().params.id
const router = useRouter()
const store = useBannersStore()
const storeConfig = useConfigStore()
const refForm = ref()
const bannerData = ref({
  alternative_text: null,
  banner: null,
  type: null
})

const image = ref(null)
const baseUrl = import.meta.env.VITE_API_BASE_URL


const onFileChange = (event) => {
  bannerData.value.banner = event.target.files[0]
  image.value = URL.createObjectURL(bannerData.value.banner)
}

const sendBanner = () => {
  refForm.value?.validate().then(({ valid }) => {

    const formData = new FormData()
    formData.append('alternative_text', bannerData.value.alternative_text)
    formData.append('banner', bannerData.value.banner)
    formData.append('type', bannerData.value.type)

    if (valid) {

      if (route) {
        store.updateBanner(route, formData).then(() => {
          router.push({ name: 'banners' })
            .then(() => {
              storeConfig.successToast('Banner tahrirlandi')
            })
        })
          .catch((err) => {
            let errorData = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
            errorData.forEach((item) => {
              storeConfig.errorToast(item)
            })
            // storeConfig.errorToast()
          })

      } else {
        store.createBanner(formData).then(() => {
          router.push({ name: 'banners' })
            .then(() => {
              storeConfig.successToast('Banner qo\'shildi')
            })
        })
          .catch((err) => {
            let errorData = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
            errorData.forEach((item) => {
              storeConfig.errorToast(item)
            })
          })
      }


    }
  })
}

const closeNavigationDrawer = () => {
  refForm.value?.resetValidation()
  router.push({ name: 'banners' })
}

onMounted(() => {

  if (route) {
    store.fechtBannerOne(route).then((data) => {
      bannerData.value.alternative_text = data.result.alternative_text
      image.value = baseUrl + data.result.banner
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
  box-shadow: 5px 10px 20px 5px #EF233C inset;
  /* stylelint-disable-next-line order/properties-order */
  background: #7367F0;
  color: #fff;
}
</style>
