<script>
  export let rule;
  export let selected;
  export let target;
</script>

<li class="flex items-start font-mono font-hairline text-xs py-1 px-2 {rule === selected ? "bg-grey-dark" : ""}">
  <input checked={target.matches(rule.selectorText)} class="mr-2" type="checkbox" />

  <label>
    {rule.selectorText.slice(1).replace('\\', "").replace(':hover', "")}

    {#if rule === selected}
      <code class="mt-1 block opacity-75">
        {rule.cssText.replace(rule.selectorText, "").trim()}
      </code>
    {/if}
  </label>
</li>
