<script>
  const todo = "***TODO***";

  const image = "../../src/assets/strength.svg";
</script>

<div class="meal-stats-container content-box">
  <h2 class="content-header">Strength Training</h2>

  <img src={image} alt="cardio" class="sub-image" />

  <div class="stats-info">
    <div class="info-breakdown">
      <div class="info-line">
        <p class="left">Total Items</p>
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

  <div class="btn-container">
    <button class="btn">Add Exercise</button>
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
