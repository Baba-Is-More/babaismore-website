import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/search', component: Search },
	]
})

export default router
