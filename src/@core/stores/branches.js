import { $api } from "@/utils/api";
import { defineStore } from "pinia";


export const useBranchesStore = defineStore('branch', {
    state: () => ({
        branches: null,
        page: 1
    }),
    actions: {
        async fetchBranches(page) {
            return await $api(`/api/branch?page=${page}`)
                .then((res) => {
                    this.branches = res
                })
        },
        async createBranch(data) {
            return await $api(`/api/branch/create`, {
                method: 'Post',
                body: data
            })

        },
        async fetchBranchesOne(id) {
            return await $api(`/api/branch/${id}`)
        },
        async updateBranch(id, data) {
            return await $api(`/api/branch/update/${id}`, {
                method: 'Post',
                body: data

            })
        },
        async deleteBranch(id) {
            return await $api(`/api/branch/delete/${id}`, {
                method: 'Delete'
            })
        }

    }
})

