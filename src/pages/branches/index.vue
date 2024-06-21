<template>
  <div>
    <!-- <pre>
      {{ store.branches }}

    </pre> -->
    <div class="d-flex gap-3  align-end justify-end mb-6 ">
      <VBtn v-if="$can('store', 'BranchController')" class="" @click="$router.push('/branches/create')">
        <VIcon icon="tabler-plus" /> добавить
      </VBtn>
    </div>

    <VDataTable :items="store.branches?.data" :headers="headers">

      <template #item.actions="{ item }">

        <!-- action buttons -->

        <!-- edit item -->
        <IconBtn v-if="$can('update', 'BranchController')" @click="$router.push(`/branches/edit/${item.id}`)"
          class="border mx-2">
          <VIcon icon="tabler-edit" color="success" />
        </IconBtn>

        <!-- delete item -->
        <IconBtn v-if="$can('destroy', 'BranchController')" @click="deleteItem(item.id)" class="border">
          <VIcon icon="tabler-trash" color="error" />
        </IconBtn>


      </template>

      <!-- pagination -->
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex justify-end">



            <VPagination v-if="store.branches?.data" v-model="store.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.branches?.total / store.branches.per_page)" @click="refresh" />
          </div>
        </VCardText>
      </template>
    </VDataTable>

    <DeleteDialog v-model:delete-dialog="deleteDialog" @closeDelete="deleteDialog = false"
      @deleteItemConfirm="deleteItemConfirm" />

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useBranchesStore } from '@/@core/stores/branches';
import DeleteDialog from '@/components/posts/DeleteDialog.vue';

import { useConfigStore } from '@/@core/stores/config';
const store = useBranchesStore()
const configStore = useConfigStore()
const itemId = ref(null)
const deleteDialog = ref(false)

const deleteItem = (id) => {
  itemId.value = id
  deleteDialog.value = true
}

definePage({
  meta: {
    action: "index",
    subject: 'BranchController'
  },
})
const refresh = () => {
  store.fetchBranches(1)
}


const headers = [
  { title: 'Наименование', key: 'name' },
  { title: 'длина', key: 'longitude' },
  { title: 'широта', key: 'latitude' },
  { title: 'действия', key: 'actions' },
]

const deleteItemConfirm = () => {
  store.deleteBranch(itemId.value)
    .then(() => {
      configStore.successToast('Filial o\'chirildi')
      deleteDialog.value = false
      itemId.value = null
      refresh()
    })
}



onMounted(() => {
  refresh()
})



</script>
