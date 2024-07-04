<script>
export let date

const rightArrow = "../../../src/assets/right-arrow.svg"
const leftArrow = "../../../src/assets/left-arrow.svg"
</script>

<div class="date-switcher">
  <button on:click={() => date = date.subtract(1, 'day')} class="date-switcher-btn">
    <img src={leftArrow} alt="left arrow" class="arrow-img"/>
  </button>
  <h1>{date.format("MMMM Do, YYYY")}</h1>
  <button on:click={() => date = date.add(1, 'day')} class="date-switcher-btn">
    <img src={rightArrow} alt="right arrow" class="arrow-img"/>
  </button>
</div>

<style>
  .date-switcher {
    background-color: var(--date-switcher-background);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    margin-bottom: 20px;
  }

  .date-switcher-btn {
    background-color: inherit;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
  }

  .date-switcher-btn:active { 
    transform: scale(0.98); 
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
  } 


  .arrow-img {
    width: 50px;
  }
  
</style>