<template>
  <div>
    <div class="d-flex gap-3  align-end justify-end mb-6">

      <VBtn @click="$router.push('/users/create')"> Foydalanuvchi qo'shish </VBtn>
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
        <IconBtn @click="viewItem(item)" class="border mx-2" size="large">
          <VIcon icon="tabler-eye" color="success" />
        </IconBtn>


        <!-- edit item -->
        <IconBtn @click="$router.push(`/users/update/${item.id}`)" class="border mx-2" size="large">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>




        <!-- delete item -->
        <IconBtn @click="deleteItem(item.id)" class="border " size="large">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>


      </template>


    </VDataTable>


    <!-- delete dialog -->
    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />



  </div>
</template>

<script setup>
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import { useUsersStore } from '@/@core/stores/users';
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/@core/stores/config';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';


definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

const store = useUsersStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Phone', key: 'phone' },
  { title: 'Email', key: 'email_verified_at' },
  { title: 'Type', key: 'type' },
  { title: 'Actions', key: 'actions' },

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
