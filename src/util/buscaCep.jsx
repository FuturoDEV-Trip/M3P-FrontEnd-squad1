import axios from "axios";

const buscaCep = async (cep) => {
  try {
    const res = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log("Erro ao buscar CEP:", error);
  }
};

const handleCepChange = async (cepValue, setValue) => {
  if (cepValue.length === 8) {
    try {
      const res = await buscaCep(cepValue);
      if (res) {
        setValue("endereco", res.data.address_name || "");
        setValue("bairro", res.data.district || "");
        setValue("cidade", res.data.city || "");
        setValue("estado", res.data.state || "");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  }
};

export { buscaCep, handleCepChange };
