import { tokenName, tokenStorage } from "@/config";
import Cookies from "js-cookie";

/**
 * @author antinew 2357729423@qq.com
 * @description Get the access token, default take from local tokenName
 * @returns {string}
 */
export function getAccessToken() {
  if (tokenStorage === "localStorage") {
    return localStorage.getItem(tokenName);
  }
  if (tokenStorage === "sessionStorage") {
    return sessionStorage.getItem(tokenName);
  }
  if (tokenStorage === "cookie") {
    return Cookies.get(tokenName);
  }

  return localStorage.getItem(tokenName);
}

/**
 * @author antinew 2357729423@qq.com
 * @description Store the access token
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (tokenStorage === "localStorage") {
    return localStorage.setItem(tokenName, accessToken);
  }
  if (tokenStorage === "sessionStorage") {
    return sessionStorage.setItem(tokenName, accessToken);
  }
  if (tokenStorage === "cookie") {
    return Cookies.set(tokenName, accessToken);
  }
  return localStorage.setItem(tokenName, accessToken);
}

/**
 * @author antinew 2357729423@qq.com （不想保留author可删除）
 * @description Remove the access token
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (tokenStorage === "localStorage") {
    return localStorage.removeItem(tokenName);
  }
  if (tokenStorage === "sessionStorage") {
    return sessionStorage.removeItem(tokenName);
  }
  if (tokenStorage === "cookie") {
    return Cookies.remove(tokenName);
  }
  return localStorage.removeItem(tokenName);
}
