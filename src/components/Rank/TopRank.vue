<template>
    <div class="top-container pt-5">
        <div class="head-toprank pl-11">
            <h1 class="top-ranking">TOP RANKING</h1>
            <br />
            <div class="dropdown-container">
                <select name="sort" id="rank" class="dropdown">
                    <option value="overall">Over All</option>
                    <option value="price">price</option>
                    <option value="popular">popular</option>
                    <option value="latest">latest</option>
                </select>
            </div>
        </div>
        <div class="control left" @click="
            stopAutoSlide();
        slide(-1);
        startAutoSlide();
        ">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </div>
        <div class="top">
            <div class="container" @mouseenter="stopAutoSlide()" @mouseleave="startAutoSlide()" ref="containerRef">
                <div class="card">
                    <figure>
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <figure>
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <figure>
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
                <!-- Add more cards here -->
            </div>
        </div>
        <div class="control right" @click="
            stopAutoSlide();
        slide(1);
        startAutoSlide();
        ">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core"; // Import library
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronLeft, faChevronRight);

let autoSlideInterval;
const containerRef = ref(null);
let scrollDirection = 1;

const slide = (direction) => {
    const container = containerRef.value;
    const scrollAmount = direction * (container.offsetWidth / 2);
    const targetScroll = container.scrollLeft + scrollAmount;
    container.scrollTo({
        left: targetScroll,
        behavior: "smooth", // Add smooth scrolling behavior
    });
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slide(scrollDirection); // Auto slide to the right
    }, 3000); // Adjust the interval time as needed (e.g., 3000ms = 3 seconds)
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

const handleScroll = () => {
    const container = containerRef.value;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft === maxScrollLeft && scrollDirection === 1) {
        // If scrolled to the rightmost position
        scrollDirection = -1; // Change direction to scroll left
    } else if (container.scrollLeft === 0 && scrollDirection === -1) {
        // If scrolled to the leftmost position
        scrollDirection = 1; // Change direction to scroll right
    }
};

onMounted(() => {
    startAutoSlide();
    containerRef.value.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.top-container {
    display: flex;
    align-items: center;
}

.top-ranking {
    margin-right: 1rem;
    font-size: larger;
    text-align: center;
}

.dropdown-container {
    margin-right: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 0.5rem;
}

.container {
    display: flex;
    overflow-x: auto;
    padding: 0 10px;
}

.card {
    flex: 0 0 auto;
    width: auto;
    margin-right: 10px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.control {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.left {
    margin-right: 10px;
}

.right {
    margin-left: 10px;
}

.card:hover {
    transform: translateY(-5px);
}
</style>
