export function checkColorPreferences() {
  let itIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return itIsDark ? true : false;
}
