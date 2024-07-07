<script>
import moment from "moment-timezone"
import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth
} from "../../../firebase";
import {
  findMealsInDates
} from "$lib/firebase_functions"
import PageHeader from "../../../components/PageHeader.svelte";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";
import DateSwitcher from "../../../components/DateSwitcher.svelte";
import AddFood from "../components/AddFood.svelte";
import ItemsTable from "../components/ItemsTable.svelte";
import MealStats from "../components/MealStats.svelte";

const mainImage = "/../../src/assets/breakfast.svg"
const foodType = "breakfast"

let loading = true
let userLoggedIn = false
let uid = null
let foodData = []
let showAddModal = false;
let date = moment().tz(moment.tz.guess())

const addFoodToList = (food) => {
  console.log(food)
  foodData = [...foodData, food]
}

const refreshMeals = async () => {
  loading = true
  const response = await findMealsInDates(uid, "breakfast", date.format("MM-DD-YYYY"))
    .then(data => {
      loading = false
      foodData = data
      console.log("Document Data: ", data)
    })
}

onAuthStateChanged(auth, async (user) => {
  console.log(date.format("MM-DD-YYYY"))
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    refreshMeals()
  } else {
    userLoggedIn = false
  }
});

const hideAddForm = (food) => {
  showAddModal = false
  addFoodToList(food)
}
</script>

<main>
    <PageHeader title="Breakfast Diary" dashboard={true} other={{destination: "food", title: "Meal Tracker"}} />
    <DateSwitcher bind:date onChange={refreshMeals} />
    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="breakfast-content">
        <img src="{mainImage}" alt="breakfast" class="page-image">

        <ItemsTable bind:foodData foodType={foodType} date={date} />
        <button class="btn" on:click={() => showAddModal = true}>Add Food</button>
        <AddFood bind:showAddModal foodType={foodType} hideForm={hideAddForm} date={date} foodData={foodData} />
        <MealStats foodType={foodType} data={foodData} />
    </div>
    {/if}
</main>

<style>
.breakfast-content {
  text-align: center;
}
</style>
