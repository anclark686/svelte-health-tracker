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
  getAllFoodsInFoods,
  findMealsInDates
} from "$lib/firebase_functions"
import {
  auth,
  db
} from "../../../firebase";
import Modal from "../../../components/Modal.svelte";

export let showAddModal
export let hideForm
export let foodType
export let date
export let foodData

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let searchPage = false
let searchTerm = ""
let resultList = []
let searchPressed = false
let existingFoods = {}
let showBreakfast = false
let showLunch = false
let showDinner = false
let showSnacks = false
let selectedFood = null

const title = capitalize(foodType)
const foodImg = "../../../../src/assets/food.svg"

const buttonConfig = {
  primaryText: "Add",
  secondaryText: "Cancel",
  onPrimaryClick: "submit",
  onSecondaryClick: "close",
}

const clearExistingFoods = () => {
  searchTerm = ""
  showBreakfast = false
  showLunch = false
  showDinner = false
  showSnacks = false
  selectedFood = null
}

const addFood = async (e) => {
  if (!searchPage && !selectedFood) {
    await addFoodToBoth(e)
  } else if (searchPage && selectedFood) {
    await addExistingFoodToDates(selectedFood)
  }
}

const findFoodinFoods = (foodName) => {
  let food = null
  console.log()
  console.log(foodData)
  foodData.forEach((item) => {
    if (item.name == foodName) {
      food = item
    }
  })
  console.log("found food: ", food)
  console.log()
  return food
}

const addFoodToBoth = async (e) => {
  const uid = auth.currentUser.uid
  const data = getBasicData(e)
  const response = await addOrEditFoodInFoods(data, uid, foodType)
    .then(async () => {
      const response2 = await addOrEditFoodInDates(data, uid, foodType, date.format("MM-DD-YYYY"))
        .then(() => {
          console.log("done")
          hideForm(data)
        })
    })
}

const addExistingFoodToDates = async (food) => {
  const uid = auth.currentUser.uid
  const foundFood = findFoodinFoods(food.name)
  if (foundFood) {
    food.quantity = (parseInt(foundFood.quantity) + 1).toString()
  } else {
    food.quantity = "1"
  }
  console.log(food.quantity)

  const response2 = await addOrEditFoodInDates(food, uid, foodType, date.format("MM-DD-YYYY"))
    .then(() => {
      console.log("done")
      console.log(food)
      hideForm(food)
      clearExistingFoods()
    })
}

const getAllFoods = async (e) => {
  const uid = auth.currentUser.uid
  const response = await getAllFoodsInFoods(uid)
    .then(data => {
      console.log(data)
      existingFoods = data
    })
}

const switchToManual = (e) => {
  e.preventDefault()
  searchPage = !searchPage
  if (!searchPage) {
    clearExistingFoods()
  }
}

const searchInAllFoods = () => {
  searchPressed = true
  if (searchTerm) {
    const allFoods = [...existingFoods.breakfast, ...existingFoods.lunch, ...existingFoods.dinner, ...existingFoods.snacks]
    const foodStrArr = allFoods.map((food) => `${food.name} ${food.meal}`)
    console.log(allFoods)
    console.log(foodStrArr)
    const tempResultList = []

    for (let i = 0; i < foodStrArr.length; i++) {
      if (foodStrArr[i].toLowerCase().includes(searchTerm.toLowerCase())) {
        tempResultList.push(allFoods[i])
      }
    }
    resultList = tempResultList
    console.log(tempResultList)
  }

}

onMount(async () => {
  getAllFoods()
})
</script>

<div class="add-food-container">

    <form action="submit" class="add-food-form" on:submit|preventDefault={addFood}>
        <Modal bind:showModal={showAddModal} buttonConfig={buttonConfig}>
            <div class="header" slot="header">
                <img src={foodImg} alt="food" class="medium-image">
                <h2>
                    Add Food for {title}
                </h2>
            </div>
            <div class="btn-container">
                <button class="small-btn" on:click={switchToManual}>{!searchPage ? "Use Previous Foods" : "Manual Entry"}</button>
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
                        <label for="fat" class="form-label">Fat</label>
                        <input type="number" id="fat" name="fat" class="form-input" />
                    </div>

                    <div class="sm-input-col">
                        <label for="protein" class="form-label">Protein</label>
                        <input type="number" id="protein" name="protein" class="form-input" />
                    </div>
                </div>

            </div>
            {:else}
            <div class="search-container">
                <input type="text" id="search" name="search" class="form-input" bind:value={searchTerm} />
                <button class="small-btn" on:click|preventDefault={searchInAllFoods}>Search</button>
            </div>
            {#if !searchPressed}
            <div class="existing-foods">
                <div class="breakfast mini-content">
                    <button class="show-food-btn" on:click={() => showBreakfast = !showBreakfast}>
                        <h3 class="mini-content-header">Breakfast</h3>
                    </button>

                    <div class="foods-container" style={showBreakfast ? "" : "display: none;"}>
                        {#if existingFoods.breakfast}
                        {#each existingFoods.breakfast as food}
                        <button class={selectedFood?.name == food.name ? "add-existing-btn selected-btn" : "add-existing-btn"} on:click|preventDefault={() => selectedFood = food}>
                            <p>{capitalize(food.name)}</p>
                        </button>
                        {/each}
                        {/if}
                    </div>
                </div>

                <div class="lunch mini-content">
                    <button class="show-food-btn" on:click={() => showLunch = !showLunch}>
                        <h3 class="mini-content-header">Lunch</h3>
                    </button>

                    <div class="foods-container" style={showLunch ? "" : "display: none;"}>
                        {#if existingFoods.lunch}
                        {#each existingFoods.lunch as food}
                        <button class={selectedFood?.name == food.name ? "add-existing-btn selected-btn" : "add-existing-btn"} on:click|preventDefault={() => selectedFood = food}>
                            <p>{capitalize(food.name)}</p>
                        </button>
                        {/each}
                        {/if}
                    </div>
                </div>

                <div class="dinner mini-content">
                    <button class="show-food-btn" on:click={() => showDinner = !showDinner}>
                        <h3 class="mini-content-header">Dinner</h3>
                    </button>

                    <div class="foods-container" style={showDinner ? "" : "display: none;"}>
                        {#if existingFoods.dinner}
                        {#each existingFoods.dinner as food}
                        <button class={selectedFood?.name == food.name ? "add-existing-btn selected-btn" : "add-existing-btn"} on:click|preventDefault={() => selectedFood = food}>
                            <p>{capitalize(food.name)}</p>
                        </button>
                        {/each}
                        {/if}
                    </div>
                </div>

                <div class="snacks mini-content">
                    <button class="show-food-btn" on:click={() => showSnacks = !showSnacks}>
                        <h3 class="mini-content-header">Snacks</h3>
                    </button>

                    <div class="foods-container" style={showSnacks ? "" : "display: none;"}>
                        {#if existingFoods.snacks}
                        {#each existingFoods.snacks as food}
                        <button class={selectedFood?.name == food.name ? "add-existing-btn selected-btn" : "add-existing-btn"} on:click|preventDefault={() => selectedFood = food}>
                            <p>{capitalize(food.name)}</p>
                        </button>
                        {/each}
                        {/if}
                    </div>
                </div>
            </div>
            {:else}
            <div class="search-results-container">
                <h3>Search Results</h3>

                {#if resultList.length > 0}
                {#each resultList as food}
                <button class={selectedFood?.name == food.name ? "add-existing-btn selected-btn" : "add-existing-btn"} on:click|preventDefault={() => selectedFood = food}>
                    <p>{capitalize(food.name)}</p>
                </button>
                {/each}
                {:else}
                <h4>No results found. Try adjusting your search.</h4>
                {/if}
            </div>
            {/if}
            {/if}
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

.search-results-container {
  color: var(--text-color);
}
</style>
