<script>
  export let isVisible = false;
  export let isLoggedIn = false;
</script>

{#if isVisible}
  <div class="main">
    <div class="profile-icon">
      <a href="/profile">
        <img src="ProfileIcon.png" alt="Progile Icon" class="medium-image"/>
      </a>
    </div>
    {#if isLoggedIn}
      <p>LoggedIn</p>
    {:else}
      <p>LoggedOut</p>
    {/if}
  </div>
{/if}

<style>
  .main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    position: relative;
    right: 0;
    width: 42rem;
    height: 100vh;
    background-color: whitesmoke;
    padding: 5rem;
    box-shadow: rgba(0, 0, 0, 0.2) -0.5rem 0 4rem;
  }

  .medium-image {
    filter: brightness(0.3);
    width: 8rem;
  }
</style>