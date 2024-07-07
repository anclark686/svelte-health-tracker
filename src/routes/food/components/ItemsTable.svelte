<script>
import {
  capitalize
} from "$lib/helper_functions";

import {
  deleteFoodFromDates,
  changeQuantityInDates
} from "$lib/firebase_functions";
import {
  auth
} from "../../../firebase";
import EditFood from "../components/EditFood.svelte";

export let foodData
export let foodType
export let date

let uid = null
let showEditModal = false;
let previousFood = null

const title = capitalize(foodType)

const editFood = (food) => {
  console.log(food)
  food.meal = foodType
  previousFood = food
  showEditModal = true
}

const deleteFood = async (food) => {
  console.log(food)
  uid = auth.currentUser.uid
  food.meal = foodType
  const response = await deleteFoodFromDates(uid, food, date.format("MM-DD-YYYY"))
    .then(async () => {
      console.log("done")
      // const response2 = await refreshMeals()
      foodData = foodData.filter((item) => item.name !== food.name)
    })
}

const changeQuantity = async (food, addOrSubtract) => {
  uid = auth.currentUser.uid
  let ogQuantity = parseInt(food.quantity)
  let quantity
  let tempList = []
  food.meal = foodType

  if (addOrSubtract === "add") {
    quantity = (ogQuantity + 1).toString()
  } else if (addOrSubtract === "subtract") {
    quantity = (ogQuantity - 1).toString()
  }

  const response = await changeQuantityInDates(uid, food, date.format("MM-DD-YYYY"), quantity)
    .then(() => {
      console.log("done")
      foodData.forEach((item) => {
        if (item.name == food.name) {
          item.quantity = quantity
        }
        tempList.push(item)
      })
    })

  foodData = tempList
}

const hideEditForm = (oldFood, newFood) => {
  showEditModal = false
  newFood.meal = foodType
  foodData = foodData.filter((item) => item.name !== oldFood.name)
  foodData = [...foodData, newFood]
}
</script>

<div class="food-items-container content-box">
    <h2 class="content-header">{title} Items</h2>

    {#if foodData.length !== 0}
    <table class="items-table">
        <thead class="items-table-header">
            <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Quantity</th>
                <th>Modify</th>
            </tr>
        </thead>
        <tbody>
            {#each foodData as food, i}
            <tr class={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{capitalize(food.name)}</td>
                <td>{food.calories}</td>
                <td>{food.protein}</td>
                <td>{food.fat}</td>
                <td>{food.carbs}</td>
                <td>
                    <button class="emoji-btn plus-minus" on:click={() => changeQuantity(food, "subtract")}>➖</button>
                    {food.quantity}
                    <button class="emoji-btn plus-minus" on:click={() => changeQuantity(food, "add")}>➕</button>
                </td>
                <td>
                    <button class="emoji-btn" on:click={() => editFood(food)}>✏️</button>
                    <button class="emoji-btn" on:click={() => deleteFood(food)}>❌</button>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
    {:else}
    <p class="no-items">No items found. Click 'Add Food' to add a new food.</p>
    {/if}

    <EditFood bind:showEditModal bind:previousFood foodType={foodType} hideForm={hideEditForm} date={date} />
</div>

<style>
.items-table {
  width: 90%;
  margin: 30px auto;
  color: var(--text-color);
  border-collapse: collapse;
}

.items-table-header {
  background-color: var(--table-header);
}

.odd-row {
  background-color: var(--table-every-other);
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 2px solid var(--text-color);
}

.no-items {
  padding: 1rem;
  font-size: 1.5rem;
}

.emoji-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.plus-minus {
  background-color: var(--table-header);
  border-radius: 5px;
  padding: 0 .25rem;
  margin: 0 .5rem;
  box-shadow: 0 0 10px var(--box-shadow);
}
</style>
