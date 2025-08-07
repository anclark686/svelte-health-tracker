<script>
  import { capitalize } from "$lib/helper_functions";

  export let selectedMed;
  export let moreInfoClicked;
  export let medData;
  export let toggleMed;

  let morning;
  let afternoon;
  let evening;
  let night;

  const moreInfo = (med) => {
    selectedMed = med;
    moreInfoClicked = true;
  };

  $: if (Object.values(medData).length !== 0) {
    ({ morning, afternoon, evening, night } = medData);

    console.log(morning, afternoon, evening, night);
  }
</script>

<div class="med-info-container content-box">
  <h2 class="content-header">Medication Info</h2>
  <div class="med-info">
    {#if Object.values(morning).length !== 0 || Object.values(afternoon).length !== 0 || Object.values(evening).length !== 0 || Object.values(night).length !== 0}
      {#if Object.values(morning).length !== 0}
        <h3>Morning Medication List</h3>
        <p>{Object.values(morning).length} Total Medication(s)</p>
        <table class="med-table">
          <thead class="med-table-header">
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Taken</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.values(morning) as med, i}
              <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(med.name)}</td>
                <td>{med.dose}</td>
                <td>
                  <input
                    type="checkbox"
                    name={`${med.name}-morning-check`}
                    id={`${med.name}-morning-check`}
                    bind:checked={med.taken}
                    on:change={() => toggleMed(med, "morning")}
                  />
                </td>
                <td>
                  <button class="emoji-btn" on:click={() => moreInfo(med)}>
                    ➕
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      {#if Object.values(afternoon).length !== 0}
        {#if Object.values(morning).length !== 0}
          <hr />
        {/if}
        <h3>Afternoon Medication List</h3>
        <p>{Object.values(afternoon).length} Total Medication(s)</p>
        <table class="med-table">
          <thead class="med-table-header">
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Taken</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.values(afternoon) as med, i}
              <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(med.name)}</td>
                <td>{med.dose}</td>
                <td>
                  <input
                    type="checkbox"
                    name={`${med.name}-afternoon-check`}
                    id={`${med.name}-afternoon-check`}
                    bind:checked={med.taken}
                    on:change={() => toggleMed(med, "afternoon")}
                  />
                </td>
                <td>
                  <button class="emoji-btn" on:click={() => moreInfo(med)}>
                    ➕
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      {#if Object.values(evening).length !== 0}
        {#if Object.values(afternoon).length !== 0}
          <hr />
        {/if}
        <h3>Evening Medication List</h3>
        <p>{Object.values(evening).length} Total Medication(s)</p>
        <table class="med-table">
          <thead class="med-table-header">
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Taken</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.values(evening) as med, i}
              <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(med.name)}</td>
                <td>{med.dose}</td>
                <td>
                  <input
                    type="checkbox"
                    name={`${med.name}-evening-check`}
                    id={`${med.name}-evening-check`}
                    bind:checked={med.taken}
                    on:change={() => toggleMed(med, "evening")}
                  />
                </td>
                <td>
                  <button class="emoji-btn" on:click={() => moreInfo(med)}>
                    ➕
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      {#if Object.values(night).length !== 0}
        {#if Object.values(evening).length !== 0}
          <hr />
        {/if}
        <h3>Night Medication List</h3>
        <p>{Object.values(night).length} Total Medication(s)</p>
        <table class="med-table">
          <thead class="med-table-header">
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Taken</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.values(night) as med, i}
              <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(med.name)}</td>
                <td>{med.dose}</td>
                <td>
                  <input
                    type="checkbox"
                    name={`${med.name}-night-check`}
                    id={`${med.name}-night-check`}
                    bind:checked={med.taken}
                    on:change={() => toggleMed(med, "night")}
                  />
                </td>
                <td>
                  <button class="emoji-btn" on:click={() => moreInfo(med)}>
                    ➕
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    {:else}
      <p class="no-meds">
        No medications found. Click 'Add New' to add a new medication.
      </p>
    {/if}
  </div>
</div>

<style>
  .med-info {
    padding: 0 2rem;
  }

  .med-table {
    width: 75%;
    margin: 30px auto;
    color: var(--text-color);
    border-collapse: collapse;
  }

  .med-table-header {
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
    background-color: var(--table-header);
    border-radius: 5px;
    padding: 0 0.25rem;
    margin: 0 0.5rem;
    box-shadow: 0 0 10px var(--box-shadow);
  }

  .no-meds {
    padding: 1rem;
    font-size: 1.5rem;
  }
</style>
