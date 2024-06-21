<template>
  <div>

    <AddEditProduct />

  </div>
</template>

<script setup>
import AddEditProduct from '@/components/products/AddEditProducts.vue'
definePage({
  meta: {
    action: "update",
    subject: 'ProductController'
  },
})

</script>
