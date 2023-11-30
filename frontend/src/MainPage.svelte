<script>
    import ArticleCarousel from "./components/ArticleCarousel/ArticleCarousel.svelte";
    import AdPlaceholer from "./components/AdPlaceholder/AdPlaceholer.svelte";

  let articles = [
    {
      title: "Article Title 1",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 2",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 3",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 4",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 5",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 6",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 7",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 8",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    },
    {
      title: "Article Title 59",
      content: "This description provides a brief overview, giving readers a quick glimpse of its content to help them decide if they are interested"
    }
  ]
</script>

<div class="main">
  <AdPlaceholer left={'14rem'} top={'46.5rem'}/>
  <ArticleCarousel />
  <div class="article-tiles">
    {#each articles as { title, content }}
      <div class="article">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .main {
    height: 100px;
    width: 55vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .article-tiles {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 3rem;
  }

  .article-tiles > div {
    box-sizing: border-box;
    border: 2px solid black;
    min-height: 20rem;
    flex: 50%;
    max-width: 47%;
    background-color: #ddd;
    padding: 0 1rem;
  }

  p {
    font-size: 1.6rem;
  }
</style>