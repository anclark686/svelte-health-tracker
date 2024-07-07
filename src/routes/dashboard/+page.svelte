<script>
import {
  onMount
} from "svelte";
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../firebase";
import {
  getDataFromDB
} from "$lib/firebase_functions"
import LoadingSpinner from "../../components/LoadingSpinner.svelte";
import DailyStats from "./components/DailyStats.svelte";
import TrackerContainer from "./components/TrackerContainer.svelte";
import PageHeader from "../../components/PageHeader.svelte";

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

onMount(() => {

})
</script>

<main>

    {#if loading}
    <LoadingSpinner />
    {:else}
    <PageHeader title="Dashboard" dashboard={false} other={{}} />
    {#if userLoggedIn}
    <div class="header-container">
        <h1 class="header-text">Welcome {userData.firstName}!</h1>
    </div>
    <DailyStats />
    <TrackerContainer />
    {/if}
    {/if}
</main>

<style>
.header-container {
  text-align: center;
  background: var(--gradient);
  padding: 3rem 0;
  border-bottom: 2px solid var(--nav-color);
}

.header-text {
  margin: 0;
  color: var(--text-color);
}
</style>
