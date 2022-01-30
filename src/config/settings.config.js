/**
 * @author antinew 2357729423@qq.com
 * @description Application base settings
 * @date 2022-01-08 20:59:29
 */
module.exports = {
  /**
   * @type {string} 'MegicBox'
   * @description Html page title
   */
  title: "MegicBox for Antinew",
  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorEnv: ["production", "development"],
  /**
   * @type {boolean} true | false
   * @description Wheter open login interceptor
   */
  loginInterception: true,

  /**
   * @type {number}
   * @description Message disappears times(ms)
   */
  messageDuration: 3000,
  /**
   * @type {boolean} true | false
   * @description Whether show progress bar in loading
   */
  showProgressBar: true,
  /**
   * @type {boolean} true | false
   * @description Text displayed when loading
   */
  loadingText: "loading...",

  /**
   * @type {number}
   * @description vue-router keep-alive component max alive routes
   */
  keepAliveMaxNum: 99,
  /**
   * @type {string}  'history' | 'hash'
   * @description vue-router route mode
   */
  routerMode: "hash",
  /**
   * @type {array} ['401', '404']
   * @description vue-router routes white list
   * Members of the list do not need to be authenticated to reach them
   */
  routesWhiteList: ["/login", "/register", "/404", "/401"],
  /**
   * @type {boolean} true | false
   * @description Token expired to login page, whether return to the original route after re-login
   */
  recordRoute: false,

  /**
   * @type {string}
   * @description Token name
   */
  tokenName: "accessToken",
  /**
   * @type {string}
   * @description Token name
   */
  refreshTokenName: "accessToken",
  /**
   * @type {string} 'localStorage' | 'sessionStorage' | 'cookie'
   * @description Token storage space
   */
  tokenStorage: "localStorage",

  copyright: "2022 Antinew, All rights reserved.",
};
