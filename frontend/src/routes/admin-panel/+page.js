import { error } from '@sveltejs/kit';
import { isAdmin } from '../../stores.js';
import { get } from 'svelte/store';

export async function load({ fetch }) {
  if(!get(isAdmin)) {
    throw error(403, 'no access');
  }

  const res = await fetch("http://127.0.0.1:3000/users");

  if(!res.ok) {
    throw error(res.status);
  }
    
  const users = await res.json();

  return {
    users
  };
}