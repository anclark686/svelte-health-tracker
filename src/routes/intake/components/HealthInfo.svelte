<script>
  export let errorMap;

  const WEIGHT_GOALS = [
    "Maintain Weight",
    "Mild Weight Loss",
    "Weight Loss",
    "Extreme Weight Loss",
    "Mild Weight Gain",
    "Weight Gain",
    "Extreme Weight Gain",
  ];
  const ACTIVITY_LEVELS = [
    "Sedentary",
    "Light Activity",
    "Moderate Activity",
    "Daily Activity",
    "Very Active",
    "Intense Activity",
  ];
</script>

<div class="health-info content-box">
  <h2 class="content-header">Health Info</h2>
  <div class="form-content">
    <label for="currWeight" class="form-label">Current Weight</label>
    <input
      type="text"
      id="currWeight"
      name="currWeight"
      class={`form-input ${errorMap.currWeight ? "input-error" : ""}`}
    />
    {#if errorMap.currWeight}
      <p class="error-message">Please enter your current weight</p>
    {/if}
    <label for="goalWeight" class="form-label">Goal Weight</label>
    <input
      type="text"
      id="goalWeight"
      name="goalWeight"
      class={`form-input ${errorMap.goalWeight ? "input-error" : ""}`}
    />
    {#if errorMap.goalWeight}
      <p class="error-message">Please enter your goal weight</p>
    {/if}
    <label for="weightGoals" class="form-label">Weight Goals</label>
    <select
      name="weightGoals"
      id="weightGoals"
      class={`form-input ${errorMap.weightGoals ? "input-error" : ""}`}
    >
      <option value="">Select One</option>
      {#each WEIGHT_GOALS as goal}
        <option value={goal}>{goal}</option>
      {/each}
    </select>
    {#if errorMap.weightGoals}
      <p class="error-message">Please select an option</p>
    {/if}
    <label for="activityLevel" class="form-label">Activity Level</label>
    <select
      name="activityLevel"
      id="activityLevel"
      class={`form-input ${errorMap.activityLevel ? "input-error" : ""}`}
    >
      <option value="">Select One</option>
      {#each ACTIVITY_LEVELS as activity}
        <option value={activity}>{activity}</option>
      {/each}
    </select>
    {#if errorMap.activityLevel}
      <p class="error-message">Please select an option</p>
    {/if}
  </div>
</div>
