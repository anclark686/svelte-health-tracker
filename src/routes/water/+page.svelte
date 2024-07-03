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
import WaterChart from "./components/WaterChart.svelte";
import WaterStats from "./components/WaterStats.svelte";

const mainImage = "../src/assets/water_glass.svg"

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
    <PageHeader title="Water Tracker" dashboard={true} other={{}} />
    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="water-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn">Add Water</button>
        </div>
        <WaterChart />
        <WaterStats />
    </div>
    {/if}
</main>

<style>
.water-content {
  text-align: center;
}
</style>
