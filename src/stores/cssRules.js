import { readable } from "svelte/store";

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

export default readable(cssRules);
