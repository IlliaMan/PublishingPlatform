<script>
  import InputRectangle from "./components/InputRectangle/InputRectangle.svelte";
</script>

<div>
  <form class="login-form">
    <InputRectangle name="Login:" placeholder="youremail@gmail.com"/>
    <InputRectangle type="password" name="Password:" placeholder="************"/>
    <button>Login</button>
  </form>
</div>

<style>
div {
  height: 100px;
  width: 33vw;
  margin: auto;
  margin-top: 25vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

button {
  height: 3rem;
  font-size: 1.5rem;
  width: 30%;
  align-self: flex-end;
  border-radius: 4px;
}

</style>