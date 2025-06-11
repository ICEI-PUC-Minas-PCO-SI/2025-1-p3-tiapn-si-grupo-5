import Cookies from "js-cookie";

export function authHeaders(headers: Record<string, string> = {}) {
  const token = Cookies.get("token");
  return token
    ? { ...headers, Authorization: `Bearer ${token}` }
    : headers;
}