import { defineStore } from "pinia";
import { $api } from "@/utils/api";


export const useRolesStore = defineStore("roles", {

    state: () => ({
        roles: [],
        page: 1,
        permissions: []
    }),

    actions: {

        async fetchRoles(page) {
            return await $api(`/api/role?page=${page}`)
                .then((res) => {
                    this.roles = res
                })
        },

        async deleteRole(id) {
            return await $api(`/api/role/delete/${id}`, {
                method: 'Delete'
            })
        },

        async updateRole(id, data) {
            return await $api(`/api/role/update/${id}`, {
                method: 'Post',
                body: data
            })
        },

        async createRole(data) {
            return await $api('/api/role/create', {
                method: 'POST',
                body: data
            })
        },
        async getOneRole(id) {
            return await $api(`/api/role/${id}`)
        },

        // async fetchPermissons() {
        //     return await $api('/api/allContAction')
        //         .then((res) => {
        //             this.permissions = res
        //         })
        // },
        async createPermssions(id, data) {
            return await $api(`/api/permission/store/${id}`, {
                method: 'POST',
                body: data
            })
        },

        async fetchPermissonsOne(id) {
            return await $api(`/api/permission/${id}`)
                .then((res) => {
                    this.permissions = res
                })
        }

    }

})
