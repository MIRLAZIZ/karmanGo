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

const sendLogin = () => {

  refLogin.value.validate().then(({ valid: isValid }) => {
    if (isValid) {
      let abilityRules = [
        //   {
        //   action: 'manage',
        //   subject: 'all',

        // },
        {
          action: 'create',
          subject: 'all'
        },

        {
          action: 'read',
          subject: 'all'
        },
      ]


      $api('/api/login', {
        method: 'POST',
        body: form.value
      })
        .then((res) => {


          // "user_id": 1,
          // "user_name": "Karimov Hakimjon",
          // "status": true,
          // "message": "User Logged In Successfully",
          // "access_token": "21|NCczCAsLgqsSPdks6mM7jPJmI043nVepaMv0IPru1c325c1c",
          // "refresh_token": "22|zQ1zMX1rvzZjIlR7W20qLUGcn3iuYIusR2I143dhbd4480c6",
          // "token_type": "Bearer"


          useCookie('userAbilityRules').value = abilityRules
          ability.update(abilityRules)
          useCookie('userData').value = res.user
          useCookie('accessToken').value = res.token
          useCookie('refreshToken').value = res.refresh_token
          router.push('/').then(() => {
            store.successToast()
          })




        })


      // let token = '789|yjFr06EZXSxptVAPJIMZFDVo26SAxtMhlMGPLgkd'
      // let user = {
      //   name: 'Admin',
      //   email: 'admin@vuexy',
      //   id: 1,
      //   role: 'admin',
      // }
      // useCookie('userAbilityRules').value = abilityRules
      // ability.update(abilityRules)
      // useCookie('userData').value = user
      // useCookie('accessToken').value = token
      // router.push('/')

      // console.log('valid')

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

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />
          <h4 class="text-h4 mb-1">
            Welcome to <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
        <VCardText>
          <VForm ref="refLogin" @submit.prevent="sendLogin">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="form.phone" autofocus type="number" placeholder="phone"
                  :rules="[requiredValidator]" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField v-model="form.password" label="Password" placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                <!-- <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox v-model="form.remember" label="Remember me" />
                  <a class="text-primary ms-2 mb-1" href="#">
                    Forgot Password?
                  </a>
                </div> -->

                <VBtn block type="submit">
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <span>New on our platform?</span>

                <a class="text-primary ms-2" href="#">
                  Create an account
                </a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />

                <span class="mx-4">or</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
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
