<script>
  export let name = "Default Name:";
  export let type = "text";
  export let placeholder = "placeholder";
</script>

<div>
    <p>{name}</p>
    <input type={type} placeholder={placeholder} />
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  padding: 0;
}

p { 
  align-self: flex-start;
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

input {
  height: 3rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  width: 100%;
}
</style>