import { ofetch } from 'ofetch'
import { useBannersStore } from '@/@core/stores/banners'
import { ref } from 'vue'

export const dataa = ref(false)



export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      // useBannersStore().logoutData = true
      dataa.value = true




      // router.push({ name: 'login' })
      // useAuthStore().logout()
      // const refreshToken = useCookie('refreshToken').value
      // useCookie('accessToken').value = refreshToken


      // if (refreshToken) {
      //   const refreshTokenResponse = await $api('/api/refresh/token', {
      //     method: 'POST',
      //     body: {
      //       refreshToken
      //     }
      //   })

      //   if (response.status === 200) {
      //     useCookie('accessToken').value = refreshTokenResponse.result.token
      //     useCookie('refreshToken').value = refreshTokenResponse.result.refresh_token
      //   }

      // }





    }
  },
})
