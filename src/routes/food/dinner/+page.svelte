<script>
    import moment from "moment-timezone"
  import {
  onAuthStateChanged
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

const mainImage = "/../../src/assets/dinner.svg"

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
    const response = await findMealsInDates(uid, "dinner", date.format("MM-DD-YYYY"))
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
  const response = await findMealsInDates(uid, "dinner", date.format("MM-DD-YYYY"))
    .then(data => {
      loading = false
      foodData = data 
      console.log("Document Data: ", data)
    })
}

const onDateChange = async (e) => {
  loading = true
  const response = await findMealsInDates(uid, "dinner", date.format("MM-DD-YYYY"))
    .then(data => {
      loading = false
      foodData = data
      console.log("Document Data: ", data)
    })
}
</script>

<main>
  <PageHeader title="Dinner Diary" dashboard={true} other={{destination: "food", title: "Meal Tracker"}} />
  <DateSwitcher bind:date onChange={onDateChange} />

  {#if loading}
  <LoadingSpinner />
  {:else}
  <div class="dinner-content">
      <img src="{mainImage}" alt="dinner" class="page-image">

      <ItemsTable foodType="dinner" data={foodData} />
      <button class="btn" on:click={() => showModal = true}>Add Food</button>
      <AddFood foodType="dinner" bind:showModal hideForm={hideForm} date={date} />
      <MealStats foodType="dinner" data={{}} />
  </div>
  {/if}
</main>

<style>
.dinner-content {
text-align: center;
}
</style>