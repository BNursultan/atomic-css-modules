export function constructThemeClass(theme, restClasses) {
  return `${restClasses.join(' ')} ${theme}`
}

export function checkCustomExists(custom, stateMachine) {
  const customThemeNames = custom.map(({ scope }) => scope);

  return Object
    .keys(stateMachine)
    .some(themeName => customThemeNames.includes(themeName));
}
