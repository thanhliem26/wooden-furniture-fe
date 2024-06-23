import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string(),
        email: yup
            .string(),
        phone_number: yup
            .string(),
        address: yup
            .string(),
        content: yup
            .string(),
        id: yup
            .number(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;