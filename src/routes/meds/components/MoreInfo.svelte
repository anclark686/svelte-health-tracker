<script>
  import moment from "moment-timezone";

  import { capitalize } from "$lib/helper_functions";
  import Modal from "../../../components/Modal.svelte";

  export let showModal
  export let showModalWithEdit
  export let selectedMed
  export let deleteMed

  const buttonConfig = {
  primaryText: "Close",
  secondaryText: "",
  onPrimaryClick: "close",
  onSecondaryClick: "",
}

const closeModalAndOpenEdit = () => {
  showModal = false
  showModalWithEdit = true
}

</script>

<div class="more-med-info-modal-container">
  <Modal bind:showModal buttonConfig={buttonConfig}>
    <div class="header" slot="header">
      {#if selectedMed && Object.values(selectedMed).length !== 0}
      <h2>
        More info about {capitalize(selectedMed.name)}
      </h2>
      {:else}
      <h2>
        No Medication Selected
      </h2>
      {/if}
    </div>
    <div class="content">
      {#if selectedMed && Object.values(selectedMed).length !== 0}
      <div class="info-line">
        <p class="left">Name:</p>
        <p class="right">{capitalize(selectedMed.name)}</p>
      </div>

      <div class="info-line">
        <p class="left">Dose:</p>
        <p class="right">{selectedMed.dose}</p>
      </div>

      <div class="info-line">
        <p class="left">Taken:</p>
        <p class="right">{selectedMed.taken ? "Yes" : "No"}</p>
      </div>

      <div class="info-line">
        <p class="left">Times:</p>
        <p class="right">{selectedMed.times.map((t) => capitalize(t)).join(", ")}</p>
      </div>

      <div class="info-line">
        <p class="left">Taken for:</p>
        <p class="right">{capitalize(selectedMed.for)}</p>
      </div>

      <div class="info-line">
        <p class="left">Prescriber:</p>
        <p class="right">{capitalize(selectedMed.prescriber)}</p>
      </div>

      <div class="info-line">
        <p class="left">Last Filled:</p>
        <p class="right">{moment(selectedMed.lastFilled).format("MM/DD/YYYY")}</p>
      </div>

      <div class="btn-container">
        <button class="small-btn delete-btn" on:click={() => deleteMed()}>Delete</button>
        <button class="small-btn" on:click={closeModalAndOpenEdit}>Edit</button>
      </div>
      {/if}
    </div>    
  </Modal>
</div>

<style>
.info-line {
  display: flex;
  justify-content: space-between;
  margin: 0 5rem;
  font-size: 1rem;
  color: var(--text-color);
}

.left {
  font-weight: bold;
  text-align: left;
}

.right {
  text-align: right;
}
  
.delete-btn {
  background-color: var(--error-color);
  color: var(--error-text);
  font-weight: bold;
}
</style>