import { writable } from 'svelte/store';

export const jwtToken = writable<string>('');
export const usernameStore = writable<string>('');