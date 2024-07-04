<script>
import moment from "moment-timezone"
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../../firebase";
import {
  getDataFromDB
} from "../../../lib/firebase_functions"
import PageHeader from "../../../components/PageHeader.svelte";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";
import DateSwitcher from "../../../components/DateSwitcher.svelte";
import AddFood from "../components/AddFood.svelte";
import ItemsTable from "../components/ItemsTable.svelte";
import MealStats from "../components/MealStats.svelte";

const mainImage = "/../../src/assets/snack.svg"

let loading = true
let userLoggedIn = false
let uid = null
let userData = {}
let showModal = false;
let date = moment().tz(moment.tz.guess())

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    const response = await getDataFromDB(uid).then(data => {
      userData = data
      loading = false
      console.log("Document Data: ", data)
    })
  } else {
    userLoggedIn = false
  }
});

const hideForm = (e) => {
  showModal = false
  // loading = true
  // medInfo.getMedsFromDB().then(() => loading = false)
}
</script>

<main>
    <PageHeader title="Snack Diary" dashboard={true} other={{destination: "food", title: "Meal Tracker"}} />
    <DateSwitcher bind:date />

    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="snack-content">
        <img src="{mainImage}" alt="exercise" class="page-image">

        <ItemsTable foodType="snacks" data={{}}/>
            <button class="btn" on:click={() => showModal = true}>Add Food</button>
            <AddFood foodType="snacks" bind:showModal hideForm={hideForm} />
            <MealStats foodType="snacks" data={{}} />
            </div>
            {/if}
            </main>

<style>
.snack-content {
  text-align: center;
}
</style>
