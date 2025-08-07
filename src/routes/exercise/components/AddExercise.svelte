<script>
  import Modal from "../../../components/Modal.svelte";

  export let showAddModal;

  const buttonConfig = {
    primaryText: "Add",
    secondaryText: "Cancel",
    onPrimaryClick: "submit",
    onSecondaryClick: "close",
  };
</script>

<div class="add-exercise-container">
  <form
    action="submit"
    class="add-food-form"
    on:submit|preventDefault={() => console.log("submitted")}
  >
    <Modal bind:showModal={showAddModal} {buttonConfig}></Modal>
  </form>
</div>

<style>
</style>
