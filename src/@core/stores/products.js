import { $api } from '@/utils/api'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {

  state: () => ({
    products: [],
    options: { page: 1, itemsPerPage: 12 },

  }),
  actions: {

    // get all product 
    async fetchProducts(page) {
      return await $api(`api/product?page=${page}`)
        .then(res => {
          this.products = res
        })
    },

    // create product 
    async createProduct(data) {
      return await $api('/api/product/create', {
        method: 'POST',
        body: data
      })
    },

    // delete product
    async deleteProduct(id) {
      return await $api(`/api/product/delete/${id}`, {
        method: 'Delete'

      })
    },

    //  get one product 
    async fetchProduct(id) {
      return await $api(`/api/product/${id}`)
    }
  }
})
