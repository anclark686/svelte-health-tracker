<script>
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../firebase";
import {
  getDataFromDB
} from "$lib/firebase_functions"
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import FoodDiaries from "./components/FoodDiaries.svelte";
import CalorieInfo from "./components/CalorieInfo.svelte";
import MacrosSection from "./components/MacrosSection.svelte";

const mainImage = "../src/assets/log_in.svg"

let loading = true
let userLoggedIn = false
let uid = null
let userData = {}

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
</script>

<main>
    <PageHeader title="Meal Tracker" dashboard={true} other={{}} />
    {#if loading}
    <LoadingSpinner pageOrSection="page" />
    {:else}
    <div class="food-content">
        <!-- <img src="{mainImage}" alt="exercise" class="page-image"> -->
        <FoodDiaries />
        <CalorieInfo />
        <MacrosSection />
    </div>
    {/if}
</main>

<style>
.food-content {
  text-align: center;
}
</style>
