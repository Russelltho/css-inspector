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

<svelte:window on:keydown={handleKeydown}/>

<div id="root" class="bg-teal-lightest min-h-screen">
	<main class="py-6">
		<div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
			<div class="sm:flex sm:items-center px-6 py-4">
				<img class="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="https://github.com/ericclemmons.png" alt="">
				<div class="text-center sm:text-left sm:flex-grow">
					<div class="mb-4">
						<p class="text-xl leading-tight">Eric Clemmons</p>
						<p class="text-sm leading-tight text-grey-dark">Developer at Starbucks Coffee Company.</p>
					</div>
					<div>
						<button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Message</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

{#if active}
	{#if target}
		<Inspector target={target} />
	{:else}
		<Selector bind:value={target} />
	{/if}
{/if}
