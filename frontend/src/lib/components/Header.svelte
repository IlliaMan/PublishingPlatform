<script>

</script>

<header>
  <a href="/">
    <img src="logo.png" alt="logo" class="logo"/>
  </a>
  <input type="text" placeholder="Search"/>
  <div class="profile-icon">
    <a href="/profile">
      <img src="ProfileIcon.png" alt="Progile Icon" class="small-image"/>
    </a>
  </div>
  <div class="menu-icon">
    <button on:click={() => { console.log('clicked'); }}>
      <img src="MenuIcon.png" alt="Menu Icon" class="small-image"/>
    </button>
  </div>
</header>

<style>
  .logo {
    padding: 0.375rem;
    margin-left: 1rem;
    max-width: 8rem;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 6rem;
    background-color: #ddd;
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
    filter: brightness(0.3);
    width: 5rem;
  }

  div {
    display: flex;
    width: 8rem;
    align-items: center;
  }

  @media only screen and (max-width: 550px) {
    input {
      visibility: hidden;
    }
  }
</style>