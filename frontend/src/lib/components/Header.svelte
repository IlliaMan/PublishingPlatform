<script>
  export let menuIconArg = false;
  export let isAuthenticated = false;
</script>

<header>
  <div class="logo">
    <a href="/">
      <img src="logoLight.png" alt="logo" class="logo-image"/>
    </a>
  </div>
  <input type="text" placeholder="Search"/>
  {#if isAuthenticated}
    <div class="icon">
      <a href="/profile">
        <img src="ProfileIcon.png" alt="Progile Icon" class="small-image"/>
      </a>
    </div>
  {:else}
    <div class="icon">
      <a href="/login">
      <img src="LogInIcon.png" alt="LogIn Icon" class="small-image"/>
      </a>
    </div>
  {/if}
  <div class="menu-icon">
    <button on:click={() => { 
      menuIconArg = !menuIconArg;
    }}>
      <img src="MenuIcon.png" alt="Menu Icon" class="small-image"/>
    </button>
  </div>
</header>

<style>
  .logo {
    align-items: center;
    margin-left: 2rem;
    margin-right: 6rem;
  }

  .logo-image {
    height: 5rem;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 6rem;
    background-color: var(--primary-color);
  }

  input {
    width: 50%;
    font-size: 2rem;
    padding-left: 2rem;
    align-self: center;
    margin: auto;
    height: 65%;
    border-radius: 0.5rem;
  }

  a {
    margin-right: 2rem;
    min-width: 4rem;
  }

  button {
    all: unset;
  }

  .small-image {
    width: 5rem;
  }

  div {
    display: flex;
    width: 8rem;
    align-items: center;
  }

  .menu-icon:hover,
  .icon:hover,
  .logo:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 550px) {
    input {
      visibility: hidden;
    }
  }
</style>