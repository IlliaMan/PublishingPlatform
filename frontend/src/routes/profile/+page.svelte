<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  
  export let data;
</script>

<div class="main">
  <!-- <div class="user-info">
    <img src="ProfileIcon.png" alt="Progile Icon" class="profile"/>
    <p>@username</p>
    <p>200 followers</p>
    <button>Follow</button>
  </div> -->
    <div class="article-tiles">
      {#if data.articles.length === 0}
        <h1>No articles</h1>
      {:else}
      {#each data.articles as { title, content, email, _id }}
      <div class="article">
        <a href={`/article?${new URLSearchParams({ id: _id, email })}`}>
          <h1>{title}</h1>
        </a>
        <p>{content}</p>
        <div class="article-button-pannel">
          <Button name="Read" onClick={() => {
            goto(`/article?${new URLSearchParams({ id: _id, email })}`);
          }}/>
          {#if data.isMyProfile}
            <Button name="Edit" onClick={() => {
              goto('/edit-article?' + new URLSearchParams({ id: _id }));
            }}/>
            <Button name="Delete" onClick={() => {
              fetch(`http://localhost:3000/users/article/${title}`, {
                method: "DELETE", 
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                  'Content-type': 'application/json; charset=UTF-8'
                },
              });

              fetch(`http://localhost:3000/articles/${_id}`, {
                method: "DELETE", 
              });

              data.articles = data.articles.filter(article => article._id !== _id);
            }}/>
          {/if}
        </div>
      </div>
      {/each}
      {/if}
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
    position: absolute;
    box-sizing: border-box;
    border: 4px solid black;
    display: flex;
    flex-direction: column;
    width: 15%;
    padding: 0 2rem;
    left: 6rem;
    background-color: #ddd;
    padding: 2rem 0;
  }

  .article-tiles {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 3rem;
    padding-bottom: 2rem;
  }

  .article-tiles > div {
    box-sizing: border-box;
    border: 0.35rem solid var(--primary-color);
    min-height: 20rem;
    background-color: var(--primary-color);
    color: #fff;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  p {
    font-size: 1.6rem;
  }

  .user-info > * {
    font-size: 2rem;
    margin: 3rem auto 0 auto;
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

  .article-button-pannel {
    display: flex;
    justify-content: flex-end;
    column-gap: 2rem;
    margin-bottom: 1rem;
    margin-top: auto;
  }

  .article-button-pannel > button {
    max-width: fit-content;
    padding: 0 5rem;
  }

  .article {
    background-color: var(--primary-color);
  }

  .article:hover {
    border: 0.35rem solid var(--secondary-color);
  }

  .article h1 {
    text-align: center;
  }
  
  .article p {
    text-align: justify;
  }

  @media only screen and (max-width: 800px) {
    .user-info {
      visibility: hidden;
    }
  }

  .article > a:hover {
    color: var(--secondary-color);
    cursor: pointer;
  }

  .article > a:active {
    color: var(--accent-color);
  }

  a {
    all: unset;
  }
</style>