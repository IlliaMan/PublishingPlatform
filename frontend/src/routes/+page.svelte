<script>
  import ArticleCarousel from "$lib/components/ArticleCarousel.svelte";
  import AdPlaceholder from "$lib/components/AdPlaceholder.svelte";
  export let data;
</script>

<div class="main">
  <AdPlaceholder top={'47rem'} minHeight={'43rem'}/>
  <ArticleCarousel />
  <div class="article-tiles">
    {#each data.articleList as { title, content }}
      <div class="article">
        <div class="article-title">
          <p>{title}</p>
        </div>
        <p class="content">{content}</p>
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
    border: 2px solid black;
    min-height: 20rem;
    flex: 50%;
    max-width: 47%;
    background-color: #ddd;
    padding: 2rem 1rem;
  }

  p {
    font-size: 1.6rem;
    text-align: justify;
  }
  
  .article-title {
    font-size: 2rem;
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
  }
</style>