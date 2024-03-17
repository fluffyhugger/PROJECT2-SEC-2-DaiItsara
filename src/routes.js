import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./components/HomePage.vue') },
  { path: '/ranking', component: () => import('./components/RankingSpec.vue') },
  { path: '/build', component: () => import('./components/BuildSpec.vue') },
  {
    path: '/tiptrick',
    component: () => import('./components/ArticleTipTrick.vue'),
  },
  {
    path: '/promotion',
    component: () => import('./components/ArticlePromotion.vue'),
  },
  { path: '/news', component: () => import('./components/ArticleNews.vue') },
  { path: '/howto', component: () => import('./components/ArticleHowTo.vue') },
  {
    path: '/new/meow',
    component: () => import('./components/ArticlesNewsMeow.vue'),
  },
  {
    path: '/new/redmi',
    component: () => import('./components/ArticleNewsRedMi.vue'),
  },
  {
    path: '/new/geforce',
    component: () => import('./components/ArticlesNewsGefore.vue'),
  },
  {
    path: '/new/macbook',
    component: () => import('./components/ArticlesMacbook.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
