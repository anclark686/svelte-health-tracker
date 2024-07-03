<script>
const todo = "***TODO***"

const breakfast = "/../../src/assets/breakfast.svg"
const lunch = "/../../src/assets/lunch.svg"
const dinner = "/../../src/assets/dinner.svg"
const snacks = "/../../src/assets/snack.svg"
const water = "/../../src/assets/water_glass.svg"
</script>

<div class="food-diaries-container content-box">
    <h2 class="content-header">Food Diaries</h2>
    <div class="row-container">
        <div class="diary-row">
            <img src={breakfast} alt="breakfast" class="diary-icon" />
            <a href="/food/breakfast" class="content-link">Breakfast Diary</a>
        </div>

        <div class="diary-row">
            <img src={lunch} alt="lunch" class="diary-icon" />
            <a href="/food/lunch" class="content-link">Lunch Diary</a>
        </div>

        <div class="diary-row">
            <img src={dinner} alt="dinner" class="diary-icon" />
            <a href="/food/dinner" class="content-link">Dinner Diary</a>
        </div>

        <div class="diary-row">
            <img src={snacks} alt="snacks" class="diary-icon" />
            <a href="/food/snacks" class="content-link">Snack Diary</a>
        </div>

        <div class="diary-row">
            <img src={water} alt="water" class="diary-icon" />
            <a href="/water" class="content-link">Water Tracker</a>
        </div>
    </div>

</div>

  
  <style>
.row-container{
  text-align: left;
  margin: 1rem 2rem;
}

.diary-icon {
  width: 40px;
  margin: .25rem 1rem;
}

.diary-row {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

@media (max-width: 600px) {}
</style>
