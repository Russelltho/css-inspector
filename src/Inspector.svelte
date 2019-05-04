<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import Rule from "./Rule.svelte";
  import { cssRules, currentRule, query, target } from "./stores";
  import { getClassName } from "./utils";

  let search;

  // Track which rule we're previewing, so we can toggle the class effectively
  let previousRule;
  let existingClasses = [];

  // TODO Should these go on custom $target store?
  function addClassName(className) {
    get(target).classList.add(className);
    existingClasses = [...get(target).classList].sort();
  }
  function removeClassName(className) {
    get(target).classList.remove(className);
    existingClasses = [...get(target).classList].sort();
  }

  $: existingRules = existingClasses
    .map(className => {
      return $cssRules.find(cssRule => className === getClassName(cssRule));
    })
    .filter(Boolean);

  target.subscribe(newTarget => {
    existingClasses = newTarget ? [...newTarget.classList].sort() : [];
  });

  currentRule.subscribe(newRule => {
    // Reset the classes back to how they were
    if (previousRule) {
      const className = getClassName(previousRule);

      if (existingClasses.includes(className)) {
        get(target).classList.add(className);
      } else {
        get(target).classList.remove(className);
      }
    }

    // Preview the new rule
    if (newRule) {
      const className = getClassName(newRule);

      if (existingClasses.includes(className)) {
        get(target).classList.remove(className);
      } else {
        get(target).classList.add(className);
      }
    }

    // Save so we can toggle it again
    previousRule = newRule;
  });

  onMount(() => {
    document.body.style.transition = "margin-right 300ms";
    document.body.style.marginRight = "16rem";
    search.focus();
  });

  function toggleCurrentRule() {
    const className = getClassName($currentRule);

    if (existingClasses.includes(className)) {
      removeClassName(className);
    } else {
      addClassName(className);
    }

    $query = "";
    search.focus();
  }

  function transitionBody() {
    document.body.style.marginRight = "inherit";
  }

  // This is computed based on query
  $: filtered = $cssRules.filter(cssRule => {
    if (!$query) {
      return true;
    }

    const tokens = $query
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

  function handleKeyDown(event) {
    const { key } = event;

    if (key === "/") {
      search.focus();
    }

    if (key === "Enter") {
      toggleCurrentRule();
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
    bind:value={$query}
    class="shadow-md bg-grey-darker focus:bg-white border-transparent focus:border-blue-light p-2 static"
    focus
    placeholder='Search...'
  />

  <ul class="py-2 list-reset overflow-auto">
    {#each existingRules as rule (rule.selectorText)}
      <Rule {rule} on:click={toggleCurrentRule} />
    {/each}

    <li class="text-xs opacity-50 px-2 py-1 my-2 tracking-wide bg-black">
      All Rules
    </li>

    {#each filtered as rule (rule.selectorText)}
      <Rule {rule} on:click={toggleCurrentRule} />
    {/each}
  </ul>
</aside>
