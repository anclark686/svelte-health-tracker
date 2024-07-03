<script>
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../firebase";
import {
  getDataFromDB
} from "../../helpers"
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import ProgressChart from "./components/ProgressChart.svelte";
import GoalTracker from "./components/GoalTracker.svelte";
import WeightStatistics from "./components/WeightStatistics.svelte";

const mainImage = "../src/assets/scale.svg"

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
    <PageHeader title="Weight Tracker" dashboard={true} other={{}} />

    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="weight-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn">Weigh In!</button>
        </div>
        <ProgressChart />
        <GoalTracker />
        <WeightStatistics />
    </div>
    {/if}
</main>

<style>
.weight-content {
  text-align: center;
}
</style>
