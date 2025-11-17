<script>
  import moment from 'moment-timezone';
  import { onAuthStateChanged } from 'firebase/auth';

  import { auth } from '../../firebase';
  import { getAllExercisesInExercises } from '$lib/firebase_functions';
  import PageHeader from '../../components/PageHeader.svelte';
  import LoadingSpinner from '../../components/LoadingSpinner.svelte';
  import DateSwitcher from '../../components/DateSwitcher.svelte';
  import CardioExercise from './components/CardioExercise.svelte';
  import StrengthExercise from './components/StrengthExercise.svelte';
  import ExerciseStats from './components/ExerciseStats.svelte';
  import AddExercise from './components/AddExercise.svelte';

  let loading = true;
  let userLoggedIn = false;
  let uid = null;
  let savedExerciseData = {
    cardio: [],
    strength: [],
  };
  let fullExerciseData = {
    cardio: [],
    strength: [],
  };
  let date = moment().tz(moment.tz.guess());
  let newDataAdded = false;
  let dateChanged = false;

  let showAddModal = false;
  let type = '';

  const getSavedExercises = async () => {
    loading = true;
    savedExerciseData = await getAllExercisesInExercises(uid);
    console.log('Full Exercise Data: whattt', savedExerciseData);
    loading = false;
  };

  const addExerciseToList = (exercise, sectionType) => {
    console.log(exercise);
    savedExerciseData[sectionType] = savedExerciseData[sectionType].filter(
      (item) => item.name !== exercise.name,
    );
    savedExerciseData[sectionType] = [...savedExerciseData[sectionType], exercise];
  };

  const hideForm = (exercise, sectionType, saved) => {
    showAddModal = false;
    newDataAdded = true;
    if (saved) {
      addExerciseToList(exercise, sectionType);
    }
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      userLoggedIn = true;
      getSavedExercises();
    } else {
      userLoggedIn = false;
    }
  });

  console.log('Full Exercise Data (page): ', fullExerciseData);
</script>

<main>
  <PageHeader
    title="Exercise Tracker"
    dashboard={true}
    other={{}}
  />
  <DateSwitcher
    bind:date
    onChange={() => (dateChanged = true)}
  />

  {#if loading}
    <LoadingSpinner pageOrSection="page" />
  {:else}
    <div class="exercise-content">
      <AddExercise
        bind:showAddModal
        {savedExerciseData}
        {hideForm}
        {type}
        {date}
      />
      <CardioExercise
        bind:showAddModal
        bind:type
        bind:newDataAdded
        bind:dateChanged
        bind:fullExerciseData
        {date}
      />
      <StrengthExercise
        bind:showAddModal
        bind:type
        bind:newDataAdded
        bind:dateChanged
        bind:fullExerciseData
        {date}
      />
      <ExerciseStats {fullExerciseData} />
    </div>
  {/if}
</main>

<style>
  .exercise-content {
    text-align: center;
  }
</style>
