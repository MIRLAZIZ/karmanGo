<template>
  <div>
    <VDataTable :items="store.orders?.result" :headers="headers">



      <!-- action buttons -->
      <template #item.actions="{ item }">
        <!-- views data  -->
        <IconBtn class="border mx-2" @click="$router.push(`/orders/views/${item.invoice_id}`)">
          <VIcon icon="tabler-eye" color="success" />

        </IconBtn>


      </template>

      <!-- status  -->
      <template #item.status="{ item }">
        <select v-model="item.status" @change="changeStatus(item)">
          <option :value="item" v-for="item in status">{{ item }}
            <VIcon icon="tabler-chevron-down" color="primary" />
          </option>
        </select>

      </template>

      <!-- pagination -->
      <template #bottom>
        <VCardText class="pt-2">
          <div class="d-flex justify-end">


            <VPagination v-if="store.orders?.result" v-model="store.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(store.orders?.pagination.total / store.orders.pagination.per_page)" />
          </div>
        </VCardText>
      </template>

    </VDataTable>


  </div>
</template>

<script setup>
import { useOrdersStore } from "@/@core/stores/orders";
import { onMounted } from "vue";
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useConfigStore } from "@/@core/stores/config";
import { VIcon } from "vuetify/lib/components/index.mjs";

definePage({
  meta: {
    action: "allOrders",
    subject: 'ProfileController'
  }
})

const store = useOrdersStore()
const storeConfig = useConfigStore()
const refresh = () => {

  store.fetchOrders(store.page)
}

onMounted(() => {
  refresh()
})


const headers = [
  { title: 'Счет', key: 'invoice_id' },
  { title: 'Адрес', key: 'Address' },
  { title: 'Цена', key: 'price' },
  { title: 'Статус', key: 'status' },
  { title: 'Действия', key: 'actions' },
]


const status = [
  'draft', 'pending', 'process', 'deliverd', 'completed', 'canceled',
]

const changeStatus = (item) => {
  store.updateStatusOrder(item.invoice_id, { status: item.status })
    .then((res) => {


      refresh()
      storeConfig.successToast()
    })
    .catch((err) => {
      console.log(err.response);
      storeConfig.errorToast(err.response._data.message)
    })


}
</script>


<style scoped>
select {
  outline: none;
  /* stylelint-disable-next-line order/properties-order */
  padding: 10px;
  color: #908D97;
  /* stylelint-disable-next-line order/properties-order */
  border-radius: 10px;
}
</style>
