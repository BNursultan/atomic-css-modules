export function constructThemeClass(theme, restClasses) {
  return `${restClasses.join(' ')} ${theme}`
}

export const themeMap = {
  'default': {
    asyncImport: () => import(/* webpackChunkName: "default-theme" */ './atomics/default')
  },
  'dark': {
    asyncImport: () => import(/* webpackChunkName: "dark-theme" */ './atomics/dark')
  }
}
