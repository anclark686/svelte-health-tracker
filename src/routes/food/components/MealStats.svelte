<script>
  import { capitalize } from '$lib/helper_functions';

  export let foodType;
  export let data;

  let unique = 0;
  let total = 0;
  let calories = 0;
  let protein = 0;
  let fat = 0;
  let carbs = 0;

  const calculateStats = () => {
    let totalItems = 0;
    let allFats = 0;
    let allCarbs = 0;
    let allProtein = 0;
    let allCalories = 0;

    unique = data.length;

    data.forEach((item) => {
      const itemQuantity = parseInt(item.quantity);

      totalItems += itemQuantity;
      allFats += parseInt(item.fat) * itemQuantity;
      allCarbs += parseInt(item.carbs) * itemQuantity;
      allProtein += parseInt(item.protein) * itemQuantity;
      allCalories += parseInt(item.calories) * itemQuantity;
    });

    total = totalItems;
    fat = allFats;
    carbs = allCarbs;
    protein = allProtein;
    calories = allCalories;
  };

  const title = foodType !== 'snacks' ? capitalize(foodType) : 'Snack';

  $: if (data) {
    console.log('herrrrreeee');
    console.log(data);
    calculateStats();
  }
</script>

<div class="meal-stats-container content-box">
  <h2 class="content-header">{title} Stats</h2>
  <div class="stats-info">
    <div class="info-breakdown">
      <div class="info-line">
        <p class="left">Total Unique Items:</p>
        <p class="right">{unique}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Items:</p>
        <p class="right">{total}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Calories:</p>
        <p class="right">{calories}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Protein:</p>
        <p class="right">{protein}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Fats:</p>
        <p class="right">{fat}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Carbs:</p>
        <p class="right">{carbs}</p>
      </div>
    </div>
  </div>
</div>

<style>
</style>
