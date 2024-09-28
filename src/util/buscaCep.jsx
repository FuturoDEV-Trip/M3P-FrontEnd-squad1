import axios from "axios";

export const buscaCep = async (cep) => {
  try {
    const res = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log("Erro ao buscar CEP:", error);
  }
};
