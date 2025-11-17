<script>
  import { onAuthStateChanged } from 'firebase/auth';

  import { auth } from '../../../firebase';
  import { getExerciseDateInfoByType } from '$lib/firebase_functions';
  import { getTimeSpent } from '$lib/helper_functions';

  import LoadingSpinner from '../../../components/LoadingSpinner.svelte';
  import CardioStats from './CardioStats.svelte';
  import CardioTable from './CardioTable.svelte';

  const todo = '***TODO***';

  export let showAddModal;
  export let type;
  export let date;
  export let newDataAdded;
  export let dateChanged;
  export let fullExerciseData;

  let userLoggedIn = false;
  let uid = null;
  let exercises = [];
  let cardioStats = {
    timeSpent: '',
    caloriesBurned: 0,
  };
  let loading = true;

  const getCaloriesBurned = (exercises) => {
    const totalCalories = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.calsBurned) || 0);
    }, 0);
    return totalCalories;
  };

  const refreshCardioExercises = async () => {
    loading = true;
    exercises = await getExerciseDateInfoByType(uid, 'cardio', date.format('MM-DD-YYYY'));

    console.log('Cardio Exercises: ', exercises);

    const timeInMinutes = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.lengthTime) || 0);
    }, 0);
    cardioStats.timeSpent = getTimeSpent(timeInMinutes);
    console.log('Time Spent: ', cardioStats.timeSpent);

    cardioStats.caloriesBurned = getCaloriesBurned(exercises);
    console.log('Calories Burned: ', cardioStats.caloriesBurned);
    fullExerciseData.cardio = exercises;
    loading = false;
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      userLoggedIn = true;
      refreshCardioExercises();
    } else {
      userLoggedIn = false;
    }
  });

  const modalHandler = () => {
    showAddModal = true;
    type = 'cardio';
    console.log('Modal opened for type:', type);
  };

  $: if (newDataAdded) {
    refreshCardioExercises();
    newDataAdded = null;
  }
  $: if (dateChanged) {
    refreshCardioExercises();
    dateChanged = null;
  }
</script>

<div class="meal-stats-container content-box">
  <h2 class="content-header">Strength Exercises</h2>

  <img
    src="../../src/assets/cardio.svg"
    alt="recumbent bike"
    class="sub-image"
  />
  <div>
    {#if loading}
      <LoadingSpinner pageOrSection="section" />
    {:else if exercises.length === 0}
      <p class="no-items">No cardio exercises logged for this date.</p>
    {:else}
      <CardioTable {exercises} />
      <CardioStats {cardioStats} />
    {/if}
  </div>

  <div class="btn-container">
    <button
      class="btn"
      on:click={modalHandler}>Add Exercise</button
    >
  </div>
</div>

<style>
  .no-items {
    padding: 1rem;
    font-size: 1.5rem;
  }
</style>
