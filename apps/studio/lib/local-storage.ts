import { LOCAL_STORAGE_KEYS } from 'lib/constants'

const LOCAL_STORAGE_KEYS_ALLOWLIST = [
  'graphiql:theme',
  'theme',
  'biobaseDarkMode',
  'biobase.dashboard.auth.debug',
  'biobase.dashboard.auth.navigatorLock.disabled',
  LOCAL_STORAGE_KEYS.TELEMETRY_CONSENT,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_API_SIDE_PANEL,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_NAVIGATION_LAYOUT,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_CLS,
  LOCAL_STORAGE_KEYS.LAST_SIGN_IN_METHOD,
]

export function clearLocalStorage() {
  for (const key in localStorage) {
    if (!LOCAL_STORAGE_KEYS_ALLOWLIST.includes(key)) {
      localStorage.removeItem(key)
    }
  }
}
