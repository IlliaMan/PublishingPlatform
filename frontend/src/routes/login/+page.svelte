<script>
  import TextField from "$lib/components/TextField.svelte";
  import { isAuthenticated, isAdmin, userEmail, profileIcon } from "../../stores";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Logo from "$lib/components/Logo.svelte";

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
        return response.text().then(text => { 
          throw new Error(text);
        });
      }

      return response.json()
    })
    .then(response => { 
      sessionStorage.setItem("jwt", response.accessToken);
      sessionStorage.setItem("rjwt", response.refreshToken);
      return JSON.parse(atob(response.accessToken.split('.')[1]));
    })
    .then(user => {
      const time = user.exp - user.iat;
      setTimeout(() => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('rjwt');
        profileIcon.set('profileIcon.png');
        isAuthenticated.set(false);
        isAdmin.set(false);
        userEmail.set(null);
      }, time * 1000);

      profileIcon.set(user.icon);
      userEmail.set(user.email);
      isAuthenticated.set(true);
      if(user.role === 'admin') {
        isAdmin.set(true);
        goto('/admin-panel');
      } else {
        goto('/');
      }
    })
    .catch(error => {
      const message = JSON.parse(error.message).message;
      alert(`Error: ${message}`);
    });
  }
</script>

<div class="main">
  <div class="logo">
    <p>Welcome to</p>
    <Logo size="big" />
  </div>
  <div class="form">
    <form class="login-form" on:submit|preventDefault={onLoginSubmit}>
    <TextField inputName="email" placeholder="Email Address"/>
    <TextField inputName="password" type="password" placeholder="Password"/>
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
</div>

<style>
.main {
  display: flex;
  flex-direction: column;
  width: 55vw;
  margin: auto;
  margin-top: 10vh;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  padding: 3rem 0;
  row-gap: 4rem;
}

.logo {
  width: 50%;
  margin: auto;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem;
  font-style: italic;
}

.login-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
}

.logo {
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo p {
  margin: 0 auto 2rem auto;
  font-size: 2.375rem;
}

.form {
  width: 70%;
  margin: auto;
}

a {
  color: #fff;
}

a:hover {
  color: var(--accent-color);
}
</style>