<script>
  import Button from "$lib/components/Button.svelte";
  import showdown from "showdown";
  import { isAuthenticated } from "../../stores.js";
  import LikeButton from "$lib/components/LikeButton.svelte";

  export let data;
  let { id, email, isLiked, likeCount, article, userName } = data;
    
  let timeToRead = 1;
  function readingTime(text) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }
  
  let converter = new showdown.Converter();
</script>

<div class="main">
    <h1>{article.title}</h1>
    <div class="additional-information">
      <div class="horizontal-block">
        <a href={`/profile?${new URLSearchParams({ email: article.email })}`}>
          <div class="icon">
            <img src="ProfileIcon.png" alt="Progile Icon" class="small-image"/>
            <div class="author">
              <p>{`@${userName}`}</p>
              <p>{`${new Date(article.date).toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}`}</p>
            </div>
          </div>
        </a>
        <p>{`${timeToRead} ${timeToRead === 1 ? 'minute' : 'minutes'} to read`}</p>
        <p>{`${article.content.split(" ").filter(n => n != '').length} words`}</p>
        <LikeButton 
          isDisabled={!$isAuthenticated}
          isLiked={isLiked} 
          likes={likeCount} 
          onLike={() => {
            fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(response => {
              if(response.ok) {
                isLiked = false;
                likeCount--;
              }
            });
          }} 
          onUnlike={() => {
            fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(response => {
              if(response.ok) {
                isLiked = true;
                likeCount++;
              }
            });
          }}/>
      </div>
    </div>
    <p>{@html converter.makeHtml(article.content)}</p>
    <p>{@html converter.makeHtml(article.content)}</p>
    <p>{@html converter.makeHtml(article.content)}</p>
</div>

<style>
  .main {
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
  }

  .additional-information {
    box-sizing: border-box;
    border-radius: 4px;
    padding: 2rem;
    width: 100%;
    min-height: 12rem;
    background-color: var(--primary-color);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 2rem;
    min-width: 82rem;
  }

  .horizontal-block {
    display: flex;
    flex-direction: row;
    column-gap: 5rem;
    align-items: center;
    height: 5rem;
    justify-content: space-between;
  }

  .additional-information:nth-child(1) {
    height: 2rem;
  }

  h1 {
    font-size: 5rem;
    margin: 0;
    text-align: center;
  }

  p {
    font-size: 2rem;
    text-align: justify;
  }

  .author > p {
    font-size: 2rem;
    background-color: transparent;
    color: #fff;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 0;
  }

  .icon {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    border: thin solid #fff;
    padding: 0 1rem;
    border-radius: 4px;
  }

  .icon:hover {
    border: thin solid var(--secondary-color);
  }

  .icon:active {
    border: thin solid var(--accent-color);
  }

  .small-image {
    width: 5rem;
  }

  a {
    all: unset;
    height: fit-content;
    cursor: pointer;
  }
</style>