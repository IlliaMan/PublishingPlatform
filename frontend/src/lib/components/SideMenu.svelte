<script>
  import { 
    isAdmin as adminStore, 
    isAuthenticated as authenticatedStore, 
    userEmail as userEmailStore,
    profileIcon as profileIconStore
  } from "../../stores";

  export let isAuthenticated = false;
  export let isAdmin = false;
  export let userEmail = null;
  export let profileIcon = 'profileIcon.png';
</script>

<div class="main">
  <div class="profile-icon">
    <img src={`icons/${profileIcon}`} alt="Progile Icon" class="medium-image"/>
  </div>
  {#if isAuthenticated}
    {#if isAdmin}
      <a href="/admin-panel">Admin Panel</a>
    {:else}
      <a href="/create-article">Write</a>
      <a href={`/profile?${new URLSearchParams({ email: userEmail })}`}>Profile</a>
    {/if}
      <a href="/login" on:click={() => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('rjwt');
        profileIconStore.set('profileIcon.png');
        authenticatedStore.set(false);
        adminStore.set(false);
        userEmailStore.set(null);
      }}>Log out</a>
  {:else}
    <a href="/login">Sign in</a>
    <a href="/sign-up">Sign up</a>
  {/if}
  <a href="/subscription-plans">Become a Member</a>
</div>

<style>
  .main {
    display: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    height: 100%;
    background-color: var(--primary-color);
    padding: 5rem;
  }

  .profile-icon {
    margin-bottom: 2rem;
  }

  .profile-icon > img {
    border-radius: 5rem;
  }

  .medium-image {
    width: 10rem;
  }

  .main > a {
    width: 100%;
    text-align: center;
    display: block;
    color: white;
    font-size: 2rem;
    padding: 1rem 0;
    text-decoration: none;
    border-bottom: 1px solid white;
  }

  .main > a:hover {
    color: var(--secondary-color);
    border-bottom: 1px solid var(--secondary-color);
    cursor: pointer;
  }

  .main > a:active {
    color: var(--accent-color);
    border-bottom: 1px solid var(--accent-color);
    cursor: pointer;
  }
  
  .main > a:last-child {
    margin-top: auto;
  }
</style>