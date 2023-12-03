<script>
    import InputRectangle from "$lib/components/InputRectangle.svelte";
</script>

<div class="main">
  <h1>Sign up</h1>
  <p>Create a free account</p>
  <InputRectangle name="Email" placeholder="youremail@gmail.com"/>
  <InputRectangle name="Username" placeholder="nickname"/>
  <InputRectangle name="Password" placeholder="**********" type="password"/>
  <InputRectangle name="Repeat" placeholder="**********" type="password"/>
  <button>Sign up</button>
  <div class="additional-options">
    <a href="/login">
      <p>Back to sign in</p>
    </a>
  </div>
</div>

<style>
  .main {
    height: 100px;
    width: 33vw;
    margin: auto;
    margin-top: 18vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
  }

  p {
    font-size: 1.6rem;
    margin: 0;
  }

  .additional-options {
    display: flex;
    justify-content: flex-end;
    font-size: 1.8rem;
    font-style: italic;
  }

  button {
    min-height: 3rem;
    font-size: 2rem;
    width: 25%;
    align-self: flex-end;
    border-radius: 4px;
  }
</style>