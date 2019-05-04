import { readable, writable } from "svelte/store";

// TODO Make this false by default
export const active = writable(true);

// TODO make this null by default
export const target = writable(document.querySelector("button"));
