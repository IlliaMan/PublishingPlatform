<script>
  import Button from "$lib/components/Button.svelte";

</script>

<div class="main">
  <h1>Get unlimited access</h1>
  <p>Subscription start at 1$/week</p>
  <div class="options">
    <div class="option-1 option">
      <h1>Weekly</h1>
      <p>1$ a week</p>
      <Button name="Select"/>
    </div>
    <div class="option-2 option">
      <h1>Monthly</h1>
      <p>4$ a month</p>
      <Button name="Select"/>
    </div>
    <div class="option-3 option">
      <h1>Annually</h1>
      <p>40$ a year</p>
      <Button name="Select"/>
    </div>
  </div>
</div>

<style>
  .main {
    height: 100px;
    width: 66vw;
    margin: auto;
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
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
    background-color: var(--primary-color);
    border: thin solid #fff;
    color: #fff;
  }

  .option:nth-child(2) {
    background-color: #fff;
    color: var(--primary-color);
    border: thin solid var(--primary-color);
  }

  .option:hover {
    border: thin solid var(--secondary-color);
  }

  .option {
    box-sizing: border-box;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p {
    font-size: 2rem;
  }
</style>