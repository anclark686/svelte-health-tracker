<script>
  import { capitalize } from "../../../lib/helper_functions"
export let medData
</script>

<div class="med-info-container content-box">
    <h2 class="content-header">Medication Info</h2>
    <div class="med-info">
        
        {#if medData.length !== 0}
        <h3>Medication List</h3>
        <p>{medData.length} Total Medications</p>
        <table class="med-table">
            <thead class="med-table-header">
                <tr>
                    <th>Name</th>
                    <th>Dosage</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {#each medData as med, i}
                <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{capitalize(med.name)}</td>
                    <td>{med.dose}</td>
                    <td>{med.time}</td>
                </tr>
                {/each}
            </tbody>
        </table>
        {:else}
        <p class="no-meds">No medications found. Click 'Add New' to add a new medication.</p>
        {/if}
    </div>
</div>

<style>
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

.no-meds {
  padding: 1rem;
  font-size: 1.5rem;
}
</style>
