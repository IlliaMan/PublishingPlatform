<script>
  import InputRectangle from "$lib/components/InputRectangle.svelte";
  import { isAuthenticated, isAdmin } from "../../stores";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";

  function onLoginSubmit(event) {
    const formData = new FormData(event.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    fetch('http://localhost:3000/auth/login/', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Sth went wrong');
      }

      return response.json();
    })
    .then(response => { 
      sessionStorage.setItem("jwt", response.accessToken);
      sessionStorage.setItem("rjwt", response.refreshToken);
      return JSON.parse(atob(response.accessToken.split('.')[1]));
    })
    .then(user => {
      isAuthenticated.set(true);
      if(user.role === 'admin') {
        isAdmin.set(true);
        goto('/admin-panel');
      } else {
        goto('/');
      }
    })
    .catch(error => {
      console.warn(error.message);
    });
  }
</script>

<div class="main">
  <form class="login-form" on:submit|preventDefault={onLoginSubmit}>
    <InputRectangle inputName="email" name="Login" placeholder="youremail@gmail.com"/>
    <InputRectangle inputName="password" type="password" name="Password" placeholder="************"/>
    <Button name="Sign in"/>
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

  a:hover {
    color: var(--accent-color);
  }
</style>