<script>
  export let isLiked = false;
  export let likes = 5;
  export let onLike = () => {};
  export let onUnlike = () => {};
  export let isDisabled = false;
  export let isSmallIcon = false;

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
    <img 
      src="redHeart.svg" 
      alt="Red Heart Icon" 
      class="small-image" 
      class:small={isSmallIcon}
    />
    <p>{likes}</p>
  </button>
{:else}
  <button disabled={isDisabled} on:click={() => {
    changeIsLiked();
    onUnlike();
  }}>
    <img 
      src="greyHeart.svg" 
      alt="Grey Heart Icon" 
      class="small-image"
      class:small={isSmallIcon}
    />
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
    font-size: 2.2rem;
    align-items: center;
    justify-content: center;
    width: 10rem;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    color: #fff;
    border: none;
  }

  button:disabled {
    cursor: unset;
  }

  .small {
    width: 3rem;
  }

  button:enabled:hover > img {
    animation: rock 500ms ease-in-out;
  }

  @keyframes rock {
    0% {
      transform: rotateZ(0);
    }
    25% {
      transform: rotateZ(-30deg);
    }
    75% {
      transform: rotateZ(30deg);
    }
    100% {
      transform: rotateZ(0);
    }
  }
</style>