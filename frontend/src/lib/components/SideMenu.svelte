<script>
  export let isAuthenticated = false;
</script>

<div class="main">
  <div class="profile-icon">
    <a href="/profile">
      <img src="ProfileIcon.png" alt="Progile Icon" class="medium-image"/>
    </a>
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
    background-color: whitesmoke;
    padding: 5rem;
    box-shadow: rgba(0, 0, 0, 0.2) -0.5rem 0 4rem;
  }

  .profile-icon {
    margin-bottom: 2rem;
  }

  .medium-image {
    filter: brightness(0.3);
    width: 10rem;
  }

  .main > a {
    width: 100%;
    text-align: center;
    display: block;
    color: black;
    font-size: 2rem;
    padding: 1rem 0;
    text-decoration: none;
    border-bottom: 1px solid black;
  }

  .main > a:hover {
    color: rgba(0, 0, 0, 0.55);
  }

  .main > a:last-child {
    margin-top: auto;
  }
</style>