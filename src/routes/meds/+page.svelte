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
import MedInfo from "./components/MedInfo.svelte";
import AddMed from "./components/AddMed.svelte";

const mainImage = "../src/assets/pills.svg"

let loading = true
let userLoggedIn = false
let uid = null
let userData = {}
let showModal = false;

let medInfo

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    userLoggedIn = true
    loading = false
  } else {
    userLoggedIn = false
    loading = false
  }
});

const hideForm = (e) => {
    showModal = false
    loading = true
    medInfo.getMedsFromDB().then(() => loading = false)
  }
</script>

<main>
    <PageHeader title="Medication Tracker" dashboard={true} other={{}} />
    {#if loading}
    <LoadingSpinner />
    {:else}
    <div class="meds-content">
        <img src="{mainImage}" alt="exercise" class="page-image">
        <div class="btn-container">
          <button class="btn" on:click={() => {showModal = true; console.log(showModal);}}>+ Add New</button>
        </div>
        <MedInfo bind:this={medInfo}/>
        <AddMed bind:showModal hideForm={hideForm} />
    </div>
    {/if}
</main>

<style>
.meds-content {
  text-align: center;
}
</style>
