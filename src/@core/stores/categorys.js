import { $api } from '@/utils/api'
import { defineStore } from 'pinia'

export const useCategorysStore = defineStore('category', {
  state: () => ({
    categoryies: [],
    search: '',
    options: { page: 1, itemsPerPage: 10 },
    users: [],
    comments: [],
    filterExport: [],
    postsTotlal: 0,
    filterArray: [],
    posts: []



  }),
  actions: {

    // get categoryies
    async fetchCategoryies() {
      return await $api(`/api/category`)
        .then(res => {
          this.categoryies = res
        })
    },

    // category create post
    async CreateCategory(data) {
      return await $api('/api/category/create', {
        method: 'POST',
        body: data
      })
    },

    // delete category
    async deleteCategory(id) {
      return await $api(`/api/category/delete/${id}`, {
        method: 'DELETE'
      })
    },

    // update category
    async updateCategory(id, data) {
      return await $api(`/api/category/update/${id}`, {
        method: 'Post',
        body: data
      })
    },

    // get one  category 
    async getOneCategory(id) {
      return await $api(`/api/category/${id}`)
    }



  },
})












