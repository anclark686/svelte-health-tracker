<script>
import {
  capitalize
} from "$lib/helper_functions";
export let foodType
export let data
const title = foodType.charAt(0).toUpperCase() + foodType.slice(1)
</script>

<div class="food-items-container content-box">
    <h2 class="content-header">{title} Items</h2>

    {#if data.length !== 0}
    <table class="items-table">
        <thead class="items-table-header">
            <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {#each data as item, i}
            <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(item.name)}</td>
                <td>{item.calories}</td>
                <td>{item.carbs}</td>
                <td>{item.fat}</td>
                <td>{item.protein}</td>
                <td>{item.quantity}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    {:else}
    <p class="no-items">No items found. Click 'Add Food' to add a new food.</p>
    {/if}
</div>

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

.no-items {
  padding: 1rem;
  font-size: 1.5rem;
}
</style>
