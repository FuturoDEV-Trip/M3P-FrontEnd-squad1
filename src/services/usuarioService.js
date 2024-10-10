import { api } from "./ApiUrl";

export const carregarUsuario = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao carregar os dados do usuário.");
  }
};

export const atualizarUsuario = async (id, data) => {
  try {
    const response = await api.put(`/usuarios/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar os dados do usuário.");
  }
};

export const excluirUsuario = async (id) => {
  try {
    const locaisResponse = await api.get(`/destinos?usuarioId=${id}`);
    if (locaisResponse.data.length > 0) {
      throw new Error(
        "Não é possível excluir o usuário, pois ele tem locais cadastrados."
      );
    }

    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Erro ao excluir o usuário.");
  }
};
