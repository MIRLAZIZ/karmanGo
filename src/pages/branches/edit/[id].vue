<template>
  <div>

    <AddEditBranch />

  </div>
</template>

<script setup>
import AddEditBranch from '@/components/branches/AddEditBranches.vue'

definePage({
  meta: {
    action: "update",
    subject: 'BranchController'
  },
})

</script>
