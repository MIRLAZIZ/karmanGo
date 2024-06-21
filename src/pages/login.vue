<!-- eslint-disable array-bracket-newline -->
<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useAbility } from '@casl/vue'
import { $api } from '@/utils/api'
import { useCookie } from '@/@core/composable/useCookie'
import { useConfigStore } from '@/@core/stores/config'
// definePage({ meta: { layout: 'blank' } })
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const form = ref({
  phone: '',
  password: '',
})

const store = useConfigStore()
// const ability = useAbility()
const ability = useAbility()

const router = useRouter()

const refLogin = ref()

const permissions = [
  {
    action: "index",
    subject: 'CategoryController'
  },
  {
    action: "store",
    subject: 'CategoryController'
  },
  {
    action: "destroy",
    subject: 'CategoryController'
  },
  {
    action: "update",
    subject: 'CategoryController'
  },
  {
    action: "index",
    subject: 'ProductController'
  },
  {
    action: "store",
    subject: 'ProductController'
  },
  {
    action: "destroy",
    subject: 'ProductController'
  },
  {
    action: "update",
    subject: 'ProductController'
  },
  {
    action: "index",
    subject: 'BranchController'
  },
  {
    action: "store",
    subject: 'BranchController'
  },
  {
    action: "destroy",
    subject: 'BranchController'
  },
  {
    action: "update",
    subject: 'BranchController'
  },

  {
    action: "index",
    subject: 'UserController'
  },
  {
    action: "store",
    subject: 'UserController'
  },
  {
    action: "destroy",
    subject: 'UserController'

  },
  {
    action: "update",
    subject: 'UserController'
  },
  {
    action: "index",
    subject: 'BlogController'

  },
  {
    action: "create",
    subject: 'BlogController'
  },
  {
    action: "destroy",
    subject: 'BlogController'
  },
  {
    action: "update",
    subject: 'BlogController'
  },
  {
    action: "index",
    subject: 'TopController'


  },
  {
    action: "store",
    subject: 'TopController'
  },


  {
    action: "destroy",
    subject: 'TopController'
  },
  {
    action: "update",
    subject: 'TopController'

  },
  {
    action: "index",
    subject: 'TopProductController'
  },
  {
    action: "store",
    subject: 'TopProductController'
  },
  {
    action: "deleteTopsProduct",
    subject: 'TopProductController'
  },
  {
    action: "index",
    subject: 'TopBlogController'
  },
  {
    action: "store",
    subject: 'TopBlogController'
  },
  {
    action: "allOrders",
    subject: 'ProfileController'
  },
  {
    action: 'read',
    subject: 'all',
  }
]

const sendLogin = () => {

  refLogin.value.validate().then(({ valid: isValid }) => {
    if (isValid) {
      // let abilityRules = [
      //   //   {
      //   //   action: 'manage',
      //   //   subject: 'all',

      //   // },
      //   {
      //     action: 'create',
      //     subject: 'all'
      //   },

      //   {
      //     action: 'read',
      //     subject: 'all'
      //   },
      // ]


      $api('/api/login', {
        method: 'POST',
        body: form.value
      })
        .then((res) => {

          let abilityRules = res.user.type === 'admin' ? permissions : res.permissions

          useCookie('userAbilityRules').value = abilityRules
          ability.update(abilityRules)
          useCookie('userData').value = res.user
          useCookie('accessToken').value = res.token
          useCookie('refreshToken').value = res.refresh_token
          router.push('/').then(() => {
            store.successToast()
          })
        })
        .catch((err) => {
          console.log(err.response);
          store.errorToast(err.response._data.error)
        })




    } else {
      console.log('invalid')
    }
  })
}


const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg max-width="505" :src="authThemeImg" class="auth-illustration mt-16 mb-2" />
        </div>

        <!-- <VImg class="auth-footer-mask" :src="authThemeMask" /> -->
      </div>
    </VCol>





    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" />
          <!-- <h4 class="text-h4 mb-1">
            Welcome to <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4> -->
          <p class="mb-0">
            Пожалуйста, введите свой аккаунт </p>
        </VCardText>
        <VCardText>
          <VForm ref="refLogin" @submit.prevent="sendLogin">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="form.phone" autofocus type="number" placeholder="Телефон"
                  :rules="[requiredValidator]" label="Телефон" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField v-model="form.password" label="Пароль" placeholder="пароль"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />



                <VBtn block type="submit" class="mt-4">
                  Отправка
                </VBtn>
              </VCol>





            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
<!-- EF233C -->
