<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },

  itemData: {
    type: Object,
    required: false,
    default: () => ({

    })
  }
})
const baseUrl = import.meta.env.VITE_API_BASE_URL

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])
const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}


</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 580" :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate">
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-8">


      <VCardText class="pt-6">
        <h3>Kategoriyani ma'lumotlari</h3>
        <VRow>
          <!-- 👉 category img -->
          <VCol cols="12">
            <img :src="baseUrl + itemData.image" alt="" class="imgSize">

          </VCol>
          <VCol>
            <h4>Kategoriyani nomi</h4>

          </VCol>

          <!-- 👉 category name uz -->
          <VCol cols="12">
            <b class="mr-1">O'zbekcha: </b> <span>{{ itemData.name_uz }}</span>
            <hr class="my-3">
            <b class="mr-1">Ruscha: </b> <span>{{ itemData.name_ru }}</span>
            <hr class="my-3">

            <b class="mr-1">English: </b> <span>{{ itemData.name_en }}</span>

          </VCol>





          <!-- 👉 Card actions -->
          <VCol cols="12" class="d-flex justify-end">

            <VBtn color="secondary" variant="tonal" @click="$emit('update:isDialogVisible', false)">
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.imgSize {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 150px;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  height: 150px;
  border-radius: 10px;
}
</style>
