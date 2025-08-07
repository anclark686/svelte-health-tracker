<script>
  import moment from "moment-timezone";
  import { doc, setDoc } from "firebase/firestore";
  import { goto } from "$app/navigation";

  import {
    convertHeightToCm,
    convertWeightToKg,
    getBasicData,
  } from "../../lib/helper_functions";
  import { auth, db } from "../../firebase";
  import { logoutUser } from "$lib/firebase_functions";
  import PageHeader from "../../components/PageHeader.svelte";
  import Modal from "../../components/Modal.svelte";
  import BasicInfo from "./components/BasicInfo.svelte";
  import HealthInfo from "./components/HealthInfo.svelte";
  import DateSelector from "../../components/DateSelector.svelte";

  const errorMap = {};
  let showModal = true;

  const buttonConfig = {
    primaryText: "Continue",
    secondaryText: "Logout",
    onPrimaryClick: "close",
    onSecondaryClick: () => logoutUser(),
  };

  const validateData = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value === "") {
        errorMap[key] = true;
      }
    });
    console.log(Object.values(errorMap).includes(true));

    if (Object.values(errorMap).includes(true)) {
      return false;
    }

    return true;
  };

  const addExtraData = (data) => {
    data.birthday = moment
      .tz(data.birthday, "America/New_York")
      .format("MM/DD/YYYY");
    data.phoneNum = data.phoneNum.replace(/\D/g, "");
    data.heightInCm = convertHeightToCm(data.height);
    data.currWeightInKg = convertWeightToKg(data.currWeight);
    data.goalWeightInKg = convertWeightToKg(data.goalWeight);
    data.uid = auth.currentUser.uid;
    data.email = auth.currentUser.email;
    data.proteinGoal = data.fatGoal = data.carbsGoal = data.calorieGoal = null;
    data.joined = new Date();
    data.timetamp = new Date();
    data.initialWeight =
      data.previousWeight =
      data.highestWeight =
      data.lowestWeight =
        data.currWeight;
    data.initialWeightInKg =
      data.previousWeightInKg =
      data.highestWeightInKg =
      data.lowestWeightInKg =
        data.currWeightInKg;

    return data;
  };

  const submitIntake = async (e) => {
    let data = getBasicData(e);
    const isDataValid = validateData(data);

    if (isDataValid) {
      data = addExtraData(data);
      await setDoc(doc(db, "users", auth.currentUser.uid), data).then(() => {
        goto("/dashboard");
      });
      console.log(data);
    } else {
      console.log("data not valid");
    }
  };
</script>

<div class="intake-page">
  <PageHeader title="Account Setup" dashboard={false} other={{}} />

  <Modal bind:showModal {buttonConfig}>
    <h2 slot="header">Welcome to Reyaly Health Tracker!</h2>

    <p class="bigger">It looks like it's your first time here!</p>
    <p>We'll just need a little info about you to setup your account.</p>
    <p class="bigger">Click continue to get started.</p>
  </Modal>

  <form
    action="submit"
    class="intake-form"
    on:submit|preventDefault={submitIntake}
  >
    <BasicInfo {errorMap} />

    <HealthInfo {errorMap} />
    <input type="submit" value="Submit" class="submit-btn" />
  </form>
</div>

<style>
  .intake-page,
  .intake-form {
    text-align: center;
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

  .bigger {
    font-size: 1.2rem;
  }
</style>
