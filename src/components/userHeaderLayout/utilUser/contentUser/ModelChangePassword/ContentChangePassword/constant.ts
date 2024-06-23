import * as yup from "yup";

export const schema = yup
    .object({
        current_password: yup
            .string()
            .min(8, "Minimum password needs 8 characters ")
            .required("Password is required"),
        password: yup
            .string()
            .min(8, "Minimum password needs 8 characters ")
            .required("Password is required"),
        re_password: yup
            .string()
            .test(
                "repeat-password",
                "Repeat Password must match password",
                (value, schema: any) => {
                    const { password } = schema["from"][0]["value"];
                    if (!value) return false; // Return false if the value is empty

                    return value === password;
                }
            )
            .required("Repeat Password is required"),
        id: yup
            .number()
            .required("id is required"),
        show:  yup
        .boolean(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;