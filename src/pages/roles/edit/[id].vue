<template>
  <div>
    <AddEditRole />

  </div>
</template>

<script setup>
import AddEditRole from '@/components/roles/AddEditRole.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'all',
  },
})

</script>
