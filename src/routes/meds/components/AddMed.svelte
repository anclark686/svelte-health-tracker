<script>
import {
  addDoc, collection
} from "firebase/firestore";
import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth,
  db
} from "../../../firebase";
import Modal from "../../../components/Modal.svelte";

export let showModal
export let hideForm

let loading = true
let userLoggedIn = false
let uid = null

const buttonConfig = {
  primaryText: "Add",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const getBasicData = (e) => {
  const formData = new FormData(e.target);
  const data = {};

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
    data[key] = value.toString();
  }

  return data
}

const addNewMed = async (e) => {
  console.log(e)
  console.log("adding new med")
  const uid = auth.currentUser.uid
  console.log(uid)

  const { name, dose, time } = getBasicData(e)

  const docRef = await addDoc(collection(db, `users/${uid}/meds`), {
    name,
    dose,
    time,
    uid: uid
  });
  console.log(name, dose, time)
  hideForm()
}
</script>

<div class="add-med-container">
    <form action="submit" class="add-med-form" on:submit|preventDefault={addNewMed}>
        <Modal bind:showModal buttonConfig={buttonConfig}>
            <h2 slot="header">
                Add New Medication
            </h2>
            <div class="form-content">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" name="name" class="form-input" />

                <label for="dose" class="form-label">Dose</label>
                <input type="text" id="dose" name="dose" class="form-input" />

                <label for="time" class="form-label">Time</label>
                <input type="text" id="time" name="time" class="form-input" />
            </div>
        </Modal>
    </form>
</div>

<style>
h2 {
  color: var(--text-color);
}
</style>
