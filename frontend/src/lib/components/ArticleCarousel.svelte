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
      {#each articles as { title, content, email, _id } }
        <div class="sliding-article">
          <div class="article-title">
            <p>
              <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
                {title}
              </a>
            </p>
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
    box-sizing: border-box;
    margin: auto;
    min-height: 32rem;
    border: thin solid #fff;
    display: flex;
    width: 100%;
    flex-direction: row;
    border-radius: 4px;
  }

  .left-slider {
    border-right: thin solid #fff;
    background-color: var(--primary-color);
    width: 10%;
    color: #fff; 
  }

  .right-slider {
  border-left: thin solid #fff;
    background-color: var(--primary-color);
    width: 10%;
    color: #fff;
  }

  .left-slider:hover,
  .right-slider:hover,
  .article-title:hover {
    color: var(--secondary-color);
    cursor: pointer;
  }

  .left-slider:active,
  .right-slider:active,
  .article-title:active {
    color: var(--accent-color);
  }

  .sliding-article {
    min-width: 100%;
    background-color: var(--primary-color);
    color: #fff;
  }

  .sliding-article > p {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  p > a {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  a {
    all: unset;
  }

  .main:hover {
    border: thin solid var(--secondary-color);
  }
</style>