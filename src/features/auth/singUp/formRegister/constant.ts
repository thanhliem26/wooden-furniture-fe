import TEXT_COMMON from "@/constants/text";
import * as yup from "yup";

export const schema = yup
.object({
  fullName: yup.string().required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.FULL_NAME),
  email: yup
    .string()
    .email(TEXT_COMMON.VALIDATE_TEXT.VALID.EMAIL)
    .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.EMAIL),
  password: yup
    .string()
    .min(8, TEXT_COMMON.VALIDATE_TEXT.VALID.MINIUM_LENGTH('password', 8))
    .test(
      "contains-number-and-character",
      TEXT_COMMON.VALIDATE_TEXT.VALID.BOTH_NUMBER_CHARACTER,
      (value) => {
        if (!value) return false; // Return false if the value is empty

        const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
        const containsCharacterAndNumber = regex.test(value);

        return containsCharacterAndNumber;
      }
    )
    .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.PASSWORD),
  re_password: yup
    .string()
    .test(
      "repeat-password",
      TEXT_COMMON.VALIDATE_TEXT.VALID.REPEAT_PASSWORD_EQUAL,
      (value, schema: any) => {
        const { password } = schema["from"][0]["value"];
        if (!value) return false; // Return false if the value is empty

        return value === password;
      }
    )
    .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.REPEAT_PASSWORD),
})

export type FormData = yup.InferType<typeof schema>;