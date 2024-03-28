<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { library } from "@fortawesome/fontawesome-svg-core"; // Import library
import { useRouter } from 'vue-router'
import { TotalPrice } from './enum'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getComponentProperty } from "./enum"
import EditSpec from "./EditSpec.vue"
library.add(faChevronLeft, faChevronRight);
const router = useRouter()
const productId = router.currentRoute.value.params.id
let product = ref(null)
const isLoading = ref(true)
const pcImageText = "pcImage"
const showInfo = ref(true) // Use ref to make showInfo reactive
let selectedOption = ref(null)
const componentTypes = [
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
]

const getDatabase = async (domain) => {
  const result = await fetch(`http://localhost:5000/${domain}`)
  const response = await result.json()
  return response
}

onBeforeMount(async () => {
  localStorage.removeItem("bui")
  try {
    const responsePcBuild = await getDatabase('pc-build')
    product.value = responsePcBuild.filter(
      (response) => response['builder-id'].toString() === productId
    )
    product.value = product.value[0]
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const calculatePrice = (product)=>{
  const prices = Object.keys(product)
      .filter((key) => componentTypes.includes(key)) // Filter out non-component keys
      .map((key) => product[key].price) // Map to the price of each component
    return TotalPrice(...prices) // Calculate total price
}

const patchPcSet = async (data) => {
  try {
    const response = await fetch(`http://localhost:5000/pc-build/${data.id}`, {
      method: 'PATCH', // Changed method to PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      console.log('Data updated successfully', response)
      location.reload();
    } else {
      // Handle different HTTP status codes
      if (response.status === 400) {
        console.error('Bad request: The server did not understand the request.');
      } else if (response.status === 401) {
        console.error('Unauthorized: The server requires user authentication.');
      } else if (response.status === 404) {
        console.error('Not found: The requested resource could not be found.');
      } else if (response.status >= 500 && response.status < 600) {
        console.error('Server error: Something went wrong on the server.');
      } else {
        console.error('Failed to update data. Status:', response.status);
      }
    }
  } catch (error) {

    console.error('Error updating data:', error)
  }
}
const handleUpdatePcSet = async (option) => {
  const cartData =  await JSON.parse(localStorage.getItem('cart'));
  product.value[option] = {
    "id": cartData[option].id,
      "name": cartData[option].name,
      "image-url": cartData[option]["image-url"],
      "price": cartData[option].price
  }
}
const newTapByIDType = async (id, type) => {
  console.log(id,type)
  window.open(`/build/${type}/${id}`, '_blank');
}
const toggleShowInfo = (option)=>{
  console.log(option)
  if (option !== selectedOption.value){
    showInfo.value = false
    selectedOption.value = option
    localStorage.setItem('builderName',product.value['builder-name'])
  }else {
    showInfo.value = true
    selectedOption.value = null
  }
 
}

</script>

<template>
  <div>

    <div class="flex flex-col w-full lg:flex-row">
      <div class="grid flex-grow h-auto card bg-white rounded-box ">
        <ul>
          <li class="">
            <div class="flex flex-row border solid 1px border-yellow-400 w-fit h-fit controls-container">
              <div class="card" @click="toggleShowInfo('cpu')">
                <img :src="getComponentProperty(product, 'cpu', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  CPU name:{{ getComponentProperty(product, 'cpu', 'name') }} price
                  {{ getComponentProperty(product, 'cpu', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('ram')">
                <img :src="getComponentProperty(product, 'ram', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  Ram name:{{ getComponentProperty(product, 'ram', 'name') }} price
                  {{ getComponentProperty(product, 'ram', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('gpu')">
                <img :src="getComponentProperty(product, 'gpu', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  GPU name:{{ getComponentProperty(product, 'gpu', 'name') }} price
                  {{ getComponentProperty(product, 'gpu', 'price') }}
                </p>
              </div>

              <div class="card"  @click="toggleShowInfo('ssd')">
                <img :src="getComponentProperty(product, 'ssd', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  SSD name:{{ getComponentProperty(product, 'ssd', 'name') }} price
                  {{ getComponentProperty(product, 'ssd', 'price') }}
                </p>
              </div>
              <div class="card"  @click="toggleShowInfo('hdd')">
                <img :src="getComponentProperty(product, 'hdd', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  HDD name:{{ getComponentProperty(product, 'hdd', 'name') }} price
                  {{ getComponentProperty(product, 'hdd', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('psu')">
                <img :src="getComponentProperty(product, 'psu', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  PSU name:{{ getComponentProperty(product, 'psu', 'name') }} price
                  {{ getComponentProperty(product, 'psu', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('case')">
                <img :src="getComponentProperty(product, 'case', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>

                  CASE name:{{ getComponentProperty(product, 'case', 'name') }} price
                  {{ getComponentProperty(product, 'case', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('monitor')">
                <img :src="getComponentProperty(product, 'monitor', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  MONITOR name:{{ getComponentProperty(product, 'monitor', 'name') }}
                  price
                  {{ getComponentProperty(product, 'monitor', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('mainboard')">
                <img :src="getComponentProperty(product, 'mainboard', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  MAINBOARD name:{{
                  getComponentProperty(product, 'mainboard', 'name')
                }}
                  price
                  {{ getComponentProperty(product, 'mainboard', 'price') }}
                </p>
              </div>
              <div class="card" @click="toggleShowInfo('cooler')">
                <img :src="getComponentProperty(product, 'cooler', 'image-url')" :alt="pcImageText" id="list-left"
                  class="grid-item" />
                <p>
                  COOLER name:{{ getComponentProperty(product, 'cooler', 'name') }}
                  price
                  {{ getComponentProperty(product, 'cooler', 'price') }}
                </p>
              </div>
              <!-- Use the FontAwesomeIcon component with the icon prop -->
              <!-- <font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #787878;" /> -->
            </div>

          </li>
        </ul>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center">
        content
      </div>
    </div>
    <button class="button" @click="patchPcSet(product)"> บันทึกเลยจ้า</button>
  </div>
  <div v-if="showInfo ">
    <div class="grid-container" v-if="!isLoading">
      <img :src="getComponentProperty(product, 'cpu', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['cpu'].id, 'cpu')" />
      <img :src="getComponentProperty(product, 'ram', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['ram'].id, 'ram')" />
      <img :src="getComponentProperty(product, 'gpu', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['gpu'].id, 'gpu')" />
      <img :src="getComponentProperty(product, 'ssd', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['ssd'].id, 'ssd')" />
      <img :src="getComponentProperty(product, 'hdd', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['hdd'].id, 'hdd')" />
      <img :src="getComponentProperty(product, 'psu', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['psu'].id, 'psu')" />
      <img :src="getComponentProperty(product, 'case', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['case'].id, 'case')" />
      <img :src="getComponentProperty(product, 'monitor', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['monitor'].id, 'monitor')" />
      <img :src="getComponentProperty(product, 'mainboard', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['mainboard'].id, 'mainboard')" />
      <img :src="getComponentProperty(product, 'cooler', 'image-url')" :alt="pcImageText" id="list-center"
        class="grid-item" @click="newTapByIDType(product['cooler'].id, 'cooler')" />
      <div class="grid-info grid-item">
        <p @click="newTapByIDType(product['cpu'].id, 'cpu')">
          CPU name:{{ product['cpu'] ? product['cpu']['name'] : '-' }} price
          {{ product['cpu'] ? product['cpu']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['ram'].id, 'ram')">
          Ram name:{{ product['ram'] ? product['ram']['name'] : '-' }} price
          {{ product['ram'] ? product['ram']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['gpu'].id, 'gpu')">
          GPU name:{{ product['gpu'] ? product['gpu']['name'] : '-' }} price
          {{ product['gpu'] ? product['gpu']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['ssd'].id, 'ssd')">
          SSD name:{{ product['ssd'] ? product['ssd']['name'] : '-' }} price
          {{ product['ssd'] ? product['ssd']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['hdd'].id, 'hdd')">
          HDD name:{{ product['hdd'] ? product['hdd']['name'] : '-' }} price
          {{ product['hdd'] ? product['hdd']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['psu'].id, 'psu')">
          PSU name:{{ product['psu'] ? product['psu']['name'] : '-' }} price
          {{ product['psu'] ? product['psu']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['case'].id, 'case')">
          CASE name:{{ product['case'] ? product['case']['name'] : '-' }} price
          {{ product['case'] ? product['case']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['monitor'].id, 'monitor')">
          MONITOR name:{{ product['monitor'] ? product['monitor']['name'] : '-' }}
          price
          {{ product['monitor'] ? product['monitor']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['mainboard'].id, 'mainboard')">
          MAINBOARD name:{{
                  product['mainboard'] ? product['mainboard']['name'] : '-'
                }}
          price
          {{ product['mainboard'] ? product['mainboard']['price'] : '-' }}
        </p>
        <br />
        <!-- เว้นบรรทัดด้วยแท็ก <br> -->
        <p @click="newTapByIDType(product['cooler'].id, 'cooler')">
          COOLER name:{{ product['cooler'] ? product['cooler']['name'] : '-' }}
          price
          {{ product['cooler'] ? product['cooler']['price'] : '-' }}
        </p>
        <br />
        <p>Total Price: {{ calculatePrice(product) }} </p>
      </div>
    </div>
  </div>
  <div v-else-if="!showInfo ">
    <EditSpec :selectedOption="selectedOption" @updatePcSet="handleUpdatePcSet"/>
  </div>

</template>

<style scoped>
.grid-info {
  width: 300;
  grid-column: 4 / 5;
  /* Position on the 4th column */
  grid-row: 1 / span 3;
  /* Span 3 rows */
}

.grid-item {
  background-color: #f0f0f0;
  /* Add background color for grid items */
  padding: 20px;
  /* Add padding for spacing within grid items */
  border-radius: 5px;
  /* Add border radius for rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add box shadow for depth */
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin: 0 auto;
  /* Center the grid horizontally */
}

#list-left {
  max-width: 200px;
  max-height: 200px
}

#list-center {
  max-width: 200px;
  max-height: 200px
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
  flex: 0 0 auto;
  width: auto;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease, opacity 0.3s ease, z-index 0s linear 0.3s;
}

/* Basic button styles */
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #007bff; /* Border color */
  border-radius: 5px; /* Rounded corners */
  background-color: #007bff; /* Background color */
  color: #fff; /* Text color */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition effects */
}

/* Hover state */
.button:hover {
  background-color: #0056b3; /* Darker background color on hover */
  color: #fff; /* Text color on hover */
}

/* Active state */
.button:active {
  background-color: #004080; /* Dark background color when button is clicked */
}
</style>
