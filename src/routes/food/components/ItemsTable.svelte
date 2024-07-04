<script>
export let foodType
export let data
const title = foodType.charAt(0).toUpperCase() + foodType.slice(1)
</script>

<div class="food-items-container content-box">
  <h2 class="content-header">{title} Items</h2>

  <table class="items-table">
    <thead class="items-table-header">
      <tr>
        <th>Name</th>
        <th>Calories</th>
        <th>Carbs</th>
        <th>Fats</th>
        <th>Protein</th>
      </tr>
    </thead>
    <tbody>
      <!-- {#each data as item}
      <tr>
        <td>{item.name}</td>
        <td>{item.calories}</td>
        <td>{item.carbs}</td>
        <td>{item.fats}</td>
        <td>{item.protein}</td>
      </tr>
      {/each} -->
    </tbody>
  </table>
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

  th,
td {
  padding: 10px;
  text-align: center;
  border: 2px solid var(--text-color);
}
</style>