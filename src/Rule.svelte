<script>
  import { currentRule, target } from "./stores";
  import { styleWith } from "./styles";
  import { getClassName } from "./utils";

  export let rule;
</script>

<li
  class={styleWith("cursor-pointer flex items-start font-mono font-hairline text-sm py-1 px-2 hover:bg-gray-600")}
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
