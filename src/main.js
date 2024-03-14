import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import RankingSpec from './components/RankingSpec.vue'
import BuildSpec from './components/BuildSpec.vue'
import ArticleTipTrick from './components/ArticleTipTrick.vue'
import ArticlePromotion from './components/ArticlePromotion.vue'
import ArticleNews from './components/ArticleNews.vue'
import ArticleHowTo from './components/ArticleHowTo.vue'
import HomePage from './components/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/ranking', component: RankingSpec },
  { path: '/build', component: BuildSpec },
  { path: '/tiptrick', component: ArticleTipTrick },
  { path: '/promotion', component: ArticlePromotion },
  { path: '/news', component: ArticleNews },
  { path: '/howto', component: ArticleHowTo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
