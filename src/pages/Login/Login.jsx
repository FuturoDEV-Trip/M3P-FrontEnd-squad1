import "../Login/Login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const isSuccess = await login({
      email: data.email,
      password: data.password,
    });

    if (isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex-row login-bg">
      <div className="form-container-login column">
        <div className="img-login">
          <img
            src="/imgs/frase-login.png"
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
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            className="input-area"
            type="password"
            placeholder="Senha"
            {...register("password", { required: "Campo Obrigatório." })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <br />
          <button type="submit" className="btn-style btn-yellow">
            Entrar
          </button>
        </form>
        <div className="flex-row f-12">
          <p className="space f-branco">Ainda não tem cadastro?</p>
          <Link className="texto-link" to="/cadastro-usuario">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
