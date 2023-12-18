import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const res = await fetch("http://127.0.0.1:3000/articles/user", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
    }
  });

  if(!res.ok) {
    throw error(res.status);
  }

  console.log(res);
    
  const data = await res.json();
  console.log(data);
  return {
    articles: data
  };
}


