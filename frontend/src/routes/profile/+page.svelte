<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import { isAuthenticated } from "../../stores.js";
  
  export let data;
</script>

<div class="main">
  <div class="user-info">
    <img src="ProfileIcon.png" alt="Progile Icon" class="profile"/>
    <p>{`@${data.userName}`}</p>
    <a href={`/followers?${new URLSearchParams({ email: data.profileUserEmail, username: data.userName })}`}>
      <p>{`${data.followersCount} followers`}</p>
    </a>
    <a href={`/following?${new URLSearchParams({ email: data.profileUserEmail, username: data.userName })}`}>
      <p>{`${data.followingCount} following`}</p>
    </a>
    {#if $isAuthenticated && !data.isMyProfile}
    {#if data.isFollowing}
      <Button name="Unfollow" onClick={() => {
        fetch(`http://127.0.0.1:3000/users/${data.profileUserEmail}/unfollow`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
        }).then(res => {
          if(res.ok) {
            data.isFollowing = false;
            data.followersCount--;
          }
        })
      }}/>
    {:else}
      <Button name="Follow" onClick={() => {
        fetch(`http://127.0.0.1:3000/users/${data.profileUserEmail}/follow`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
        }).then(res => {
          if(res.ok) {
            data.isFollowing = true;
            data.followersCount++;
          }
        })
      }}/>
    {/if}
    {/if}
  </div>
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
    flex-direction: row;
    gap: 2rem;
    column-gap: 6rem;
  }

  .user-info {
    box-sizing: border-box;
    border: thin solid #fff;
    display: flex;
    flex-direction: column;
    width: 30rem;
    row-gap: 4rem;
    height: fit-content;
    background-color: var(--primary-color);
    color: #fff;
    padding: 2rem 3rem;
    border-radius: 4px;
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
    border: thin solid var(--primary-color);
    background-color: var(--primary-color);
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
  }

  p {
    font-size: 1.8rem;
  }

  .user-info > *,
  a > * {
    font-size: 2.2rem;
    margin: 0 auto;
  }

  .profile {
    min-width: 8rem;
    margin: 0 auto;
  }

  .article-button-pannel {
    display: flex;
    justify-content: flex-end;
    column-gap: 2rem;
    margin-bottom: 1rem;
    margin-top: auto;
  }

  .article {
    background-color: var(--primary-color);
  }

  .article:hover,
  .user-info:hover {
    border: thin solid var(--secondary-color);
  }

  .article h1 {
    text-align: center;
  }
  
  .article p {
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media only screen and (max-width: 850px) {
    .main {
      flex-direction: column;
    }

    .user-info {
      width: 100%;
      flex-direction: row;
      align-items: center;
    }
  }

  .article > a:hover,
  a:hover {
    color: var(--secondary-color);
    cursor: pointer;
  }

  .article > a:active,
  a:active {
    color: var(--accent-color);
  }

  a {
    all: unset;
  }

  @media only screen and (max-width: 750px) {
    .main {
      width: 80vw;
    }
  }
</style>