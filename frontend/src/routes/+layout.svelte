<script>
  import Header from "$lib/components/Header.svelte";
  import SideMenu from "$lib/components/SideMenu.svelte";
  import { isAuthenticated } from "../stores";
	import { page } from '$app/stores';

  let isOpen = false;
 </script>

{#if $page.error !== null}
 <slot />
{:else}
  <div class="main">
    <div class="home-section">
      <Header bind:menuIconArg={isOpen}/>
      <slot />
    </div>
    <div class="sidebar" class:open={isOpen} class:close={!isOpen}></div>
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
    transition: all 300ms ease-in;
    z-index: 10;
    justify-self: flex-end;
    max-width: 36rem;
  }

  .home-section {
    flex: 5;
    position: relative;
    height: 100vh;
    transition: all 300ms ease-in;
  }
</style>