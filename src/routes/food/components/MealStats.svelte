<script>
export let foodType
export let data

const title = foodType.charAt(0).toUpperCase() + foodType.slice(1)

const todo = "***TODO***"
</script>

<div class="meal-stats-container content-box">
  <h2 class="content-header">{title} Stats</h2>
  <div class="stats-info">
    <div class="info-breakdown">
        <div class="info-line">
            <p class="left">Total Items:</p>
            <p class="right">{todo}</p>
        </div>

        <div class="info-line">
            <p class="left">Total Calories:</p>
            <p class="right">{todo}</p>
        </div>

        <div class="info-line">
            <p class="left">Total Carbs:</p>
            <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Total Fats:</p>
          <p class="right">{todo}</p>
      </div>

      <div class="info-line">
        <p class="left">Total Carbs:</p>
        <p class="right">{todo}</p>
    </div>
    </div>
</div>
</div>

<style>
  .stats-info {
  margin: 1rem;
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

@media (max-width: 600px) {
  .info-line {
    margin: 0 1rem;
  }
}
</style>