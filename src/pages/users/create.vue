<template>
  <div>

    <AddEditUser />

  </div>
</template>

<script setup>
import AddEditUser from '@/components/users/AddEditUser.vue'

definePage({
  meta: {
    action: "store",
    subject: 'UserController'
  },
})


</script>
