import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../componentes/Menu/Menu";
import "../ListaDestinos/ListaDestinos.css";
import { api } from "../../services/ApiUrl";
import toast from "react-hot-toast";
// import { useDestinos } from "../../context/DestinoContext";

function ListaDestinos() {
  const [destinos, setDestinos] = useState([]);
  // const { setSelectedTour } = useDestinos();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("userId");

        console.log(`id de usuario en local storage`, userId);

        const response = await api.get(
          `destinos/listarDestinosUsuario/${userId}`
        );

        setDestinos(response.data.passeios.rows);
        console.log(`respuesta de la api`, response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const handleAlterar = (id) => {
    const destinoSeleccionado = destinos.find((destino) => destino.id === id);
    // setSelectedTour(destinoSeleccionado);
    navigate(`/alterar-local/${destinoSeleccionado.id}`);
  };

  const handleExcluir = async (id) => {
    const destinoSeleccionado = destinos.find((destino) => destino.id === id);
    console.log(`id destino seleccionado`, destinoSeleccionado.id);

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este local?"
    );

    if (confirmar) {
      try {
        const response = await api.delete(`destinos/${destinoSeleccionado.id}`);

        if (response.status === 200) {
          setDestinos(destinos.filter((destino) => destino.id !== id));
          toast.success("Local excluído com sucesso!");
        }
      } catch (error) {
        toast.error("Erro ao excluir o local.");
      }
    }
  };

  return (
    <>
      <Menu></Menu>
      <div className="destinos-container">
        <h2 className="titulo">Meus Destinos</h2>
        {destinos.length > 0 ? (
          <table className="tabela-destinos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {destinos.map((destino) => (
                <tr key={destino.id}>
                  <td>{destino.nome}</td>
                  <td>{destino.cidade}</td>
                  <td>{destino.estado}</td>
                  <td className="acoes-coluna">
                    <img
                      src="/imgs/alterar-icon.png"
                      alt="Alterar"
                      className="icon-alterar"
                      onClick={() => handleAlterar(destino.id)}
                    />
                    <img
                      src="/imgs/excluir-icon.png"
                      alt="Excluir"
                      className="icon-excluir"
                      onClick={() => handleExcluir(destino.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum destino cadastrado.</p>
        )}
      </div>
    </>
  );
}

export default ListaDestinos;
