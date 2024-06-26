<template>
  <div>
    <div>

      <div class="d-flex gap-3  align-end justify-end mb-6 ">
        <VBtn class="" @click="$router.push('/roles/create')">
          <VIcon icon="tabler-plus" /> добавить
        </VBtn>
      </div>
    </div>
    <VDataTable :items="store.roles?.data" :headers="headers" :loading="load">




      <template #item.actions="{ item }">

        <!-- action buttons -->
        <!-- permissions -->
        <IconBtn @click="$router.push(`/roles/permission/${item.id} `)" class="border mx-2" size="large"
          v-if="item.name != 'admin'">
          <VIcon icon="tabler-square-key" color="success" />
        </IconBtn>

        <!-- edit item -->
        <!-- <IconBtn @click="$router.push(`/roles/edit/${item.id}`)" class="border mx-2">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn> -->

        <!-- delete item -->
        <IconBtn @click="deleteItem(item.id)" class="border mx-2">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>

      </template>

      <!-- bottom pagination  -->
      <template #bottom>

        <VCardText class="pt-2">
          <div class="d-flex justify-end">
            <VPagination v-if="store.roles?.data" v-model="store.page" @click="refresh"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.roles?.total / store.roles.per_page)" />
          </div>
        </VCardText>

      </template>

    </VDataTable>

    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />


  </div>

</template>

<script setup>
import { useConfigStore } from '@/@core/stores/config';
import { useRolesStore } from '@/@core/stores/roles';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';


const store = useRolesStore()
const deleteDialog = ref(false)
const deleteIndex = ref(null)
const load = ref(false)
const configStore = useConfigStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const isDialogVisible = ref(false)
const itemData = ref({})

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  },
})

const headers = [
  { title: 'Наименование', key: 'label' },
  { title: 'Роль', key: 'name' },
  { title: 'Действия', key: 'actions' },
]

const refresh = () => {
  store.fetchRoles(store.page)
}

const deleteItem = (id) => {
  deleteIndex.value = id
  deleteDialog.value = true
}
const deleteItemConfirm = () => {
  store.deleteRole(deleteIndex.value)
    .then(() => {
      configStore.successToast('Banner o\'chirildi')
      deleteDialog.value = false
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
