<script>
  import AdPlaceholder from "$lib/components/AdPlaceholder.svelte";

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
  <AdPlaceholder top={'35rem'} minHeight={'55rem'}/>
  {#await fetchArticles()}
    <p>loading</p>
  {:then article} 
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