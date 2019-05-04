<script>
  import { fly } from "svelte/transition";

  import { onMount } from "svelte";
  import Rule from "./Rule.svelte";

  export let target;

  let position = 0;
  let query = "";
  let search;

  onMount(() => {
    document.body.style.transition = "margin-right 300ms";
    document.body.style.marginRight = "16rem";
    search.focus();
  });

  function transitionBody() {
    document.body.style.marginRight = "inherit";
  }

  const tailwind = Array.from(document.styleSheets).find(styleSheet =>
    styleSheet.href.includes("tailwind")
  );

  const cssRules = Array.from(tailwind.cssRules)
    .filter(cssRule => {
      if (cssRule.type !== 1) {
        return false;
      }

      if (!cssRule.selectorText.startsWith(".")) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const [aString, aNumber] = a.selectorText.split(/(\d+$)/);
      const [bString, bNumber] = b.selectorText.split(/(\d+$)/);

      return aString.localeCompare(bString) || aNumber - bNumber;
    });

  // This is computed based on query
  $: filtered = cssRules.filter(cssRule => {
    if (!query) {
      return true;
    }

    const tokens = query
      .split(" ")
      .map(fragment => fragment.trim())
      .filter(Boolean);

    if (!tokens.includes("-") && cssRule.selectorText.startsWith(".-")) {
      return false;
    }

    if (!tokens.includes("focus") && cssRule.selectorText.startsWith(".focus")) {
      return false;
    }
    if (!tokens.includes("hover") && cssRule.selectorText.startsWith(".hover")) {
      return false;
    }

    const matchesQuery = tokens.every(fragment =>
      cssRule.cssText.includes(fragment)
    );

    if (!matchesQuery) {
      return false;
    }

    return true;
  });

  // Computed based on cssRules
  $: matching = filtered.filter(cssRule => target.matches(cssRule.selectorText));

  // Computed by cssRules + position
  $: selected = matching.concat(filtered)[position];

  function handleKeyDown(event) {
    const { key } = event;

    if (key === "Enter") {
      const className = selected.selectorText.slice(1);
      const changing = String(Object.values(selected.style));

      for (const existing of target.classList) {
        const cssRule = cssRules.find(
          cssRule => cssRule.selectorText.slice(1) === existing
        );

        if (
          cssRule &&
          className !== existing &&
          String(Object.values(selected.style)) ===
            String(Object.values(cssRule.style))
        ) {
          target.classList.toggle(existing);
        }
      }

      target.classList.toggle(className);

      // Force re-assignment & updating
      query = "";
      target = target;
    }

    if (key === "ArrowUp") {
      position = Math.max(position - 1, 0);
    }

    if (key === "ArrowDown") {
      position = Math.min(cssRules.length, position + 1);
    }
  }

  function handleSearch(event) {
    const value = event.target.value.trim().toLowerCase();

    if (query !== value) {
      position = 0;
      query = event.target.value;
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<aside
  class="h-full w-64 flex flex-col bg-grey-darkest fixed pin-b pin-r text-white shadow-lg border-l"
  transition:fly="{{ x: 255, duration: 300 }}"
  on:outrostart={transitionBody}
>
  <input
    bind:this={search}
    bind:value={query}
    class="shadow-md bg-grey-darker focus:bg-white border-transparent focus:border-blue-light p-2 static"
    focus
    on:keyup={handleSearch}
    placeholder='Search...'
  />

  <ul class="py-2 list-reset overflow-auto">
    {#each matching as rule (rule.selectorText)}
      <Rule {rule} {selected} {target} />
    {/each}

    <li class="text-xs opacity-50 px-2 py-1 my-2 tracking-wide bg-black">
      All Rules
    </li>

    {#each filtered as rule (rule.selectorText)}
      <Rule {rule} {selected} {target} />
    {/each}
  </ul>
</aside>
