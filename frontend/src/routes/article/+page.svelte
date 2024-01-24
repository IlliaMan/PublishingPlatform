<script>
  import showdown from "showdown";
  import { isAuthenticated } from "../../stores.js";
  import LikeButton from "$lib/components/LikeButton.svelte";

  export let data;
  let { id, email, isLiked, likeCount, article, userName, icon } = data;
    
  let timeToRead = 1;
  function readingTime(text) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }
  
  let converter = new showdown.Converter();
</script>

<div class="main">
  <h1>{article.title}</h1>
  <div class="additional-information">
    <div class="horizontal-block">
      <div class="icon profile-icon">
        <a href={`/profile?${new URLSearchParams({ email: article.email })}`}>
          <img src={`/icons/${icon}`} alt="Progile Icon" class="small-image"/>
        </a>
        <div class="author">
          <p>{`@${userName}`}</p>
          <p>{`${new Date(article.date).toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}`}</p>
        </div>
      </div>
      <div class="reading-statistics">
        <p>{`${timeToRead} ${timeToRead === 1 ? 'minute' : 'minutes'} to read`}</p>
        <p>{`${article.content.split(" ").filter(n => n != '').length} words`}</p>
      </div>
      <div class="like-button">
        <LikeButton 
          isDisabled={!$isAuthenticated}
          isLiked={isLiked} 
          likes={likeCount} 
          onUnlike={() => {
            fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(response => {
              if(response.ok) {
                isLiked = false;
                likeCount--;
              }
            });
          }} 
          onLike={() => {
            fetch(`http://127.0.0.1:3000/articles/likes/${id}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(response => {
              if(response.ok) {
                isLiked = true;
                likeCount++;
              }
            }
          );
        }}/>
      </div>
    </div>
  </div>
  <div class="content">
    {@html converter.makeHtml(article.content)}
  </div>
</div>

<style>
  .main {
    width: 75vw;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
  }

  .additional-information {
    box-sizing: border-box;
    border-radius: 4px;
    padding: 2rem;
    width: 100%;
    min-height: 12rem;
    background-color: var(--primary-color);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 2rem;
  }

  .horizontal-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 8rem;
    justify-content: space-between;
  }

  .additional-information:nth-child(1) {
    height: 2rem;
  }

  h1 {
    font-size: 4rem;
    font-weight: 400;
    margin: 0;
    text-align: center;
    background-color: var(--primary-color);
    color: #fff;
    padding: 2rem 1rem;
    border-radius: 4px;
  }

  p {
    font-size: 2.2rem;
    text-align: justify;
  }

  .author > p {
    background-color: transparent;
    color: #fff;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 0;
  }

  .icon {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    padding: 0 1rem;
  }

  .profile-icon img {
    border-radius: 5rem;
  }

  .small-image {
    width: 7rem;
  }

  .like-button {
    display: flex;
    width: 22rem;
    justify-content: flex-end;
  }

  a {
    all: unset;
    height: fit-content;
    cursor: pointer;
  }

  .reading-statistics {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 2rem;
  }

  .reading-statistics > p {
    margin: auto;
  }

  .content {
    border: thin solid var(--primary-color);
    background-color: #ffffff;
    padding: 1rem 2rem;
    font-size: 2.4rem;
    border-radius: 4px;
    text-align: justify;
    line-height: 3.5rem;
  }

  .profile-icon a:hover {
    animation: jump 400ms ease-in;
  }

  @media only screen and (max-width: 1000px) {
    .main {
      width: 85vw;
    }
  }

  @media only screen and (max-width: 850px) {
    .horizontal-block {
      height: auto;
      row-gap: 2rem;
    }

    .main {
      width: 90vw;
    }
  }

  @media only screen and (max-width: 750px) {
    .like-button {
      width: 15rem;
    }
  }

  @media only screen and (max-width: 650px) {
    .main {
      width: 95vw;
    }
  }

  @media only screen and (max-width: 500px) {
    .horizontal-block {
      flex-direction: column;
    }

    .author {
      display: flex;
      flex-direction: row;
      column-gap: 2rem;
    }

    .reading-statistics {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      column-gap: 2rem;
    }
  }

  @keyframes jump {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    0% {
      transform: scale(1);
    }
  }
</style>