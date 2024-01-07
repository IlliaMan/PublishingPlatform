<script>
  export let isLiked = false;
  export let likes = 5;
  export let onLike = () => {};
  export let onUnlike = () => {};
  export let isDisabled = false;

  function changeIsLiked() {
    isLiked = !isLiked;

    if(isLiked) {
      likes++;
    } else {
      likes--;
    }
  }
</script>

{#if isLiked}
  <button disabled={isDisabled} on:click={() => { 
    changeIsLiked();
    onLike();
  }}>
    <img src="redHeart.svg" alt="Red Heart Icon" class="small-image"/>
    <p>{likes}</p>
  </button>
{:else}
  <button disabled={isDisabled} on:click={() => {
    changeIsLiked();
    onUnlike();
  }}>
    <img src="greyHeart.svg" alt="Grey Heart Icon" class="small-image"/>
    <p>{likes}</p>
  </button>
{/if}

<style>
  .small-image {
    width: 5rem;
  }

  button {
    display: flex;
    gap: 2rem;
    font-size: 2rem;
    padding: 0 1rem;
    align-items: center;
    width: 10rem;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    color: #fff;
    border: thin solid #fff;
  }

  button:hover {
    border: thin solid var(--secondary-color);
  }
  
  button:active {
    border: thin solid var(--accent-color);
  }
</style>