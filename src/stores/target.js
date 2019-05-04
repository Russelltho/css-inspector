import { writable } from "svelte/store";

// TODO make this null by default
export default writable(document.querySelector("button"));
