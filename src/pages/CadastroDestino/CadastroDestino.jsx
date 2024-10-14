import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import buscaCep from "../../util/buscaCep";
import buscaCoordenadas from "../../util/buscaCoordenadas";
import Menu from "../../componentes/Menu/Menu";
import { api } from "../../services/ApiUrl";
import "./CadastroDestino.css";

function CadastroDestino() {
  const { register, handleSubmit, setValue, formState } = useForm();
  const [cep, setCep] = useState("");
  const [usuario, setUsuario] = useState({ nome: "", id: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioNome = localStorage.getItem("usuarioNome");
    const userId = localStorage.getItem("userId");
    setUsuario({ nome: usuarioNome, id: userId });
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const onCepChange = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, "");
    setCep(cepValue);
    if (cepValue.length === 8) {
      await buscaCep(cepValue, setValue);
    }
  };

  const onCoordenadasChange = async (e) => {
    const coordenadasValue = e.target.value;
    if (coordenadasValue) {
      await buscaCoordenadas(coordenadasValue, setValue);
    }
  };

  async function addDestino(data) {
    try {
      const destinoData = {
        usuario_id: Number(usuario.id),
        nome: data.nome,
        descricao: data.descricao,
        coordenadas_geo: data.coordenadas_geo,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais,
      };

      console.log(destinoData);

      const response = await api.post("/destinos", destinoData);

      if (response.status !== 201) {
        alert("Erro ao cadastrar local.");
      } else {
        alert("Cadastro efetuado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Erro no cadastro do local.");
    }
  }

  return (
    <>
      <div className="flex-row-destino">
        <Menu />
        <div className="container-bg">
          <h2 className="titulo">Cadastre novo destino!</h2>
          <div>
            <form
              className="form-container"
              onSubmit={handleSubmit(addDestino)}
            >
              <div className="row">
                <div className="col-12">
                  <span className="f-10">
                    ID: {usuario.id} {usuario.nome}
                  </span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <span className="error-message">
                    {formState.errors?.nome?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="Nome"
                    {...register("nome", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <span className="error-message">
                    {formState.errors?.descricao?.message}
                  </span>
                  <textarea
                    className="input-area descricao-local"
                    placeholder="Descrição do local"
                    {...register("descricao", {
                      required: "Adicione uma descrição do local",
                    })}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-4">
                  <span className="error-message">
                    {formState.errors?.coordenadas_geo?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="Coordenadas Geográficas"
                    {...register("coordenadas_geo", {
                      required: "Informe a latitude e longitude do local.",
                    })}
                    onBlur={onCoordenadasChange}
                  />
                </div>
                <div className="col-2">
                  <span className="error-message">
                    {formState.errors?.cep?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="CEP"
                    {...register("cep")}
                    value={cep}
                    onChange={onCepChange}
                  />
                </div>
                <div className="col-2">
                  <span className="error-message">
                    {formState.errors?.cidade?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="Cidade"
                    {...register("cidade", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-2">
                  <span className="error-message">
                    {formState.errors?.estado?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="Estado"
                    {...register("estado", { required: "Campo Obrigatório" })}
                  />
                </div>
                <div className="col-2">
                  <span className="error-message">
                    {formState.errors?.pais?.message}
                  </span>
                  <input
                    className="input-area"
                    type="text"
                    placeholder="País"
                    {...register("pais", { required: "Campo Obrigatório" })}
                  />
                </div>
              </div>

              <div className="row gap-5">
                <button
                  onClick={handleDashboard}
                  className="btn-white btn-style col"
                  type="button"
                >
                  Cancelar
                </button>
                <button className="btn-yellow btn-style col" type="submit">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroDestino;
