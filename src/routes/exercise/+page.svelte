<script>
  import moment from "moment-timezone";
  import { onAuthStateChanged } from "firebase/auth";

  import { auth } from "../../firebase";
  import { getDataFromDB } from "$lib/firebase_functions";
  import PageHeader from "../../components/PageHeader.svelte";
  import LoadingSpinner from "../../components/LoadingSpinner.svelte";
  import DateSwitcher from "../../components/DateSwitcher.svelte";
  import ExerciseSection from "./components/ExerciseSection.svelte";
  import CardioExercise from "./components/CardioExercise.svelte";
  import StrengthExercise from "./components/StrengthExercise.svelte";
  import ExerciseStats from "./components/ExerciseStats.svelte";
  import AddExercise from "./components/AddExercise.svelte";

  let loading = true;
  let userLoggedIn = false;
  let uid = null;
  let userData = {};
  let date = moment().tz(moment.tz.guess());

  let showAddModal = false;
  let type = "";
  

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      userLoggedIn = true;
      const response = await getDataFromDB(uid).then((data) => {
        userData = data;
        loading = false;
        console.log("Document Data: ", data);
      });
    } else {
      userLoggedIn = false;
    }
  });
</script>

<main>
  <PageHeader title="Exercise Tracker" dashboard={true} other={{}} />
  <DateSwitcher bind:date onChange={() => {}} />

  {#if loading}
    <LoadingSpinner pageOrSection="page" />
  {:else}
    <div class="exercise-content">
      <AddExercise
        bind:showAddModal
        {type}
        {date}
      />
      <!-- <CardioExercise bind:showAddModal bind:type />
      <StrengthExercise bind:showAddModal bind:type /> -->
      <ExerciseSection
        bind:showAddModal
        bind:type
        sectionType="cardio"
        image="../../src/assets/cardio.svg"
      />
      <ExerciseSection
        bind:showAddModal
        bind:type
        sectionType="strength"
        image="../../src/assets/strength.svg"
      />
      <ExerciseStats />
    </div>
  {/if}
</main>

<style>
  .exercise-content {
    text-align: center;
  }
</style>
