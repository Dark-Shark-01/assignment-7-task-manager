const TOKEN_KEY = "taskflow_auth_token";
const USER_KEY = "taskflow_user";

export const storage = {
  getToken() {
    return (
      localStorage.getItem(TOKEN_KEY) ||
      sessionStorage.getItem(TOKEN_KEY)
    );
  },

  setToken(token, remember = false) {
    const target = remember ? localStorage : sessionStorage;

    target.setItem(TOKEN_KEY, token);

    const secondary = remember ? sessionStorage : localStorage;
    secondary.removeItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },

  getUser() {
    const user =
      localStorage.getItem(USER_KEY) ||
      sessionStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  setUser(user, remember = false) {
    const target = remember ? localStorage : sessionStorage;

    target.setItem(USER_KEY, JSON.stringify(user));

    const secondary = remember ? sessionStorage : localStorage;
    secondary.removeItem(USER_KEY);
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  clear() {
    this.removeToken();
    this.removeUser();
  },
};