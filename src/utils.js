export const getClassName = cssRule => {
  // .hover\:text-purple:hover
  // => hover:text-purple
  return cssRule.selectorText
    .replace(/^\./, "")
    .replace("\\:", ":")
    .replace(/:active$/, "")
    .replace(/:focus$/, "")
    .replace(/:hover$/, "");
};
