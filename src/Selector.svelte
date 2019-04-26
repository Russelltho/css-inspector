<script>
  export let value = null;

  let rect;

  function handleClick(event) {
    value = event.target;
  }

  function handleMouseMove(event) {
    const { target } = event;

    if (
      // Ignore html,body
      [document.documentElement, document.body].includes(target) ||
      target.closest("#inspector")
    ) {
      rect = null;

      return;
    }

    rect = target.getBoundingClientRect();
  }
</script>

<svelte:window on:click={handleClick} on:mousemove={handleMouseMove} />

{#if rect}
  <div
    class="fixed pin-t pin-l w-full h-full bg-grey-darker opacity-50 pointer-events-none text-black"
    style="transition: all 200ms ease-in-out; clip-path: polygon(0 0, 100% 0, 100% 100%, {rect.right}px 100%, {rect.right}px {rect.top}px, {rect.left}px {rect.top}px, {rect.left}px {rect.bottom}px, {rect.right}px {rect.bottom}px, {rect.right}px 100%, 0 100%)"
  />
{/if}
