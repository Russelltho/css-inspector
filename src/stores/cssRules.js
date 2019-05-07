import { readable } from "svelte/store";

const sheets = Array.from(document.styleSheets);

// TODO Potentially limit by `data-sheet-with=".bg-purple"` or something
// .find(styleSheet => styleSheet.href.includes("tailwind") );

const cssRules = sheets
  .reduce((acc, sheet) => {
    return acc.concat(Array.from(sheet.cssRules));
  }, [])
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
