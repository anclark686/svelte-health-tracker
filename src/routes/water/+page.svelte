<script>
import {
  onAuthStateChanged
} from "firebase/auth";
import moment from "moment-timezone";

import {
  auth
} from "../../firebase";
import {
  getHistoricalWaterData,
  getWaterByDate
} from "$lib/firebase_functions"
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import AddWaterModal from "./components/AddWaterModal.svelte";
import WaterChart from "./components/WaterChart.svelte";
import HistoricalWater from "./components/HistoricalWater.svelte";
import WaterStats from "./components/WaterStats.svelte";

const mainImage = "../src/assets/water_glass.svg"

let loading = true
let statsLoading = true
let historicalLoading = true
let userLoggedIn = false
let uid = null
let userData = {}

let showModal = false;
let waterAdded = false
let historicalWaterData = {}
let selectedDate = null
let statData = {}

const populateHistoricalWaterData = async () => {
  uid = auth.currentUser.uid
  await getHistoricalWaterData(uid).then((data) => {
    historicalWaterData = data
    console.log(historicalWaterData)
  })
}

const getWaterStats = async () => {
  uid = auth.currentUser.uid
  const today = moment().tz(moment.tz.guess())
  await getWaterByDate(uid, today.format("MM-DD-YYYY")).then((data) => {
    statData = data
    console.log(statData)
  })
}

const refreshData = async () => {
  loading = true

  await populateHistoricalWaterData().then(() => {
      historicalLoading = false
      loading = false
    })

    await getWaterStats().then(() => {
      statsLoading = false
      loading = false
    })

  // await getPreviousWeightData(uid).then(async (data) => {
  //   const scoreDiffAndLeft = getScoreDifferenceAndLeft(data)

  //   await getWeightGoals(data, scoreDiffAndLeft).then(() => {
  //     goalsLoading = false
  //   })

  //   await getWeightStats(data, scoreDiffAndLeft).then(() => {
  //     statsLoading = false
  //   })

  //   await populateHistoricalWeightData().then(() => {
  //     historicalLoading = false
  //   })

  //   loading = false
  // })
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    refreshData()
  } else {
    userLoggedIn = false
    loading = false
  }
});

$: if (waterAdded) {
  console.log("water added")
  // refreshData()
  waterAdded = false
}
</script>

<main>
    <PageHeader title="Water Tracker" dashboard={true} other={{}} />
    {#if loading}
    <LoadingSpinner pageOrSection="page" />
    {:else}
    <div class="water-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn" on:click={() => showModal = true}>Add Water</button>
        </div>
        <WaterChart />
        <HistoricalWater bind:selectedDate historicalWaterData={historicalWaterData} historicalLoading={historicalLoading}/>
        <WaterStats statData={statData} statsLoading={statsLoading} />
        <AddWaterModal bind:showModal bind:waterAdded />
    </div>
    {/if}
</main>

<style>
.water-content {
  text-align: center;
}
</style>
