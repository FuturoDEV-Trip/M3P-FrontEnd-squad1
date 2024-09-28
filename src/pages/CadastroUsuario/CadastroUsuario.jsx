import { useForm } from "react-hook-form";
import { useState } from "react";
import buscaCep from "../../util/buscaCep";
import { useNavigate } from "react-router-dom";
import checkCpfUnico from "../../util/cpfUnico";
import checkEmailUnico from "../../util/emailUnico";
import { yupResolver } from "@hookform/resolvers/yup";
import { cadastroUsuarioSchema } from "../../util/validationSchemas";

function CadastroUsuario() {
  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(cadastroUsuarioSchema),
  });
  const [cep, setCep] = useState("");
  const navigate = useNavigate();

  const onCepChange = (e) => {
    const cepValue = e.target.value.replace(/\D/g, "");
    setCep(cepValue);
    if (cepValue.length === 8) {
      buscaCep(cepValue, setValue);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  async function addUser(data) {
    try {
      const cpfUnico = await checkCpfUnico(data.cpf);
      if (!cpfUnico) {
        alert("CPF já cadastrado");
        return;
      }

      const emailUnico = await checkEmailUnico(data.email);
      if (!emailUnico) {
        alert("E-mail já cadastrado");
        return;
      }

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "post",
        body: JSON.stringify(data),
      });

      if (response.ok === false) {
        alert("Erro ao cadastrar usuario.");
      } else {
        alert("Cadastro efetuado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      alert("Erro no cadastro do usuario.");
    }
  }

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
          <form onSubmit={handleSubmit(addUser)}>
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
                  {...register("data_nasc")}
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
                  type="text"
                  placeholder="Senha"
                  {...register("senha")}
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
                  value={cep}
                  onChange={onCepChange}
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
