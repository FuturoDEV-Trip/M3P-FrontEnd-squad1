import axios from "axios";
import { api } from "../services/ApiUrl";

async function contaDados() {
  try {
    const usuariosResponse = await axios.get(`${api}/usuarios`);
    const contUsuarios = usuariosResponse.data.length;

    const destinosResponse = await axios.get(`${api}/destinos`);
    const contDestinos = destinosResponse.data.length;

    return { contUsuarios, contDestinos };
  } catch (error) {
    console.error("Erro ao obter contagem:", error.message);
    return { numeroUsuarios: 0, numeroDestinos: 0 };
  }
}

export default contaDados;
