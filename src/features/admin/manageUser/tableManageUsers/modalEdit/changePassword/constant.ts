import TEXT_COMMON from "@/constants/text";
import * as yup from "yup";

export const schema = yup
    .object({
        password: yup
            .string()
            .min(8, TEXT_COMMON.VALIDATE_TEXT.VALID.MINIUM_LENGTH('password', 8))
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
        id: yup
            .number()
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.ID),
        show:  yup
        .boolean(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;