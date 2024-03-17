import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("./views/HomePage.vue") },
  { path: "/ranking", component: () => import("./views/RankingSpec.vue") },
  { path: "/build", component: () => import("./views/BuildSpec.vue") },
  {
    path: "/tiptrick",
    component: () => import("./views/ArticleTipTrick.vue"),
  },
  {
    path: "/promotion",
    component: () => import("./views/ArticlePromotion.vue"),
  },
  { path: "/news", component: () => import("./views/ArticleNews.vue") },
  { path: "/howto", component: () => import("./views/ArticleHowTo.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
