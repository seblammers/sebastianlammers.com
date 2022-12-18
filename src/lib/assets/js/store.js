import { writable, get } from 'svelte/store';
import { browser } from '$app/env';

// if I ever need to put something in localStorage:
const storage = (key, initValue) => {
    const store = writable(initValue);
    // make sure it's not running on the server
    if (!browser) return store;

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

    store.subscribe((val) => {
        if ([null, undefined].includes(val)) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, JSON.stringify(val))
        }
    })

    window.addEventListener('storage', () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue = JSON.parse(storedValueStr)
        if (localValue !== get(store)) store.set(localValue);
    });

    return store;
}
// This can be used like this:

// import storage from '$lib/assets/js/store'
//
// export const auth = storage("auth", { jwt: "" })


export default storage;
export const currentPage = writable('')
export const isMenuOpen = writable(false)