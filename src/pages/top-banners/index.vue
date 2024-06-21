<template>
  <div>
    <div>


      <div class="d-flex gap-3  align-end justify-end mb-6 ">
        <VBtn v-if="$can('store', 'TopBlogController')" class="" @click="$router.push('/top-banners/create')">
          <VIcon icon="tabler-plus" /> qo'shish
        </VBtn>
      </div>
    </div>


    <VDataTable :items="store.top_banners" :headers="headers" :loading="load">

      <template #item.banners="{ item }">

        <div class="">
          <div @click="producttoggelData(item.top_id)" class="my-2 cursor-pointer">
            Bannerlarni ko'rish
            <VIcon icon="tabler-chevron-down" />

          </div>
          <Transition name="slide-fade">

            <div class=" border rounded" v-if="toggle === item.top_id">
              <div v-for="banner in item.banners" :key="banner.id"
                class="pa-2 productContainer d-flex justify-space-between align-center">

                <div>
                  <VAvatar rounded :image="baseUrl + banner.image" class="categoryAvatar" />
                  {{ banner.alternative_text }}
                </div>

                <div v-if="$can('destroy', 'TopBlogController')" @click="deleteItem(banner.id, item.top_id)">

                  <div class="h-100">
                    <IconBtn>
                      <VIcon icon="tabler-trash" color="error" />
                    </IconBtn>

                  </div>
                </div>


              </div>

            </div>

          </Transition>


        </div>
      </template>


      <template #item.actions="{ item }">
        <!-- action buttons -->


        <!-- delete item -->
        <IconBtn v-if="$can('destroy', 'TopBlogController')" @click="deleteItem(item.top_id)" class="border mx-2">
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
const top_banner_id = ref(null)

definePage({
  meta: {
    action: "store",
    subject: 'TopBlogController'
  },
})
const toggle = ref(null)


const headers = [
  { title: 'top name', key: 'name' },
  { title: 'bannerlar', key: 'banners' },

  { title: 'Actions', key: 'actions' },
]

const refresh = () => {
  store.getTopBanners(store.page)
}

const deleteItem = (id, topBannerId) => {
  deleteIndex.value = id
  top_banner_id.value = topBannerId
  deleteDialog.value = true
}
const deleteItemConfirm = () => {

  if (top_banner_id.value) {

    store.deleteBanner(top_banner_id.value, deleteIndex.value)
      .then(() => {
        configStore.successToast('Banner o\'chirildi')
        deleteDialog.value = false
        refresh()
      })
      .catch((error) => {
        deleteDialog.value = false
        top_banner_id.value = null
        configStore.errorToast(error.response._data.message)
      })
  } else {
    store.deleteTopBanner(deleteIndex.value)
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


}
onMounted(() => {
  refresh()
})

const producttoggelData = (id) => {
  console.log(id);
  if (toggle.value === id) {
    toggle.value = null
  } else {
    toggle.value = id
  }

}
</script>


<style>
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  /* stylelint-disable-next-line order/properties-order */
  opacity: 0;
}
</style>
