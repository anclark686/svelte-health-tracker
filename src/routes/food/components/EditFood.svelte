<script>
import {
  onMount
} from "svelte";
import {
  addDoc,
  collection
} from "firebase/firestore";

import {
  capitalize,
  getBasicData
} from "$lib/helper_functions";
import {
  addOrEditFoodInFoods,
  addOrEditFoodInDates,
  deleteFoodFromDates,
  deleteFoodFromFoods
} from "$lib/firebase_functions"
import {
  auth,
  db
} from "../../../firebase";
import Modal from "../../../components/Modal.svelte";

export let showEditModal
export let previousFood
export let hideForm
export let foodType
export let date
export let foodData

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const title = foodType.charAt(0).toUpperCase() + foodType.slice(1)
const foodImg = "../../../../src/assets/food.svg"

const buttonConfig = {
  primaryText: "Submit",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const editFood = async (e) => {
  console.log(e.target)
  const uid = auth.currentUser.uid
  const data = getBasicData(e)
  console.log(data)

  if (data.name !== previousFood?.name) {
    await deleteFoodFromDates(uid, previousFood, date.format("MM-DD-YYYY"))
      .then(async () => {
        await deleteFoodFromFoods(uid, previousFood)
          .then(async () => {
            await addOrEditFoodInFoods(data, uid, foodType)
              .then(async () => {
                await addOrEditFoodInDates(data, uid, foodType, date.format("MM-DD-YYYY"))
                  .then(() => {
                    console.log("done")
                    hideForm(previousFood, data)
                  })
              })
          })
      })
  } else {
    await addOrEditFoodInFoods(data, uid, foodType)
      .then(async () => {
        await addOrEditFoodInDates(data, uid, foodType, date.format("MM-DD-YYYY"))
          .then(() => {
            console.log("done")
            hideForm(previousFood, data)
          })
      })
  }

}
</script>

<div class="add-food-container">

    <form action="submit" class="add-food-form" on:submit|preventDefault={editFood}>
        <Modal bind:showModal={showEditModal} buttonConfig={buttonConfig}>
            <div class="header" slot="header">
                <img src={foodImg} alt="food" class="medium-image">
                <h2>
                    Edit {title}
                </h2>
            </div>
            <div class="form-content">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" name="name" class="form-input" value={previousFood?.name} />

                <label for="quantity" class="form-label">Quantity</label>
                <select name="quantity" id="quantity" class="form-input">
                    <option value="">Select One</option>
                    {#each QUANTITIES as quantity}
                    {#if quantity == previousFood?.quantity}
                    <option value={quantity} selected>{quantity}</option>
                    {:else}
                    <option value={quantity}>{quantity}</option>
                    {/if}
                    {/each}
                </select>

                <div class="sm-input-row">
                    <div class="sm-input-col">
                        <label for="calories" class="form-label">Calories</label>
                        <input type="number" id="calories" name="calories" class="form-input" value={previousFood?.calories} />
                    </div>

                    <div class="sm-input-col">
                        <label for="carbs" class="form-label">Carbs</label>
                        <input type="number" id="carbs" name="carbs" class="form-input" value={previousFood?.carbs} />
                    </div>
                </div>

                <div class="sm-input-row">
                    <div class="sm-input-col">
                        <label for="fat" class="form-label">Fat</label>
                        <input type="number" id="fat" name="fat" class="form-input" value={previousFood?.fat} />
                    </div>

                    <div class="sm-input-col">
                        <label for="protein" class="form-label">Protein</label>
                        <input type="number" id="protein" name="protein" class="form-input"value={previousFood?.protein} />
                    </div>
                </div>
            </div>
        </Modal>
    </form>
</div>

<style>
h2 {
  color: var(--text-color);
}

.form-content {
  margin-top: 0;
  ;
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

.mini-content {
  box-shadow: 0 0 10px var(--box-shadow);
  border-radius: 10px;
  color: var(--text-color);
  width: 75%;
  margin: 0 auto 1rem auto;

}

.show-food-btn {
  width: 100%;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
}

.mini-content-header {
  background: var(--gradient);

  padding: .5rem;
  margin: 0;
  border-radius: 10px 10px 0 0;
}

.foods-container {
  padding: .2rem;
  background-color: var(--background-color);
}

.add-existing-btn {
  width: 100%;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
}

.add-existing-btn p {
  margin: .5rem 0;
  font-size: 1.1rem;
}

.selected-btn {
  background-color: var(--btn-color);
  color: var(--text-color);
  border: none;
  outline: none;
}
</style>
