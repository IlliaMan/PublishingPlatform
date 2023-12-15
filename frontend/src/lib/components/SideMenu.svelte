<script>
  export let isVisible = false;
</script>

{#if isVisible}
  <div>
    SideMenu
  </div>
{/if}

<style>
  div {
    position: relative;
    right: 0;
    width: 36rem;
    height: 100vh;
    background-color: gray;
  }
</style>