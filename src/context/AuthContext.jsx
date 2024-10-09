import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(usuarioData, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    dispatch({ type: "login", payload: { usuarioData, token } });
  }

  function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
