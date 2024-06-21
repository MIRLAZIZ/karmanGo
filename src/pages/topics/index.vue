<template>
  <div>
    <div>

      <div class="d-flex gap-3  align-end justify-end mb-6 ">
        <VBtn class="" v-if="$can('store', 'TopController')" @click="$router.push('/topics/create')">
          <VIcon icon="tabler-plus" /> добавить
        </VBtn>
      </div>
    </div>
    <VDataTable :items="store.topics" :headers="headers" :loading="load">


      <template #item.actions="{ item }">

        <!-- action buttons -->

        <!-- edit item -->
        <IconBtn v-if="$can('update', 'TopController')" @click="$router.push(`/topics/edit/${item.id}`)"
          class="border mx-2" size="large">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>

        <!-- delete item -->
        <IconBtn v-if="$can('destroy', 'TopController')" @click="deleteItem(item.id)" class="border mx-2" size="large">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>

      </template>

      <!-- bottom pagination  -->
      <template #bottom>

        <VCardText class="pt-2">
          <div class="d-flex justify-end">
            <VPagination v-if="store.topics?.data" v-model="store.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.topics?.total / store.topics.per_page)" />
          </div>
        </VCardText>

      </template>

    </VDataTable>

    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />


  </div>

</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useTopicsStore } from '@/@core/stores/topics';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/@core/stores/config';


const store = useTopicsStore()
const deleteDialog = ref(false)
const deleteIndex = ref(null)
const load = ref(false)
const configStore = useConfigStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const isDialogVisible = ref(false)
const itemData = ref({})

definePage({
  meta: {
    action: "index",
    subject: 'TopController'
  },
})
// "banner": "/storage/banner/2024-05/zU8msI85Z3ZV4jNkc5liDafJAAuWz5nLxuQ7gIsC.png",
//   "alternative_text": "hello screenshot",

const headers = [
  { title: 'Наименование', key: 'name' },

  { title: 'Действия', key: 'actions' },
]

const refresh = () => {
  store.fetchTopics(store.page)
}

const deleteItem = (id) => {
  deleteIndex.value = id
  deleteDialog.value = true
}
const deleteItemConfirm = () => {
  store.deleteTopic(deleteIndex.value)
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
