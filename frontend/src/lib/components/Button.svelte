<script>
  export let name = "Button";
  export let onClick = () => {};
  export let type = "submit";
</script>

<button type={type} on:click={onClick}>{name}</button>

<style>
   button {
    height: 4.5rem;
    border-radius: 4px;
    padding: 0.75rem 3rem;
    background-color: #495057;
    border: thin solid #000;
    color: #fff;
    transition: 50ms;
    font-weight: 600;
  }

  button:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
    border: thin solid #fff;
  }

  button:active {
    background-color: var(--accent-color);
  }
</style>