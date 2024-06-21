<script setup>
import { useCategorysStore } from '@/@core/stores/categorys';

const store = useCategorysStore()
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
const categoryName = ref(null)

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])
const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}

watch(() => props.itemData, () => {
  if (props.itemData.category_id) {
    store.getOneCategory(props.itemData.category_id).then(res => {
      console.log(res);

      categoryName.value = res.result.name

    })
  }
}, { immediate: true })


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
            <VImg :src="baseUrl + itemData.image" alt="" class="rounded " width="30%" />

          </VCol>
          <VCol>





            <hr class="my-3">


            <div class="mt-3">
              <p> <b class="mr-1"> Название: </b> <span>{{ itemData.name }}</span>
              </p>
              <p> <b class="mr-1">Категория:</b> <span>{{ categoryName }}</span> </p>


              <p> <b class="mr-1"> Цена: </b>
                {{ itemData.price }}
              </p>
              <p>
                <b class="mr-1">Количество: </b> <span>{{ itemData.quantity }}</span>
              </p>

              <p> <b class="mr-1">Оставшееся количество: </b> <span>{{ itemData.quantity_rest }}</span>
              </p>
              <p> <b class="mr-1">Скидка:</b> <span>{{ itemData.discount }}</span> </p>
              <p> <b class="mr-1">Статус:</b> <span>{{ itemData.status }}</span> </p>
              <p> <b class="mr-1">Тип:</b> <span>{{ itemData.product_type }}</span> </p>
              <p> <b class="mr-1">Детали продукта:</b>
                <span>{{ itemData.details_of_product ? itemData.details_of_product : 'no details' }}</span>
              </p>
              <p> <b class="mr-1">Описание:</b> <span>{{ itemData.description ? itemData.description : 'no description'
                  }}</span>
              </p>


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
