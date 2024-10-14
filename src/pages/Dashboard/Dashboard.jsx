import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import Menu from "../../componentes/Menu/Menu";

import CardInfo from "../../componentes/CardInfo/CardInfo";
import Mapa from "../../componentes/Mapa/Mapa";
import { api } from "../../services/ApiUrl";

function Dashboard() {
  const [contDestinos, setContDestinos] = useState(0);
  const [destinos, setDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(4);
  const [selectedDestinoForMap, setSelectedDestinoForMap] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("userId");

        console.log(`id de usuario en local storage`, userId);

        const response = await api.get(
          `destinos/listarDestinosUsuario/${userId}`
        );

        setContDestinos(response.data.passeios.count);
        setDestinos(response.data.passeios.rows);
        console.log(`respuesta de la api`, response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const handleMouseEnter = (destino) => {
    setSelectedDestino(destino);
    setZoomLevel(4);
  };

  const handleCardClick = (destino) => {
    setSelectedDestino(destino);
    setZoomLevel(10);
  };



  return (
    <>
      <div className="dashboard-container">
        <Menu />
        <div className="content">
          <div className="flex-row first-row">
            <div className="flex-column first-column">
              <div className="titulo">
                <h2>Bem-vindo(a) ao Birdy!</h2>
              </div>
              <div className="card">
                Meus destinos
                <div className="flex-row justify-content-between">
                  <span className="num-card">{contDestinos}</span>
                  <img
                    className="icon-card"
                    src="../src/imgs/local-icon.png"
                    alt="Icone Localização"
                  />
                </div>
              </div>
            </div>
            <div className="map-container">
              <Mapa
                selectedDestino={selectedDestino}
                destinos={destinos}
                zoomLevel={zoomLevel}
              />
            </div>
          </div>

          <div className="lista-locais">
            {destinos.map((destino) => (
              <CardDestino
                key={destino.id}
                nome={destino.nome}
                descricao={destino.descricao}
                cidade={destino.cidade}
                estado={destino.estado}
                pais={destino.pais}
                coordenadas_geo={destino.coordenadas_geo}
                onMouseEnter={() => handleMouseEnter(destino)}
                onClick={() => handleCardClick(destino)}
               
              />
            ))}
          </div>
        </div>
        <div className="mobile-map-overlay">
          <div className="mobile-map-container">
            <button className="close-map-btn" onClick={handleCloseMobileMap}>
              Fechar
            </button>
            <Mapa
              selectedDestino={selectedDestinoForMap}
              destinos={destinos}
              zoomLevel={10}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
