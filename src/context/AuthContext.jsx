import { createContext, useContext, useReducer } from "react";

import toast from "react-hot-toast";
import { api } from "../services/ApiUrl";

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

  const login = async (credentials) => {
    try {
      const response = await api.post("/login", credentials);

      if (response.status === 200 && response.data.token) {
        const { token, usuario } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        dispatch({
          type: "login",
          payload: { user: usuario, token },
        });

        toast.success("Login realizado com sucesso!");
        return true;
      }
    } catch (error) {
      toast.error("E-mail ou senha incorretos.");
      console.error("Erro de autenticação: ", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    dispatch({ type: "logout" });

    toast.success("Logout realizado com sucesso!");
  };

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
