<script>
  import Button from "$lib/components/Button.svelte";

  export let data;

  const updateUserBanStatus = (email, isBanned) => {
    fetch('http://localhost:3000/users/banstatus/', {
      method: 'PATCH',
      body: JSON.stringify({
        email,
        isBanned
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(data => data.json())
    .then(console.log);
  };
</script>

<div class="admin-panel">
  <h1>Admin Panel</h1>
  <table class="styled-table">
    <thead>
      <tr>
        <th>&#8470;</th>
        <th>Icon</th>
        <th>Username</th>
        <th>Email</th>
        <th>Status</th>
        <th colspan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
    {#each data.users as user, index}
      <tr>
        <td>{index + 1}</td>
        <td>
          <img src={`icons/${user.icon}`} alt="Progile Icon" class="profile"/>
        </td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.isBanned ? 'Banned' : 'Not Banned'}</td>
        <td>
          <Button 
            onClick={() => {
              user.isBanned = true;
              updateUserBanStatus(user.email, true);
            }}
            name="Ban"
          />
        </td>
        <td>
          <Button 
            onClick={() => {
              user.isBanned = false;
              updateUserBanStatus(user.email, false);
            }} 
            name="Unban"
          />
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .styled-table {
    box-sizing: border-box;
    border-collapse: collapse;
    font-size: 1.7rem;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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

  .admin-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
  }

  h1 {
    color: #fff;
    font-size: 4rem;
    text-align: center;
    margin: 3rem 0;
  }
  
  img {
    width: 5rem;
    border-radius: 3rem;
  }
</style>