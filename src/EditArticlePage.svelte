<script>
    import AdPlaceholer from "./components/AdPlaceholder/AdPlaceholer.svelte";
    import InputRectangle from "./components/InputRectangle/InputRectangle.svelte";

  let article = {
    title: "Article Title 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id bibendum magna. Suspendisse eu dolor in ipsum tincidunt egestas vel a ipsum. In hac habitasse platea dictumst. Quisque condimentum ex lorem, quis mollis enim pretium vitae. Pellentesque et ipsum ante. Aenean lobortis nisi mollis turpis scelerisque, eleifend vestibulum justo posuere. Nulla magna orci, laoreet vitae faucibus ut, hendrerit congue arcu. Curabitur vel risus in justo varius tempor. Integer diam orci, facilisis at lacinia sit amet, efficitur non metus. Ut cursus leo et pulvinar interdum. Proin ultricies eleifend ullamcorper. Morbi metus est, imperdiet hendrerit purus finibus, porttitor fermentum leo. Ut sit amet sollicitudin magna. Donec quis tempus felis, nec aliquam enim. Integer et dolor sagittis, accumsan elit ut, fermentum massa."
  };
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
      <textarea />

    </div>
    <div class="display-area">
      <div class="header">
        <h1>Article.md</h1>
      </div>
      <textarea />

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
    height: 98%;
    font-size: 2rem;
    text-align: left;
    resize: none;
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