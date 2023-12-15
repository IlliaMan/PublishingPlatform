<script>
</script>

<div class="main">
  <h1>Get unlimited access</h1>
  <p>Subscription start at 1$/week</p>
  <div class="options">
    <div class="option-1 option">
      <h1>Weekly</h1>
      <p>1$ a week</p>
      <button>Select</button>
    </div>
    <div class="option-2 option">
      <h1>Monthly</h1>
      <p>4$ a month</p>
      <button>Select</button>
    </div>
    <div class="option-3 option">
      <h1>Annually</h1>
      <p>40$ a year</p>
      <button>Select</button>
    </div>
  </div>
</div>

<style>
  .main {
    height: 100px;
    width: 66vw;
    margin: auto;
    margin-top: 18vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    margin: 0;
  }

  p {
    font-size: 1.6rem;
    margin: 0;
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    column-gap: 2rem;
    justify-content: center;
  }

  .options > div {
    min-width: 30%;
    min-height: 35rem;
    background-color: #fff;
  }

  .option:nth-child(2) {
    background-color: #aaa;
  }

  .option {
    box-sizing: border-box;
    padding: 4rem 0rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p {
    font-size: 2rem;
  }

  button {
    min-height: 5rem;
    font-size: 2rem;
    width: 60%;
    align-self: center;
    border-radius: 8px;
  }
</style>