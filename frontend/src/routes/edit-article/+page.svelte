<script>
  import InputRectangle from "$lib/components/InputRectangle.svelte";
  import showdown from 'showdown';

  let text = `# Markdown syntax guide\n\n## Headers\n\n# This is a Heading h1\n## This is a Heading h2\n###### This is a Heading h6\n\n## Emphasis\n\n*This text will be italic*  \n_This will also be italic_\n\n**This text will be bold**\n__This will also be bold__\n\ngitg_You **can** combine them_`;
  let articleTitle;
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

  let converter = new showdown.Converter();
</script>

<div class="main">
    {#await fetchArticles()}
      <p>loading</p>
    {:then article} 
  <div class="information">
    <div class="article-name">
      <InputRectangle placeholder="Article.md" name="Document Name" value={articleTitle}/>
    </div>
    <button on:click={() => {
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
    }}>Save</button>
    <button>Publish</button>
    <div class="statistics">
      <p>Reading time: 5 minutes</p>
      <p>Words: 325</p>
      <p>Characters: 1205</p>
    </div>
  </div>
  <div class="main-area">
    <div class="editing-area">
      <div class="header">
        <h1>{`${article.title}.md`}</h1>
      </div>
      <textarea bind:value={text}/>
    </div>
    <div class="display-area">
      <div class="header">
        <h1>{`${article.title}.md`}</h1>
      </div>
      <div class="preview">
        {@html converter.makeHtml(text)}
      </div>
      <!-- <textarea bind:value={md} disabled /> -->
    </div>
    </div>
    {/await}
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
    color: #fff;
    background-color: var(--primary-color);
    padding: 2rem 4rem;
    border-radius: 4px;
  }

  h1 {
    margin: 0;
    padding: 1rem;
  }
  
  .header {
    width: 100%;
    height: 5rem;
    background-color: var(--primary-color);
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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
</style>