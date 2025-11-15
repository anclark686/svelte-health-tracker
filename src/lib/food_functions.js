export const addFoodToList = (food, foodData) => {
  console.log(food);
  const newFoodData = foodData.filter((item) => item.name !== food.name);
  return [...newFoodData, food];
};