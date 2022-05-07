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
      path: '/test',
      component: () => import('../testview/AutoWeapon/TestRadomWeapon.vue')
    },
    
  ]
})
export default router
