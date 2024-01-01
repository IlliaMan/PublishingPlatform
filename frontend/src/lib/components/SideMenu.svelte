<script>
  export let isAuthenticated = false;
</script>

<div class="main">
  <div class="profile-icon">
    <img src="ProfileIcon.png" alt="Progile Icon" class="medium-image"/>
  </div>
  {#if isAuthenticated}
    <a href="/edit-page">Write</a>
    <a href="/profile">Profile</a>
    <a href="/">Settings</a>
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
  }

  .main > a:active {
    color: var(--accent-color);
    border-bottom: 1px solid var(--accent-color);
  }
  
  .main > a:last-child {
    margin-top: auto;
  }
</style>