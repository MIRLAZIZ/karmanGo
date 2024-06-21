<template>
  <div>

    <h2 class="mb-4 ">Buyurtmalar</h2>
    <VRow>

      <VCol cols="12" v-for="item in store.order.invoiceItem" :key="item.invoice_item_id"
        class="border rounded mb-3 pa-5">
        <p>ID: {{ item.invoice_item_id }}</p>
        <p>Nomi: {{ item.product_name_uz }}</p>
        <p>Narxi: {{ item.price }}</p>
        <p> Soni: {{ item.quantity }}</p>
        <p> Chegirma: {{ item.discount }}</p>

        <p> Jami: {{ item.total_price }}
        </p>


      </VCol>
    </VRow>





  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOrdersStore } from '@/@core/stores/orders'


definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

const { id } = useRoute().params
const store = useOrdersStore()

onMounted(() => {

  store.fetchOrderOne(id)
})

</script>
