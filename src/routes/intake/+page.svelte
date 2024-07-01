<script>
import moment from "moment-timezone"
import {
  doc, setDoc
} from "firebase/firestore";
import { goto } from '$app/navigation';

import {
  convertHeightToCm,
  convertWeightToKg
} from "../../helper_functions";
import {
  auth,
  db
} from "../../firebase";

const SEXES = ["Male", "Female"];
const GENDERS = ["Male", "Female", "Non-binary", "Agender", "Other"];
const HEIGHTS = [
  "4'0\"",
  "4'1\"",
  "4'2\"",
  "4'3\"",
  "4'4\"",
  "4'5\"",
  "4'6\"",
  "4'7\"",
  "4'8\"",
  "4'9\"",
  "4'10\"",
  "4'11\"",
  "5'0\"",
  "5'1\"",
  "5'2\"",
  "5'3\"",
  "5'4\"",
  "5'5\"",
  "5'6\"",
  "5'7\"",
  "5'8\"",
  "5'9\"",
  "5'10\"",
  "5'11\"",
  "6'0\"",
  "6'1\"",
  "6'2\"",
  "6'3\"",
  "6'4\"",
  "6'5\"",
  "6'6\"",
  "6'7\"",
  "6'8\"",
  "6'9\"",
  "6'10\"",
  "6'11\"",
  "7'0\"",
]
const WEIGHT_GOALS = ["Maintain Weight", "Mild Weight Loss", "Weight Loss", "Extreme Weight Loss", "Mild Weight Gain", "Weight Gain", "Extreme Weight Gain"];
const ACTIVITY_LEVELS = ["Sedentary", "Light Activity", "Moderate Activity", "Daily Activity", "Very Active", "Intense Activity"];

const errorMap = {};

const getBasicData = (e) => {
  const formData = new FormData(e.target);
  const data = {};

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
    data[key] = value.toString();
    errorMap[key] = false;
  }

  return data
}

const validateData = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value === "") {
      errorMap[key] = true;
    }
  })
  console.log(Object.values(errorMap).includes(true))
  if (Object.values(errorMap).includes(true)) {
    return false
  }
  return true
}

const addExtraData = (data) => {
  data.birthday = moment.tz(data.birthday, "America/New_York").format("MM/DD/YYYY");
  data.phoneNum = data.phoneNum.replace(/\D/g, '');
  data.heightInCm = convertHeightToCm(data.height);
  data.currWeightInKg = convertWeightToKg(data.currWeight);
  data.goalWeightInKg = convertWeightToKg(data.goalWeight);
  data.uid = auth.currentUser.uid;
  data.email = auth.currentUser.email;
  data.proteinGoal = data.fatGoal = data.carbsGoal = data.calorieGoal = null;
  data.joined = new Date();
  data.timetamp = new Date();

  return data
}

const submitIntake = async (e) => {
  let data = getBasicData(e);
  const isDataValid = validateData(data);

  if (isDataValid) {
    data = addExtraData(data);
    await setDoc(doc(db, "users", auth.currentUser.uid), data).then(() => {
      goto("/dashboard")
    })
    console.log(data);
  } else {
    console.log("data not valid");
  }

}
</script>

<div class="intake-page">
    <h1>Account Setup</h1>

    <form action="submit" class="intake-form" on:submit|preventDefault={submitIntake}>
        <div class="basic-info info-box">
            <h2 class="info-header">Basic Info</h2>
            <div class="form-content">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" class={`form-input ${errorMap.firstName  ? "input-error" : ""}`} />
                {#if errorMap.firstName}
                <p class="error-message">Please enter your first name</p>
                {/if}
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" class={`form-input ${errorMap.lastName  ? "input-error" : ""}`} />
                {#if errorMap.lastName}
                <p class="error-message">Please enter your last name</p>
                {/if}
                <label for="phoneNum" class="form-label">Phone Number</label>
                <input type="text" id="phoneNum" name="phoneNum" class={`form-input ${errorMap.phoneNum  ? "input-error" : ""}`} />
                {#if errorMap.phoneNum}
                <p class="error-message">Please enter your phone number</p>
                {/if}
                <label for="birthday" class="form-label">Birthday</label>
                <input type="date" id="birthday" name="birthday" class={`form-input ${errorMap.birthday  ? "input-error" : ""}`} />
                {#if errorMap.birthday}
                <p class="error-message">Please enter your birthday</p>
                {/if}
                <label for="height" class="form-label">Height</label>
                <select name="height" id="height" class={`form-input ${errorMap.height  ? "input-error" : ""}`}>
                    <option value="">Select One</option>
                    {#each HEIGHTS as height}
                    <option value={height}>{height}</option>
                    {/each}
                </select>
                {#if errorMap.height}
                <p class="error-message">Please select an option</p>
                {/if}
                <label for="sex" class="form-label">Sex</label>
                <select name="sex" id="sex" class={`form-input ${errorMap.sex  ? "input-error" : ""}`}>
                    <option value="">Select One</option>
                    {#each SEXES as sex}
                    <option value={sex}>{sex}</option>
                    {/each}
                </select>
                {#if errorMap.sex}
                <p class="error-message">Please select an option</p>
                {/if}
                <label for="gender" class="form-label">Gender</label>
                <select name="gender" id="gender" class={`form-input ${errorMap.gender  ? "input-error" : ""}`}>
                    <option value="">Select One</option>
                    {#each GENDERS as gender}
                    <option value={gender}>{gender}</option>
                    {/each}
                </select>
                {#if errorMap.gender}
                <p class="error-message">Please select an option</p>
                {/if}
            </div>

        </div>

        <div class="health-info info-box">
            <h2 class="info-header">Health Info</h2>
            <div class="form-content">
                <label for="currWeight" class="form-label">Current Weight</label>
                <input type="text" id="currWeight" name="currWeight" class={`form-input ${errorMap.currWeight  ? "input-error" : ""}`} />
                {#if errorMap.currWeight}
                <p class="error-message">Please enter your current weight</p>
                {/if}
                <label for="goalWeight" class="form-label">Goal Weight</label>
                <input type="text" id="goalWeight" name="goalWeight" class={`form-input ${errorMap.goalWeight  ? "input-error" : ""}`} />
                {#if errorMap.goalWeight}
                <p class="error-message">Please enter your goal weight</p>
                {/if}
                <label for="weightGoals" class="form-label">Weight Goals</label>
                <select name="weightGoals" id="weightGoals" class={`form-input ${errorMap.weightGoals  ? "input-error" : ""}`}>
                    <option value="">Select One</option>
                    {#each WEIGHT_GOALS as goal}
                    <option value={goal}>{goal}</option>
                    {/each}
                </select>
                {#if errorMap.weightGoals}
                <p class="error-message">Please select an option</p>
                {/if}
                <label for="activityLevel" class="form-label">Activity Level</label>
                <select name="activityLevel" id="activityLevel" class={`form-input ${errorMap.activityLevel  ? "input-error" : ""}`}>
                    <option value="">Select One</option>
                    {#each ACTIVITY_LEVELS as activity}
                    <option value={activity}>{activity}</option>
                    {/each}
                </select>
                {#if errorMap.activityLevel}
                <p class="error-message">Please select an option</p>
                {/if}
            </div>
        </div>
        <input type="submit" value="Submit" class="submit-btn" />
    </form>
</div>

<style>
.intake-page,
.intake-form {
  text-align: center;
}

.info-box {
  background-color: var(--section-background);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--box-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
  width: 60%;
}

.info-header {
  text-align: center;
  background: var(--gradient);
  margin: 0;
  padding: 1.5rem;
  border-radius: 10px 10px 0 0;
  color: var(--text-color);
}

.form-content {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  text-align: center;
}

.form-label {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: .5rem;
}

.form-input {
  font-size: 1.2rem;
  margin: .5rem auto;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px var(--box-shadow);
  width: 50%;
}

.submit-btn {
  margin: 2rem auto;
  padding: 1rem;
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--box-shadow);
  width: 150px;
  background-color: var(--btn-color);
}

.input-error {
  border: 2px solid var(--error-color);
}

.error-message {
  color: var(--error-color);
  margin-top: 0;
}
</style>
