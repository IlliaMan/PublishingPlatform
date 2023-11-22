<script>
    export let articles = [
      {
        title: "Article One",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        title: "Article Two",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        title: "Article Three",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ];

    let content_div;
</script>

<div class="main">
  <button class="left-slider" on:click={() => {
    content_div.scrollLeft -= content_div.scrollWidth / articles.length;
  }}>
    <p>&lt;</p>
  </button>
  <div bind:this={content_div} class="content">
    {#each articles as { title, content } }
      <div class="sliding-article">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    {/each}
  </div>
  <button class="right-slider" on:click={() => {
    content_div.scrollLeft += content_div.scrollWidth / articles.length;
  }}>
    <p>&gt;</p>
  </button>
</div>

<style>
  .main {
    width: 55vw;
    margin: auto;
    min-height: 32rem;
    border: 4px solid black;
    display: flex;
    flex-direction: row;
  }

  .left-slider {
    border-right: 2px solid black;
    background-color: #fff;
    width: 10%;
  }

  .right-slider {
    border-left: 2px solid black;
    background-color: #fff;
    width: 10%;
  }

  .sliding-article {
    min-width: 100%;
    background-color: #ddd;
  }

  .content {
    width: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    scroll-behavior: smooth;
  }

  h1 {
    font-size: 5rem;
    margin: 0;
    margin-top: 1rem;
  }

  p {
    font-size: 8rem;
  }

  div > p {
    align-self: flex-start;
    padding: 0 10rem;
    font-size: 2rem;
  }

  button {
    all: unset;
    cursor: pointer;
  }
</style>