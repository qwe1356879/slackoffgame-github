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
    //   path: '/test',
    //   component: () => import('../testview/test/TestRadomWeapon.vue')
    // },
    {
      path: '/shop',
      component: () => import('../testview/test/Shop.vue')
    },
    
    
  ]
})
export default router
