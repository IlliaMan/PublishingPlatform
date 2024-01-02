<script>
  import Header from "$lib/components/Header.svelte";
  import SideMenu from "$lib/components/SideMenu.svelte";
  import { isAdmin, isAuthenticated } from "../stores";
	import { page } from '$app/stores';
  import { onMount } from "svelte";

  let isOpen = false;

  onMount(async () => {
    const jwt = sessionStorage.getItem('jwt');
    if(jwt) {
      const user = await JSON.parse(atob(jwt.split('.')[1]));
      isAuthenticated.set(true);
      if(user.role === 'admin') {
        isAdmin.set(true);
      }
    }
  });
 </script>

{#if $page.error !== null}
  <slot />
{:else}
  <div class="main">
    <div class="home-section">
      <Header bind:menuIconArg={isOpen} isAuthenticated={$isAuthenticated}/>
      <slot />
    </div>
    <div class="sidebar" class:open={isOpen} class:close={!isOpen}>
      <SideMenu isAuthenticated={$isAuthenticated} isAdmin={$isAdmin}/>
    </div>
  </div>
{/if}

<style>
  .main { 
    display: flex;
    width: 100%;
  }

  .open {
    flex: 2;
  }

  .close {
    flex: 0;
  }

  .sidebar {
    height: 100vh;
    background-color: #11101d;
    transition: all 400ms ease;
    z-index: 10;
    justify-self: flex-end;
    max-width: 36rem;
    overflow: hidden;
    box-shadow: white 1rem 0 2rem;
  }

  .home-section {
    flex: 5;
    overflow: auto;
    position: relative;
    height: 100vh;
    transition: all 400ms ease-in;
  }
</style>