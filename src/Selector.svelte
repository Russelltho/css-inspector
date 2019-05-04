<script>
  import { target } from "./stores";

  function isEligible(node) {
    return (
      // Ignore html,body
      ![document.documentElement, document.body].includes(node) &&
      // Ignore the inspector itself
      !node.closest("#inspector")
    );
  }

  let rect;

  function handleClick(event) {
    if (isEligible(event.target)) {
      $target = event.target;
    }
  }

  function handleMouseMove(event) {
    rect = isEligible(event.target) ? event.target.getBoundingClientRect() : null;
  }
</script>

<svelte:window on:click={handleClick} on:mousemove={handleMouseMove} />

{#if rect}
  <div
    class="fixed pin-t pin-l w-full h-full bg-grey-darker opacity-50 pointer-events-none text-black"
    style="transition: all 200ms ease-in-out; clip-path: polygon(0 0, 100% 0, 100% 100%, {rect.right}px 100%, {rect.right}px {rect.top}px, {rect.left}px {rect.top}px, {rect.left}px {rect.bottom}px, {rect.right}px {rect.bottom}px, {rect.right}px 100%, 0 100%)"
  />
{/if}
