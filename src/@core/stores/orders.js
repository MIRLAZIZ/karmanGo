import { defineStore } from 'pinia'
import { $api } from '@/utils/api'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        page: 1,
        order: [],
    }),
    actions: {
        async fetchOrders(page) {
            return await $api(`api/all-invoice?page=${page} `)
                .then(res => {
                    this.orders = res
                })
        },
        // /payment/status/update/{id} 
        async updateStatusOrder(id, data) {
            return await $api(`/api/payment/status/update/${id}`, {
                method: 'POST',
                body: data
            })
        },
        async fetchOrderOne(id) {
            return await $api(`/api/order-detail/${id}`)
                .then(res => {
                    this.order = res
                })

        }

    }

})
