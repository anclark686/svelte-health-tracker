<script>
  import moment from 'moment-timezone';
  import { onAuthStateChanged } from 'firebase/auth';

  import { auth } from '../../../firebase';
  import { getExerciseDateInfoByType } from '$lib/firebase_functions';
  import { capitalize, getTimeSpent } from '$lib/helper_functions';

  import LoadingSpinner from '../../../components/LoadingSpinner.svelte';
  import { onMount } from 'svelte';

  export let fullExerciseData;
  export let dataChanged;
  const todo = '***TODO***';

  let loading = false;
  let uniqueExercises = 0;
  let cardioTime = 0;
  let strengthTime = 0;
  let timeSpent = '';
  let caloriesBurned = 0;
  let todaysFocus = '';

  console.log('Full Exercise Data (stats): ', fullExerciseData);

  const getTotalTimeSpent = () => {
    cardioTime = fullExerciseData.cardio.reduce((total, exercise) => {
      return total + (parseInt(exercise.lengthTime) || 0);
    }, 0);
    strengthTime = fullExerciseData.strength.reduce((total, exercise) => {
      return total + (parseInt(exercise.lengthTime) || 0);
    }, 0);
    timeSpent = getTimeSpent(cardioTime + strengthTime);
  };

  const getCaloriesBurned = () => {
    const cardioBurned = fullExerciseData.cardio.reduce((total, exercise) => {
      return total + (parseInt(exercise.calsBurned) || 0);
    }, 0);
    const strengthBurned = fullExerciseData.strength.reduce((total, exercise) => {
      return total + (parseInt(exercise.calsBurned) || 0);
    }, 0);
    caloriesBurned = cardioBurned + strengthBurned;
  };

  const getFocusedArea = () => {
    if (cardioTime > strengthTime) {
      todaysFocus = 'Cardio';
    } else if (strengthTime > cardioTime) {
      const areas = fullExerciseData.strength.map((exercise) => capitalize(exercise.area));
      const areaCount = {};
      areas.forEach((area) => {
        areaCount[area] = (areaCount[area] || 0) + 1;
      });
      const sortedAreas = Object.entries(areaCount).sort((a, b) => b[1] - a[1]);
      todaysFocus = `Strength: ${sortedAreas[0][0]}`;
    } else {
      todaysFocus = 'Balanced';
    }
  };

  const calculateStats = () => {
    getTotalTimeSpent();
    getCaloriesBurned();
    getFocusedArea();
    console.log(cardioTime, strengthTime);
  };

  $: if (fullExerciseData) {
    uniqueExercises =
      (fullExerciseData.cardio?.length || 0) + (fullExerciseData.strength?.length || 0);

    calculateStats();
  }

  $: if (dataChanged) {
    calculateStats();
  }
</script>

<div class="exercise-stats-container content-box">
  <h2 class="content-header">Exercise Stats</h2>
  {#if loading}
    <LoadingSpinner pageOrSection="section" />
  {:else}
    <div class="stats-info">
      <div class="info-breakdown">
        <div class="info-line">
          <p class="left">Unique Exercises:</p>
          <p class="right">{uniqueExercises}</p>
        </div>

        <div class="info-line">
          <p class="left">Time Spent:</p>
          <p class="right">{timeSpent}</p>
        </div>

        <div class="info-line">
          <p class="left">Calories Burned:</p>
          <p class="right">{caloriesBurned}</p>
        </div>

        <div class="info-line">
          <p class="left">Today's Focus:</p>
          <p class="right">{todaysFocus}</p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
</style>
