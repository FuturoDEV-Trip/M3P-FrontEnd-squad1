import { useEffect, useState } from "react";
import "../Home/Home.css";
import MapaHome from "../../componentes/Mapa/MapaHome";
import Sidebar from "../../componentes/Sidebar/Sidebar";
import CardInfo from "../../componentes/CardInfo/CardInfo";
import { Link } from "react-router-dom";
import api from "../../services/ApiUrl";
function Home() {
  const [contUsuariosAtivos, setContUsuariosAtivos] = useState(0);
  const [contDestinos, setContDestinos] = useState(0);
  const [destinos, setDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(4);

  useEffect(() => {
    async function fetchData() {
        try {
            const responseUsuariosAtivos = await api.get("/home/totalUsuariosAtivos");
            const usuariosAtivosData = responseUsuariosAtivos.data.usuariosAtivos;
            setContUsuariosAtivos(usuariosAtivosData.count);

            const responseDestinos = await api.get("/destinos/totalDestinos");
            const data = responseDestinos.data;  
            setDestinos(data.rows);              
            setContDestinos(data.count);         
        } catch (error) {
        console.error("Erro ao buscar dados:", error);
            }
        }
    fetchData();
    }, []);

  const handleCardClick = (destino) => {
    setSelectedDestino(destino);
    setZoomLevel(10);
  };

  return (
    <div className="dash-app-container">
      <div className="dash-row dash-sidebar-row">
        <Sidebar />
      </div>
      <div className="dash-row dash-title-row">
        <div className="dash-logo-title-container">
          <div className="dash-fundo-logo">
            <img
              className="dash-logo-img"
              src="../src/imgs/logo-birdy-branco.png"
              alt="Logo Birdy"
            />
          </div>
          <div className="dash-text-content">
            <h1>Bem-vindo ao Birdy!</h1>
            <p>
              Descubra tudo sobre a ilha de Florianópolis com nossas informações
              exclusivas. Cadastre-se agora e desbloqueie conteúdos e
              funcionalidades especiais!{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="dash-row dash-third-row">
        <div className="dash-column dash-col-cards">
          <div className="dash-card">
            <div className="dash-card-content">
              <h5 className="dash-card-title">Usuários</h5>
              <img
                className="dash-icon-card"
                src="../src/imgs/user-icon.png"
                alt="Icon Usuário"
              />
              <span className="dash-num-card">{contUsuariosAtivos}</span>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-content">
              <h5 className="dash-card-title">Destinos</h5>
              <img
                className="dash-icon-card"
                src="../src/imgs/local-icon.png"
                alt="Icon Destinos"
              />
              <span className="dash-num-card">{contDestinos}</span>

            </div>
          </div>
        </div>
        <div className="dash-column dash-colum-login">
          <h2>Já é um Birdy? Que comece a diversão!</h2>
          <button className="dash-btn-login">
            <Link className="dash-texto-link" to="/login">
              Login
            </Link>
          </button>
          <h6>
            Não é um Birdy ainda?{" "}
            <Link className="dash-texto-link" to="/cadastro-usuario">
              Cadastre-se
            </Link>
          </h6>
        </div>
      </div>
      <div className="dash-row dash-fourth-row">
        <div className="dash-column dash-card-info-list">
          {destinos.map((destino) => (
            <CardInfo
              key={destino.id}
              nome={destino.nome}
              lat={destino.lat}
              lon={destino.lon}
            //   latitude={destino.coordenadas.lat}
            //   longitude={destino.coordenadas.lon}
              descricao={destino.descricao}
              onClick={() => handleCardClick(destino)}
            />
          ))}
        </div>
        <div className="dash-column dash-map-container">
          <MapaHome
            selectedDestino={selectedDestino}
            destinos={destinos}
            zoomLevel={zoomLevel}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
