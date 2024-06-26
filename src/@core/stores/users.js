import { defineStore } from 'pinia'
import { $api } from '@/utils/api'

export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [],
        page: 1,
        roles: [],
    }),

    actions: {

        async fetchUsers(page) {
            return await $api(`/api/user?page=${page}`)
                .then(res => {
                    this.users = res
                })
        },
        async fetchRoles() {
            return await $api(`/api/role`)
                .then(res => {
                    this.roles = res
                })
        },
        async createUser(data) {
            return await $api('/api/user/create', {
                method: 'POST',
                body: data
            })
        },
        async updateUser(id, data) {
            return await $api(`/api/user/update/${id}`, {
                method: 'Post',
                body: data
            })
        },
        async fechtUserOne(id) {
            return await $api(`/api/user/${id}`)
        },
        async deleteUser(id) {
            return await $api(`/api/user/delete/${id}`, {
                method: 'Delete'
            })
        },
        // api/change-password
        async changePasword(data) {
            return await $api(`/api/change-password`, {
                method: "post",
                body: data
            })
        }
    }

})
