<script>
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
  <div class="user-info">
    <img src="ProfileIcon.png" alt="Progile Icon" class="profile"/>
    <p>@username</p>
    <p>200 followers</p>
    <button>Follow</button>
  </div>
  <AdPlaceholer left={'14rem'} top={'50rem'} minHeight={'40rem'}/>
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
    gap: 2rem;
  }

  .user-info {
    position: fixed;
    box-sizing: border-box;
    border: 4px solid black;
    display: flex;
    flex-direction: column;
    min-width: 24rem;
    padding: 0 2rem;
    left: 14rem;
    background-color: #ddd;
    padding: 2rem 0;
  }

  .article-tiles {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 3rem;
  }

  .article-tiles > div {
    box-sizing: border-box;
    border: 2px solid black;
    min-height: 20rem;
    background-color: #ddd;
    padding: 0 1rem;
  }

  p {
    font-size: 1.6rem;
  }

  .user-info > * {
    font-size: 2rem;
  }

  button {
    min-height: 5rem;
    font-size: 2rem;
    width: 60%;
    align-self: center;
    border-radius: 8px;
  }

  .profile {
    filter: brightness(0.3);
    min-width: 50%;
    margin: 0 auto;
  }
</style>