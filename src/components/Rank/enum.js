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
