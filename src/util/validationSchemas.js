import * as yup from "yup";

const cadastroUsuarioSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),

  sexo: yup
    .string()

    .required("O sexo é obrigatório"),

  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .matches(/^\d{11}$/, "O CPF deve ter 11 dígitos numéricos"),

  cep: yup
    .string()
    .required("O CEP é obrigatório")
    .matches(/^\d{8}$/, "O CEP deve ter 8 dígitos numéricos"),

  endereco: yup
    .string()

    .max(255, "O endereço deve ter no máximo 255 caracteres"),

  numero: yup
    .string()
    .required("O número é obrigatório")
    .max(10, "O número deve ter no máximo 10 caracteres"),

  complemento: yup
    .string()

    .max(255, "O complemento deve ter no máximo 255 caracteres"),

  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("O e-mail deve ser válido"),

  data_nascimento: yup
    .date()
    .required("A data de nascimento é obrigatória")
    .max(new Date(), "A data de nascimento não pode ser no futuro"),

  password: yup.string().required("A senha é obrigatória"),
});

export { cadastroUsuarioSchema };
