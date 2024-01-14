<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import TextField from "$lib/components/TextField.svelte";
  import getRandomIcon from "$lib/functions/getRandomIcon";

  let icon = 'profileIcon.png';
  
  function onSignupSubmit(event) {
    const formData = new FormData(event.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    console.log({ ...data, icon: icon });
    fetch('http://localhost:3000/users/', 
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
          icon: icon
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
    .then(response => {
      if(!response.ok) {
        throw new Error('Sth went wrong');
      }

      return response.json();
    })
    .then(response => { 
      console.log(response);
      goto('/login');
    })
    .catch(error => {
      console.warn(error.message);
    });
  }
</script>

<div class="main">
  <h1>Sign up</h1>
  <p>Create a free account</p>
  <form on:submit|preventDefault={onSignupSubmit}>
    <div class="profile-picker">
      <img 
        src={`icons/${icon}`} 
        alt="Profile Icon"
      />
      <Button 
        name="Randomize Profile Picture"
        type="button"
        onClick={() => {
          icon = getRandomIcon();
        }}
      /> 
    </div>
    <TextField 
      inputName="email" 
      placeholder="Email"
    />
    <TextField 
      inputName="username" 
      placeholder="Username"
    />
    <TextField 
      inputName="password" 
      placeholder="Password" 
      type="password"
    />
    <TextField 
      placeholder="Repeat Password" 
      type="password"
    />
    <Button name="Sign up"/>
  </form>
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
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  form {
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

  a:hover {
    color: var(--accent-color);
  }

  .profile-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .profile-picker img {
    border-radius: 10rem;
    width: 12rem;
  }
</style>