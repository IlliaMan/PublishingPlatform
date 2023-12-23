<script>
  import Header from "$lib/components/Header.svelte";
  import SideMenu from "$lib/components/SideMenu.svelte";
  import { isAuthenticated } from "../stores";
	import { page } from '$app/stores';

  let isSideMenuVisible = false;
 </script>

{#if $page.error !== null}
 <slot />
{:else}
  <div class="layout">
    <Header bind:menuIconArg={isSideMenuVisible}/>
    <SideMenu bind:isVisible={isSideMenuVisible} isAuthenticated={$isAuthenticated}/>
  </div>
  <div class="content" class:cut-width={isSideMenuVisible}>
    <slot />
  </div>
{/if}

<style>
  .layout {
    height: 6rem;
    display: flex;
    flex-direction: row;
  }

  .content {
    width: 100%;
  }

  .cut-width {
    width: calc(100% - 42rem);
  }
</style>