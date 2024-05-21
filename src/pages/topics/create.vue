<template>
  <div>

    <AddEditTopic />

  </div>
</template>

<script setup>
import AddEditTopic from '@/components/topics/AddEditTopic.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  }
})

</script>
