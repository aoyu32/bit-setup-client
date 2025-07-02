import { createRouter, createWebHistory } from 'vue-router'

const route = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
})

export default route