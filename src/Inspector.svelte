<script>
  import { fade } from "svelte/transition";

  let cssRules = [];
  let focusBox;
  let inspector;
  let searchInput;
  let target;
  let targetRect;

  function handleKeydown(event) {
    const { key } = event;

    if (key === "/") {
      searchInput.focus();
      event.preventDefault();
    }

    if (key === "Escape") {
      searchInput.blur();
    }
  }

  function handleMouseOver(event) {
    // Ignore html,body
    if (
      [document.documentElement, document.body].includes(event.target) ||
      event.target.closest("#inspector")
    ) {
      target = null;
      targetRect = null;

      return;
    }

    target = event.target;
    targetRect = target.getBoundingClientRect();
  }

  function loadClassNames() {
    const tailwind = Array.from(document.styleSheets).find(styleSheet =>
      styleSheet.href.includes("tailwind")
    );

    cssRules = Array.from(tailwind.cssRules)
      .filter(
        cssRule => cssRule.type === 1 && cssRule.selectorText.startsWith(".")
      )
      .sort((a, b) => a.selectorText.localeCompare(b.selectorText));
  }

  function findRulesForTarget(target) {
    const classes = Array.from(target.classList);
    const matching = cssRules.filter(cssRule =>
      classes.includes(cssRule.selectorText.slice(1))
    );

    console.log(matching);

    return matching;
  }
</script>

<svelte:window on:load={loadClassNames} on:mouseover={handleMouseOver} on:keydown={handleKeydown}/>

{#if target}
  <div
    bind:this={focusBox}
    class="fixed pin-t pin-l w-full h-full bg-grey-darker opacity-50 pointer-events-none text-black"
    style="transition: all 200ms ease-out; clip-path: polygon(0 0, 100% 0, 100% 100%, {targetRect.right}px 100%, {targetRect.right}px {targetRect.top}px, {targetRect.left}px {targetRect.top}px, {targetRect.left}px {targetRect.bottom}px, {targetRect.right}px {targetRect.bottom}px, {targetRect.right}px 100%, 0 100%)"
    transition:fade
  />

  <aside
    id="inspector"
    class="bg-grey-darkest fixed pin-b pin-r text-white m-6 shadow-md p-2 rounded w-64"
    transition:fade
  >
    <input bind:this={searchInput} class="w-full bg-grey-darker focus:bg-white border-transparent focus:border-blue-light" placeholder='Search ("/")'>

    <ul>
    {#each findRulesForTarget(target) as cssRule (cssRule.selectorText)}
      <li>{cssRule.selectorText}</li>
    {/each}
    </ul>
  </aside>
{/if}


