<script>
	import Inspector from "./Inspector.svelte";
	import Selector from "./Selector.svelte";
	import { active, target } from "./stores";

	function handleKeydown(event) {
	  const { key } = event;

	  if (key === "/") {
	    event.preventDefault();
	    $active = true;
	  }

	  if (key === "Escape") {
	    // Cancel out of Inspector
	    if ($target) {
	      $target = null;
	      return;
	    }

	    // Cancel out of Selector
	    if ($active) {
	      $active = false;
	      return;
	    }
	  }
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if $active}
	{#if $target}
		<Inspector target={$target} />
	{:else}
		<Selector />
	{/if}
{/if}
