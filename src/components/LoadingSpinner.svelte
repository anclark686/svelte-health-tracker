<div class="loader-container">
  <div class="loader"></div>
  <h1>&nbsp;Loading...</h1>
</div>

<style>
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .loader {
    border: 8px solid var(--text-color);
    border-top: 8px solid var(--nav-color);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>