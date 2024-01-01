<script>
  export let name = "Default Name";
  export let type = "text";
  export let placeholder = "placeholder";
  export let inputName = "";
  export let value = "";
</script>

<div>
  <p>{`${name}:`}</p>
  <input type={type} placeholder={placeholder} name={inputName} value={value}>
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  padding: 0;
  row-gap: 0.5rem;
}

p { 
  align-self: flex-start;
  margin: 0;
  font-size: 2rem;
}

input {
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.8rem;
  width: 100%;
}
</style>