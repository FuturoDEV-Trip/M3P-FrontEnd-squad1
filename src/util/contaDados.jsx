import { api } from "../services/ApiUrl";

async function contaDados() {
  try {
    const usuariosResponse = await api.get(`/home/totalUsuariosAtivos`);
    const contUsuarios = usuariosResponse.data.length;

    const destinosResponse = await api.get(`/home/totalDestinos`);
    const contDestinos = destinosResponse.data.length;

    return { contUsuarios, contDestinos };
  } catch (error) {
    console.error("Erro ao obter contagem:", error.message);
    return { numeroUsuarios: 0, numeroDestinos: 0 };
  }
}

export default contaDados;
