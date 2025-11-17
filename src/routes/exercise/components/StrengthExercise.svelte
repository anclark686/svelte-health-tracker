<script>
  import moment from 'moment-timezone';
  import { onAuthStateChanged } from 'firebase/auth';

  import { auth } from '../../../firebase';
  import { getExerciseDateInfoByType } from '$lib/firebase_functions';
  import { capitalize, getTimeSpent } from '$lib/helper_functions';

  import LoadingSpinner from '../../../components/LoadingSpinner.svelte';
  import StrengthTable from './StrengthTable.svelte';
  import StrengthStats from './StrengthStats.svelte';

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
  let statsData = {
    caloriesBurned: 0,
    totalTime: '',
    totalSets: 0,
    totalReps: 0,
    areas: [],
  };
  let loading = true;

  const getStatsData = (exercises) => {
    const caloriesBurned = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.calsBurned) || 0);
    }, 0);
    const timeInMinutes = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.lengthTime) || 0);
    }, 0);
    const totalTime = getTimeSpent(timeInMinutes);
    const totalSets = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.sets) || 0);
    }, 0);
    const totalReps = exercises.reduce((total, exercise) => {
      return total + (parseInt(exercise.reps) || 0);
    }, 0);
    const areas = [...new Set(exercises.map((exercise) => capitalize(exercise.area)))];
    return {
      caloriesBurned,
      totalTime,
      totalSets,
      totalReps,
      areas,
    };
  };

  const refreshStrengthExercises = async () => {
    loading = true;
    exercises = await getExerciseDateInfoByType(uid, 'strength', date.format('MM-DD-YYYY'));

    console.log('Strength Exercises: ', exercises);

    statsData = getStatsData(exercises);
    console.log('Stats Data: ', statsData);
    fullExerciseData.strength = exercises;
    loading = false;
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      userLoggedIn = true;
      refreshStrengthExercises();
    } else {
      userLoggedIn = false;
    }
  });

  const modalHandler = () => {
    showAddModal = true;
    type = 'strength';
    console.log('Modal opened for type:', type);
  };

  $: if (newDataAdded) {
    refreshStrengthExercises();
    newDataAdded = false;
  }
  $: if (dateChanged) {
    refreshStrengthExercises();
    dateChanged = false;
  }
</script>

<div class="meal-stats-container content-box">
  <h2 class="content-header">Strength Exercises</h2>

  <img
    src="../../../src/assets/strength.svg"
    alt="dumbbells"
    class="sub-image"
  />
  <div>
    {#if loading}
      <LoadingSpinner pageOrSection="section" />
    {:else if exercises.length === 0}
      <p class="no-items">No strength exercises logged for this date.</p>
    {:else}
      <StrengthTable {exercises} />
      <StrengthStats {statsData} />
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
