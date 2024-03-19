import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("./components/HomePage.vue") },
  {
    path: "/ranking",
    component: () => import("./components/Rank/RankingSpec.vue"),
  },
  {
    path: "/build",
    component: () => import("./components/BuildSpec.vue"),
  },
  {
    //Pc component's info
    path: "/build/:ID",
    component: () => import("./components/Util/PcComponentsInfo.vue"),
  },
  {
    path: "/tiptrick",
    component: () => import("./components/Article/ArticleTipTrick.vue"),
  },
  {
    path: "/promotion",
    component: () => import("./components/Article/ArticlePromotion.vue"),
  },
  {
    path: "/news",
    component: () => import("./components/Article/ArticleNews.vue"),
  },
  {
    path: "/howto",
    component: () => import("./components/Article/ArticleHowTo.vue"),
  },
  {
    path: "/new/meow",
    component: () => import("./components/Article/ArticlesNewsMeow.vue"),
  },
  {
    path: "/new/redmi",
    component: () => import("./components/Article/ArticleNewsRedMi.vue"),
  },
  {
    path: "/new/geforce",
    component: () => import("./components/Article/ArticlesNewsGefore.vue"),
  },
  {
    path: "/new/macbook",
    component: () => import("./components/Article/ArticlesMacbook.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
