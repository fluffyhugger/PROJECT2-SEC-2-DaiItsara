import { createRouter, createWebHistory } from 'vue-router'
import ArticlePage from './components/articles/ArticleNew.vue'

const routes = [
  { path: '/', component: () => import('./components/HomePage.vue') },
  {
    path: '/ranking',
    component: () => import('./components/Rank/RankingSpec.vue'),
  },
  {
    path: '/ranking/product-info/:id',
    name: 'productInfo',
    component: () => import('./components/Rank/ProductInfo.vue'),
  },
  {
    path: '/build',
    component: () => import('./components/BuildSpec.vue'),
  },
  {
    path: '/build/:type/:ID',
    component: () => import('./components/Util/PcComponentsInfo.vue'),
  },
  {
    path: '/:articleType',
    name: 'ArticlePage',
    component: () => import('./components/articles/ArticleNew.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
