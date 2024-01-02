<script>
  import { goto } from "$app/navigation";

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
      {#each data.articles as { title, content, _id }}
      <div class="article">
        <h1>{title}</h1>
        <p>{content}</p>
        <div class="article-button-pannel">
          <button on:click={() => {
            goto('/article?' + new URLSearchParams({ id: _id }));
          }}>Read</button>
          <button on:click={() => {
            goto('/edit-article?' + new URLSearchParams({ id: _id }));
          }}>Edit</button>
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
  }

  .article-button-pannel > button {
    max-width: fit-content;
    padding: 0 5rem;
  }

  @media only screen and (max-width: 800px) {
    .user-info {
      visibility: hidden;
    }
  }
</style>