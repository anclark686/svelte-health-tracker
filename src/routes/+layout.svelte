<script>
  import Navbar from "../components/Navbar.svelte";
</script>

<div class="main app-light" id="app">
  <Navbar />

  <div class="content">
    <slot />
  </div>
  
</div>

<style>
  :global(:root) {
    --pretty_much_white: #ebf2f3;
    --light_sky_blue: #dcf9fa;
    --sky_blue: #5ce1e6;
    --med_sky_blue: #0097b2;
    --dark_sky_blue: #16536e;
    --darkest_of_blues: #0a242f;
    --error_dark_red: #b60833;
    --error_pink: #ffb6c1;
  }

  :global(.app-light) {
    --nav-color: var(--med_sky_blue);
    --nav-link: var(--light_sky_blue);
    --background-color: var(--pretty_much_white);
    --text-color: var(--darkest_of_blues);
    --section-background: var(--light_sky_blue);
    --box-shadow: gray;
    --btn-color: var(--sky_blue);
    --gradient: linear-gradient(to right, var(--med_sky_blue), var(--sky_blue), var(--med_sky_blue));
    --error-color: var(--error_dark_red);
  }

  :global(.app-dark) {
    --nav-color: var(--dark_sky_blue);
    --nav-link: var(--sky_blue);
    --background-color: var(--darkest_of_blues);
    --text-color: var(--pretty_much_white);
    --section-background: var(--dark_sky_blue);
    --box-shadow: black;
    --btn-color: var(--med_sky_blue);
    --gradient: linear-gradient(to right, var(--dark_sky_blue), var(--med_sky_blue), var(--dark_sky_blue));
    --error-color: var(--error_pink);
  }

  :global(html), :global(body) {
    height: 100%;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Josefin Sans', sans-serif;
  }

  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :global(body::-webkit-scrollbar) {
    width: 1rem;
  }

  :global(body::-webkit-scrollbar-track) {
    background: var(--darkest_of_blues);
  }

  :global(body::-webkit-scrollbar-thumb) {
    background: var(--med_sky_blue)
  }

  .content {
    margin-left: 5rem;
    padding: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
    flex-grow: 1;
  }

  :global(.page-image) {
    width: 20rem;
    margin: 2rem auto 1rem auto;
  }

  @media (max-width: 600px) { 
    .content {
      margin: 0;
    }

    :global(.page-image) {
      width: 10rem;
      margin-top: 6rem;
    }
  }
</style>