<script>
  import ArticleCarousel from "$lib/components/ArticleCarousel.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";

  export let data;
</script>

<div class="main">
  <ArticleCarousel />
  <div class="article-tiles">
    {#each data.articleList as { _id, title, content }}
      <div class="article">
        <div class="article-title">
          <p>
            <a href={`/article?${new URLSearchParams({ id: _id })}`}>
              {title}
            </a>
          </p>
        </div>
        <p class="content">{content}</p>
        <div class="article-button-pannel">
          <Button name='Read' onClick={() => {
            goto('/article?' + new URLSearchParams({ id: _id }));
          }}/>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .main {
    height: 100px;
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .article-tiles {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 3rem;
    padding-bottom: 2rem;
  }
  
  .article {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .article-tiles > div {
    box-sizing: border-box;
    border: 2px solid #fff;
    min-height: 20rem;
    flex: 50%;
    max-width: 47%;
    background-color: var(--primary-color);
    padding: 2rem 1rem;
    color: #fff;
  }

  .article:hover {
    border: 2px solid var(--secondary-color);
  }

  p {
    font-size: 1.6rem;
  }
  
  .article-title {
    font-size: 2rem;
  }

  .article-button-pannel {
    display: flex;
    justify-content: flex-end;
  }

  .article-title > p {
    font-size: inherit;
    display: flex;
    justify-content: center;
    margin: 0;
    text-align: center;
  }

  .content {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    height: 11rem;
    text-align: justify;
  }

  .article-title:hover {
    color: var(--secondary-color);
    cursor: pointer;
  }

  .article-title:active {
    color: var(--accent-color);
  }

  a {
    all: unset;
  }
</style>