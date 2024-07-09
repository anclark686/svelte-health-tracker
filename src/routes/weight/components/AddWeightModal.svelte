<script>
import moment from "moment-timezone";

import { getBasicData } from "$lib/helper_functions";
import { addWeightToDates, addWeightToMainDetails } from "$lib/firebase_functions";
import Modal from "../../../components/Modal.svelte";
  import { auth } from "../../../firebase";

export let showModal
export let weightAdded
export let selectedDate
export let edit

let date = moment().tz(moment.tz.guess())

const buttonConfig = {
  primaryText: "Submit",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const addNewWeight = async (e) => {
  const data = getBasicData(e)
  const uid = auth.currentUser.uid

  const formattedDate = selectedDate && edit ? selectedDate : date.format("MM-DD-YYYY")

  const response = addWeightToDates(uid, data.weight, formattedDate).then (async () => {
    const response2 = addWeightToMainDetails(uid, data.weight).then(() => {
      showModal = false
      weightAdded = true
      edit = false
    })
  })
}

$: if (!showModal) {
  edit = false
}
</script>

<div class="add-weight-modal-container">
  <form action="submit" class="add-weight-form" on:submit|preventDefault={addNewWeight}>
    <Modal bind:showModal buttonConfig={buttonConfig}>
      <div class="header" slot="header">
        {#if edit && selectedDate}
          <h2>
            Enter new weight for {selectedDate}
          </h2>
          {:else}
          <h2>
            Enter your new weight:
          </h2>
          {/if}
      </div>
      <div class="form-content">
        <label for="weight" class="form-label">New Weight</label>
        <input type="number" id="weight" name="weight" class="form-input" />
      </div>
    </Modal>
  </form>
</div>

<style>
  h2 {
    color: var(--text-color);
  }
</style>