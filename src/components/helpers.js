export function constructThemeClass(theme, restClasses) {
  return `${restClasses.join(' ')} ${theme}`
}

export function checkCustom(custom, stateMachine) {
  const customThemeNames = custom.map(({ scope }) => scope);

  return Object
    .keys(stateMachine)
    .some(themeName => customThemeNames.includes(themeName));
}
