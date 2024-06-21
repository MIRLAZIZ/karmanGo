<template>
  <div>
    <h2> {{ $route.params.id ? 'Редактирование пользователя' : 'Добавить пользователя ' }}</h2>

    <VForm ref="refForm" @submit.prevent="sendUser">
      <VRow>

        <!-- image  -->
        <VCol cols="12">

          <!-- img -->
          <div>
            <img :src="image" alt="" class="categoryImg" v-if="image">

            <div class="text-center border mb-4 d-flex align-center categoryImg justify-center" v-else>
              <VIcon icon="tabler-user-circle" size="80" />
            </div>
          </div>

          <label for="index" class="d-block  d-flex align-center justify-center labelHeight text-center bg-primary">

            {{ $route.params.id ? 'Изменить изображение' : 'Загрузка' }}</label>
          <input type="file" id="index" class="d-none" accept="image/png, image/jpeg, image/jpg, image/svg"
            @change="onFileChange($event, index)">


        </VCol>

        <!-- name  -->
        <VCol cols="12" md="6">
          <AppTextField v-model="userData.name" :rules="[requiredValidator]" label="Наименование" />
        </VCol>

        <!-- role_id -->
        <VCol cols="12" md="6">
          <AppSelect v-model="userData.role_id" :items="store.roles.data" :rules="[requiredValidator]" label="роль"
            item-title='label' item-value='id' />
        </VCol>

        <!-- password -->
        <VCol cols="12" md="6" v-if="!$route.params.id">
          <AppTextField v-model="userData.password" :rules="[requiredValidator]"
            :type="isPasswordVisible ? 'text' : 'password'" label="Пароль"
            :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible" />
        </VCol>


        <!-- password -->
        <VCol cols="12" md="6" v-else>
          <AppTextField v-model="userData.password" :type="isPasswordVisible ? 'text' : 'password'" label="Пароль"
            :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible" />
        </VCol>
        <!--  new password -->
        <VCol cols="12" md="6" v-if="$route.params.id">
          <AppTextField v-model="userData.newPassword" :type="isNewPassword ? 'text' : 'password'" label="Пароль"
            :append-inner-icon="isNewPassword ? 'tabler-eye-off' : 'tabler-eye'"
            @click:append-inner="isNewPassword = !isNewPassword" />
        </VCol>

        <!-- phone  -->
        <VCol cols="12" md="6">
          <AppTextField v-model="userData.phone"
            :rules="[requiredValidator, lengthValidator(userData.phone, 12), maxlengthValidator(userData.phone, 12)]"
            label="Номер телефона" type="number" />
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
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';
import { useConfigStore } from '@/@core/stores/config';
import { useUsersStore } from "@/@core/stores/users"; import { onMounted } from 'vue';


const userData = ref({
  name: null,
  role_id: null,
  password: null,
  phone: null,
  image: null,
  newPassword: null

})
const isNewPassword = ref(false)

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


      if (route.params.id) {
        store.updateUser(route.params.id, formData).then(() => {
          router.push('/users')
            .then(() => {
              storeConfig.successToast()
            })
        }).catch((err) => {

          if (err.response.status >= 500) {
            storeConfig.errorToast('На сервере произошла ошибка')
          } else {
            let errorData = Object.keys(err.response._data.message).map(key => err.response._data.message[key])
            errorData.forEach((item) => {
              storeConfig.errorToast(item)
            })

          }

        })

      }
      else {

        store.createUser(formData).then(() => {
          router.push('/users')
            .then(() => {
              storeConfig.successToast('Foydalanuvchi qo\'shildi')
            })
        }).catch((err) => {

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
  router.push('/users')
}


onMounted(() => {

  store.fetchRoles()

  if (route.params.id) {
    store.fechtUserOne(route.params.id).then((res) => {
      userData.value = res.result
      if (userData.value.image) {
        image.value = baseUrl + res.result.image
        userData.password = null
        userData.value.image = null

      }
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
