<template>
  <div>
    <AddEditProduct />

  </div>
</template>

<script setup>
import AddEditProduct from '@/components/products/AddEditProducts.vue'

definePage({
  meta: {
    action: "store",
    subject: 'ProductController'
  },


})

</script>

<!-- <style lang="scss" scoped>

</style> -->
