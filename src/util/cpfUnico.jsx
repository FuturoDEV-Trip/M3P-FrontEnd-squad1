import {api} from "../services/ApiUrl";

async function checkCpfUnico(cpf) {
  try {
    const response = await api.get(`/usuarios?cpf=${cpf}`);
    const data = await response.data;
    return data.length === 0;
  } catch (error) {
    alert("Erro ao verificar CPF");
    return false;
  }
}

export default checkCpfUnico;
