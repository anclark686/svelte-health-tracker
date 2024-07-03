<script>
const todo = "***TODO***"
</script>

<div class="weight-stats-container content-box">
  <h2 class="content-header">Weight Statistics</h2>
  <div class="stats-info">
      <div class="info-breakdown">
        <div class="info-line">
          <p class="left">Current Weight:</p>
          <p class="right">{todo}</p>
        </div>
  
        <div class="info-line">
          <p class="left">Highest Weight:</p>
          <p class="right">{todo}</p>
        </div>
  
        <div class="info-line">
          <p class="left">Lowest Weight:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Pounds Lost:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Pounds Gained:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">BMI:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Body Fat %:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Ideal Weight:</p>
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