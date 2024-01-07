import { error } from '@sveltejs/kit';
import { isAuthenticated } from '../../stores.js';
import { get } from 'svelte/store';

export async function load({ fetch, url }) {
  let res;
  console.warn('isAuthenticated', get(isAuthenticated));
  if(get(isAuthenticated)) {
    res = await fetch("http://127.0.0.1:3000/articles/user/", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    });
  } else {
    const email = url.searchParams.get('email');
    console.log(email);
    res = await fetch(`http://127.0.0.1:3000/articles/user/${email}`);
  }

  if(!res.ok) {
    throw error(res.status);
  }
    
  const data = await res.json();
  console.log(data);
  return {
    articles: data
  };
}


