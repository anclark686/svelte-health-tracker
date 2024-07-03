<script>

const todo = "***TODO***"
</script>

<div class="water-stats-container content-box">
  <h2 class="content-header">Water Stats</h2>
  <div class="stats-info">
    <div class="info-breakdown">
      <div class="info-line">
          <p class="left">Recommended:</p>
          <p class="right">{todo}</p>
      </div>

      <div class="info-line">
          <p class="left">Total Ounces:</p>
          <p class="right">{todo}</p>
      </div>

      <div class="info-line">
          <p class="left">Ounces Remaining:</p>
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