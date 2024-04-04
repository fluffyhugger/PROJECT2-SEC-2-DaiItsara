<script setup>
import { ref, onBeforeMount, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core"; // Import library
import { useRouter } from "vue-router";
import { TotalPrice } from "./enum";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getComponentProperty } from "./enum";
import EditSpec from "./EditSpec.vue";
library.add(faChevronLeft, faChevronRight);
const router = useRouter();
const productId = router.currentRoute.value.params.id;
let product = ref(null);
const isLoading = ref(true);
const pcImageText = "pcImage";
const showInfo = ref(true);
let selectedOption = ref(null);
const componentTypes = [
  "cpu",
  "ram",
  "gpu",
  "ssd",
  "hdd",
  "psu",
  "case",
  "monitor",
  "mainboard",
  "cooler",
];

const getDatabase = async (domain) => {
  const result = await fetch(`http://localhost:5000/${domain}`);
  const response = await result.json();
  return response;
};

onBeforeMount(async () => {
  localStorage.removeItem("bui");
  try {
    const responsePcBuild = await getDatabase("pc-build");
    product.value = responsePcBuild.filter(
      (response) => response["builder-id"].toString() === productId
    );
    product.value = product.value[0];
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const calculatePrice = (product) => {
  const prices = Object.keys(product)
    .filter((key) => componentTypes.includes(key))
    .map((key) => product[key].price);
  return TotalPrice(...prices);
};

const patchPcSet = async (data) => {
  try {
    const response = await fetch(`http://localhost:5000/pc-build/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("Data updated successfully", response);
      location.reload();
    } else {
      if (response.status === 400) {
        console.error(
          "Bad request: The server did not understand the request."
        );
      } else if (response.status === 401) {
        console.error("Unauthorized: The server requires user authentication.");
      } else if (response.status === 404) {
        console.error("Not found: The requested resource could not be found.");
      } else if (response.status >= 500 && response.status < 600) {
        console.error("Server error: Something went wrong on the server.");
      } else {
        console.error("Failed to update data. Status:", response.status);
      }
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
const handleUpdatePcSet = async (option) => {
  const cartData = await JSON.parse(localStorage.getItem("cart"));
  product.value[option] = {
    id: cartData[option].id,
    name: cartData[option].name,
    "image-url": cartData[option]["image-url"],
    price: cartData[option].price,
  };
};
const newTapByIDType = async (id, type) => {
  console.log(id, type);
  window.open(`/build/${type}/${id}`, "_blank");
};
const toggleShowInfo = (option) => {
  console.log(option);
  if (option !== selectedOption.value) {
    showInfo.value = false;
    selectedOption.value = option;
    localStorage.setItem("builderName", product.value["builder-name"]);
  } else {
    showInfo.value = true;
    selectedOption.value = null;
  }
};
onUnmounted(() => {
  localStorage.clear();
});
</script>
<template>
  <div class="grid-container">
    <!-- First Section (30%) -->
    <div class="first-section">
      <div class="grid flex-grow h-auto card bg-white rounded-box mb-4">
        <ul>
          <li class="">
            <div class="flex flex-col w-fit h-fit controls-container pl-5">
              <div class="flex flex-wrap justify-center gap-4">
                <div v-for="component in [
                  'cpu',
                  'ram',
                  'gpu',
                  'ssd',
                  'hdd',
                  'psu',
                  'case',
                  'monitor',
                  'mainboard',
                  'cooler',
                ]" :key="component" class="card" @click="toggleShowInfo(component)">
                  <div class="grid-item-wrapper">
                    <img :src="getComponentProperty(product, component, 'image-url')" :alt="`${component} image`"
                      class="grid-item" />
                    <div class="component-details">
                      {{ component.toUpperCase() }} name: {{ getComponentProperty(product, component, "name") }}
                      <br>
                      Price: {{ getComponentProperty(product, component, "price") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <button class="button" @click="patchPcSet(product)">Update</button>
      </div>
    </div>

    <!-- Second Section (70%) -->
    <div class="second-section">
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center p-8">
        <div v-if="showInfo">
          <div class="grid-container" v-if="!isLoading">
            <div v-for="component in [
                  'cpu',
                  'ram',
                  'gpu',
                  'ssd',
                  'hdd',
                  'psu',
                  'case',
                  'monitor',
                  'mainboard',
                  'cooler',
                ]" :key="component">
              <img :src="getComponentProperty(product, component, 'image-url')" :alt="`${component} image`"
                id="list-center" class="grid-item" @click="newTapByIDType(product[component].id, component)" />
            </div>
            <div class="grid-info grid-item">
              <template v-for="component in [
                  'cpu',
                  'ram',
                  'gpu',
                  'ssd',
                  'hdd',
                  'psu',
                  'case',
                  'monitor',
                  'mainboard',
                  'cooler',
                ]">
                <p @click="newTapByIDType(product[component].id, component)">
                  {{ component.toUpperCase() }} name:
                  {{ product[component] ? product[component].name : "-" }} |
                  Price:
                  {{ product[component] ? product[component].price : "-" }}
                </p>
                <br />
              </template>
              <p>Total Price: {{ calculatePrice(product) }}</p>
            </div>
          </div>
        </div>
        <div v-else-if="!showInfo">
          <EditSpec :selectedOption="selectedOption" @updatePcSet="handleUpdatePcSet" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-item {
  max-width: 100%;
  /* Adjusted max-width */
  height: auto;
  /* Automatically adjusts height to maintain aspect ratio */
  border-radius: 8px;
  margin-bottom: 8px;
}.first-section .card {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: flex-start;
  /* Align content to the left */
}

.first-section .grid-item-wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.first-section .grid-item {
  max-width: 50;
  max-height: 60px;
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  margin-right: 8px;
}

.first-section .component-details {
  flex-grow: 1;
}

.first-section .component-details p {
  margin: 0;
  white-space: nowrap;
  /* Prevent text wrapping */
}

.grid-container {
  display: flex;
}

.first-section {
  flex: 30%;
}

.second-section {
  flex: 70%;
}

#list-left {
  max-width: 200px;
  max-height: 200px;
}

#list-center {
  max-width: 200px;
  max-height: 200px;
}

.controls-container {
  display: flex;
  align-items: center;
}

.control {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 12px;
  padding: 2.5px;
}

.controls-container>.control {
  margin: 0 0.5rem;
}

@keyframes hoverEffect {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1.05);
  }
}

.left {
  margin-right: 10px;
}

.right {
  margin-left: 10px;
}

.card {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin-bottom: 1rem;
}

.card:hover {
  transform: translateY(-5px);
}
.button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #304456;
  /* Dark blue-grey */
  border-radius: 5px;
  background-color:#304456;
  /* Turquoise */
  color: #46ddd9;
  /* White */
  transition: background-color 0.3s, color 0.3s;
}

.button:hover {
  background-color: #46ddd9;
  color: #304456;
}


.grid-item {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
}

p {
  margin: 0;
  font-size: 14px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.grid-info {
  width: 100%;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.grid-info {
  width: 100%;
  padding: 1rem;
}

</style>
