import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Menu from "../../componentes/Menu/Menu";
import { api } from "../../services/ApiUrl";

function PerfilUsuario() {
  const { register, handleSubmit, setValue } = useForm();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      carregarUsuario(userId); // Llama a la función para cargar los datos del usuario
    }
  }, []);

  const carregarUsuario = async (id) => {
    try {
      const responseCarregarUsuario = await api.get(`/usuarios/${id}`);

      if (responseCarregarUsuario.status === 200) {
        const responseCarregarData = responseCarregarUsuario.data;

        setUsuario(responseCarregarData);

        for (const key in responseCarregarData) {
          setValue(key, responseCarregarData[key]);
          console.log(key);
        }
      } else {
        alert("Erro ao carregar os dados do usuário.");
      }
    } catch (error) {
      alert("Erro ao carregar os dados do usuário.");
    }
  };

  const atualizarUsuario = async () => {
    try {
      const response = await api.put(`/usuarios/${userId}`);

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        navigate("/dashboard");
      } else {
        alert("Erro ao atualizar os dados do usuário.");
      }
    } catch (error) {
      alert("Erro ao atualizar os dados do usuário.");
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir seu usuário?"
    );

    if (confirmar) {
      try {
        const locaisResponse = await api.get(
          `/destinos/destinos_usuario/${usuario.id}`
        );
        if (!locaisResponse.ok) {
          throw new Error("Erro ao verificar locais cadastrados.");
        }

        const locaisData = await locaisResponse.json();

        if (locaisData.length > 0) {
          alert(
            "Não é possível excluir o usuário, pois ele tem locais cadastrados."
          );
          return;
        }

        const response = await api.delete(`/usuarios/${id}`);

        if (response.ok) {
          alert("Sua conta foi excluída!");
          localStorage.removeItem("usuario.nome");
          localStorage.removeItem("usuario.id");
          navigate("/");
        } else {
          alert("Erro ao excluir o usuário.");
        }
      } catch (error) {
        alert("Erro ao excluir o usuário catch.");
      }
    }
  };

  return (
    <>
      <div className="flex-row">
        <Menu></Menu>
        <div className="container-bg">
          <h2 className="titulo">Meu perfil</h2>
          {usuario && (
            <div className="flex-row">
              <p>
                <strong>ID:</strong> {usuario.id}{" "}
              </p>
              <p>
                <strong>Viajante:</strong> {usuario.nome}
              </p>
            </div>
          )}
          <div className="position-relative">
            <p
              className="position-absolute end-0 texto-link"
              onClick={() => handleExcluir(usuario.id)}
            >
              Excluir conta
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(atualizarUsuario)}>
              <div className="row mt-4">
                <div className="col-12">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Nome"
                    {...register("nome", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-4">
                  <select
                    className="input-area w-100"
                    {...register("sexo", { required: "Campo Obrigatório" })}
                  >
                    <option value="">Sexo</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="na">Prefiro não informar</option>
                  </select>
                </div>

                <div className="col-4">
                  <input
                    className="input-area w-100"
                    type="date"
                    placeholder="Data de Nascimento"
                    {...register("data_nascimento", {
                      required: "Campo Obrigatório",
                    })}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-8">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="E-mail"
                    {...register("email", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Senha"
                    {...register("password", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-3">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="CEP"
                    {...register("cep", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-7">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Endereço"
                    {...register("endereco", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Número"
                    {...register("numero", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-4">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Bairro"
                    {...register("bairro", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Cidade"
                    {...register("cidade", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="input-area w-100"
                    type="text"
                    placeholder="Estado"
                    {...register("estado", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>

              <div className="row gap-5">
                <button
                  onClick={handleDashboard}
                  className="mt-5 btn-white btn-style w-50 col"
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="mt-5 btn-yellow btn-style w-50 col"
                  type="submit"
                >
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilUsuario;
