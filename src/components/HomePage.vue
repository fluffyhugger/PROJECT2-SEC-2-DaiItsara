<script setup>
import { useRoute } from 'vue-router'
import TopRank from '@/components/Rank/RankingSpec.vue'

const route = useRoute()

// Determine whether to show introduction section based on the route
const showIntroduction = route.path !== '/login'
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="row">
          <h1 class="title">Create Your Ultimate PC Build</h1>
          <router-link to="/build" class="btn btn-buildspec"
            >Build Spec</router-link
          >
        </div>
        <div class="row">
          <p class="description">
            Explore Cutting-Edge Tech Trends and Craft Your Ideal PC Build
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Products (Replaced by ListSpec.vue Component) -->
    <section class="featured-products">
      <TopRank />
    </section>

    <!-- Introduction Section (Optional) -->
    <section v-if="showIntroduction" class="introduction">
      <div class="introduction-content">
        <h2>About Us</h2>
        <p>
          We are a group of dedicated students from the School of Information
          Technology (SIT) at King Mongkut's University of Technology Thonburi
          (KMUTT). Our passion for technology drives us to provide high-quality
          tech products and services to our customers. Our mission is to make
          technology accessible and affordable for everyone, ensuring that
          innovation enriches the lives of people worldwide.
        </p>
        <br />
        <p>
          Explore our wide range of products and enjoy the best building
          computer experience with us.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Styles for Hero Section */
.hero {
  background-color: #e5e5e5; /* Adjusted background color */
  padding: 80px 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.row {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #304456; /* Adjusted description color */
}

/* Button Styles */
.btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #46ddd9; /* Adjusted button background color */
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-buildspec {
  margin-top: 20px;
}

.btn:hover {
  background-color: #b4b4b4; /* Adjusted button hover background color */
}

/* Featured Products Section Styles */
.featured-products {
  background-color: #e5e7eb; /* Adjusted background color */
  padding: 40px 0;
}

/* Introduction Section Styles */
.introduction {
  padding: 40px 0;
}

.introduction-content {
  max-width: 800px;
  margin: 0 auto;
}

.introduction h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.introduction p {
  font-size: 18px;
  color: #6b7280; /* Adjusted introduction text color */
}
</style>

