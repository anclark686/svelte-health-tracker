<script>
  const todo = '***TODO***';

  export let statsData;
</script>

<div class="stats-info">
  <div class="info-breakdown">
    <div class="info-line">
      <p class="left">Calories Burned:</p>
      <p class="right">{statsData.caloriesBurned}</p>
    </div>

    <div class="info-line">
      <p class="left">Time Spent:</p>
      <p class="right">{statsData.totalTime}</p>
    </div>

    <div class="info-line">
      <p class="left">Total Sets:</p>
      <p class="right">{statsData.totalSets}</p>
    </div>

    <div class="info-line">
      <p class="left">Total Reps:</p>
      <p class="right">{statsData.totalReps}</p>
    </div>

    <div class="info-line">
      <p class="left">Areas of Focus:</p>
      <p class="right">{statsData.areas.join(', ') || 'N/A'}</p>
    </div>
  </div>
</div>

<style>
</style>
