<script>
  import Header from "$lib/components/Header.svelte";
  import SideMenu from "$lib/components/SideMenu.svelte";

  let isSideMenuVisible = true;
</script>

<div class="layout">
  <Header bind:menuIconArg={isSideMenuVisible} />
  <SideMenu bind:isVisible={isSideMenuVisible} />
</div>
<div class="content" class:cut-width={isSideMenuVisible}>
  <slot />
</div>

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