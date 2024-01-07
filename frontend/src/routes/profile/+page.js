import { error } from '@sveltejs/kit';
import { isAuthenticated } from '../../stores.js';
import { get } from 'svelte/store';

export async function load({ fetch, url }) {
  let res;
  const email = url.searchParams.get('email');
  let isMyProfile = false;
  let userEmail = null;
  let userName = null;
  const token = sessionStorage.getItem('jwt');
  token ? (userEmail = JSON.parse(atob(token.split('.')[1]))?.email) : null;

  if(email && token) {
    if(userEmail === email) {
      isMyProfile = true;
    }
  }
  
  let users = await fetch("http://127.0.0.1:3000/users/");
  users = await users.json();

  if(get(isAuthenticated) && (!email || isMyProfile)) {
    res = await fetch("http://127.0.0.1:3000/articles/user/", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    });

    userName = users.filter(user => user.email === userEmail)[0].username;
  } else {
    res = await fetch(`http://127.0.0.1:3000/articles/user/${email}`);
    userName = users.filter(user => user.email === email)[0].username;
  }

  if(!res.ok) {
    throw error(res.status);
  }
 
  const data = await res.json();

  if(userEmail && data.length !== 0 && data[0].email === userEmail) {
    isMyProfile = true;
  }

  return {
    articles: data,
    isMyProfile,
    userName
  };
}


