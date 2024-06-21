<template>
  <div>
    <div class="d-flex gap-3  align-end justify-end mb-6">

      <VBtn v-if="$can('store', 'UserController')" @click="$router.push('/users/create')">
        <VIcon icon="tabler-plus" /> добавить
      </VBtn>
    </div>


    <VDataTable :items="store.users?.data" :headers="headers">


      <!-- fullname -->
      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <VAvatar size="32" :color="item.image ? '' : 'primary'"
            :class="item.image ? '' : 'v-avatar-light-bg primary--text'" :variant="!item.image ? 'tonal' : undefined">
            <VImg v-if="item.image" :src="baseUrl + item.image" />
            <span v-else>{{ avatarText(item.name) }}</span>
          </VAvatar>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.name }}</span>
            <small>{{ item.post }}</small>
          </div>
        </div>
      </template>

      <!-- email_verified_at -->
      <template #item.email_verified_at="{ item }">
        <small>{{ item.email_verified_at ? item.email_verified_at : 'Unverified' }} </small> </template>




      <template #item.actions="{ item }">

        <!-- action buttons -->






        <!-- edit item -->
        <IconBtn v-if="$can('update', 'UserController')" @click="$router.push(`/users/update/${item.id}`)"
          class="border mx-2" size="large">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>




        <!-- delete item -->
        <IconBtn v-if="$can('destroy', 'UserController')" @click="deleteItem(item.id)" class="border " size="large">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>


      </template>



      <!-- pagination -->
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex justify-end">



            <VPagination v-if="store.users?.data" v-model="store.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.users?.total / store.users.per_page)" @click="refresh" />
          </div>
        </VCardText>
      </template>


    </VDataTable>


    <!-- delete dialog -->
    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />



  </div>
</template>

<script setup>
import { useConfigStore } from '@/@core/stores/config';
import { useUsersStore } from '@/@core/stores/users';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';


definePage({
  meta: {
    action: "index",
    subject: 'UserController'
  }
})

const store = useUsersStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const headers = [
  { title: 'Наименование', key: 'name' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Тип', key: 'type' },
  { title: 'Действия', key: 'actions' },
]
const refresh = () => {
  store.fetchUsers(store.page)
}
const deleteDialog = ref(false)
const deleteIndex = ref(null)
const configStore = useConfigStore()

const deleteItem = (id) => {
  deleteIndex.value = id
  deleteDialog.value = true
}

const deleteItemConfirm = () => {
  store.deleteUser(deleteIndex.value).then(() => {
    deleteDialog.value = false
    configStore.successToast('Foydalanuvchi o\'chirildi')
    refresh()
  })
    .catch((error) => {
      deleteDialog.value = false
      configStore.errorToast(error.response._data.message)
    })
}

onMounted(() => {
  refresh()
})

</script>
