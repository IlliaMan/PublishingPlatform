<script>
  import Button from "$lib/components/Button.svelte";
  import showdown from "showdown";
  import { isAuthenticated } from "../../stores.js";

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
        <div class="icon">
          <a href={`/profile?${new URLSearchParams({ email: article.email })}`}>
            <img src="ProfileIcon.png" alt="Progile Icon" class="small-image"/>
          </a>
          <div class="author">
            <p>{`@${userName} | ${new Date(article.date).toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}`}</p>
          </div>
        </div>
        <p>{`${timeToRead} ${timeToRead === 1 ? 'minute' : 'minutes'} to read`}</p>
        <p>{`${article.content.split(" ").filter(n => n != '').length} words`}</p>
        <p>{`Likes: ${likeCount}`}</p> 
      </div>
      {#if $isAuthenticated}
      {#if isLiked}
        <Button name="Unlike" onClick={() => {
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
          })

        }}/>
      {:else}
        <Button name="Like" onClick={() => {
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
      {/if}
      {/if} 
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
    background-color: #ddd;
    color: #000;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 0;
  }

  .icon {
    display: flex;
    column-gap: 1rem;
    align-items: center;
  }

  .small-image {
    width: 5rem;
  }

  a {
    height: fit-content;
  }
</style>