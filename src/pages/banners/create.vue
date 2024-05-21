<template>
  <div>

    <AddEditBanner />

  </div>
</template>

<script setup>
import AddEditBanner from '@/components/banners/AddEditBanner.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

</script>
