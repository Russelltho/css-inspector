<script>
	import Inspector from "./Inspector.svelte";
	import Selector from "./Selector.svelte";

	// TODO Make this false by default
	let active = true; // false;
	let target;

	function handleKeydown(event) {
	  const { key } = event;

	  if (key === "/") {
	    active = true;
	    event.preventDefault();
	  }

	  if (key === "Escape") {
	    if (target) {
	      target = null;
	    } else if (active) {
	      active = false;
	    }
	  }
	}
</script>

<svelte:window on:load={() => target = document.querySelector("button")} on:keydown={handleKeydown}/>

{#if active}
	{#if target}
		<Inspector target={target} />
	{:else}
		<Selector bind:value={target} />
	{/if}
{/if}
