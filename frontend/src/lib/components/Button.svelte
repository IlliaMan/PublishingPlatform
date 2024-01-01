<script>
  export let name = "Button";
  export let onClick = () => {};
</script>

<button on:click={onClick}>{name}</button>

<style>
   button {
    border-radius: 4px;
    padding: 0.75rem 3rem;
    background-color: whitesmoke;
    border: thin solid var(--primary-color);
    transition: 50ms;
  }

  button:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
    color: white;
  }

  button:active {
    transform: scale(0.9);
  }
</style>