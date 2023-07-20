export function checkColorPreferences() {
  let isItDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isItDark ? "dark" : "light";
}
