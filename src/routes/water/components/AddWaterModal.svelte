<script>
import moment from "moment-timezone";

import {
  convertCupsToOz,
  convertOzToCups,
  getBasicData
} from "$lib/helper_functions";
import {
  addWaterToDates
} from "$lib/firebase_functions";
import Modal from "../../../components/Modal.svelte";
import {
  auth
} from "../../../firebase";

export let showModal
export let waterAdded
export let selectedDate
export let edit

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let date = moment().tz(moment.tz.guess())

let cupsOrOunces = "cups"

const buttonConfig = {
  primaryText: "Submit",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const addWater = async (e) => {
  const data = getBasicData(e)
  const uid = auth.currentUser.uid

  const formattedDate = selectedDate && edit ? selectedDate : date.format("MM-DD-YYYY")

  if (cupsOrOunces === "cups") {
    data.ounces = convertCupsToOz(data.cups)
  } else {
    data.cups = convertOzToCups(data.ounces)
  }

  const response = addWaterToDates(uid, data, formattedDate).then(() => {
    waterAdded = true
    showModal = false
    edit = false
  })
}

$: if (!showModal) {
  edit = false
}
</script>

<div class="add-water-modal-container">
    <form action="submit" class="add-water-form" on:submit|preventDefault={addWater}>
        <Modal bind:showModal buttonConfig={buttonConfig}>
            <div class="header" slot="header">
                {#if edit && selectedDate}
                <h2>
                    Add Water for {selectedDate}
                </h2>
                {:else}
                <h2>
                    Add Some Water
                </h2>
                {/if}
            </div>

            {#if cupsOrOunces === "cups"}
            <button class="switch-btn" on:click={() => cupsOrOunces = "oz"}>Switch to Ounces</button>
            <div class="cups-section">
                <div class="form-content">
                    <label for="cups" class="form-label">Water in Cups</label>
                    <select name="cups" id="cups" class="form-input">
                        <option value="">Select One</option>
                        {#each QUANTITIES as quantity}
                        <option value={quantity}>{quantity}</option>
                        {/each}
                    </select>
                </div>
            </div>
            {:else}
            <div class="oz-section">
                <button class="switch-btn" on:click={() => cupsOrOunces = "cups"}>Switch to Cups</button>
                <div class="form-content">
                    <label for="ounces" class="form-label">Water in Ounces</label>
                    <input type="number" id="ounces" name="ounces" class="form-input" />
                </div>
            </div>
            {/if}
        </Modal>
    </form>
</div>

  
  <style>
h2 {
  color: var(--text-color);
}

.switch-btn {
  background-color: var(--btn-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: .5rem;
  margin: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 0 0 10px var(--box-shadow);
  width: 175px;
}
</style>
