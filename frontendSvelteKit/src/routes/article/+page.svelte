<script>
  import AdPlaceholder from "$lib/components/AdPlaceholder.svelte";

  let article = {
    title: "Article Title 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id bibendum magna. Suspendisse eu dolor in ipsum tincidunt egestas vel a ipsum. In hac habitasse platea dictumst. Quisque condimentum ex lorem, quis mollis enim pretium vitae. Pellentesque et ipsum ante. Aenean lobortis nisi mollis turpis scelerisque, eleifend vestibulum justo posuere. Nulla magna orci, laoreet vitae faucibus ut, hendrerit congue arcu. Curabitur vel risus in justo varius tempor. Integer diam orci, facilisis at lacinia sit amet, efficitur non metus. Ut cursus leo et pulvinar interdum. Proin ultricies eleifend ullamcorper. Morbi metus est, imperdiet hendrerit purus finibus, porttitor fermentum leo. Ut sit amet sollicitudin magna. Donec quis tempus felis, nec aliquam enim. Integer et dolor sagittis, accumsan elit ut, fermentum massa."
  };
</script>

<div class="main">
  <AdPlaceholder left={'14rem'} top={'35rem'} minHeight={'55rem'}/>
  <h1>{article.title}</h1>
  <div class="additional-information">
    <div class="horizontal-block">
      <div class="author">
        <p>@username | September 9th, 2023</p>
      </div>
      <button>Follow</button>
    </div>
    <div class="horizontal-block">
      <p>10 minutes to read</p>
      <p>1568 words</p>  
    </div>
  </div>
  <p>{article.content}</p>
  <p>{article.content}</p>
  <p>{article.content}</p>
  <p>{article.content}</p>
  <p>{article.content}</p>
  <p>{article.content}</p>
</div>

<style>
  .main {
    height: 100px;
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .additional-information {
    width: 100%;
    min-height: 12rem;
    border-top: 4px solid black;
    border-bottom: 4px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .horizontal-block {
    display: flex;
    flex-direction: row;
    column-gap: 5rem;
  }

  h1 {
    font-size: 5rem;
    margin: 0;
  }

  p {
    font-size: 2rem;
    text-align: justify;
  }

  .author > p {
    font-size: 2rem;
    background-color: #ddd;
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