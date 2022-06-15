import { createRouter, createWebHistory } from 'vue-router'
 
const routerHistory = createWebHistory()
 
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    // {
    //   path: '/test2',
    //   component: () => import('../testview/test2/index.vue')
    // },
    {
      path: '/shop',
      component: () => import('../testview/test/Shop.vue')
    },
    
    
  ]
})
export default router
