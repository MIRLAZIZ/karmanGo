<template>
  <div>

    <AddEdit />

  </div>
</template>

<script setup>
import AddEdit from '@/components/top-product/AddEdit.vue'

definePage({
  meta: {
    action: "store",
    subject: 'TopProductController'
  }
})

</script>
