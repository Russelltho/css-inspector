<script>
  import { currentRule, target } from "./stores";

  import { getClassName } from "./utils";

  export let rule;
</script>

<li
  class="cursor-pointer flex items-start font-mono font-hairline text-xs py-1 px-2 hover:bg-grey-dark"
  on:mouseenter={() => $currentRule = rule}
  on:mouseleave={() => $currentRule = null}
  on:click
>
  <label class="cursor-pointer">
    {getClassName(rule)}

    {#if rule === $currentRule}
      <code class="mt-1 block opacity-75">
        {rule.cssText.replace(rule.selectorText, "").trim()}
      </code>
    {/if}
  </label>
</li>
