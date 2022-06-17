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
      path: '/fight',
      component: () => import('../testview/test/TestFight.vue')
    },
    
    
  ]
})
export default router
