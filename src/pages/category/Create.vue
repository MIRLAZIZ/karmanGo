<template>
  <div>

    <AddEditPost />


  </div>
</template>

<script setup>
import AddEditPost from '@/components/posts/AddEditPost.vue'
definePage({
  meta: {
    action: "store",
    subject: 'CategoryController'
  },


})

</script>
