<script>
import Modal from "../../../components/Modal.svelte";

export let showModal
export let addNewMed

const medImg = "../../../../src/assets/meds.svg"

const buttonConfig = {
  primaryText: "Add",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}
</script>

<div class="add-med-container">
    <form action="submit" class="add-med-form" on:submit|preventDefault={addNewMed}>
        <Modal bind:showModal buttonConfig={buttonConfig}>
            <div class="header" slot="header">
              <img src={medImg} alt="food" class="medium-image">
              <h2>
                Add New Medication
              </h2>
          </div>
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
