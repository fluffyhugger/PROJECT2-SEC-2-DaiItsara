<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const itemsToShow = ref(4)
const newsData = ref({})
const totalItems = 8
const route = useRoute()

const itemNews = ref(null)

// Function to fetch articles from JSON Server
const fetchArticles = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/${route.params.articleType}`
    )
    const data = await response.json()
    newsData.value = data
    itemNews.value = JSON.parse(JSON.stringify(newsData.value[0]))
    console.log(itemNews)
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

// Call the fetchArticles function when the component is mounted
onMounted(fetchArticles)

watch(
  () => route.params.articleType,
  () => {
    fetchArticles()
  }
)
</script>
<template>
  <div v-if="itemNews">
    <div class="grid grid-cols-7 gap-2 mt-16 ml-16">
      <div class="bg-white col-span-3 row-span-1">
        <div class="image-container">
          <img
            :src="itemNews.articles[0].image"
            alt=""
            class="image-style"
            style="height: 450px"
          />
          <div class="image-overlay">
            <div class="image-text text-orange-400 font-extrabold text-9xl">
              {{ itemNews.articles[0].title }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white col-span-2 row-span-1">
        <div class="image-container">
          <img
            :src="itemNews.articles[1].image"
            alt=""
            class="image-style"
            style="height: 450px"
          />
          <div class="image-overlay">
            <div class="image-text text-red-800 font-extrabold text-9xl">
              {{ itemNews.articles[1].title }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="image-container">
          <img
            :src="itemNews.articles[2].image"
            alt=""
            class="image-style"
            style="height: 250px; width: 300px"
          />
          <div class="image-overlay" style="width: 70%">
            <div class="image-text text-green-600 font-extrabold text-9xl">
              {{ itemNews.articles[2].title }}
            </div>
          </div>
        </div>
        <div class="image-container">
          <img
            :src="itemNews.articles[3].image"
            alt=""
            class="image-style"
            style="height: 200px; width: 300px"
          />
          <div class="image-overlay" style="width: 70%">
            <div class="image-text text-white font-extrabold text-9xl">
              {{ itemNews.articles[3].title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="(article, index) in itemNews.articles"
        :key="index"
        class="flex ml-32 h-30 mt-12"
      >
        <img :src="article.image" class="w-64 h-40" />
        <div class="mt-5">
          <h1 class="font-bold text-orange-500 ml-10">
            {{ article.type.toUpperCase() }} NEWS
          </h1>
          <h1
            class="font-extrabold text-black ml-10 mt-3 text-xl w-1/2 :hover cursor-pointer"
          >
            {{ article.title }}
          </h1>
          <h1 class="ml-10 mt-3 font-bold text-sm">{{ article.date }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.grid-rows-2 {
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.mt-16 {
  margin-top: 4rem;
}

.ml-10 {
  margin-left: 2.5rem;
}

.bg-white {
  background-color: white;
}

.col-span-3 {
  grid-column: span 3;
}

.col-span-2 {
  grid-column: span 2;
}

.row-span-1 {
  grid-row: span 1;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.image-text {
  text-align: center;
  font-size: 1.2rem;
}

.image-style {
  width: 100%;
  height: auto;
}
</style>
