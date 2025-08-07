<script>
  import moment from "moment-timezone";

  const today = moment().tz("America/New_York").format("MM/DD/YYYY");
</script>

<div class="stats-container content-box">
  <h2 class="content-header">Here's your daily stats</h2>
  <div class="stats-info">
    <div class="stat">
      <p class="left">Date:</p>
      <p class="right">
        {today}
      </p>
    </div>

    <div class="stat">
      <p class="left">Calorie Goal:</p>
      <p class="right">***TODO***</p>
    </div>

    <div class="stat">
      <p class="left">Calories Consumed:</p>
      <p class="right">***TODO***</p>
    </div>

    <div class="stat">
      <p class="left">Calories Burned:</p>
      <p class="right">***TODO***</p>
    </div>

    <div class="stat">
      <p class="left">Current Weight:</p>
      <p class="right">***TODO***</p>
    </div>

    <div class="stat">
      <p class="left">Goal Weight:</p>
      <p class="right">***TODO***</p>
    </div>
  </div>
</div>

<style>
  .stats-info {
    padding: 1rem;
  }
  .stat {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: var(--text-color);
  }

  .stat p {
    margin: 0.5rem;
  }
</style>
