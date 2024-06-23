import TEXT_COMMON from "@/constants/text";
import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required(),
        email: yup
            .string()
            .email(TEXT_COMMON.VALIDATE_TEXT.VALID.EMAIL)
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.EMAIL),
        phone_number: yup
            .string().required(),
        address: yup
            .string().required(),
        content: yup
            .string().required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;
