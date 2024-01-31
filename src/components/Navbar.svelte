<script>
  const logo = "src/assets/rhc_logo_no_background.svg"
  const home = "src/assets/home.svg"
  const food = "src/assets/food.svg"
  const water = "src/assets/water.svg"
  const exercise = "src/assets/exercise.svg"
  const weight = "src/assets/weight.svg"
  const meds = "src/assets/meds.svg"
  const mode = "src/assets/day-and-night.png"
</script>

<nav class="navbar">
  <ul class="navbar-nav">
    <li class="logo">
      <img src={logo} alt="logo" class="logo-icon">
    </li>

    <span class="middle-group">
      <li class="nav-item">
        <a href="/dashboard" class="nav-link">
          <img src={home} alt="home" class="nav-icon">
          <span class="link-text">Dashboard</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/food" class="nav-link">
          <img src={food} alt="food" class="nav-icon">
          <span class="link-text">Food Tracker</span>
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/water" class="nav-link">
          <img src={water} alt="water" class="nav-icon">
          <span class="link-text">Water Tracker</span>
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/exercise" class="nav-link">
          <img src={exercise} alt="exercise" class="nav-icon">
          <span class="link-text">Exercise Tracker</span>
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/weight" class="nav-link">
          <img src={weight} alt="weight" class="nav-icon">
          <span class="link-text">Weight Tracker</span>
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/meds" class="nav-link">
          <img src={meds} alt="meds" class="nav-icon">
          <span class="link-text">Med Tracker</span>
        </a>
      </li>
    </span>

    <span class="last-item">
      <li class="nav-item">
        <button class="nav-button">
          <img src={mode} alt="dark - light" class="nav-icon">
          <span class="link-text">Light / Dark</span>
        </button>
      </li>
    </span>
  </ul>
</nav>

<style>  
  .navbar {
    width: 5rem;
    height: 100vh;
    position: fixed;
    background-color: var(--nav-color);
    transition: width 200ms ease;
  }

  .navbar:hover {
    width: 16rem;
  }

  .navbar:hover .link-text {
    display: block;
    white-space: nowrap;
    animation: fadeIn .5s;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .nav-item:last-child {
    margin-top: auto;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    text-decoration: none;
    color: var(--nav-link);
  }

  .nav-icon {
    width: 3rem;
    margin: 0 1rem;
  }

  .link-text {
    display: none;
    margin-left: 1rem;
  }

  .logo {
    font-weight: bold;
    text-align: center;
    width: 90%;
    margin: 2rem auto 0 auto;
  }

  .logo-icon {
    width: 4rem;
  }

  .nav-button {
    padding: 0;
    display: flex;
    align-items: center;
    height: 5rem;
    background-color: inherit;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Josefin Sans', sans-serif;
  }

  @media (max-width: 600px) {
    .navbar {
      width: 100vw;
      height: 5rem;
      transition: height 200ms ease;
    }

    .navbar:hover {
      width: 100vw;
      height: fit-content;
      padding-bottom: 1rem;
    }

    .navbar:hover .nav-item {
      display: block;
      animation: fadeIn .5s;
    }

    .navbar-nav {
      justify-content: start;
    }

    .nav-item {
      display: none;
    }

    .nav-link { 
      height: 3rem;
    }

    .nav-icon {
      width: 2.25rem;
    }

    .logo {
      margin: .5rem auto;
      width: 5rem;
      height: 5rem;
    }

    .logo-icon {
      width: 4rem;
      margin: auto;
    }

    .nav-button {
      height: 3rem;
    }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>