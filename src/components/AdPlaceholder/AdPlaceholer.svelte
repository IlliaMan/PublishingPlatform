<script>
  export let left = '0rem';
  export let top = '0rem';
</script>

<div class="main" style="--left: {left}; --top: {top}">
  <p>Ad Placeholder</p>
</div>

<style>
  .main {
    position: fixed;
    box-sizing: border-box;
    border: 4px solid black;
    min-width: 24rem;
    min-height: 42.5rem;
    left: var(--left);
    top: var(--top);
    font-size: 3rem;
    padding: 0 2rem;
  }
</style>