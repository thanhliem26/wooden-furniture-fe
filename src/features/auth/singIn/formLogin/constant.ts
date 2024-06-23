import TEXT_COMMON from "@/constants/text";
import * as yup from "yup";

export const schema = yup
.object({
  email: yup
    .string()
    .email(TEXT_COMMON.VALIDATE_TEXT.VALID.EMAIL)
    .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.EMAIL),
  password: yup
    .string()
    .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.PASSWORD),
})
.required();

export type FormData = yup.InferType<typeof schema>;