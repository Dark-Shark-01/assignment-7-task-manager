import { useMemo, useState } from "react";

import { generateToken, validateToken } from "../utils/jwt";
import { storage } from "../utils/storage";
import { AuthContext } from "./auth-context";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "Admin@123";

const getInitialAuthState = () => {
  const storedToken = storage.getToken();

  if (!storedToken) {
    return {
      user: null,
      token: null,
    };
  }

  const validation = validateToken(storedToken);

  if (!validation.valid) {
    storage.clear();

    return {
      user: null,
      token: null,
    };
  }

  return {
    user: validation.payload,
    token: storedToken,
  };
};

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getInitialAuthState);

  const login = (username, password, remember = false) => {
    if (!username.trim()) {
      return {
        success: false,
        message: "Username is required.",
      };
    }

    if (!password) {
      return {
        success: false,
        message: "Password is required.",
      };
    }

    if (
      username.trim() !== DEMO_USERNAME ||
      password !== DEMO_PASSWORD
    ) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const normalizedUsername = username.trim();
    const newToken = generateToken(normalizedUsername);

    const authenticatedUser = {
      username: normalizedUsername,
    };

    storage.setToken(newToken, remember);
    storage.setUser(authenticatedUser, remember);

    setAuthState({
      user: authenticatedUser,
      token: newToken,
    });

    return {
      success: true,
    };
  };

  const logout = () => {
    storage.clear();

    setAuthState({
      user: null,
      token: null,
    });
  };

  const isAuthenticated = Boolean(
    authState.token && validateToken(authState.token).valid
  );

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      isAuthenticated,
      isLoading: false,
      login,
      logout,
    }),
    [authState, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;