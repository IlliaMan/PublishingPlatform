import { error } from '@sveltejs/kit';
import { isAuthenticated } from '../../stores.js';
import { get } from 'svelte/store';

export async function load({ fetch, url }) {
  let res;
  const email = url.searchParams.get('email');
  let isMyProfile = false;
  let userEmail = null;
  let userName = null;
  let isFollowing = null;
  let followingCount = 0;
  let followersCount = 0;
  let icon = 'profileIcon.png';
  const token = sessionStorage.getItem('jwt');
  token ? (userEmail = JSON.parse(atob(token.split('.')[1]))?.email) : null;

  if(email && token) {
    if(userEmail === email) {
      isMyProfile = true;
    }
  }
  
  if(get(isAuthenticated) && email) {
    console.log(`http://127.0.0.1:3000/users/following/${email}/check`);
    const resFollowing = await fetch(`http://127.0.0.1:3000/users/following/${email}/check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
        'Content-type': 'application/json; charset=UTF-8'
      },
    });
    if(resFollowing.status === 200) {
      isFollowing = true;
    } else if(resFollowing.status === 204) {
      isFollowing = false;
    }
  }

  let userData;
  if(get(isAuthenticated) && (!email || isMyProfile)) {
    res = await fetch("http://127.0.0.1:3000/articles/user/", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    });

    userData = await fetch(`http://127.0.0.1:3000/users/username/${userEmail}`);
  } else {
    res = await fetch(`http://127.0.0.1:3000/articles/user/${email}`);
  
    userData = await fetch(`http://127.0.0.1:3000/users/username/${email}`);
  }

  userData = await userData.json();
  userName = userData.username;

  if(!res.ok) {
    throw error(res.status);
  }
 
  const data = await res.json();

  if(userEmail && data.length !== 0 && data[0].email === userEmail) {
    isMyProfile = true;
  }

  followingCount = await fetch(`http://127.0.0.1:3000/users/following/${email == null ? userEmail : email}/count`);
  followingCount = await followingCount.json();
  followingCount = followingCount.followingCount;

  followersCount = await fetch(`http://127.0.0.1:3000/users/followers/${email == null ? userEmail : email}/count`);
  followersCount = await followersCount.json();
  followersCount = followersCount.followersCount;

  if(!isMyProfile) {
    res = await fetch(`http://127.0.0.1:3000/users/icon/${email == null ? userEmail : email}`);
    res = await res.json();
    icon = res.icon;
  }

  return {
    articles: data,
    isMyProfile,
    userName,
    profileUserEmail: email,
    isFollowing,
    followingCount,
    followersCount,
    icon
  };
}


