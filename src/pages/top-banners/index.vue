<template>
  <div>
    <div>
      <!-- <pre>{{ store.top_banners }}</pre> -->

      <div class="d-flex gap-3  align-end justify-end mb-6 ">
        <VBtn class="" @click="$router.push('/top-banners/create')">
          <VIcon icon="tabler-plus" /> Roli qo'shish
        </VBtn>
      </div>
    </div>
    <VDataTable :items="store.top_banners?.data" :headers="headers" :loading="load">
      <!-- blog_name -->
      <template #item.blog_name="{ item }">
        <div class="py-1">
          <VAvatar rounded :image="baseUrl + item.blog_name" class="categoryAvatar" />
        </div>
      </template>


      <template #item.actions="{ item }">
        <!-- action buttons -->
        <!-- edit item -->
        <IconBtn @click="$router.push(`/top-banners/edit/${item.id}`)" class="border mx-2">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>

        <!-- delete item -->
        <IconBtn @click="deleteItem(item.id)" class="border mx-2">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>

      </template>

      <!-- bottom pagination  -->
      <template #bottom>

        <VCardText class="pt-2">
          <div class="d-flex justify-end">
            <VPagination v-if="store.top_banners?.data" v-model="store.page" @click="refresh"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.top_banners?.total / store.top_banners.per_page)" />
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
import { useTopBannersStore } from '@/@core/stores/top_banners';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/@core/stores/config';


const store = useTopBannersStore()
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
// "banner": "/storage/banner/2024-05/zU8msI85Z3ZV4jNkc5liDafJAAuWz5nLxuQ7gIsC.png",
//   "alternative_text": "hello screenshot",



// "top_name": "Hayit bayrami uchun chegirmalar",
//   "blog_name": "/storage/banner/2024-05/aHFssiq711WEPXnldi69mSj885FG44jJbPDTfOaO.png",
//     "blogs_text": "screenshot"

const headers = [
  { title: 'Blog rasmi', key: 'blog_name' },
  { title: 'Blog text', key: 'blogs_text' },
  { title: 'Nomi', key: 'top_name' },
  { title: 'Actions', key: 'actions' },
]

const refresh = () => {
  store.getTopBanners(store.page)
}

const deleteItem = (id) => {
  deleteIndex.value = id
  deleteDialog.value = true
}
const deleteItemConfirm = () => {
  store.deleteBanner(deleteIndex.value)
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
