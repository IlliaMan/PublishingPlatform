<script>
  import InputRectangle from "$lib/components/InputRectangle.svelte";
  import { goto } from "$app/navigation";

  function onLoginSubmit(event) {
    const formData = new FormData(event.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    fetch(`http://localhost:3000/users/${data.email}/${data.password}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Sth went wrong');
      }

      return response.json();
    })
    .then(response => { 
      console.log(response);
      goto('/');
    })
    .catch(error => {
      console.warn(error.message);
    });
  }
</script>

<div class="main">
  <form class="login-form" on:submit|preventDefault={onLoginSubmit}>
    <InputRectangle inputName="email" name="Login:" placeholder="youremail@gmail.com"/>
    <InputRectangle inputName="password" type="password" name="Password:" placeholder="************"/>
    <button type="submit">Sign in</button>
  </form>
  <div class="additional-options">
    <a href="/forgot-password">
      <p>Forgot password?</p>
    </a>
    <a href="sign-up">
      <p>Sign up</p>
    </a>
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