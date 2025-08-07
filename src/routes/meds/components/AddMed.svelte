<script>
  import { capitalize } from "$lib/helper_functions";
  import Modal from "../../../components/Modal.svelte";

  export let showModal;
  export let addNewMed;
  export let editMed;
  export let edit;
  export let selectedMed;

  const medImg = "../../../../src/assets/meds.svg";

  let times = [];
  let showTimes = false;
  let morningInTimes = false;
  let afternoonInTimes = false;
  let eveningInTimes = false;
  let nightInTimes = false;

  const buttonConfig = {
    primaryText: !edit ? "Add" : "Edit",
    secondaryText: "Cancel",
    onPrimaryClick: "submit",
    onSecondaryClick: "close",
  };

  const addTime = (e, time) => {
    if (!edit && e.target.checked) {
      times = [...times, time];
    } else if (!edit && !e.target.checked) {
      times = times.filter((t) => t !== time);
    } else {
      if (times.includes(time)) {
        times = times.filter((t) => t !== time);
      } else {
        times = [...times, time];
      }
    }

    morningInTimes = times.includes("morning");
    afternoonInTimes = times.includes("afternoon");
    eveningInTimes = times.includes("evening");
    nightInTimes = times.includes("night");
  };

  const submitAndClearForm = (e) => {
    if (!edit) {
      addNewMed(e, times);
    } else {
      editMed(e, times);
    }
    e.target.reset();
    times = [];
    showTimes = false;
  };

  $: if (!showModal) {
    edit = false;
    selectedMed = null;
  }

  $: if (edit && selectedMed) {
    times = times.length > 0 ? times : selectedMed.times;

    morningInTimes = times.includes("morning");
    afternoonInTimes = times.includes("afternoon");
    eveningInTimes = times.includes("evening");
    nightInTimes = times.includes("night");
  }
</script>

<div class="add-med-container">
  <form
    action="submit"
    class="add-med-form"
    on:submit|preventDefault={submitAndClearForm}
  >
    <Modal bind:showModal {buttonConfig}>
      <div class="header" slot="header">
        <img src={medImg} alt="food" class="medium-image" />
        {#if edit && selectedMed}
          <h2>
            Edit {capitalize(selectedMed.name)}
          </h2>
        {:else}
          <h2>Add New Medication</h2>
        {/if}
      </div>
      <div class="form-content">
        {#if edit && selectedMed}
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            class="form-input"
            value={selectedMed?.name}
          />

          <label for="dose" class="form-label">Dose</label>
          <input
            type="text"
            id="dose"
            name="dose"
            class="form-input"
            value={selectedMed?.dose}
          />

          <label for="time" class="form-label">Times</label>
          <div class="times">
            <button
              class="form-input times-btn"
              type="button"
              on:click={() => (showTimes = !showTimes)}
            >
              {selectedMed?.times.map((t) => capitalize(t)).join(", ")}
            </button>
            <div
              class="time-options"
              style={showTimes ? "display:flex" : "display:none"}
            >
              <ul class="times-menu">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="morning"
                      on:change={(e) => addTime(e, "morning")}
                      bind:checked={morningInTimes}
                    />
                    Morning
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="afternoon"
                      on:change={(e) => addTime(e, "afternoon")}
                      bind:checked={afternoonInTimes}
                    />
                    Afternoon
                  </label>
                </li>
              </ul>
              <ul class="times-menu">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="evening"
                      on:change={(e) => addTime(e, "evening")}
                      bind:checked={eveningInTimes}
                    />
                    Evening
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="night"
                      on:change={(e) => addTime(e, "night")}
                      bind:checked={nightInTimes}
                    />
                    Night
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <label for="prescriber" class="form-label">Prescriber</label>
          <input
            type="text"
            id="prescriber"
            name="prescriber"
            class="form-input"
            value={selectedMed?.prescriber}
          />

          <label for="takenFor" class="form-label">Taken For</label>
          <input
            type="text"
            id="takenFor"
            name="takenFor"
            class="form-input"
            value={selectedMed?.takenFor}
          />

          <label for="lastFilled" class="form-label">Last Filled</label>
          <input
            type="date"
            id="lastFilled"
            name="lastFilled"
            class="form-input"
            value={selectedMed?.lastFilled}
          />
        {:else}
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" name="name" class="form-input" />

          <label for="dose" class="form-label">Dose</label>
          <input type="text" id="dose" name="dose" class="form-input" />

          <label for="time" class="form-label">Times</label>
          <div class="times">
            <button
              class="form-input times-btn"
              type="button"
              on:click={() => (showTimes = !showTimes)}
            >
              {times.length === 0
                ? "Select Times"
                : times.map((t) => capitalize(t)).join(", ")}
            </button>
            <div
              class="time-options"
              style={showTimes ? "display:flex" : "display:none"}
            >
              <ul class="times-menu">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="morning"
                      on:change={(e) => addTime(e, "morning")}
                    />
                    Morning
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="afternoon"
                      on:change={(e) => addTime(e, "afternoon")}
                    />
                    Afternoon
                  </label>
                </li>
              </ul>
              <ul class="times-menu">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="evening"
                      on:change={(e) => addTime(e, "evening")}
                    />
                    Evening
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value="night"
                      on:change={(e) => addTime(e, "night")}
                    />
                    Night
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <label for="prescriber" class="form-label">Prescriber</label>
          <input
            type="text"
            id="prescriber"
            name="prescriber"
            class="form-input"
          />

          <label for="takenFor" class="form-label">Taken For</label>
          <input type="text" id="takenFor" name="takenFor" class="form-input" />

          <label for="lastFilled" class="form-label">Last Filled</label>
          <input
            type="date"
            id="lastFilled"
            name="lastFilled"
            class="form-input"
          />
        {/if}
      </div>
    </Modal>
  </form>
</div>

<style>
  .time-options {
    background-color: var(--background-color);
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .times-btn {
    cursor: pointer;
    height: 4rem;
  }

  .times-menu {
    list-style: none;
    color: var(--text-color);
    margin: 0;
    padding: 1rem;
    text-align: left;
  }
</style>
