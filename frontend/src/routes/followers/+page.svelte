<script>
  export let data;
  const { followers, email, userName } = data;
</script>

<div class="followers-panel">
  {#if followers.length === 0}
    <h1>{`@${userName} has no followers`}</h1>
    <a href={`/profile?${new URLSearchParams({ email })}`}>Go Back</a>
  {:else}
  <h1>{`@${userName} followers`}</h1>
  <table class="styled-table">
    <thead>
      <tr>
        <th>&#8470;</th>
        <th>Icon</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
    {#each followers as { email, icon, username }, index}
      <tr>
        <td>{index + 1}</td>
        <td>
          <a href={`/profile?${new URLSearchParams({ email })}`}>
            <img src={`icons/${icon}`} alt="Progile Icon" />
          </a>
        </td>
        <td>{`@${username}`}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/if}
</div>

<style>
  .styled-table {
    box-sizing: border-box;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1.7rem;
    font-family: sans-serif;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    text-align: left;
  }

  .styled-table thead tr {
    background-color: var(--primary-color);
    color: #ffffff;
    text-align: left;
  }

  .styled-table th,
  .styled-table td {
    padding: 1.5rem 3rem;
  }

  .styled-table tbody tr {
    background-color: #dedede;
  }

  .styled-table tbody tr:hover {
    background-color: #ffffdb;
  }

  .styled-table tbody tr {
    border-bottom: thin solid black;
  }

  .styled-table tbody tr:last-child {
    border-bottom: 0.5rem solid var(--primary-color);
  }
  
  .followers-panel {
    margin: auto;
    margin-top: 8rem;
    padding-bottom: 2rem;
    width: 60%;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  a {
    all: unset;
    display: inline-block;
    margin: auto;
    width: 5rem;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
  }

  a:hover {
    animation: jump 400ms ease-in;
  }

  img {
    border-radius: 7rem;
    width: inherit;
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