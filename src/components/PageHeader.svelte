<script>
import DashboardButton from "./DashboardButton.svelte";
export let title
export let dashboard
export let other
</script>

<div class="page-header">
    <h2>{title}</h2>
    <div class="header-btn-container">
        {#if other?.destination}
        <a href={`/${other.destination}`}>
            <button class="header-btn">{other.title}</button>
        </a>
        {/if}
        {#if dashboard}
        <DashboardButton />
        {/if}
    </div>
</div>

<style>
.page-header {
  color: var(--text-color);
  background-color: var(--nav-color);
  display: flex;
  justify-content: space-between;
}

h2 {
  margin: 0;
  padding: 1rem;
}

.header-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .page-header {
    border-top: 2px solid var(--border-color);
    border-bottom: 2px solid var(--border-color);
  }

  h2 {
    margin: 0;
    padding: .5rem;
  }
}
</style>
