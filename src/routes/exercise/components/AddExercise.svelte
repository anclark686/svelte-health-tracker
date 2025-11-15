<script>
  import Modal from "../../../components/Modal.svelte";
  import { capitalize } from "$lib/helper_functions";

  export let showAddModal;
  export let type;
  export let date;

  const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let searchPage = false;
  let searchTerm = "";
  let resultList = [];
  let searchPressed = false;
  let existingExercises = {};
  
  const exerciseImg = "../../../../src/assets/exercise.svg";

  const buttonConfig = {
    primaryText: "Add",
    secondaryText: "Cancel",
    onPrimaryClick: "submit",
    onSecondaryClick: "close",
  };

  const switchToManual = (e) => {
    e.preventDefault();
    searchPage = !searchPage;
    if (!searchPage) {
      console.log("Switching to manual entry");
    }
  };
</script>

<div class="add-exercise-container">
  <form
    action="submit"
    class="add-exercise-form"
    on:submit|preventDefault={() => console.log("submitted")}
  >
    <Modal bind:showModal={showAddModal} {buttonConfig}>
      <div class="header" slot="header">
        <img src={exerciseImg} alt="food" class="medium-image" />
        <h2>
          Add New {capitalize(type)} Exercise
        </h2>
      </div>

      <div class="btn-container">
        <button class="small-btn" on:click={switchToManual}
          >{!searchPage ? "Add Previous Exercise" : "Manual Entry"}</button
        >
      </div>

      {#if !searchPage}
        <div class="form-content">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" name="name" class="form-input" />
        
        
        </div>
      {/if}
    </Modal>
  </form>
</div>

<style>
</style>
