import { defineStore } from "pinia";

export const useTopicsStore = defineStore("topics", {

  state: () => ({

    topics: [],
    page: 1

  }),

  actions: {

    async fetchTopics() {

      return await $api(`/api/top`)
        .then((res) => {
          this.topics = res
        })
    },

    async deleteTopic(id) {
      return await $api(`/api/topic/delete/${id}`, {
        method: 'Delete'

      })
    },

    async createTopic(data) {
      return await $api('/api/top/create', {
        method: 'POST',
        body: data
      })
    },
    async updateTopic(id, data) {
      return await $api(`/api/top/update/${id}`, {
        method: 'Post',
        body: data
      })
    },

    async getOneTopic(id) {
      return await $api(`/api/top/${id}`)
    },

  }


})
