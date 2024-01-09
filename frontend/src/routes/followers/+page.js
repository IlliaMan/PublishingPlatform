import { error } from '@sveltejs/kit';

export async function load({ fetch, url }) {
  const email = url.searchParams.get('email');
  const userName = url.searchParams.get('username');
  let response = await fetch(`http://localhost:3000/users/followers/list/${email}`);
  if(!response.ok) {
    throw error(response.status);
  }
  response = await response.json();
  return {
    followers: response.followers,
    email,
    userName
  };
}