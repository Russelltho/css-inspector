export const getClassName = cssRule => {
  // shover\:text-purple:hover
  return cssRule.selectorText
    .slice(1)
    .replace("\\:", ":")
    .replace(/:active$/, "")
    .replace(/:focus$/, "")
    .replace(/:hover$/, "");
};
