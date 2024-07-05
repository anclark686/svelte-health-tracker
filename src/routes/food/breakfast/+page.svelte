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
} from "../../../lib/firebase_functions"
import PageHeader from "../../../components/PageHeader.svelte";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";
import DateSwitcher from "../../../components/DateSwitcher.svelte";
import AddFood from "../components/AddFood.svelte";
import ItemsTable from "../components/ItemsTable.svelte";
import MealStats from "../components/MealStats.svelte";

const mainImage = "/../../src/assets/breakfast.svg"

let loading = true
let userLoggedIn = false
let uid = null
let foodData = []
let showModal = false;
let date = moment().tz(moment.tz.guess())

onAuthStateChanged(auth, async (user) => {
  console.log(date.format("MM-DD-YYYY"))
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    const response = await findMealsInDates(uid, "breakfast", date.format("MM-DD-YYYY"))
      .then(data => {
        loading = false
        foodData = data 
        console.log("Document Data: ", data)
      })
  } else {
    userLoggedIn = false
  }
});

const hideForm = async (e) => {
  showModal = false
  loading = true
  const response = await findMealsInDates(uid, "breakfast", date.format("MM-DD-YYYY"))
    .then(data => {
      loading = false
      foodData = data
      console.log("Document Data: ", data)
    })
}

const onDateChange = async (e) => {
  loading = true
  const response = await findMealsInDates(uid, "breakfast", date.format("MM-DD-YYYY"))
    .then(data => {
      loading = false
      foodData = data
      console.log("Document Data: ", data)
    })
}
</script>

<main>
    <PageHeader title="Breakfast Diary" dashboard={true} other={{destination: "food", title: "Meal Tracker"}} />
    <DateSwitcher bind:date onChange={onDateChange} />
    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="breakfast-content">
        <img src="{mainImage}" alt="breakfast" class="page-image">

        <ItemsTable foodType="breakfast" data={foodData}/>
            <button class="btn" on:click={() => showModal = true}>Add Food</button>
            <AddFood foodType="breakfast" bind:showModal hideForm={hideForm} date={date} />
            <MealStats foodType="breakfast" data={{}} />
            </div>
            {/if}
            </main>

<style>
.breakfast-content {
  text-align: center;
}
</style>
