<script>
  import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../../../firebase";
import {
  getDataFromDB
} from "../../../helpers"
import PageHeader from "../../../components/PageHeader.svelte";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";

const mainImage = "../../src/assets/exercise.svg"

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
  <PageHeader title="Breakfast Diary" dashboard={true} other={{destination: "food", title: "Food Tracker"}} />
  {#if loading}
  <LoadingSpinner />
  {:else}
  <div class="breakfast-content">
      <img src="{mainImage}" alt="breakfast" class="page-image">

  </div>
  {/if}
</main>

<style>
.breakfast-content {
text-align: center;
}
</style>

