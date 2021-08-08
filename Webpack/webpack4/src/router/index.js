import VueRouter from "vue-router"
import Vue from "vue"
Vue.use(VueRouter)


const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/home2',
		name: 'Home2',
		component: () => import('../views/Home2.vue')
	},
	{
		path: '/home3',
		name: 'Home3',
		component: () => import('../views/Home3.vue')
	},
	{
		path: '/home4',
		name: 'Home4',
		component: () => import('../views/Home4.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router