<script>
  export let menuIconArg = false;
  export let isAuthenticated = false;
  let isInputResultHidden = true;
  let searchResults = [];
</script>

<header>
  <div class="logo">
    <a href="/">
      <img src="logoLight.png" alt="logo" class="logo-image"/>
    </a>
  </div>
  <div class="search-bar">
    <input type="text" placeholder="Search"
      on:focusin={() => { isInputResultHidden = false; }}
      on:focusout={val => { 
      if(val.relatedTarget == null) {
        isInputResultHidden = true;
      }
    }}
      on:input={input => {
        const { value } = input.target;
        if(value == '') {
          isInputResultHidden = true;
        } else {
          fetch(`http://127.0.0.1:3000/search/${value}`)
            .then(res => res.json())
            .then(res => {
              searchResults = res.searchResults;
              isInputResultHidden = false;
            }
          );
        }
    }}/>
    <button 
      class="blocker" 
      class:hide={isInputResultHidden}
      on:click={() => {
        isInputResultHidden = true;
      }}
    />
    <div class="input-result" class:hide={isInputResultHidden} tabindex="-1">
      {#each searchResults as { id, title, email }}
        <a rel="external" href={`/article?${new URLSearchParams({ id, email })}`}
          on:click={() => {
            isInputResultHidden = true;
          }}
        >{title}</a>
      {/each}
    </div>
  </div>
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

  .search-bar {
    display: flex;
    flex-direction: column;
    width: 55vw;
    align-self: center;
    margin: auto;
    height: 65%;
    border-radius: 0.5rem;
  }

  input {
    font-size: 2rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
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

  .input-result {
    position: absolute;
    height: fit-content;
    top: 5rem;
    border: thin solid var(--primary-color);
    background-color: #fff;
    box-sizing: border-box;
    width: 55vw;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 2rem;
  }

  .hide {
    display: none;
  }

  .input-result > a {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 2rem;
    text-align: left;
    cursor: pointer;
  }

  .input-result > a:hover {
    background-color: #ffffdb;
  }

  @media only screen and (max-width: 550px) {
    input {
      visibility: hidden;
    }
  }
</style>