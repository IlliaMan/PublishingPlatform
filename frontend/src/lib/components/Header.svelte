<script>
  import Logo from "./Logo.svelte";

  export let isSideMenuOpen = false;
  export let isAuthenticated = false;
  export let profileIcon = 'profileIcon.png'
  export let userEmail = null;
  let isInputResultHidden = true;
  let searchResults = [];
</script>

<header>
  <div class="logo">
    <Logo size="small" />
  </div>
  <div class="search-bar" class:shrink={isSideMenuOpen}>
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
    <div class="icon profile-icon">
      <a href={`/profile?${new URLSearchParams({ email: userEmail })}`}>
        <img src={`icons/${profileIcon}`} alt="Progile Icon" class="small-image profile-icon-img"/>
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
      isSideMenuOpen = !isSideMenuOpen;
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
    width: 76%;
    align-self: center;
    margin: auto;
    height: 4.5rem;
    transition: width 400ms ease;
  }

  .search-bar.shrink {
    width: calc(76% - 12rem);
  }

  input {
    font-size: 2rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding-left: 2rem;
    border: 2px solid #495057;
  }
  
  input:focus {
    outline-color: var(--secondary-color);
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
    top: 5.5rem;
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

  .profile-icon a img {
    border-radius: 5rem;
  }

  img:not(.profile-icon-img) {
    filter: brightness(25%);
  }

  @media only screen and (max-width: 1100px) {
    .search-bar {
      width: 65%;
    }
    
    .search-bar.shrink {
      width: calc(65% - 5rem);
    }
  }

  @media only screen and (max-width: 800px) {
    .search-bar {
      width: 50%;
    }

    .search-bar.shrink {
      width: calc(50% - 5rem);
    }
  }
</style>