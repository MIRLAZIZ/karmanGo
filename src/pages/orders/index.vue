<template>
  <div>
    <pre>{{ store.orders }}</pre>



  </div>
</template>

<script setup>
import { useOrdersStore } from "@/@core/stores/orders";
import { onMounted } from "vue";

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

const store = useOrdersStore()

onMounted(() => {
  store.fetchOrders()
})

</script>
