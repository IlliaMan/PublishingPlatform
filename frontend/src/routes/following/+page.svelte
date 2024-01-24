<script>
  export let data;
  const { following, email, userName } = data;
</script>

<div class="following-panel">
  {#if following.length === 0}
    <h1>{`@${userName} has no following`}</h1>
    <a href={`/profile?${new URLSearchParams({ email })}`}>Go Back</a>
  {:else}
  <h1>{`@${userName} following`}</h1>
  <table class="styled-table">
    <thead>
      <tr>
        <th>&#8470;</th>
        <th>Icon</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
    {#each following as { email, icon, username }, index}
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
    font-size: 1.7rem;
    font-family: sans-serif;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    text-align: left;
  }

  .styled-table thead tr {
    background-color: #7928a4;
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
    border-bottom: 0.5rem solid #bb7ddc;
  }
  
  .following-panel {
    margin: auto;
    padding-bottom: 2rem;
    width: 60%;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
    margin: 3rem 0;
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