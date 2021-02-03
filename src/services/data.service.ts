import EventService from "./event.service"
import CookieService from "./cookie.service"
import { getApiContext } from "../config/app.config"

class HttpService {
  private static instance: HttpService

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.initConfigs()
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService()
    }

    return HttpService.instance
  }
  globalOptions: any = {}
  CACHE = {}
  API_CONTEXT = getApiContext()

  /**
   * List of urls to be used in the whole app. Hit api with name of url. Not the exact url.
   * @type [{string:string}]
   */
  static urlMap: any = {
    login: "/doc_login/{username}/{password}/",
    logout: "/user/logout",
    getPatientRecords: "view_patient_records/{username}/{password}/"
  }

  /**
   * Initialize configurations for http client of application
   */
  initConfigs() {
    this.globalOptions = {
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }
    this.API_CONTEXT = getApiContext();
  }

  async getAccessTokenFromStorage() {
    let value:any
    try {
      value = await CookieService.get(this.API_CONTEXT)
    } catch (e) {
      console.error("DataService", e)
    }
    return value ? value.access_token : null
  }

  async getLoggedInUserFromStorage() {
    let value:any
    try {
      value = await CookieService.get(this.API_CONTEXT)
    } catch (e) {
      console.error("DataService", e)
    }
    return value && value.user && !this.isObjectEmpty(value.user) ? JSON.parse(value.user) : null
  }

  async logoutUser() {
    await CookieService.set('user', null);
  }

  async getGlobalOptions() {
    const authToken = await this.getAccessTokenFromStorage()
    if (authToken) {
      return {
        ...this.globalOptions,
        headers: {
          ...this.globalOptions.headers,
          authorization: "Bearer " + (authToken || ""),
        },
      }
    } else {
      return this.globalOptions
    }
  }

  /**
   * Creates a url query param string out of key value pairs provided
   * @param {key: valuePair}
   * @returns {string}
   * encodeQueryData({name: 'promil',age:'100'}) => &name=promil&age=100
   */
  encodeQueryData(data: any) {
    const ret = []
    for (const d in data) {
      if (data[d] !== undefined && data[d] !== null) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]))
      }
    }
    return ret.length ? "?" + ret.join("&") : ""
  }

  /**
   *
   * @param {string} url:  Name of url in this.urlMap
   * @param config  [name: valuePair]
   * @returns {string}
   * urlMap= {deleteUser: '/user/{userId}/delete}; prepare('deleteUser',{userId: 10}) => /user/10/delete
   */
  prepare(url: string, config: any) {
    url = HttpService.urlMap[url] || url
    for (const i in config) {
      if (config.hasOwnProperty(i)) {
        url = url.replace("{" + i + "}", config[i])
      }
    }
    return url
  }

  /**
   * Merge passed query params with global query params . Create a queryParam string from final object
   * @param queryParams
   * @returns {string}
   */
  createQueryParams(queryParams: any) {
    queryParams = { ...queryParams}
    return this.encodeQueryData(queryParams)
  }

  /**
   * Generate an absolute path out of
   * @param {string} url:  name of url in urlMap
   * @param apiParams:     an object containing all api params
   * @param queryParams    an object containing all query params
   * @returns {string}     final absolute path => http://api.com/name?name=promil
   */
  getAbsoluteApiPath(
    url:string,
    apiParams:any,
    queryParams:any,
    config:any = {
      onSocket: false,
    }
  ) {
    const absolutePathTest = new RegExp("^(?:[a-z]+:)?//", "i")

    if (absolutePathTest.test(url)) {
      return this.prepare(url, apiParams) + this.createQueryParams(queryParams)
    } else if (absolutePathTest.test(HttpService.urlMap[url])) {
      return (
        this.prepare(HttpService.urlMap[url], apiParams) +
        this.createQueryParams(queryParams)
      )
    } else {
      let apiBase = ""
      url = this.prepare(url, apiParams)
      apiBase = this.API_CONTEXT
      return apiBase + url + this.createQueryParams(queryParams)
    }
  }

  /**
   * A helper wrapper over angular get method.
   * @param {string} url :  name of path in urlMap
   * @param apiParams:   {'string': value}
   * @param queryParams  {[name: string]: string}
   * @param config   { 'cache': true, 'fake' ?: boolean, 'data'?: any }  whether response to this api should cached
   * @returns {Promise<ArrayBuffer>}
   */
  async get(url: string, apiParams: any, queryParams: any, config: any = {}) {
    // queryParams.time = new Date().getTime();
    const globalOptions = await this.getGlobalOptions()
    const options = { ...globalOptions, ...config }
    const parsedUrl = this.getAbsoluteApiPath(
      url,
      apiParams,
      queryParams,
      config
    )
    if (config && config.fake) {
      return this.getFakeResponse(
        config.data,
        config.timeout || 2000,
        config.shouldReject
      )
    }
    return this._get(parsedUrl, options)
  }

  /**
   * Internal method. Make a get http call. parse response. handle errors.
   * @param url
   * @param options
   * @returns {Promise<never | ArrayBuffer>}
   * @
   */
  _get(url: string, options: any) {
    const optionsToSubmit = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      ...options,
    }
    return fetch(url, optionsToSubmit)
      .then(res => {
        return res
          .json()
          .then(json => {
            return {
              extractedResp: json,
              res,
            }
          })
          .then(({ extractedResp, res }) => {
            return this.extractData(res, options, extractedResp)
          })
          .catch(err => {
            return this.handleError(err, options)
          })
      })
      .catch(err => {
        try {
          return this.handleError(err, options)
        } catch (e) {
          console.error(e)
        }
      })
  }

  /**
   * Wrapper function over angular post method
   * @param {string} url
   * @param apiParams
   * @param body
   * @param config
   * @returns {Promise<never | ArrayBuffer>}
   */
  async post(url:string, apiParams:any, body:any, config:any) {
    const formData = new FormData()
    const isUploadingAFile = config && config.fileUpload === true
    const parsedUrl = this.getAbsoluteApiPath(url, apiParams, {}, config)
    const globalOptions = await this.getGlobalOptions()
    const options = { ...globalOptions, ...config }

    if (options && options.fake) {
      return this.getFakeResponse(
        options.data,
        options.timeout || 2000,
        options.shouldReject
      )
    }

    if (isUploadingAFile) {
      // browser will automatically detect content type and set appropriate multipart boundary
      delete options.headers["Content-Type"]
      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key])
        }
      }
    }

    return fetch(parsedUrl, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      ...options,
      body: isUploadingAFile ? formData : JSON.stringify(body), // body data type must match "Content-Type" header
    })
      .then(res => {
        return res.json().then(json => {
          return {
            extractedResp: json,
            res,
          }
        })
      })
      .then(({ extractedResp, res }) =>
        this.extractData(res, options, extractedResp)
      )
      .catch(err => {
        return this.handleError(err, options)
      })
  }

  /**
   * Wrapper function over angular put method
   * @param {string} url
   * @param apiParams
   * @param body
   * @param config
   * @returns {Promise<never | ArrayBuffer>}
   */
  async put(url:any, apiParams:any, body:any, config?:any) {
    // queryParams.time = new Date().getTime();
    const globalOptions = await this.getGlobalOptions()
    const options = { ...globalOptions, ...config }
    const parsedUrl = this.getAbsoluteApiPath(url, apiParams, {}, config)
    return fetch(parsedUrl, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      ...options,
      body: JSON.stringify(body),
    })
      .then(res => {
        return res.json().then(json => {
          return {
            extractedResp: json,
            res,
          }
        })
      })
      .then(({ extractedResp, res }) =>
        this.extractData(res, options, extractedResp)
      )
      .catch(err => {
        return this.handleError(err, options)
      })
  }

  /**
   * Wrapper function over angular put method
   * @param {string} url
   * @param apiParams
   * @param body
   * @param config
   * @returns {Promise<never | ArrayBuffer>}
   */
  patch(url:any, apiParams:any, body:any, config:any) {
    const parsedUrl = this.getAbsoluteApiPath(url, apiParams, {}, config)
    const options = Object.assign({}, this.getGlobalOptions(), ...config)
    return fetch(parsedUrl, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      ...options,
      body: JSON.stringify(body),
    })
      .then(res => {
        return res.json().then(json => {
          return {
            extractedResp: json,
            res,
          }
        })
      })
      .then(({ extractedResp, res }) =>
        this.extractData(res, options, extractedResp)
      )
      .catch(err => {
        return this.handleError(err, options)
      })
  }

  async delete(url:any, apiParams:any, config:any) {
    const globalOptions = await this.getGlobalOptions()
    const parsedUrl = this.getAbsoluteApiPath(url, apiParams, {}, config)
    const options = { ...globalOptions, ...config }
    return fetch(parsedUrl, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      ...options,
    })
      .then(res => {
        return res.json().then(json => {
          return {
            extractedResp: json,
            res,
          }
        })
      })
      .then(({ extractedResp, res }) =>
        this.extractData(res, options, extractedResp)
      )
      .catch(err => {
        return this.handleError(err, options)
      })
  }

  /**
   * Handle http response received. Code 0 means successful response. Any other code means error in response
   * @param res
   * @param config
   * @returns {any}
   */

  extractData(originalResponse:any, config:any, extractedResponse:any) {
    config = config || {}

    /** workaround for non rest api, ONLY DEMO PURPOSE */
    return extractedResponse;
    /** workaround for non rest api, ONLY DEMO PURPOSE */

    if (originalResponse && originalResponse.status >= 400) {
      /**
       * Anything other then code 0 throws an error. Will be handled by handleError method
       */
      throw { ...extractedResponse, status: originalResponse.status }
    } else if (extractedResponse.code !== 0) {
      throw { ...extractedResponse, status: originalResponse.status }
    } else {
      let canShowMessage = false
      if (
        Object.hasOwnProperty.call(config, "showMessage") &&
        config.showMessage === true
      ) {
        canShowMessage = true
      }

      if (canShowMessage && extractedResponse.message) {
        this.openSnackBar("", extractedResponse.message, "success")
      }
      return extractedResponse
    }
  }

  async handleError(error:any, config:any) {
    try {
      config = config || {}

      /**
       * By default 401 error redirects to login page. But if already on login page, use this flag to prevent redirect loop
       */
      if (!config.hasOwnProperty("redirectOn401")) {
        config.redirectOn401 = true
      }

      const statusText = error.statusText,
        errorMessage = error.body

      let canShowMessage = true
      if (
        Object.hasOwnProperty.call(config, "showMessage") &&
        config.showMessage === false
      ) {
        canShowMessage = false
      }

      if (canShowMessage) {
        this.openSnackBar(
          statusText,
          errorMessage ||
            error.message ||
            error.status ||
            "Something went wrong!",
          "error"
        )
      }

      if (error.status === 401 && config.redirectOn401) {
        await this.triggerLogoutAction()
      }
    } catch (e) {
      console.error(e)
    }
  }

  async triggerLogoutAction() {
    try {
      EventService.dispatch("LOGOUT", {})
    } catch (e) {
      console.error(e)
    }
  }

  getMessageFromList(error:any) {
    const list = error.validationErrors || error.validationErrorList || []
    if (list && list.length) {
      return list[0].message
    } else {
      return ""
    }
  }

  /**
   * A wrapper over angular toast method to show success and error toasts to users
   * @param {...messageKeys}
   * @param config
   */
  openSnackBar(title:string, message:string, variant:any) {
    EventService.dispatch("toast", {
      title,
      message,
      variant,
    })
  }

  getFakeResponse(data:any, timeout: number, shouldReject:boolean) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (typeof shouldReject === "boolean" && !shouldReject) {
          reject(data)
        } else {
          resolve(data)
        }
      }, timeout)
    })
  }

  isObjectEmpty = (empty: any) => {
    return Object.keys(empty).length === 0 && empty.constructor === Object
  }
}

const DataService = HttpService.getInstance()
export default DataService
