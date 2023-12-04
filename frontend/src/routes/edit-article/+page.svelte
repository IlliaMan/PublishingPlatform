<script>
  import InputRectangle from "$lib/components/InputRectangle.svelte";
  import showdown from 'showdown';

  let text = `# Markdown syntax guide\n\n## Headers\n\n# This is a Heading h1\n## This is a Heading h2\n###### This is a Heading h6\n\n## Emphasis\n\n*This text will be italic*  \n_This will also be italic_\n\n**This text will be bold**\n__This will also be bold__\n\ngitg_You **can** combine them_`
  let converter = new showdown.Converter();
</script>

<div class="main">
  <div class="information">
    <div class="article-name">
      <InputRectangle placeholder="Article.md" name="Document Name"/>
    </div>
    <button>Save</button>
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
        <h1>Article.md</h1>
      </div>
      <textarea bind:value={text}/>
    </div>
    <div class="display-area">
      <div class="header">
        <h1>Article.md</h1>
      </div>
      <div class="preview">
        {@html converter.makeHtml(text)}
      </div>
      <!-- <textarea bind:value={md} disabled /> -->
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
    max-width: 5rem;
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