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
        <VRow>
          <!-- 👉 category img -->
          <VCol cols="12">
            <img :src="baseUrl + itemData.image" alt="" class="">

          </VCol>
          <VCol>
            <h3>Maxsulot ma'lumotlari</h3>

          </VCol>

          <!-- 👉 category name uz -->
          <VCol cols="12" class="border border rounded">
            <h4>Maxsulot nomi</h4><br>

            <p> <b class="mr-1">O'zbekcha: </b> <span>{{ itemData.name_uz }}</span>
            </p>
            <p>
              <b class="mr-1">Ruscha: </b> <span>{{ itemData.name_ru }}</span>
            </p>

            <p> <b class="mr-1">English: </b> <span>{{ itemData.name_en }}</span></p>
            <hr class="my-3">


            <div v-show="itemData.description_uz" class="mt-3">

              <p> <b class="mr-1"> Narxi : </b>
              <pre>{{ itemData }}</pre>
              </p>
              <p>
                <b class="mr-1">Miqdori: </b> <span>{{ itemData.quantity }}</span>
              </p>

              <p> <b class="mr-1">Qolgan miqdori: </b> <span>{{ itemData.description_en }}</span>
              </p>
              <p> <b>Chegirma</b> <span>{{ itemData.discount }}</span> </p>
              <p> <b>status</b> <span>{{ itemData.status }}</span> </p>
              <hr class="my-3">


            </div>



            <div v-show="itemData.description_uz" class="mt-3">

              <h4>Maxsulot nomi</h4>
              <p> <b class="mr-1">O'zbekcha: </b> <span>{{ itemData.description_uz }}</span>
              </p>
              <p>
                <b class="mr-1">Ruscha: </b> <span>{{ itemData.description_ru }}</span>
              </p>

              <p> <b class="mr-1">English: </b> <span>{{ itemData.description_en }}</span>
              </p>
              <hr class="my-3">


            </div>



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
