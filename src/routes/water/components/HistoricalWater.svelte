<script>
import moment from "moment-timezone";
import {
  onMount
} from "svelte";

import {
  auth
} from "../../../firebase";
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";

export let historicalWaterData
export let selectedDate
export let historicalLoading

let formattedDate = ""

const formatDate = () => {
  const date = new Date(selectedDate)
  return moment(date).format("dddd, MMMM Do YYYY")
}

$: if (selectedDate) {

  formattedDate = formatDate()
}
</script>

<div class="weight-progress-container content-box">
    <h2 class="content-header">View Historical Data</h2>
    <div class="historical-info">
        {#if historicalLoading}
        <LoadingSpinner pageOrSection="section"/>
        {:else}
            <label for="dates" class="form-label">Dates:</label>
            {#if Object.keys(historicalWaterData).length !== 0}
            <select name="dates" id="dates" class="form-input" on:change={(e) => selectedDate = e.currentTarget.value}>
                <option value="">Select One</option>
                {#each Object.keys(historicalWaterData) as date}
                <option value={date}>{date}</option>
                {/each}
            </select>
            {#if selectedDate}
            <div class="info-breakdown">
                <h3>{formattedDate}</h3>
                {#if historicalWaterData[selectedDate].waterInOunces && historicalWaterData[selectedDate].waterInCups}
                <div class="info-line">
                    <p class="left">Water In Ounces:</p>
                    <p class="right">{historicalWaterData[selectedDate].waterInOunces} oz</p>
                </div>

                <div class="info-line">
                    <p class="left">Water In Cups:</p>
                    <p class="right">{historicalWaterData[selectedDate].waterInCups} cups</p>
                </div>

                {:else}
                <p class="no-date">No water intake recorded for this date.</p>
                {/if}
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

.no-date {
  font-size: 1.25rem;
}

.info-breakdown {
  width: 75%;
}

.info-breakdown p {
  margin: .5rem;
  font-size: 1.2rem;
  color: var(--text-color);
}

.info-line {
  display: flex;
  justify-content: space-between;
  margin: 0 5rem;
}

.left {
  font-weight: bold;
  text-align: left;
}

.right {
  text-align: right;
}

@media (max-width: 800px) {
  .info-breakdown {
    width: 90%;
  }

  .info-line {
    width: 90%;
    margin: 0 1rem;
  }
}

@media (max-width: 600px) {
  .info-line {
    margin: 0 1rem;
  }
}
</style>
