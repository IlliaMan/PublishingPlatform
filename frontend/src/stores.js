import { writable } from "svelte/store";

export const isAuthenticated = writable(sessionStorage.getItem('jwt') ? true : false);
export const isAdmin = writable(false);