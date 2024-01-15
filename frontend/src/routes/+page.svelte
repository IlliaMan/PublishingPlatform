<script>
  import ArticleCarousel from "$lib/components/ArticleCarousel.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import LikeButton from "$lib/components/LikeButton.svelte";
  import { userId } from "../stores.js";

  export let data;
  const { articles } = data;
</script>

<div class="main">
  <ArticleCarousel articles={articles} />
  <div class="article-tiles">
    {#each articles as { _id, title, email, likes, content, icon, username }}
      <div class="article">
        <div class="article-title">
          <p>
            <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
              {title}
            </a>
          </p>
        </div>
        <p class="content">{content}</p>
        <div class="article-button-pannel">
          <div class="author-information">
            <img src={`icons/${icon}`} alt="Profile Icon" />
            <p>{`@${username}`}</p>
          </div>
          <LikeButton 
            likes={likes.length} 
            isDisabled={true} 
            isLiked={likes.includes($userId) ? true : false} 
            isSmallIcon={true} 
          />
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
    border: thin solid #fff;
    min-height: 20rem;
    flex: 50%;
    max-width: 47%;
    background-color: var(--primary-color);
    padding: 2rem 1rem;
    color: #fff;
    border-radius: 4px;
  }

  .article:hover {
    border: thin solid var(--secondary-color);
  }

  p {
    font-size: 1.6rem;
  }
  
  .article-title {
    font-size: 2rem;
  }

  .article-button-pannel {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    padding-left: 2rem;
  }

  .author-information {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .author-information > img {
    width: 4rem;
    height: 4rem;
    border-radius: 3rem;
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
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: justify;
    padding: 0rem 2rem;
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

  @media only screen and (max-width: 1000px) {
    .main {
      width: 80vw;
    }
  }

  @media only screen and (max-width: 700px) {
    .article-tiles > div {
      max-width: 100%;
      flex: auto;
    }
  }
</style>