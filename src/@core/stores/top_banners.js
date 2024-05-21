import { defineStore } from "pinia";
import { $api } from "@/utils/api";

export const useTopBannersStore = defineStore("top_banners", {
    state: () => ({
        top_banners: [],
        page: 1
    }),
    actions: {
        async getTopBanners() {
            return await $api("/api/top_blog")
                .then((response) => {
                    this.top_banners = response.result;

                })
        },

        async createBanner(data) {
            return await $api("/api/top_blog/create", {
                method: "POST",
                body: data
            })
        },

        async updateBanner(id, data) {
            return await $api(`/api/top_blog/update/${id}`, {
                method: "POST",
                body: data
            })
        },
        async deleteBanner(id) {
            return await $api(`/api/top_blog/delete/${id}`, {
                method: "DELETE"
            })
        },
        async fechtBannerOne(id) {
            return await $api(`/api/top_blog/${id}`)
        },

    },
});
