<template>
  <div>
    <h2> {{ $route.params.id ? 'Foydalanuvchi tahrirlash' : 'Foydalanuvchi qo\'shish' }}</h2>

    <VForm ref="refForm" @submit.prevent="sendUser">
      <VRow>

        <!-- image  -->
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

        <!-- name  -->
        <VCol cols="12" md="6">
          <AppTextField v-model="userData.name" :rules="[requiredValidator]" label="Foydalanuvchi nomi" />
        </VCol>

        <!-- role_id -->
        <VCol cols="12" md="6">
          <AppSelect v-model="userData.role_id" :items="store.roles.data" :rules="[requiredValidator]" label="Roli"
            item-title='label' item-value='id' />
        </VCol>


        <!-- password -->
        <VCol cols="12" md="6">
          <AppTextField v-model="userData.password" :rules="[requiredValidator, passwordValidator]"
            :type="isPasswordVisible ? 'text' : 'password'" label="Parol"
            :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible" />
        </VCol>

        <!-- phone  -->
        <VCol cols="12" md="6">
          <AppTextField v-model="userData.phone"
            :rules="[requiredValidator, lengthValidator(userData.phone, 12), maxlengthValidator(userData.phone, 12)]"
            label="Telefon raqam" type="number" />
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
import { ref } from 'vue'
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { useConfigStore } from '@/@core/stores/config';
import { useUsersStore } from "@/@core/stores/users"; import { onMounted } from 'vue';


const userData = ref({
  name: null,
  role_id: null,
  password: null,
  phone: null,
  image: null

})

const image = ref(null)
const router = useRouter()
const refForm = ref()
const isPasswordVisible = ref(false)
const store = useUsersStore()
const storeConfig = useConfigStore()
const route = useRoute()
const baseUrl = import.meta.env.VITE_API_BASE_URL




const onFileChange = (event) => {
  userData.value.image = event.target.files[0]
  image.value = URL.createObjectURL(userData.value.image)
}

const sendUser = () => {
  refForm.value?.validate().then(({ valid }) => {

    const formData = new FormData()
    formData.append('name', userData.value.name)
    formData.append('role_id', userData.value.role_id)
    formData.append('password', userData.value.password)
    formData.append('phone', userData.value.phone)
    formData.append('image', userData.value.image)

    if (valid) {

      store.createUser(formData).then(() => {
        router.push('/users')
          .then(() => {
            storeConfig.successToast('Foydalanuvchi qo\'shildi')
          })
      }).catch((err) => {
        storeConfig.errorToast(err.response._data.message)
      })
    }

  })
}
const closeNavigationDrawer = () => {
  refForm.value?.resetValidation()
  router.push('/users')
}


onMounted(() => {
  store.fetchRoles()

  if (route.params.id) {
    store.fechtUserOne(route.params.id).then((res) => {
      userData.value = res.result
      if (userData.value.image) {
        image.value = baseUrl + res.result.image
      }
      userData.value.image = null
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
