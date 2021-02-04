class CookieService {
  private static instance: CookieService

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): CookieService {
    if (!CookieService.instance) {
      CookieService.instance = new CookieService()
    }

    return CookieService.instance
  }

  async set(name: string, value: any, expireInDays: number = -1) {
    let expireInString = ""
    if (expireInDays !== -1) {
      const date = new Date()
      date.setTime(date.getTime() + expireInDays * 24 * 60 * 60 * 1000)
      expireInString = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expireInString + "; path=/"
  }

  async get(name: any) {
    return new Promise((resolve, reject) => {
      try {
        const cookies = document.cookie
          .split("; ")
          .reduce((prev: any, current: any) => {
            const [name, value] = current.split("=")
            prev[name] = value
            return prev
          }, {})
        resolve(cookies)
      } catch (e) {
        reject(e)
      }
    })
  }

  async clearAll() {
    return new Promise((resolve, reject) => {
      const cookies = document.cookie.split("; ")
      for (let c = 0; c < cookies.length; c++) {
        const d = window.location.hostname.split(".")
        while (d.length > 0) {
          const cookieBase =
            encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
            "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
            d.join(".") +
            " ;path="
          const p = window.location.pathname.split("/")
          document.cookie = cookieBase + "/"
          while (p.length > 0) {
            document.cookie = cookieBase + p.join("/")
            p.pop()
          }
          d.shift()
        }
      }
      resolve(cookies)
    })
  }
}

const cookieService = CookieService.getInstance()
export default cookieService
