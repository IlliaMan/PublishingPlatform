<script>
  import { goto } from "$app/navigation";
  import InputRectangle from "$lib/components/InputRectangle.svelte";

  function onSignupSubmit(event) {
    const formData = new FormData(event.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    console.log(data);
    fetch('http://localhost:3000/users/', 
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password
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
    <InputRectangle inputName="email" name="Email" placeholder="youremail@gmail.com"/>
    <InputRectangle inputName="username" name="Username" placeholder="nickname"/>
    <InputRectangle inputName="password" name="Password" placeholder="**********" type="password"/>
    <InputRectangle name="Repeat" placeholder="**********" type="password"/>
    <button type="submit">Sign up</button>
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
    margin-top: 18vh;
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

  button {
    min-height: 3rem;
    font-size: 2rem;
    width: 25%;
    align-self: flex-end;
    border-radius: 4px;
  }
  
  a:hover {
    color: var(--accent-color);
  }
</style>