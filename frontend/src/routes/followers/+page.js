import { error } from '@sveltejs/kit';

export async function load({ fetch, url }) {
  const email = url.searchParams.get('email');
  const userName = url.searchParams.get('username');
  let followers = [];
  let response = await fetch(`http://localhost:3000/users/followers/list/${email}`);
  if(!response.ok) {
    throw error(response.status);
  }
  response = await response.json();
  followers = response.followers;

  followers = followers.map(item => ({ email: item }));
  followers.forEach(async (item, index) => {
    response = await fetch(`http://localhost:3000/users/icon/${item.email}`);
    response = await response.json();
    followers[index].icon = response.icon;
  });

  await Promise.all(followers.map(async (user, index) => {
    response = await fetch(`http://localhost:3000/users/username/${user.email}`);
    response = await response.json();
    followers[index].username = response.username;
  }));

  return {
    followers,
    email,
    userName
  };
}