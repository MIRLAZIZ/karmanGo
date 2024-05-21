<template>
  <div>
    <AddEditProduct />

  </div>
</template>

<script setup>
import AddEditProduct from '@/components/products/AddEditProducts.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  },


})

</script>

<!-- <style lang="scss" scoped>

</style> -->
