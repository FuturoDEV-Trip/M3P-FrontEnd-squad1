import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { cadastroUsuarioSchema } from "../../util/validationSchemas";
// import { handleCepChange } from "../../util/buscaCep";
import { useCadastroUsuario } from "../../services/useCadastroUsuario";

function CadastroUsuario() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(cadastroUsuarioSchema),
  });
  const cadastroUsuario = useCadastroUsuario();
  const navigate = useNavigate();

  // const cep = watch("cep");

  // const onCepChange = async (e) => {
  //   const cepValue = e.target.value.replace(/\D/g, "");
  //   await handleCepChange(cepValue, setValue);
  // };

  // const debounce = (func, delay) => {
  //   let timer;
  //   return function (...args) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  // const debouncedCepChange = debounce(onCepChange, 500);

  const onSubmit = async (data) => {
    try {
      await cadastroUsuario.mutateAsync(data);
      console.log(`data a enviar`, data);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex-row">
      <div className="position-fixed">
        <img
          src="../src/imgs/lateral.jpg"
          alt="Imagem lateral tela notebook com natureza sobreposta"
        />
      </div>
      <div className="container-bg ml-500">
        <h2 className="titulo">Cadastre-se</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-4">
              <div className="col-12">
                <span className="error-message">
                  {formState.errors?.nome?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Nome"
                  {...register("nome")}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.sexo?.message}
                </span>
                <select className="input-area w-100" {...register("sexo")}>
                  <option value="">Sexo</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="na">Prefiro não informar</option>
                </select>
              </div>
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.cpf?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="CPF"
                  {...register("cpf")}
                />
              </div>
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.data_nasc?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="date"
                  placeholder="Data de Nascimento"
                  {...register("data_nascimento")}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-8">
                <span className="error-message">
                  {formState.errors?.email?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="E-mail"
                  {...register("email")}
                />
              </div>
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.senha?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="password" // Corregimos el tipo a "password"
                  placeholder="Senha"
                  {...register("password")}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-3">
                <span className="error-message">
                  {formState.errors?.cep?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="CEP"
                  {...register("cep")}
                  // value={cep || ""} // Usamos el valor directamente desde watch
                  // onChange={debouncedCepChange} // Usamos la función con debounce
                />
              </div>
              <div className="col-7">
                <span className="error-message">
                  {formState.errors?.endereco?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Endereço"
                  {...register("endereco")}
                />
              </div>
              <div className="col-2">
                <span className="error-message">
                  {formState.errors?.numero?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Número"
                  {...register("numero")}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.bairro?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Bairro"
                  {...register("bairro")}
                />
              </div>
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.cidade?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Cidade"
                  {...register("cidade")}
                />
              </div>
              <div className="col-4">
                <span className="error-message">
                  {formState.errors?.estado?.message}
                </span>
                <input
                  className="input-area w-100"
                  type="text"
                  placeholder="Estado"
                  {...register("estado")}
                />
              </div>
            </div>
            <div className="row gap-5">
              <button
                onClick={handleLogin}
                className="mt-5 btn-white btn-style w-50 col"
                type="button"
              >
                Cancelar
              </button>
              <button
                className="mt-5 btn-yellow btn-style w-50 col"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;
