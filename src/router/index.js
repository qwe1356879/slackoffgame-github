import { createRouter, createWebHistory } from 'vue-router'
 
const routerHistory = createWebHistory()
 
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/weapon',
      component: () => import('../testview/test/TestRadomWeapon.vue')
    },
    {
      path: '/fight',
      component: () => import('../testview/test/TestFight.vue')
    },
    
    
  ]
})
export default router
