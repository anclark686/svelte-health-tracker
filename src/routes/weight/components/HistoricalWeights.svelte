<script>
import moment from "moment-timezone";

import { formatDate } from "$lib/helper_functions";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";

export let selectedDate
export let showModalWithEdit
export let historicalWeightData
export let historicalLoading

let formattedDate = ""

$: if (selectedDate) {
  formattedDate = formatDate(selectedDate)
}
</script>

<div class="weight-progress-container content-box">
    <h2 class="content-header">View Historical Data</h2>
    <div class="historical-info">
        {#if historicalLoading}
        <LoadingSpinner pageOrSection="section"/>
        {:else}
        <label for="dates" class="form-label">Dates:</label>
        {#if Object.keys(historicalWeightData).length !== 0}
        <select name="dates" id="dates" class="form-input" on:change={(e) => selectedDate = e.currentTarget.value}>
            <option value="">Select One</option>
            {#each Object.keys(historicalWeightData) as date}
            <option value={date}>{date}</option>
            {/each}
        </select>
        {#if selectedDate}
        <div>
            <h3>{formattedDate}</h3>
            {#if historicalWeightData[selectedDate].weight}
              <p class="result">Weight: {historicalWeightData[selectedDate].weight} lbs</p>
            {:else}
              <p class="no-date">No weight recorded for this date.</p>
            {/if}
        </div>
        <div class="btn-container">
          <button class="small-btn" on:click={() => showModalWithEdit = true}>Add Weight</button>
        </div>
        {:else}
        <p class="no-date">Please select a date.</p>
        {/if}
        {/if}
        {/if}
    </div>
</div>

<style>
.historical-info {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.result,
.no-date {
  font-size: 1.25rem;
}
</style>
