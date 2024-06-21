<template>
  <div>
    <h2> {{ $route.params.id ? 'Редактировать роль' : 'Role qo\'shish' }}</h2>

    <!-- 👉 Form -->
    <VForm ref="refForm" @submit.prevent="sendRole">

      <VRow>
        <!-- name -->
        <VCol cols="12" md="6">
          <AppTextField v-model="roleData.label" :rules="[requiredValidator]" label="Роль название " />

        </VCol>
        <VCol cols="12" md="6">
          <AppTextField v-model="roleData.name" label="Роль" :rules="[requiredValidator]" />

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
import { useRolesStore } from '@/@core/stores/roles';
import { useConfigStore } from '@/@core/stores/config';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';


const route = useRoute().params.id
const router = useRouter()
const store = useRolesStore()
const storeConfig = useConfigStore()
const refForm = ref()
const roleData = ref({
  name: null,
  label: null
})


const sendRole = () => {
  refForm.value?.validate().then(({ valid }) => {

    if (valid) {

      if (route) {
        store.updateRole(route, roleData.value).then(() => {
          router.push({ name: 'roles' })
            .then(() => {
              storeConfig.successToast('Mavzu tahrirlandi')
            })
        })
          .catch((err) => {
            storeConfig.errorToast(err.response._data.message)
          })

      } else {
        store.createRole(roleData.value).then(() => {
          router.push({ name: 'roles' })
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
  router.push({ name: 'roles' })
}

onMounted(() => {

  if (route) {
    store.getOneRole(route).then((data) => {
      roleData.value = data.result
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
