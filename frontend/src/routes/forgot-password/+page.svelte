<script>
  import Button from "$lib/components/Button.svelte";
  import TextField from "$lib/components/TextField.svelte";
</script>

<div class="main">
  <h1>Forgot Password?</h1>
  <p>Enter your email and we will send you a link to reset your password</p>
  <TextField inputName="Email" placeholder="Email"/>
  <Button name="Submit"/>
  <div class="additional-options">
    <a href="/login">
      <p>Back to sign in</p>
    </a>
  </div>
</div>

<style>
  .main {
    box-sizing: border-box;
    background-color: var(--primary-color);
    padding: 10rem 10vw;
    border-radius: 4px;
    width: 55vw;
    margin: auto;
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    text-align: center;
  }

  p {
    font-size: 1.8rem;
    margin: 0;
    text-align: center;
  }

  .additional-options {
    display: flex;
    justify-content: flex-end;
    font-size: 1.8rem;
    font-style: italic;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>