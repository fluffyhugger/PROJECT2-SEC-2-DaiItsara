import noImagePath from "@/assets/error/noimage.png"
export const SortBy = {
    Price : 'price',
    Latest : 'latest'
  }

export const TotalPrice =(...prices)=>{
  if (prices.length === 0) {
    return 0; // If no prices are provided, return 0
  }
  // Using the reduce function to sum all the prices
  return prices.reduce((total, price) => total + price, 0);
}

export const getComponentProperty = (component, type, property) => {
  return component && component[type] && component[type][property]
    ? component[type][property]
    : property === 'image-url'
    ? noImagePath // Default value for image-url
    : '-'; // Default value for price and name
};

export const initializeProduct =() =>{
  return {
    cpu: Object,
    ram: Object,
    gpu: Object,
    ssd: Object,
    hdd: Object,
    psu: Object,
    case: Object,
    monitor: Object,
    mainboard: Object,
    cooler: Object
  };
}

