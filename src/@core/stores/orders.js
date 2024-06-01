import { defineStore } from 'pinia'
import { $api } from '@/utils/api'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        page: 1
    }),
    actions: {
        async fetchOrders(page) {
            return await $api(`/api/all-orders?page=${page}`)
                .then(res => {
                    this.orders = res
                })
        }

    }

})
