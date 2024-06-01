import { $api } from "@/utils/api";
import { defineStore } from "pinia";

export const useTopProductStore = defineStore("top_product", {
    state: () => ({
        top_product: [],
        page: 1
    }),
    actions: {
        async getTopProducts() {
            return await $api(`/api/top_product`)
                .then((res) => {
                    this.top_product = res.result;


                })
        },

        async createTopProduct(data) {
            return await $api('/api/top_product/create', {
                method: 'POST',
                body: data
            })
        },
        async updateTopProduct(id, data) {
            return await $api(`/api/top_product/update/${id}`, {
                method: 'Post',
                body: data
            })
        },
        async deleteTopProduct(id) {
            return await $api(`/api/deleteTopAndProducts/${id}`, {
                method: 'Delete'
            })
        },
        async fechtTopProductOne(id) {
            return await $api(`/api/top_product/${id}`)
        },

        async deleteProducts(topId, productId) {
            return await $api(`/api/deleteTopsProduct/${topId}/${productId}`, {
                method: 'Delete'
            })
        }
    },
})
