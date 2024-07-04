<script>
const todo = "***TODO***"

const ACTIVITY_LEVELS = ["Sedentary", "Light Activity", "Moderate Activity", "Daily Activity", "Very Active", "Intense Activity"];
</script>

<div class="calorie-info-container content-box">
    <h2 class="content-header">Calorie Info</h2>
    <div class="calorie-info">
        <div class="info-breakdown">
          <div class="select-container">
            <label for="activityLevel" class="form-label">Activity Level</label>
            <select name="activityLevel" id="activityLevel" class="form-input">
                <option value="">Select One</option>
                {#each ACTIVITY_LEVELS as activity}
                <option value={activity}>{activity}</option>
                {/each}
            </select>
          </div>
          
            <div class="info-line">
                <p class="left">Allowance:</p>
                <p class="right">{todo}</p>
            </div>

            <div class="info-line">
                <p class="left">Used:</p>
                <p class="right">{todo}</p>
            </div>

            <div class="info-line">
                <p class="left">Burned:</p>
                <p class="right">{todo}</p>
            </div>

            <div class="info-line">
                <p class="left">Remaining:</p>
                <p class="right">{todo}</p>
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
