// Card079 login version *****************************************************

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./components/HomePage.vue') },
  {
    path: '/ranking',
    component: () => import('./components/Rank/RankingSpec.vue')
  },
  {
    path: '/ranking/pcset-info/:id',
    name: 'info',
    component: () => import('./components/Rank/SetInfo.vue')
  },
  {
    path: '/build',
    component: () => import('./components/BuildSpec.vue')
  },
  {
    path: '/build/:type/:ID',
    component: () => import('./components/Util/PcComponentsInfo.vue')
  },
  {
    path: '/:articleType',
    name: 'ArticlePage',
    component: () => import('./components/articles/ArticleNew.vue')
  },
  {
    path: '/deleting',
    name: 'dataEditing',
    component: () => import('./components/Util/ListSpec.vue'),

    // Card079 login version *****************************************************
    meta: { requiresAuth: true }
  },

  {
    path: '/contact',
    component: () => import('./components/Contact.vue')
  },
  {
    path: '/:catchNotMatchPath(.*)',
    name: 'notFound',
    component: () => import('./components/NotFound.vue')
  },

  // Card079 login version *****************************************************
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('./components/LoginPage.vue')
  }
]
// ************************************************************
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Card079 login version *****************************************************
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated')
    if (!isAdminAuthenticated) {
      next('/login')
    } else {
      try {
        const response = await fetch('data/db.json')
        const data = await response.json()

        const admin = data.admins.find(
          (admin) => admin.username === isAdminAuthenticated
        )
        if (!admin) {
          localStorage.removeItem('isAdminAuthenticated')
          next('/login')
        } else {
          next()
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
        alert('An error occurred. Please try again later.')
      }
    }
  } else {
    next()
  }
})

export default router