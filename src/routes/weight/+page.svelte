<script>
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../firebase";
import {
  getHistoricalWeightData,
  getPreviousWeightData
} from "$lib/firebase_functions"
import {
  getScoreDifferenceAndLeft
} from "$lib/helper_functions"
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import ProgressChart from "./components/ProgressChart.svelte";
import GoalTracker from "./components/GoalTracker.svelte";
import WeightStatistics from "./components/WeightStatistics.svelte";
import AddWeightModal from "./components/AddWeightModal.svelte";
import HistoricalWeights from "./components/HistoricalWeights.svelte";

const mainImage = "../src/assets/scale.svg"

let loading = true
let goalsLoading = true
let statsLoading = true
let historicalLoading = true
let userLoggedIn = false
let uid = null
let showModal = false;
let showModalWithEdit = false;
let edit = false
let weightAdded = false

let historicalWeightData = {}
let selectedDate = null
let goalData = {}
let statData = {}

const populateHistoricalWeightData = async () => {
  uid = auth.currentUser.uid

  await getHistoricalWeightData(uid).then((data) => {
    historicalWeightData = data
  })
}

const getWeightGoals = async (weightData, scoreDiffAndLeft) => {
  const {
    score,
    difference,
    left
  } = scoreDiffAndLeft

  if (Object.values(weightData).length > 0) {
    goalData = {
      initialWeight: `${weightData.initialWeight} lbs`,
      currentWeight: `${weightData.currWeight} lbs`,
      goalWeight: `${weightData.goalWeight} lbs`,
      score,
      difference,
      left,
    }
  }
}

const getWeightStats = async (weightData, scoreDiffAndLeft) => {
  if (Object.values(weightData).length > 0) {
    statData = {
      initialWeight: `${weightData.initialWeight} lbs`,
      currentWeight: `${weightData.currWeight} lbs`,
      goalWeight: `${weightData.goalWeight} lbs`,
      highestWeight: `${weightData.highestWeight} lbs`,
      lowestWeight: `${weightData.lowestWeight} lbs`,
      difference: scoreDiffAndLeft.difference,
    }
  }
}

const refreshData = async () => {
  loading = true

  await getPreviousWeightData(uid).then(async (data) => {
    const scoreDiffAndLeft = getScoreDifferenceAndLeft(data)

    await getWeightGoals(data, scoreDiffAndLeft).then(() => {
      goalsLoading = false
    })

    await getWeightStats(data, scoreDiffAndLeft).then(() => {
      statsLoading = false
    })

    await populateHistoricalWeightData().then(() => {
      historicalLoading = false
    })

    loading = false
  })
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

$: if (weightAdded) {
  refreshData()
  weightAdded = false
}

$: if (showModalWithEdit) {
  edit = true
  showModalWithEdit = false
  showModal = true
}
</script>

<main>
    <PageHeader title="Weight Tracker" dashboard={true} other={{}} />

    {#if loading}
    <LoadingSpinner pageOrSection="page" />
    {:else}
    <div class="weight-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn" on:click={() => showModal = true}>Weigh In!</button>
        </div>
        <ProgressChart />
        <GoalTracker goalData={goalData} goalsLoading={goalsLoading} />
        <HistoricalWeights bind:selectedDate bind:showModalWithEdit historicalWeightData={historicalWeightData} historicalLoading={historicalLoading} />
        <WeightStatistics statData={statData} statsLoading={statsLoading} />
        <AddWeightModal bind:showModal bind:weightAdded bind:edit selectedDate={selectedDate} />
    </div>
    {/if}
</main>

<style>
.weight-content {
  text-align: center;
}
</style>
