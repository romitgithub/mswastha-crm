declare const process: any

export let APP_UI_CONFIG = {
  apiHost: "",
  apiContext: process.env.API_CONTEXT,
  localStorageCacheExpiry: 15 * 60 * 1000,
  refreshTimes: { SYSTEM_HEALTH: 60 * 1000 },
  FALLBACK_CONFIG: {},
}

export function getApiContext() {
  console.log(process.env)
  const isProd = process.env.ENVIRONMENT === "production"
  if (isProd) {
    return process.env.REACT_APP_API_CONTEXT
  } else {
    if (typeof window !== "undefined") {
      return window &&
        window.localStorage &&
        window.localStorage.getItem("backend")
        ? localStorage.getItem("backend")
        : process.env.REACT_APP_API_CONTEXT
    } else {
      return process.env.REACT_APP_API_CONTEXT
    }
  }
}
