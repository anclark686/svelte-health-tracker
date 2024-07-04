<script>
import {
  onAuthStateChanged
} from "firebase/auth";
import {
  goto
} from "$app/navigation";

import {
  auth
} from '../firebase.js';
import { logoutUser } from "../lib/firebase_functions.js";


const PARENT_ROUTES = [
  "login_register",
  "food",
]


let loading = true
let userLoggedIn = false

const logo = "/src/assets/rhc_logo_no_background.svg"
const home = "/src/assets/home.svg"
const food = "/src/assets/food.svg"
const water = "/src/assets/water.svg"
const exercise = "/src/assets/exercise.svg"
const weight = "/src/assets/weight.svg"
const meds = "/src/assets/meds.svg"
const mode = '/src/assets/day-and-night.png'
const logout = "/src/assets/logout.svg"
const login = "/src/assets/log_in.svg"
const register = "/src/assets/person.svg"

let cookies

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    userLoggedIn = true
    loading = false
  } else {
    userLoggedIn = false
    loading = false
  }
});

const lightDarkMode = () => {
  const body = document.getElementById("app")
  body.classList.toggle("app-light")
  body.classList.toggle("app-dark")

  cookies = document.cookie.split(';')
  cookies = cookies.filter((cookie) => {
    !cookie.includes("darkmode")
  })
  if (body.classList.contains("app-light")) {
    cookies.push("darkmode=light")
  } else {
    cookies.push("darkmode=dark")
  }

  document.cookie = cookies.join('; ')
}
</script>

<nav class="navbar">
    {#if !loading}
    <ul class="navbar-nav">
        <li class="logo">
            <a href="/">
                <img src={logo} alt="logo" class="logo-icon">
            </a>
        </li>

        {#if userLoggedIn}
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
                    <span class="link-text">Meal Tracker</span>
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

            <li class="nav-item">
                <button class="nav-button" on:click={logoutUser}>
                    <img src={logout} alt="logout" class="nav-icon">
                    <span class="link-text">Logout</span>
                </button>
            </li>
        </span>
        {:else}
        <span class="middle-group">
            <li class="nav-item">
                <a href="/login_register/login" class="nav-link">
                    <img src={login} alt="login" class="nav-icon">
                    <span class="link-text">Login</span>
                </a>
            </li>

            <li class="nav-item">
                <a href="/login_register/register" class="nav-link">
                    <img src={register} alt="register" class="nav-icon">
                    <span class="link-text">Register</span>
                </a>
            </li>
        </span>
        {/if}

        <span class="last-item">
            <li class="nav-item">
                <button class="nav-button" on:click={lightDarkMode}>
                    <img src={mode} alt="dark - light" class="nav-icon">
                    <span class="link-text">Light / Dark</span>
                </button>
            </li>
        </span>
    </ul>
    {/if}
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

  .middle-group {
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .middle-group::-webkit-scrollbar {
    display: none;
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
    color: var(--nav-link);
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
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
