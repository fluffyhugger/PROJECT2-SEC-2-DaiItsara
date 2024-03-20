<script setup>
import { ref, onMounted } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'; // Import library
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft, faChevronRight);

let autoSlideInterval;
const containerRef = ref(null);

const slide = (direction) => {
    const container = containerRef.value;
    const scrollAmount = direction * (container.offsetWidth / 2);
    container.scrollLeft += scrollAmount;
}

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slide(1); // Auto slide to the right
    }, 3000); // Adjust the interval time as needed (e.g., 3000ms = 3 seconds)
}

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
}

onMounted(() => {
    startAutoSlide();
});
</script><template>
    <div class="top-container">
        <h1 class="top-ranking">TOP RANKING</h1>
        <div class="dropdown-container">
            <select name="sort" id="rank" class="dropdown">
                <option value="overall">Over All</option>
                <option value="price">price</option>
                <option value="popular">popular</option>
                <option value="latest">latest</option>
            </select>
        </div>
        <div class="top">
            <div class="control left" @click="stopAutoSlide(); slide(-1); startAutoSlide()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </div>
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
            <div class="control right" @click="stopAutoSlide(); slide(1); startAutoSlide()">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.top-container {
    display: flex;
    align-items: center;
}

.top-ranking {
    margin-right: 1rem;
}

.dropdown-container {
    margin-right: 1rem;
}
.container {
    margin: 0 50px;
    width: calc(100% - 100px);
    overflow-x: auto;
    display: flex;
    padding: 0 10px;
    scroll-behavior: smooth;
}
.card {
    flex: 0 0 auto;
    width: auto;
    /* Let the cards be as wide as necessary */
    max-width: 280px;
    /* Adjust maximum width to control card size */
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
</style>