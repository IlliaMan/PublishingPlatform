<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import showdown from 'showdown';

  let text = '';
  let articleTitle = '';
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
      text = data.content;
      articleTitle = data.title;
      return data;
    } else {
      throw new Error(data);
    }
  }

  $: timeToRead = readingTime(text);

  let converter = new showdown.Converter();
</script>

<div class="main">
    {#await fetchArticles()}
      <p>loading</p>
    {:then article} 
  <div class="information">
    <div class="article-name">
      <div class="input-rectangle">
        <p>Document Name:</p>
        <input type="text" placeholder="Article.md" name="Document Name" bind:value={articleTitle}>
      </div>
    </div>
    <Button name="Save" onClick={() => {
      console.log(`PATCH: http://localhost:3000/articles/${article._id}`);
      fetch(`http://localhost:3000/articles/${article._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: articleTitle,
          content: text
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      fetch(`http://localhost:3000/users/article/${article.title}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          title: articleTitle,
          content: text
        }),
      });

      alert('Article has beed edited');
    }}/>
    <div class="statistics">
      <p>{`Reading time: ${timeToRead} ${timeToRead === 1 ? 'minute' : 'minutes'}`}</p>
      <p>{`Words: ${text.split(" ").filter(n => n != '').length}`}</p>
      <p>{`Characters: ${text.length}`}</p>
    </div>
  </div>
  <div class="main-area">
    <div class="editing-area">
      <div class="header">
        <h1>{`${articleTitle}.md`}</h1>
      </div>
      <textarea bind:value={text}/>
    </div>
    <div class="display-area">
      <div class="header">
        <h1>{`${articleTitle}.md`}</h1>
      </div>
      <div class="preview">
        {@html converter.makeHtml(text)}
      </div>
    </div>
    </div>
    {/await}
</div>

<style>
  .main {
    width: 75vw;
    margin: auto;
    margin-top: 4rem;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .article-name {
    min-width: 30%;
    margin-top: -1rem;
  }

  .information {
    box-sizing: border-box;
    display: flex;
    column-gap: 5rem;
    width: 100%;
    min-height: 10rem;
    background-color: var(--primary-color);
    padding: 2rem 4rem;
    border-radius: 4px;
    align-items: flex-end;
  }

  h1 {
    margin: 0;
    padding: 1rem;
  }
  
  .header {
    width: 100%;
    height: 5rem;
    background-color: var(--primary-color);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: 0.125rem solid #000;
  }

  .main-area {
    width: 100%;
    height: 65vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60vh;
  }

  .main-area > div {
    width: 45%;
  }

  textarea {
    box-sizing: border-box;
    padding: 2rem 1rem;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    text-align: left;
    resize: none;
    overflow: scroll;
    border: 0;
  }

  textarea:focus-visible {
    outline: none;
  }

  .preview {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    padding: 1rem 2rem;
    overflow: scroll;
    background-color: #fff;
  }

  .statistics {
    display: flex;
    flex-direction: row;
    column-gap: 2rem;
    margin-left: auto;
    font-size: 2rem;
  }

  .input-rectangle {
    display: flex;
    flex-direction: column;
    padding: 0;
    row-gap: 0.5rem;
  }

  .input-rectangle > p { 
    align-self: flex-start;
    margin: 0;
    font-size: 2rem;
  }

  .input-rectangle > input {
    box-sizing: border-box;
    height: 4rem;
    border-radius: 0.5rem;
    font-size: 1.8rem;
    width: 100%;
    padding-left: 1rem;
  }
</style>