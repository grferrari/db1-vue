import Vue from 'vue'
import Router from 'vue-router'
import Memory from '../Views/Memory.vue'
import Index from '../Views/Index.vue'
import Rank from '../Views/Rank.vue'
import App from '../App.vue'
  
Vue.use(Router)

export default new Router({
	routes: [
		{ 
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/memory/:name', 
			name: 'Memory',
			component: Memory
		},
		{
			path: '/rank',
			name: 'Rank',
			component: Rank
		},
	]
})