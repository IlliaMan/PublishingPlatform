<script>
  import Button from "$lib/components/Button.svelte";

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
      </div>
      <Button name="Follow"/> 
    </div>
    <p>{article.content}</p>
    <p>{article.content}</p>
    <p>{article.content}</p>
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