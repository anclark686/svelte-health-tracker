<script>
  import { onAuthStateChanged } from "firebase/auth";

  import { auth } from '../firebase.js';

  const logo = "src/assets/reyaly_health_tracker.svg"
  const food = "src/assets/food.svg"
  const water = "src/assets/water.svg"
  const exercise = "src/assets/exercise.svg"
  const weight = "src/assets/weight.svg"
  const meds = "src/assets/meds.svg"

  let loading = true
  let userLoggedIn = false                                

  let user = auth.currentUser;
  console.log(user)


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      loading = false
      userLoggedIn = true
    } else {
      loading = false
      userLoggedIn = false
    }
  });
</script>
<div class="logo-container">
  <img src={logo} alt="logo" class="home-logo">
</div>

<div class="login-register">
  {#if !userLoggedIn}
  <a href="/login_register/login">
    <button class="login-register-btn">Login</button>
  </a>
    <a href="/login_register/register">
      <button class="login-register-btn">Register</button>
    </a>
    
  {/if}
</div>

<div class="descriptions">
  <div class="description-section">
    <img src={food} alt="food" class="home-image">
    <p class="home-description">
      Track your meals and macronutrients using the food tracker. The food tracker 
      allows you to create and favorite meals for easy reuse. View which foods and 
      meals are within or outside of your macronutrient goals.
    </p>
  </div>

  <div class="description-section">
    <img src={water} alt="water" class="home-image">
    <p class="home-description">
      Get your sips in! Track your water intake to meet 
      daily goals. Our water intake calculator will calculate how much water is 
      needed for your body type, to aid in staying hydrated. You can set a reminder 
      to notify you if you haven't logged any water intake in your given time frame.
    </p>
  </div>

  <div class="description-section">
    <img src={exercise} alt="exercise" class="home-image">
    <p class="home-description">
      Track your exercises and calories burned with our exercise tracker. Set 
      favorite exercises for repeat use, and view which exercises have the most 
      impact. Group exercises together to create the ideal workout.
    </p>
  </div>

  <div class="description-section">
    <img src={weight} alt="weight" class="home-image">
    <p class="home-description">
      Track your weight and set goals for weight changes using the weight tracker. 
      Easily view any fluctuations or plateaus with our graphical representation. 
      Additionally, use the BMI calculator to calculate a healthy weight goal.
    </p>
  </div>

  <div class="description-section">
    <img src={meds} alt="meds" class="home-image">
    <p class="home-description">
      Keeping up with your medications can be a daunting task. With the med tracker,
      you can easily keep tabs on what medications you're taking, what time of day 
      they're due, and whether or not you've taken them. Easily set reminders to 
      ensure medications are taken on time.
    </p>
  </div>
</div>

<style>
  .logo-container {
    text-align: center;
  }

  .home-logo {
    margin: 2rem auto;
    width: 30rem;
  }

  .login-register {
    width: 50%;
    margin:  2rem auto;
    background-color: var(--section-background);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px var(--box-shadow);
    display: flex;
    justify-content: center;
  }

  .login-register-btn {
    margin: 0 1rem;
    padding: 1rem;
    cursor: pointer;
    border: none;
    font-size: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0 10px var(--box-shadow);
    width: 150px;
    background-color: var(--btn-color);
  }

  .descriptions {
    text-align: center;
    margin: 3rem auto;
  }

  .description-section {
    width: 75%;
    margin:  2rem auto;
    background-color: var(--section-background);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px var(--box-shadow);
  }

  .home-image {
    width: 10rem;
  }

  .home-description {
    width: 75%;
    margin: 2rem auto;
    font-size: 1.5rem;
  }
</style>