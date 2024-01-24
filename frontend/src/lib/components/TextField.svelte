<script>
  export let type = "text";
  export let placeholder = "placeholder";
  export let inputName = "";
  export let value = "";
  export let isRequired = true;
</script>

<div>
  <input 
    type={type} 
    name={inputName} 
    placeholder={placeholder} 
    value={value} 
    required={isRequired}
  />
  <label for={inputName}>{placeholder}</label>
</div>

<style>
div {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  row-gap: 0.5rem;
}

label {
  position: absolute;
  visibility: hidden;
  background-color: whitesmoke;
  top: 1.2rem;
  left: 2rem;
  font-size: 1.8rem;
  color: grey;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in, visibility 200ms ease-in
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  visibility: visible;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1.6rem;
  top: -1.6rem;
  left: 0.8rem;
}

input {
  box-sizing: border-box;
  height: 4.5rem;
  border-radius: 0.5rem;
  font-size: 1.8rem;
  width: 100%;
  padding-left: 2rem;
  border: 2px solid #495057;
}

input:focus {
  outline-color: var(--secondary-color);
}
</style>