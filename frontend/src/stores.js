import { writable } from "svelte/store";
import { browser } from "$app/environment";
import getEmailFromJWT from "$lib/functions/getEmailFromJWT";
import getIconFromJWT from "$lib/functions/getIconFromJWT";
import getIsAdminFromJWT from "$lib/functions/getIsAdminFromJWT";

const jwt = browser && sessionStorage.getItem('jwt');
export const isAuthenticated = writable(jwt ? true : false);
export const isAdmin = writable(jwt ? getIsAdminFromJWT(jwt) : false);
export const profileIcon = writable(jwt ? getIconFromJWT(jwt) : 'profileIcon.png');
export const userEmail = writable(jwt ? getEmailFromJWT(jwt) : null);