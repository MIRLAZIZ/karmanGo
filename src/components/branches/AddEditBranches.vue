<template>
  <div>
    {{ $route.params.id }}
    <h2> {{ $route.params.id ? 'Filialni tahrirlash' : 'Filial qo\'shish' }}
    </h2>
    <VForm ref="refForm" @submit.prevent="sendBranch">
      <VRow>

        <!-- name -->
        <VCol cols="12" md="6">
          <AppTextField v-model="branchData.name" :rules="[requiredValidator]" label="Filial nomi" />
        </VCol>

        <!-- longitude, -->
        <VCol cols="12" md="6" class="d-flex gap-x-2 ">
          <AppTextField v-model="branchData.longitude" :rules="[requiredValidator]" label="uzunlik" />
          <!-- latitude -->
          <AppTextField v-model="branchData.latitude" :rules="[requiredValidator]" label="kenglik" />
        </VCol>

        <VCol cols="12" class="d-flex justify-end">
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
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';
import { useBranchesStore } from '@/@core/stores/branches';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfigStore } from '@/@core/stores/config';

const route = useRoute().params.id
const router = useRouter()
const storeConfig = useConfigStore()


const branchData = ref({
  name: null,
  longitude: null,
  latitude: null
})
const store = useBranchesStore()
const refForm = ref()

const sendBranch = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      if (!route) {
        store.createBranch(branchData.value).then(() => {
          router.push('/branches')
            .then(() => {
              storeConfig.successToast('Filial qo\'shildi')
            })
        }).catch((err) => {
          storeConfig.errorToast(err.response._data.message)
        })
      }
      else {
        store.updateBranch(route, branchData.value).then(() => {
          router.push('/branches')
            .then(() => {
              storeConfig.successToast('Filial tahrirlandi')
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
  router.push('/branches')
}

onMounted(() => {
  if (route) {
    store.fetchBranchesOne(route).then((res) => {
      branchData.value = res.result
    })
  }
})



</script>
