<script>
  import moment from 'moment-timezone';
  import { onAuthStateChanged } from 'firebase/auth';

  import { auth } from '../../../firebase';
  import { getExerciseDateInfoByType } from '$lib/firebase_functions';
  import { capitalize } from '$lib/helper_functions';

  const todo = '***TODO***';

  export let exercises;
</script>

<table class="items-table">
  <thead class="items-table-header">
    <tr>
      <th>Exercise</th>
      <th>Calories</th>
      <th>Duration</th>
      <th>Sets</th>
      <th>Weight</th>
      <th>Area</th>
      <th>Time of Day</th>
      <th>Modify</th>
    </tr>
  </thead>
  <tbody>
    {#each exercises as exercise, i}
      <tr class={i % 2 === 0 ? 'even-row' : 'odd-row'}>
        <td>{capitalize(exercise.name)}</td>
        <td>{exercise.calsBurned}</td>
        <td>{exercise.lengthTime}</td>
        <td>{exercise.sets} of {exercise.reps}</td>
        <td>{exercise.weight}</td>
        <td>{capitalize(exercise.area)}</td>
        <td>{capitalize(exercise.timeOfDay)}</td>
        <td>
          <button
            class="emoji-btn"
            on:click={() => console.log('Edit')}>✏️</button
          >
          <button
            class="emoji-btn"
            on:click={() => console.log('Delete')}>❌</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .items-table {
    width: 90%;
    margin: 30px auto;
    color: var(--text-color);
    border-collapse: collapse;
  }

  .items-table-header {
    background-color: var(--table-header);
  }

  .odd-row {
    background-color: var(--table-every-other);
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border: 2px solid var(--text-color);
  }

  .emoji-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
