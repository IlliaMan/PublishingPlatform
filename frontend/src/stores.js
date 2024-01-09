import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const isAuthenticated = writable(browser && sessionStorage.getItem('jwt') ? true : false);
export const isAdmin = writable(false);
export const userEmail = writable(null);