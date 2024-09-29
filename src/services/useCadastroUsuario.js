import { api } from "./ApiUrl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCadastroUsuario = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/usuario", data);
      console.log(data);
      if (response.status !== 201) {
        throw new Error("Falha no registro");
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registro realizado com sucesso");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Erro no registro. Verifique os dados e tente novamente.");
    },
  });
};
