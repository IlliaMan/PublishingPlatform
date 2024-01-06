<script>
  import Button from "$lib/components/Button.svelte";
  import showdown from "showdown";
  import { onMount } from "svelte";

  let isLiked = false;
  let likes = 5;

  let timeToRead = 1;
  function readingTime(text) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }

  let id = window.location.search.substring(1).split('=')[1];
  async function fetchArticles() {
    const res = await fetch(`http://127.0.0.1:3000/articles/${id}`);
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      return data;
    } else {
      throw new Error(data);
    }
  }
  
  let converter = new showdown.Converter();

  onMount(() => {
    id = window.location.search.substring(1).split('=')[1];
    fetch(`http://127.0.0.1:3000/articles/likes/${id}/check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(respose => {
        if(respose.status === 200) {
          isLiked = true;
        } else {
          isLiked = false;
        }
      });
  });
</script>

<div class="main">
  {#await fetchArticles()}
    <p>loading</p>
  {:then article} 
    <h1>{article.title}</h1>
    <div class="additional-information">
      <div class="horizontal-block">
        <div class="author">
          <p>{`@${article.email.split('@')[0]} | ${new Date(article.date).toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}`}</p>
        </div>
        <p>{`${timeToRead} ${timeToRead === 1 ? 'minute' : 'minutes'} to read`}</p>
        <p>{`${article.content.split(" ").filter(n => n != '').length} words`}</p>
        <p>{`Likes: ${likes}`}</p> 
      </div>
      <Button name="Follow"/>
      {#if isLiked}
        <Button name="Unlike" onClick={() => {
          fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
              'Content-type': 'application/json; charset=UTF-8'
            }
          });

          isLiked = false;
          likes--;
        }}/>
      {:else}
        <Button name="Like" onClick={() => {
          fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
              'Content-type': 'application/json; charset=UTF-8'
            }
          });

          isLiked = true;
          likes++;
        }}/>
      {/if}
    </div>
    <p>{@html converter.makeHtml(article.content)}</p>
    <p>{@html converter.makeHtml(article.content)}</p>
    <p>{@html converter.makeHtml(article.content)}</p>
  {/await}
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
  }

  .horizontal-block {
    display: flex;
    flex-direction: row;
    column-gap: 5rem;
    align-items: baseline;
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
  }

  button {
    min-height: 3rem;
    font-size: 2rem;
    width: 10rem;
    align-self: flex-end;
    border-radius: 4px;
    margin: auto 0;
  }
</style>