import "../Mapa/MapaHome.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "/imgs/local-icon-red.png";
import highlightedIconUrl from "/imgs/local-icon-red-hl.png";
import { useEffect, useState } from "react";

function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

function MapaHome({ selectedDestino, destinos, zoomLevel }) {
    const [position, setPosition] = useState([-15.7942, -47.8822]); 
    const [zoom, setZoom] = useState(4);
    const [highlightedDestino, setHighlightedDestino] = useState(null);

    useEffect(() => {

        if (selectedDestino && selectedDestino.coordenadas_geo) {
            const [lat, lon] = selectedDestino.coordenadas_geo.split(",").map(Number);
            setPosition([lat, lon]);
            setZoom(zoomLevel);
            setHighlightedDestino(selectedDestino);

        } else {
            setZoom(4);
            setHighlightedDestino(null);
        }
    }, [selectedDestino, zoomLevel, destinos]);

    const defaultIcon = new L.Icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const highlightedIcon = new L.Icon({
        iconUrl: highlightedIconUrl,
        iconSize: [30, 46],
        iconAnchor: [15, 46],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <MapContainer center={position} zoom={zoom} className="dash-map-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
            />
            {destinos && destinos.map((destino) => {
                if (destino.coordenadas_geo) {
                    const [lat, lon] = destino.coordenadas_geo.split(",").map(Number);
                    return (
                        <Marker
                            key={destino.id}
                            position={[lat, lon]}
                            icon={
                                destino.id === highlightedDestino?.id
                                    ? highlightedIcon
                                    : defaultIcon
                            }
                        >
                            <Popup>
                                <strong>{destino.nome}</strong>
                                <br />
                                {destino.cidade}, {destino.estado}
                            </Popup>
                        </Marker>
                    );
                }
                return null; 

            })}
            <ChangeView center={position} zoom={zoom} />
        </MapContainer>
    );
}

export default MapaHome;