import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const res = await fetch("http://127.0.0.1:3000/users");

  if(!res.ok) {
    throw error(res.status);
  }
    
  const data = await res.json();
  console.log(data);
  return {
    users: data
  };
}