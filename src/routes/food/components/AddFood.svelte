<script>
import {
  addDoc,
  collection
} from "firebase/firestore";

import {
  getBasicData
} from "../../../lib/helper_functions";
import {
  auth,
  db
} from "../../../firebase";
import Modal from "../../../components/Modal.svelte";

export let showModal
export let hideForm
export let foodType

const QUANTITIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let searchPage = false
let searchTerm = ""

const title = foodType.charAt(0).toUpperCase() + foodType.slice(1)
const foodImg = "../../../../src/assets/food.svg"

const buttonConfig = {
  primaryText: "Add",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const addNewMed = async (e) => {
  console.log(e)
  console.log("adding new med")
  const uid = auth.currentUser.uid
  console.log(uid)

  // const { name, dose, time } = getBasicData(e)

  // const docRef = await addDoc(collection(db, `users/${uid}/meds`), {
  //   name,
  //   dose,
  //   time,
  //   uid: uid
  // });
  // console.log(name, dose, time)
  // hideForm()
}
</script>

<div class="add-food-container">
    <form action="submit" class="add-food-form" on:submit|preventDefault={addNewMed}>
        <Modal bind:showModal buttonConfig={buttonConfig}>
            <div class="header" slot="header">
                <img src={foodImg} alt="food" class="medium-image">
                <h2>
                    Add Food for {title}
                </h2>
            </div>
            <div class="btn-container">
                <button class="small-btn" on:click={() => searchPage = !searchPage}>{!searchPage ? "Search for Recipes" : "Manual Entry"}</button>
            </div>
            {#if !searchPage}
            <div class="form-content">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" name="name" class="form-input" />

                <label for="quantity" class="form-label">Quantity</label>
                <select name="quantity" id="quantity" class="form-input">
                    <option value="">Select One</option>
                    {#each QUANTITIES as quantity}
                    <option value={quantity}>{quantity}</option>
                    {/each}
                </select>

                <div class="sm-input-row">
                    <div class="sm-input-col">
                        <label for="calories" class="form-label">Calories</label>
                        <input type="number" id="calories" name="calories" class="form-input" />
                    </div>

                    <div class="sm-input-col">
                        <label for="carbs" class="form-label">Carbs</label>
                        <input type="number" id="carbs" name="carbs" class="form-input" />
                    </div>
                </div>

                <div class="sm-input-row">
                    <div class="sm-input-col">
                        <label for="fats" class="form-label">Fats</label>
                        <input type="number" id="fats" name="fats" class="form-input" />
                    </div>

                    <div class="sm-input-col">
                        <label for="protein" class="form-label">Protein</label>
                        <input type="number" id="protein" name="protein" class="form-input" />
                    </div>
                </div>

            </div>
            {:else}
            <h1>Search</h1>
            <input type="text" id="search" name="search" class="form-input" bind:value={searchTerm} />
            <button class="small-btn">Search</button>
            {/if}
        </Modal>
    </form>
</div>

<style>
h2 {
  color: var(--text-color);
}

.form-content {
  margin-top: 0;;
}

.small-btn {
  width: 175px;
}

.sm-input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sm-input-col {
  display: flex;
  flex-direction: column;
}
</style>
