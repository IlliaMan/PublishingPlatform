<script>
  import InputRectangle from "./components/InputRectangle/InputRectangle.svelte";
</script>

<div class="main">
  <form class="login-form">
    <InputRectangle name="Login:" placeholder="youremail@gmail.com"/>
    <InputRectangle type="password" name="Password:" placeholder="************"/>
    <button>Sign in</button>
  </form>
  <div class="additional-options">
    <p>Forgot password?</p>
    <p>Sign up</p>
  </div>
</div>

<style>
.main {
  height: 100px;
  width: 33vw;
  margin: auto;
  margin-top: 25vh;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem;
  font-style: italic;
}

.login-form {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

button {
  min-height: 3rem;
  font-size: 2rem;
  width: 25%;
  align-self: flex-end;
  border-radius: 4px;
}

</style>