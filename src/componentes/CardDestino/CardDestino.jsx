import "../CardDestino/CardDestino.css";

function CardDestino({ nome, descricao, cidade, estado, pais, coordenadas_geo, onMouseEnter, onMouseLeave, onClick }) {
    return (
        <>
            <div
                className="card-container column card-destino"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                <div className="row header-card">
                    <div className="col destino-nome">
                        <h6>{nome}</h6>
                    </div>
                    <div className="col destino-info">
                        <p>{cidade}, {estado} - {pais}</p>
                    </div>
                </div>
                <div className="row descricao-card">
                    <div className="col">
                        <p>{descricao}</p>
                        <button className="btn dashboard" onClick={onClick}>
                            Exibir no mapa
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDestino;
