<template>
  <div>
    <h2> {{ $route.params.id ? 'Редактировать тему' : 'Добавить тему' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendTopic">

      <VRow>
        <!-- name -->
        <VCol cols="12" md="6">
          <AppTextField v-model="topicData.name" :rules="[requiredValidator]" label="Наименование" />

        </VCol>
        <VCol cols="12" md="6">
          <AppSelect v-model="topicData.type" :items="['multiple', 'single']" label="Тип" />

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
import { useTopicsStore } from '@/@core/stores/topics';
import { useConfigStore } from '@/@core/stores/config';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';


const route = useRoute().params.id
const router = useRouter()
const store = useTopicsStore()
const storeConfig = useConfigStore()
const refForm = ref()
const topicData = ref({
  name: null
  // type: null
})


const sendTopic = () => {
  refForm.value?.validate().then(({ valid }) => {

    if (valid) {

      if (route) {
        store.updateTopic(route, topicData.value).then(() => {
          router.push({ name: 'topics' })
            .then(() => {
              storeConfig.successToast('Mavzu tahrirlandi')
            })
        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })

      } else {
        store.createTopic(topicData.value).then(() => {
          router.push({ name: 'topics' })
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
  router.push({ name: 'banners' })
}

onMounted(() => {

  if (route) {
    store.getOneTopic(route).then((data) => {
      console.log(data.result);
      topicData.value = data.result
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
