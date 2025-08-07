<script>
  const todo = "***TODO***";
</script>

<div class="exercise-stats-container content-box">
  <h2 class="content-header">Exercise Stats</h2>
  <div class="stats-info">
    <div class="info-breakdown">
      <div class="info-line">
        <p class="left">Unique Exercises:</p>
        <p class="right">{todo}</p>
      </div>

      <div class="info-line">
        <p class="left">Time Spent:</p>
        <p class="right">{todo}</p>
      </div>

      <div class="info-line">
        <p class="left">Calories Burned:</p>
        <p class="right">{todo}</p>
      </div>

      <div class="info-line">
        <p class="left">Favorite Exercise:</p>
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
    margin: 0.5rem;
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
