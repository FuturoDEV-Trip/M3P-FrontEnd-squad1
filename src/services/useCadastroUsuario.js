import { api } from "./ApiUrl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCadastroUsuario = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/usuario", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registro realizado com sucesso");
      navigate("/app");
    },
    onError: () => {
      toast.error("Erro no registro. Verifique os dados e tente novamente.");
    },
  });
};
