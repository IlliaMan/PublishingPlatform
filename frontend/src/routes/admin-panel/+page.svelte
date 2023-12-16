<script>
  const getUsers = async () => {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();
    return data;
  };
</script>

<div class="admin-panel">
  <h1>Admin Panel</h1>
  <table class="styled-table">
    <thead>
      <tr>
        <th>&#8470;</th>
        <th>Username</th>
        <th>Email</th>
        <th>Status</th>
        <th colspan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#await getUsers()}
      <p>Loading</p>
      {:then users} {#each users as {username, email}, index }
      <tr>
        <td>{index + 1}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>Not banned</td>
        <td><button>Ban</button></td>
        <td><button>Unban</button></td>
      </tr>
      {/each} {/await}
    </tbody>
  </table>
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
    margin: auto;
    margin-top: 8rem;
    padding-bottom: 2rem;
    width: 75%;
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
</style>