<template>
  <div>

    <AddEditTopBanner />

  </div>
</template>

<script setup>
import AddEditTopBanner from '@/components/top-banners/AddEditTopBanner.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

</script>
