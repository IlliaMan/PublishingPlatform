<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import TextField from "$lib/components/TextField.svelte";
  import getRandomIcon from "$lib/functions/getRandomIcon";
  import { profileIcon, userEmail } from "../../stores";

  let icon = $profileIcon;

  function onUpdateHandler(event) {
    const formData = new FormData(event.target);

    const data = { };
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    fetch('http://localhost:3000/users/', 
      {
        method: 'PATCH',
        body: JSON.stringify({
          newPassword: data.newPassword,
          password: data.password,
          icon: icon
        }),
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
      }
    )
    .then(response => {
      if(!response.ok) {
        alert('Settings have NOT been updated');
        throw new Error(response.statusText);
      }
    })
    .then(() => { 
      alert('Settings have been updated');
      profileIcon.set(icon);
      goto('/');
    })
    .catch(error => {
      console.warn(error.message);
    });
  }
</script>

<div class="main">
  <p>Settings</p>
  <form on:submit|preventDefault={onUpdateHandler}>
    <div class="profile-picker">
      <img 
        src={`icons/${icon}`} 
        alt="Profile Icon"
      />
      <Button 
        name="New Profile Icon"
        type="button"
        onClick={() => {
          icon = getRandomIcon();
        }}
      /> 
    </div>
    <TextField 
      inputName="newPassword" 
      placeholder="New Password" 
      type="password"
      isRequired={false}
    />
    <TextField 
      placeholder="Repeat New Password" 
      type="password"
      isRequired={false}
    />
    <TextField 
      inputName="password" 
      placeholder="Current Password" 
      type="password"
      isRequired={true}
    />
    <TextField 
      placeholder="Repeat Current Password" 
      type="password"
      isRequired={true}
    />
    <Button name="Update"/>
  </form>
  <div class="additional-options">
    <a href="/">
      <p>Back to Main Page</p>
    </a>
  </div>
</div>

<style>
  .main {
    box-sizing: border-box;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 4px;
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    padding: 3rem 0;
    flex-direction: column;
    row-gap: 2rem;
    align-items: center;
  }

  .main > * {
    width: 70%;
  }

  .main > p:nth-child(1) {
    font-size: 2.375rem;
  }
  
  .main > p:nth-child(2) {
    font-size: 1.6rem;
    margin: 0;
  }

  .main p {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  p {
    margin: 0;
  }

  a {
    color: #fff;
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
    border-radius: 5rem;
    width: 10rem;
  }
</style>