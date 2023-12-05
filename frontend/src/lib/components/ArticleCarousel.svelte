<script>
  let articles = [];
  async function fetchArticles() {
    const res = await fetch("http://127.0.0.1:3000/articles/");
    const data = await res.json();

    if (res.ok) {
      articles = data;
      return data;
    } else {
      throw new Error(data);
    }
  }
  let content_div;
</script>

<div class="main">
  <button class="left-slider" on:click={() => {
    content_div.scrollLeft -= content_div.scrollWidth / articles.length;
  }}>
    <p class="arrow">&lt;</p>
  </button>
  {#await fetchArticles()}
    <p>loading</p>
  {:then articles} 
    <div bind:this={content_div} class="content">
      {#each articles as { title, content } }
        <div class="sliding-article">
          <div class="article-title">
            <p>{title}</p>
          </div>
          <p>{content}</p>
        </div>
      {/each}
    </div>
  {/await}
  <button class="right-slider" on:click={() => {
    content_div.scrollLeft += content_div.scrollWidth / articles.length;
  }}>
    <p class="arrow">&gt;</p>
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

  .sliding-article > p {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    height: 14rem;
  }

  .content {
    width: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    scroll-behavior: smooth;
  }

  .article-title {
    display: inline;
    font-size: 5rem;
    margin: 0;
    margin-top: 1rem;
  }

  .article-title > p {
    display: flex;
    justify-content: center;
    font-size: inherit;
    margin-top: 1rem;
    margin-bottom: 0;
    text-align: center;
  }

  .arrow {
    font-size: 8rem;
    text-align: center;
  }

  div > p {
    padding: 0 5rem;
    font-size: 2rem;
    text-align: justify;
  }

  button {
    all: unset;
    cursor: pointer;
  }
</style>