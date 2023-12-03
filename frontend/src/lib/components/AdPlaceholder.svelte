<script>
  export let left = '6rem';
  export let top = '46rem';
  export let minHeight = '10rem';
</script>

<div class="main" style="--left: {left}; --top: {top}; --min-height: {minHeight}">
  <p>Ad Placeholder</p>
</div>

<style>
  .main {
    position: absolute;
    box-sizing: border-box;
    border: 4px solid black;
    width: 15%;
    min-height: var(--min-height);
    left: var(--left);
    top: var(--top);
    font-size: 2.5rem;
    text-align: center;
    padding: 0 1rem;
  }

  @media only screen and (max-width: 800px) {
    .main {
      visibility: hidden;
    }
  }
</style>