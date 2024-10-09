import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import CadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario";
import CadastroDestino from "../pages/CadastroDestino/CadastroDestino";
import ListaDestinos from "../pages/ListaDestinos/ListaDestinos";
import PerfilUsuario from "../pages/PerfilUsuario/PerfilUsuario";
import AlterarDestino from "../pages/AlterarDestino/AlterarDestino";
import ProtectedRoute from "../pages/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import ToasterComponent from "../util/ToasterComponent";

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}
          />

          <Route
            path="/cadastro-local"
            element={<ProtectedRoute> <CadastroDestino /> </ProtectedRoute>}
          />
          <Route
            path="/locais"
            element={<ProtectedRoute><ListaDestinos /></ProtectedRoute>} 
          />
          <Route
            path="/perfil-usuario"
            element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>}
          />
          <Route
            path="/alterar-local/:id"
            element={<ProtectedRoute><AlterarDestino /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
      <ToasterComponent />
    </AuthProvider>
  );
}

export default AppRoutes;
