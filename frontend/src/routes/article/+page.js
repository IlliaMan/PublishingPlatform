import { get } from 'svelte/store';
import { isAuthenticated, profileIcon } from '../../stores.js';

export async function load({ fetch, url }) {
  const id = url.searchParams.get('id');
  const email = url.searchParams.get('email');
  let isLiked = false;
  let likeCount = 0;
  let article = {};
  let userName = null;
  let icon = 'profileIcon.png';

  let res = await fetch(`http://127.0.0.1:3000/articles/${id}`);
  let data = await res.json();

  if (res.ok) {
    article = data;
  }

  if(get(isAuthenticated)) {
    res = await fetch(`http://127.0.0.1:3000/articles/likes/${id}/check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
        'Content-type': 'application/json; charset=UTF-8'
      },
    });
    isLiked = res.status === 200;

  }

  res = await fetch(`http://127.0.0.1:3000/users/icon/${email}`);
  res = await res.json();
  icon = res.icon;


  res = await fetch(`http://127.0.0.1:3000/articles/likes/${id}/count`);
  res = await res.json();
  likeCount = res.likeCount;

  res = await fetch(`http://127.0.0.1:3000/users/username/${email}`);
  res = await res.json();
  userName = res.username;

  return {
    id,
    email,
    isLiked,
    likeCount,
    article,
    userName,
    icon
  };
}