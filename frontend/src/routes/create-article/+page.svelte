<script>
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

  $: timeToRead = readingTime(text);

  let converter = new showdown.Converter();
</script>

<div class="main">
  <div class="information">
    <div class="article-name">
      <div class="input-rectangle">
        <p>Document Name:</p>
        <input type="text" placeholder="Article.md" name="Document Name" bind:value={articleTitle}>
      </div>
    </div>
    <Button name="Publish"/>
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
</div>

<style>
  .main {
    width: 80vw;
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
    border-bottom: 4px solid black;
    border-top: 4px solid black;
    padding: 1rem 4rem;
  }

  h1 {
    margin: 0;
    padding: 1rem;
  }
  
  .header {
    width: 100%;
    height: 5rem;
    background-color: white;
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
    width: 99%;
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
    width: 100%;
    height: 100%;
    font-size: 2rem;
    overflow: scroll;
    background-color: white;
    border-top: 0.125rem solid black;
  }

  textarea {
    border-top: 0.125rem solid black;
  }

  .statistics {
    display: flex;
    flex-direction: row;
    column-gap: 2rem;
    margin-left: auto;
    font-size: 2rem;
  }

  button {
    min-height: 4rem;
    font-size: 2rem;
    width: 10rem;
    align-self: flex-end;
    border-radius: 4px;
    margin: auto 0;
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
    height: 3.5rem;
    border-radius: 0.5rem;
    font-size: 1.8rem;
    width: 100%;
  }
</style>