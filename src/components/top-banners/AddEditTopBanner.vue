<template>
  <div>
    <h2> {{ $route.params.id ? 'Role tahrirlash' : 'Role qo\'shish' }}</h2>
    <!-- {{ storeBanner.banners }} -->
    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendRole">

      <VRow>
        <!-- name -->
        <VCol cols="12" md="6">
          <AppSelect v-model="topBannerData.blog_id" :rules="[requiredValidator]" label="Baner nomi"
            :items="storeBanner.banners" item-title="alternative_text" item-value="id" />

        </VCol>
        <VCol cols="12" md="6">
          <AppSelect v-model="topBannerData.top_id" label="top nomi" :rules="[requiredValidator]"
            :items="storeTopic.topics" item-title="name" item-value="id" />

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
import { ref } from 'vue'
import { useTopBannersStore } from '@/@core/stores/top_banners';
import { useConfigStore } from '@/@core/stores/config';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { useTopicsStore } from '@/@core/stores/topics';
import { useBannersStore } from '@/@core/stores/banners';



const route = useRoute().params.id
const router = useRouter()
const store = useTopBannersStore()
const storeConfig = useConfigStore()
const storeTopic = useTopicsStore()
const storeBanner = useBannersStore()
const refForm = ref()
const topBannerData = ref({
  top_id: null,
  blog_id: null,
})


const sendRole = () => {
  refForm.value?.validate().then(({ valid }) => {

    if (valid) {

      if (route) {
        store.updateBanner(route, topBannerData.value).then(() => {
          router.push({ name: 'top-banners' })
            .then(() => {
              storeConfig.successToast('Mavzu tahrirlandi')
            })
        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })

      } else {
        store.createBanner(topBannerData.value).then(() => {
          router.push({ name: 'top-banners' })
            .then(() => {
              storeConfig.successToast('Mavzu qo\'shildi')
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
  router.push({ name: 'top-banners' })
}

onMounted(() => {
  storeTopic.fetchTopics()
  storeBanner.getBanners()


  if (route) {
    store.fechtBannerOne(route).then((data) => {
      topBannerData.value = data.result
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
