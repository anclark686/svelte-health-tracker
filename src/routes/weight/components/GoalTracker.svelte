<script>
import LoadingSpinner from "../../../components/LoadingSpinner.svelte";

export let goalData
export let goalsLoading

const subImage = "../src/assets/goal.svg"

const todo = "***TODO***"
</script>

<div class="weight-goal-container content-box">
    <h2 class="content-header">Goal Tracker</h2>

    <div class="goal-info">
        {#if goalsLoading}
        <LoadingSpinner />
        {:else}
        <h3>Are you on the way to meeting your goals?</h3>
        <img src={subImage} alt="goal" class="sub-image">
        <div class="info-breakdown">
            <div class="info-line">
                <p class="left">Initial Weight:</p>
                <p class="right">{goalData.initialWeight}</p>
            </div>

            <div class="info-line">
                <p class="left">Current Weight:</p>
                <p class="right">{goalData.currentWeight}</p>
            </div>

            <div class="info-line">
                <p class="left">Goal Weight:</p>
                <p class="right">{goalData.goalWeight}</p>
            </div>

            <div class="info-line">
                <p class="left">Score:</p>
                <p class="right">{goalData.score}</p>
            </div>

            <div class="results-line">
                <p class="top">That's a difference of:</p>
                <p class="bottom">{goalData.difference}</p>
            </div>

            {#if goalData.left !== 0}
            <div class="results-line">
              <p class="full">{`Only ${goalData.left} to go!`}</p>
            </div>
            {:else}
            <div class="results-line">
              <p class="full">"🎉You've met your goal!🎉"</p>
          </div>
          {/if}
        </div>
        {/if}
    </div>
</div>

<style>
.goal-info {
  margin: 1rem;
}

.goal-info h3 {
  font-size: 1.35rem;
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

.left,
.top,
.full {
  font-weight: bold;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.results-line {
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .info-line {
    margin: 0 1rem;
  }
}
</style>
