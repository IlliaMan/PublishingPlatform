<script>
  import { goto } from '$app/navigation';

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
        <th>User</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {#each following as email, index}
      <tr>
        <td>{index + 1}</td>
        <td>
          <img src="ProfileIcon.png" alt="Progile Icon" class="profile"/>
        </td>
        <td>{`${email}`}</td>
        <td>
          <button on:click={() => {
            goto(`/profile?${new URLSearchParams({ email })}`);
          }}>Profile</button>
        </td>
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
    background-color: #ffffbb;
  }

  .styled-table tbody tr {
    border-bottom: thin solid black;
  }

  .styled-table tbody tr:last-child {
    border-bottom: 0.5rem solid #bb7ddc;
  }
  
  .following-panel {
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
  
  button {
    border-radius: 4px;
    padding: 0.75rem 3rem;
    background-color: whitesmoke;
    border: thin solid #898989;
    transition: 250ms;
  }

  button:hover {
    cursor: pointer;
    background-color: #898989;
    color: white;
  }

  button:active {
    transform: scale(0.9);
  }

  .profile {
    width: 4rem;
  }
  
  a {
     margin: auto;
     width: 100%;
     font-size: 2rem;
  }

  img {
    filter: brightness(0.3);
  }
</style>