<script>
import {
  onAuthStateChanged
} from "firebase/auth";
import moment from "moment-timezone"

import {
  auth,
  db
} from "../../firebase";
import {
  getMedsFromDB,
  addMedToUserDB,
  addMedToDates,
  getMedDateInfo,
  toggleMedInDb,
  editMedInDb,
  deleteMedInDb
} from "$lib/firebase_functions"
import {
  getBasicData
} from "$lib/helper_functions";
import PageHeader from "../../components/PageHeader.svelte";
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import MedInfo from "./components/MedInfo.svelte";
import AddMed from "./components/AddMed.svelte";
import MoreInfo from "./components/MoreInfo.svelte";
import DateSwitcher from "../../components/DateSwitcher.svelte";

const mainImage = "../src/assets/pills.svg"
const TIMES = ["morning", "afternoon", "evening", "night"]

let loading = true
let userLoggedIn = false
let uid = null
let showAddModal = false;
let showModalWithEdit = false;
let edit = false
let date = moment().tz(moment.tz.guess())
let selectedMed = null
let moreInfoClicked = false
let showMoreInfoModal = false

let medData = {
  morning: {},
  afternoon: {},
  evening: {},
  night: {},
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true

    await getMeds().then(() => {
      loading = false
      console.log("done", medData)
    })
  } else {
    userLoggedIn = false
    loading = false
  }
});

const sortIntoTimes = (med) => {
  if (med.times.includes("morning")) {
    medData.morning[med.name] = med
  }
  if (med.times.includes("afternoon")) {
    medData.afternoon[med.name] = med
  }
  if (med.times.includes("evening")) {
    medData.evening[med.name] = med
  }
  if (med.times.includes("night")) {
    medData.night[med.name] = med
  }
}

const getMeds = async () => {
  await getMedsFromDB(uid).then(async (data) => {
    const medNames = []

    data.forEach((med) => {
      sortIntoTimes(med)
      medNames.push(med.name)
    })

    TIMES.forEach(async (time) => {
      await getMedDateInfo(uid, date.format("MM-DD-YYYY"), medData[time], time).then((dataWithDates) => {

        dataWithDates.forEach((med) => {
          if (medNames.includes(med.name) && medData[time][med.name]?.times.includes(time)) { 
            medData[time][med.name] = med
          }
        })
      })
    })
  })
}

const hideForm = async (newMed) => {
  showAddModal = false
  sortIntoTimes(newMed)
}

const addNewMed = async (e, times) => {
  const uid = auth.currentUser.uid
  const newMed = getBasicData(e)

  newMed.name = newMed.name.toLowerCase()
  newMed.times = times

  showAddModal = false
  loading = true

  await addMedToUserDB(uid, newMed)

  times.forEach(async (time) => {
    newMed.taken = false
    
    await addMedToDates(uid, newMed, date.format("MM-DD-YYYY"), time).then (async () => {
      await getMeds().then(() => {
        loading = false
      })
    })
  })
}

const editMed = async (e, times) => {
  const uid = auth.currentUser.uid
  const med = getBasicData(e)

  med.name = med.name.toLowerCase()
  med.times = times

  showAddModal = false
  loading = true

  await editMedInDb(uid, med, selectedMed, date.format("MM-DD-YYYY")).then(async () => {
    await getMeds().then(() => {
        loading = false
      })
  })

  if (med.name !== selectedMed.name) {
    TIMES.forEach((time) => {
      delete medData[time][selectedMed.name]
      medData[time] = medData[time]
    })
  }
}

const deleteMed = async () => {
  const uid = auth.currentUser.uid

  await deleteMedInDb(uid, selectedMed).then(() => {
    
    TIMES.forEach((time) => {
      delete medData[time][selectedMed.name]
      medData[time] = medData[time]
    })
  })
  
  selectedMed = null
  showMoreInfoModal = false
}

const getDailyMeds = async () => {
  loading = true

  await getMeds().then(() => {
    loading = false
  })
}

const toggleMed = async (med, time) => {
  await toggleMedInDb(uid, med, date.format("MM-DD-YYYY"), time)
}

$: if (showModalWithEdit) {
  edit = true
  showModalWithEdit = false
  showAddModal = true
}

$: if (moreInfoClicked) {
  moreInfoClicked = false
  showMoreInfoModal = true
}
</script>

<main>
    <PageHeader title="Medication Tracker" dashboard={true} other={{}} />
    <DateSwitcher bind:date onChange={getDailyMeds} />
    {#if loading}
    <LoadingSpinner pageOrSection="page" />
    {:else}
    <div class="meds-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
            <button class="btn" on:click={() => showAddModal = true}>+ Add New</button>
        </div>

        <MedInfo bind:selectedMed bind:moreInfoClicked medData={medData} toggleMed={toggleMed} />
        <AddMed bind:showModal={showAddModal} bind:edit addNewMed={addNewMed} editMed={editMed} selectedMed={selectedMed} />
        <MoreInfo bind:showModal={showMoreInfoModal} bind:showModalWithEdit selectedMed={selectedMed} deleteMed={deleteMed} />
    </div>
    {/if}
</main>

<style>
.meds-content {
  text-align: center;
}
</style>
