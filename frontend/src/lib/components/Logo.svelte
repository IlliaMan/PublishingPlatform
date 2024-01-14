<script>
  export let size = 'small';
</script>

<a href="/">
  <img 
    src="logo/icon.png" 
    alt="logo" 
    class={`logo-image ${size}`}
  />
  <img 
    src="logo/name.svg" 
    alt="logo" 
    class={`logo-image ${size}`}
  />
</a>

<style>
  a {
    display: flex;
    flex-direction: row;
    column-gap: 1.5rem;
  }

  .small {
    width: 6rem;
    border-radius: 4px;
  }

  .big {
    width: 21rem;
    border-radius: 1rem
  }
</style>