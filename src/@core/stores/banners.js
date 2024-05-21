import { defineStore } from "pinia";
import { $api } from "@/utils/api";

export const useBannersStore = defineStore("banners", {
    state: () => ({
        banners: [],
        page: 1
    }),
    actions: {
        async getBanners() {
            return await $api(`/api/blog`)
                .then((res) => {
                    this.banners = res
                })
        },
        async createBanner(data) {
            return await $api("/api/blog/create", {
                method: "POST",
                body: data
            })
        },
        async deleteBanner(id) {
            return await $api(`/api/blog/delete/${id}`, {
                method: "DELETE"
            })
        },
        async updateBanner(id, data) {
            return await $api(`/api/blog/update/${id}`, {
                method: "POST",
                body: data
            })
        },

        async fechtBannerOne(id) {
            return await $api(`/api/blog/${id}`)
        }
    },
})
