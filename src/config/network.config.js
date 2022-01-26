/**
 * @author antinew 2357729423@qq.com
 * @description Network configurations
 * @date 2022-01-08 18:54:42
 */
module.exports = {
  /**
   * @type {string} 'application/json;charset=UTF-8' | 'application/x-www-form-urlencoded;charset=UTF-8'
   * @description The content type for send the request
   */
  contentType: "application/json;charset=UTF-8",
  /**
   * @type {number}
   * @description Request timeout times(ms)
   */
  requestTimeout: 3000,
  /**
   * @type {array} [200, 201, 202]
   * @description Status code for successful response.
   * Any other response will be goto the response handler.
   * If you want to configure more success code, can pass [200, 201, ..]
   */
  successCode: [200],
  unauthorized: 401,
  forbidden: 403,
  nofind: 404,
};
