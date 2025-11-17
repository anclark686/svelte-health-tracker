<script>
  import { auth, db } from '../../../firebase';

  import Modal from '../../../components/Modal.svelte';
  import { capitalize, getBasicData } from '$lib/helper_functions';
  import { addOrEditExerciseInDates, addOrEditExerciseInExercises } from '$lib/firebase_functions';

  export let showAddModal;
  export let hideForm;
  export let type;
  export let date;
  export let savedExerciseData;

  const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const INTENSITY_LEVELS = ['Low', 'Medium', 'High', 'Extreme'];
  const TIME_OF_DAY = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const AREAS = ['Upper Body', 'Lower Body', 'Full Body', 'Core', 'Flexibility', 'Balance'];

  let searchPage = false;
  let searchTerm = '';
  let resultList = [];
  let searchPressed = false;
  let existingExercises = {};
  let selectedExercise = null;
  let saveToFavorites = false;
  let formEl;

  const exerciseImg = '../../../../src/assets/exercise.svg';

  console.log('Adding exercise of type: ', type);

  const buttonConfig = {
    primaryText: 'Add',
    secondaryText: 'Cancel',
    onPrimaryClick: 'submit',
    onSecondaryClick: 'close',
  };

  const switchToManual = (e) => {
    e.preventDefault();
    searchPage = !searchPage;
    if (!searchPage) {
      console.log('Switching to manual entry');
    }
  };

  const clearExistingExercises = () => {
    searchTerm = '';
    resultList = [];
    selectedExercise = null;
  };

  const addExercise = async (e) => {
    if (!searchPage && !selectedExercise) {
      await addExerciseToBoth(e);
    } else if (searchPage && selectedExercise) {
      await addExistingExerciseToDates(selectedExercise);
    }
  };

  const findExerciseinExercises = (exerciseName) => {
    let exercise = null;
    console.log();
    console.log(savedExerciseData);
    savedExerciseData[type].forEach((item) => {
      if (item.name == exerciseName) {
        exercise = item;
      }
    });
    console.log('found exercise: ', exercise);
    console.log();
    return exercise;
  };

  console.log('hello', savedExerciseData);

  const addExerciseToBoth = async (e) => {
    console.log('Adding new exercise to both database and date-specific records');
    // Implementation for adding new exercise
    const uid = auth.currentUser.uid;
    const data = getBasicData(e);

    console.log('Exercise Data: ', data);
    const response = await addOrEditExerciseInDates(
      data,
      uid,
      type,
      date.format('MM-DD-YYYY'),
    ).then(async () => {
      if (saveToFavorites) {
        const response2 = await addOrEditExerciseInExercises(data, uid, type).then(() => {
          console.log('done');
          hideForm(data, type, saveToFavorites);
        });
      } else {
        hideForm(data, type, saveToFavorites);
      }
    });
  };

  const addExistingExerciseToDates = async (exercise) => {
    console.log('Adding existing exercise to date-specific records:', exercise);
    // Implementation for adding existing exercise
    const uid = auth.currentUser.uid;
    const foundExercise = findExerciseinExercises(exercise.name);

    const response = await addOrEditExerciseInDates(
      exercise,
      uid,
      type,
      date.format('MM-DD-YYYY'),
    ).then(() => {
      console.log('done');
      hideForm(exercise, type, saveToFavorites);
      clearExistingExercises();
    });
  };

  const searchInExercises = () => {
    if (!searchTerm) return;

    searchPressed = true;

    if (searchTerm) {
      const typeExercises = savedExerciseData[type];
      resultList = typeExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
  };

  const resetForm = () => {
    if (formEl) formEl.reset();
    selectedExercise = null;
    searchTerm = '';
    resultList = [];
    searchPressed = false;
  };

  $: if (!showAddModal) resetForm();
</script>

<div class="add-exercise-container">
  <form
    action="submit"
    bind:this={formEl}
    class="add-exercise-form"
    on:submit|preventDefault={addExercise}
  >
    <Modal
      bind:showModal={showAddModal}
      {buttonConfig}
    >
      <div
        class="header"
        slot="header"
      >
        <img
          src={exerciseImg}
          alt="food"
          class="medium-image"
        />
        <h2>
          Add New {capitalize(type)} Exercise
        </h2>
      </div>

      <div class="btn-container">
        <button
          class="small-btn"
          on:click={switchToManual}>{!searchPage ? 'Add Saved Exercise' : 'Manual Entry'}</button
        >
      </div>

      {#if !searchPage}
        <div class="form-content">
          <label
            for="name"
            class="form-label">Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            class="form-input"
          />

          <div class="sm-input-row">
            <div class="sm-input-col">
              <label
                for="caloriesBurned"
                class="form-label">Calories Burned</label
              >
              <input
                type="number"
                id="caloriesBurned"
                name="caloriesBurned"
                class="form-input"
              />
            </div>

            <div class="sm-input-col">
              {#if type === 'cardio'}
                <label
                  for="lengthTime"
                  class="form-label">Duration (minutes)</label
                >
                <input
                  type="number"
                  id="lengthTime"
                  name="lengthTime"
                  class="form-input"
                />
              {:else if type === 'strength'}
                <label
                  for="weight"
                  class="form-label">Weight</label
                >
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  class="form-input"
                />
              {/if}
            </div>
          </div>

          {#if type === 'strength'}
            <div class="sm-input-row">
              <div class="sm-input-col">
                <label
                  for="sets"
                  class="form-label">Sets</label
                >
                <select
                  name="sets"
                  id="sets"
                  class="form-input"
                >
                  <option value="">Select One</option>
                  {#each QUANTITIES as sets}
                    <option value={sets}>{sets}</option>
                  {/each}
                </select>
              </div>

              <div class="sm-input-col">
                <label
                  for="reps"
                  class="form-label">Reps</label
                >
                <select
                  name="reps"
                  id="reps"
                  class="form-input"
                >
                  <option value="">Select One</option>
                  {#each QUANTITIES as reps}
                    <option value={reps}>{reps}</option>
                  {/each}
                </select>
              </div>
            </div>
          {/if}

          <div class="sm-input-row">
            <div class="sm-input-col">
              {#if type === 'cardio'}
                <label
                  for="intensity"
                  class="form-label">Intensity</label
                >
                <select
                  name="intensity"
                  id="intensity"
                  class="form-input"
                >
                  <option value="">Select One</option>
                  {#each INTENSITY_LEVELS as level}
                    <option value={level}>{level}</option>
                  {/each}
                </select>
              {:else if type === 'strength'}
                <label
                  for="area"
                  class="form-label">Area</label
                >
                <select
                  name="area"
                  id="area"
                  class="form-input"
                >
                  <option value="">Select One</option>
                  {#each AREAS as area}
                    <option value={area}>{area}</option>
                  {/each}
                </select>
              {/if}
            </div>

            <div class="sm-input-col">
              <label
                for="timeOfDay"
                class="form-label">Time of Day</label
              >
              <select
                name="timeOfDay"
                id="timeOfDay"
                class="form-input"
              >
                <option value="">Select One</option>
                {#each TIME_OF_DAY as time}
                  <option value={time}>{time}</option>
                {/each}
              </select>
            </div>
          </div>

          <label
            for="forFavorites"
            class="form-label checkbox-label"
          >
            <input
              id="forFavorites"
              name="forFavorites"
              type="checkbox"
              class="form-input-checkbox"
              bind:checked={saveToFavorites}
            />
            <span>Save to Favorites</span>
          </label>
        </div>
      {:else}
        <div class="search-container">
          <input
            type="text"
            id="search"
            name="search"
            class="form-input"
            bind:value={searchTerm}
          />
          <button
            class="small-btn"
            on:click|preventDefault={searchInExercises}>Search</button
          >
        </div>
        {#if !searchPressed}
          <h3 class="form-label">Saved {capitalize(type)} Exercises</h3>
          {#each savedExerciseData[type] as exercise}
            <button
              class={selectedExercise?.name == exercise.name
                ? 'add-existing-btn selected-btn'
                : 'add-existing-btn'}
              on:click|preventDefault={() => (selectedExercise = exercise)}
            >
              <p>{capitalize(exercise.name)}</p>
            </button>
          {/each}
        {:else}
          <div class="search-results-container">
            <h3>Search Results</h3>

            {#if resultList.length > 0}
              {#each resultList as exercise}
                <button
                  class={selectedExercise?.name == exercise.name
                    ? 'add-existing-btn selected-btn'
                    : 'add-existing-btn'}
                  on:click|preventDefault={() => (selectedExercise = exercise)}
                >
                  <p>{capitalize(exercise.name)}</p>
                </button>
              {/each}
            {:else}
              <h4>No results found. Try adjusting your search.</h4>
            {/if}
          </div>
        {/if}
      {/if}
    </Modal>
  </form>
</div>

<style>
  .form-content {
    margin-top: 0;
  }

  .small-btn {
    width: 175px;
  }

  .sm-input-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .sm-input-col {
    display: flex;
    flex-direction: column;
    flex-grow: 0.5;
  }

  .sm-input-col select.form-input {
    width: 75%;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkbox-label span {
    vertical-align: middle;
    margin-top: 0.2em;
  }

  input[type='checkbox'].form-input-checkbox {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid var(--text-color);
    box-shadow: 0 0 5px var(--box-shadow);
  }

  .add-existing-btn {
    width: 100%;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    text-align: center;
    font-family: 'Josefin Sans', sans-serif;
  }

  .add-existing-btn p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  .selected-btn {
    background-color: var(--btn-color);
    color: var(--text-color);
    border: none;
    outline: none;
  }

  .search-results-container {
    color: var(--text-color);
  }
</style>
