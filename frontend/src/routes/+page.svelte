<script>
  import ArticleCarousel from "$lib/components/ArticleCarousel.svelte";
  import LikeButton from "$lib/components/LikeButton.svelte";
  import { isAuthenticated, userId } from "../stores.js";

  export let data;
  const { articles, articlesSideSectionLeft, articlesSideSectionRight } = data;
</script>

<div class="main">
  <ArticleCarousel articles={articles} />
  <div class="article-tiles">
    <div class="side-section">
      {#if $isAuthenticated}
        <p>Recent from your following</p>
      {:else}
        <p>Articles you might like</p>
      {/if}
      {#each articlesSideSectionLeft as { _id, title, email, likes, content, icon, username }, index}
      <div>
        <a href={`/profile?${new URLSearchParams({ email })}`}>
          <img src={`icons/${icon}`} alt="Profile Icon" />
        </a>
        <p class="title-hover-effect">
          <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
           {index + 1}. {title}
          </a>
        </p>
      </div>
      {/each}
    </div>
    <div class="side-section">
      {#if $isAuthenticated}
        <p>Recent from your following</p>
      {:else}
        <p>Articles you might like</p>
      {/if}
      {#each articlesSideSectionRight as { _id, title, email, likes, content, icon, username }, index}
      <div>
        <a href={`/profile?${new URLSearchParams({ email })}`}>
          <img src={`icons/${icon}`} alt="Profile Icon" />
        </a>
        <p class="title-hover-effect">
          <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
          {index + 6}. {title}
          </a>
        </p>
      </div>
      {/each}
    </div>
    {#each articles as { _id, title, email, likes, content, icon, username }}
      <div class="article">
        <div class="article-title title-hover-effect">
          <p>
            <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
              {title}
            </a>
          </p>
        </div>
        <p class="content">{content}</p>
        <div class="article-button-pannel">
          <div class="author-information">
            <a href={`/profile?${new URLSearchParams({ email })}`}>
              <img src={`icons/${icon}`} alt="Profile Icon" />
            </a>
            <p>{`@${username}`}</p>
          </div>
          <LikeButton 
            likes={likes.length} 
            isDisabled={!$isAuthenticated} 
            isLiked={likes.includes($userId) ? true : false} 
            isSmallIcon={true}
            onUnlike={() => {
              fetch(`http://127.0.0.1:3000/articles/likes/${_id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                  'Content-type': 'application/json; charset=UTF-8'
                }
              })
            }}
            onLike={() => {
              fetch(`http://127.0.0.1:3000/articles/likes/${_id}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                  'Content-type': 'application/json; charset=UTF-8'
                }
              })
            }}
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .main {
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .article-tiles {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
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
    flex: 45%;
    background-color: var(--primary-color);
    padding: 2rem 1rem;
    border-radius: 4px;
  }

  .article:hover,
  .side-section:hover {
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

  .author-information a img {
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

  .title-hover-effect:hover {
    color: var(--secondary-color);
    cursor: pointer;
  }

  .title-hover-effect:active {
    color: var(--accent-color);
  }

  a {
    all: unset;
    cursor: pointer;
    padding: 0rem;
  }

  .author-information a:hover,
  div .side-section a:hover {
    animation: jump 400ms ease-in;
  }

  div .side-section {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: thin solid #fff;
    width: 30rem;
    height: 34.5rem;
    position: absolute;
    left: -32rem;
    top: -36.5rem;
    padding: 0.5rem 0;
  }

  div .side-section:nth-child(2) {
    left: 103%
  }

  div .side-section > p {
    text-align: center;
    font-size: 14px;
    margin: 0;
  }

  div .side-section a img {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
  }
  
  div .side-section a {
    padding: 0;
  }

  div .side-section div {
    display: flex;
    align-items: center;
    font-size: 12px;
    column-gap: 1rem;
    text-align: justify;
    margin-top: 0.75rem;
  }

  div .side-section div p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    font-size: 1.5rem;
  }

  p, a {
    line-height: 2.5rem;
  }

  .side-section div {
    padding: 0 1rem;
  }

  @media only screen and (max-width: 1200px) {
    div .side-section {
      left: -27.5rem;
      width: 25.5rem;
    }
  }

  @media only screen and (max-width: 1000px) {
    .main {
      width: 90vw;
    }
    
    div .side-section {
      position: initial;
      flex: 45%;
      padding: 1rem 3rem;
      height: 31.5rem;
    }

    div .side-section div p {
      font-size: 1.6rem;
    }
  }

  @keyframes jump {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    0% {
      transform: scale(1);
    }
  }
</style>