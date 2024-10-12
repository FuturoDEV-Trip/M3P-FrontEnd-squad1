import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { api } from "../../services/ApiUrl";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/login`, {
        email: data.email,
        password: data.password,
      });

      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      login(usuario, token);

      // const token = response.data.Token;
      // login({ email: data.email }, token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro de autenticação: ", error);
      toast.error("Erro de autenticação: E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="flex-row login-bg">
      <div className="form-container-login column">
        <div className="img-login">
          <img
            src="../src/imgs/frase-login.png"
            alt="Birdy colecione suas histórias"
          />
        </div>

        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="input-login column">
          <input
            className="input-area"
            type="text"
            placeholder="E-mail"
            {...register("email", { required: "Campo Obrigatório." })}
          />
          <input
            className="input-area"
            type="password"
            placeholder="Senha"
            {...register("password", { required: "Campo Obrigatório." })}
          />
          <br />
          <button type="submit" className="btn-style btn-yellow">
            Entrar
          </button>
        </form>
        <div className="flex-row f-12">
          <p className="space f-branco">Ainda não tem cadastro?</p>
          <Link className="texto-link" to="/cadastro-usuario">
            <span className="texto-link">Cadastrar</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
