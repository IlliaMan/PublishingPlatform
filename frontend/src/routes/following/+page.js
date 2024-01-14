import { error } from '@sveltejs/kit';

export async function load({ fetch, url }) {
  const email = url.searchParams.get('email');
  const userName = url.searchParams.get('username');
  let following = [];
  let response = await fetch(`http://localhost:3000/users/following/list/${email}`);
  if(!response.ok) {
    throw error(response.status);
  }
  response = await response.json();
  following = response.following;

  following = following.map(item => ({ email: item }));
  following.forEach(async (item, index) => {
    response = await fetch(`http://localhost:3000/users/icon/${item.email}`);
    response = await response.json();
    following[index].icon = response.icon;
  });

  return {
    following,
    email,
    userName
  };
}