import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch({
        type: "login",
        payload: { user: JSON.parse(storedUser), token: storedToken },
      });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials
      );
      const { Token: token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ email: credentials.email })
      );

      dispatch({
        type: "login",
        payload: { user: { email: credentials.email }, token },
      });

      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro de autenticação: ", error);

      toast.error("Erro de autenticação: E-mail ou senha incorretos.");
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
