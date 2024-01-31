<script>
  import Navbar from "../components/Navbar.svelte";
</script>

<div class="main app-light">
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
    --error_dark_red: #800020;
    --error_pink: #ffb6c1;
  }

  :global(.app-light) {
    --nav-color: var(--med_sky_blue);
    --nav-link: var(--light_sky_blue);
    --background-color: var(--pretty_much_white);
    --text-color: var(--darkest_of_blues);
    --section-background: var(--light_sky_blue);
    --box-shadow: gray;
  }

  :global(.app-dark) {
    --nav-color: var(--dark_sky_blue);
    --nav-link: var(--sky_blue);
    --background-color: var(--darkest_of_blues);
    --text-color: var(--pretty_much_white);
    --section-background: var(--dark_sky_blue);
    --box-shadow: black;
  }


  :global(body) {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Josefin Sans', sans-serif;
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
    /* height: 100vh; */
  }

  @media (max-width: 600px) { 
    .content {
      margin: 0;
    }
  }
</style>