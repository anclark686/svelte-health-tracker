<script>
  const todo = "***TODO***";

  const DIET = ["Balanced", "Low Carb", "Low Fat", "High Protein"];
</script>

<div class="calorie-info-container content-box">
  <h2 class="content-header">Macro Preferences</h2>
  <div class="calorie-info">
    <div class="info-breakdown">
      <div class="select-container">
        <label for="diet" class="form-label">Diet Preference</label>
        <select name="diet" id="diet" class="form-input">
          <option value="">Select One</option>
          {#each DIET as activity}
            <option value={activity}>{activity}</option>
          {/each}
        </select>
      </div>

      <div class="protein-section mini-section">
        <div class="info-line">
          <p class="left">Protein Allowed:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Protein Used:</p>
          <p class="right">{todo}</p>
        </div>
      </div>

      <div class="carb-section mini-section">
        <div class="info-line">
          <p class="left">Carbs Allowed:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Carbs Used:</p>
          <p class="right">{todo}</p>
        </div>
      </div>

      <div class="fat-section mini-section">
        <div class="info-line">
          <p class="left">Fat Allowed:</p>
          <p class="right">{todo}</p>
        </div>

        <div class="info-line">
          <p class="left">Fat Used:</p>
          <p class="right">{todo}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .calorie-info {
    margin: 1rem;
  }

  .select-container {
    display: flex;
    flex-direction: column;
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

  .mini-section {
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .info-line {
      margin: 0 1rem;
    }
  }
</style>
