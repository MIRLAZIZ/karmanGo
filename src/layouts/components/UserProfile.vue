<script setup>
import { $api } from '@/utils/api';
import avatar1 from '@images/avatars/avatar-1.png'
import { useConfigStore } from '@/@core/stores/config';
import { dataa } from '@/utils/api'
import { watch } from 'vue';
import { onMounted } from 'vue';
import { useCookie } from '@/@core/composable/useCookie';

const router = useRouter()
const ability = useAbility()
const image = ref(null)
const url = import.meta.env.VITE_API_BASE_URL

const userData = useCookie('userData')

const logoutData = () => {
  // Remove "accessToken" from cookie
  useCookie('accessToken').value = null

  // Remove "userData" from cookie
  useCookie('userData').value = null

  // Redirect to login page
  router.push('/login')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  useCookie('userAbilityRules').value = null

  // Reset ability to initial ability
  ability.update([])
}

// console.log(dataa.value);
watch(dataa, (newValue) => {
  if (newValue) {
    logoutData()

  }
})

const logout = () => {

  $api('/api/logout').then(res => {


    logoutData()



  })
    .catch(err => {
      if (err.response.status === 401) {
        logoutData()

      }
      useConfigStore().errorToast(err.response._data.message)

    })


}
onMounted(() => {
  let userData = useCookie('userData')
  if (userData.value.image) image.value = url + userData.value.image
  else {
    image.value = avatar1
  }
  // console.log(userData.value.image);

})


</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="image" />


      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->

          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="image" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userData.name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userData.type }}</VListItemSubtitle>
          </VListItem>

          <!-- <VDivider class="my-2" /> -->

          <!-- 👉 Profile -->

          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem> -->

          <!-- 👉 Settings -->


          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-settings"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem> -->

          <!-- 👉 Pricing -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-currency-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> -->

          <!-- 👉 FAQ -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-help"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem> -->

          <!-- Divider -->
          <!-- <VDivider class="my-2" /> -->

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle @click="logout">Выход</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>

  </VBadge>
</template>
