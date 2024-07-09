<script>
  export let pageOrSection
</script>

<div class={pageOrSection === "page" ? "loader-container" : "loader-section-container"}>
  <div class={pageOrSection === "page" ? "page-loader loader" : "section-loader loader"}></div>
  <h1>&nbsp;Loading...</h1>
</div>

<style>
  .loader-container, .loader-section-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-container {
    height: 100vh;
  }
  .loader {
    border: 8px solid var(--text-color);
    
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 2s linear infinite;
  }

  .page-loader {
    border-top: 8px solid var(--nav-color);
  }

  .section-loader {
    border-top: 8px solid var(--background-color);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>