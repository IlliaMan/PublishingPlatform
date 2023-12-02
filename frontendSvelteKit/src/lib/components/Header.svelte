<script>

</script>

<header>
<img src="logo.png" alt="logo" class="logo"/>
 <input type="text" placeholder="Search"/>
 <button on:click={() => { console.log('clicked'); }}>
    <img src="ProfileIcon.png" alt="Progile Icon" class="image profile"/>
 </button>
  <button on:click={() => { console.log('clicked'); }}>
    <img src="MenuIcon.png" alt="Menu Icon" class="image menu-icon"/>
 </button>
</header>

<style>
  .logo {
    padding: 0.375rem;
    margin-left: 1rem;
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

  button {
    all: unset;
    margin-right: 2rem;
  }

  .image {
    filter: brightness(0.3);
    height: 80%;
  }

  .menu-icon {
    height: 65%;
  }
</style>