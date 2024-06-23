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
        note: yup
            .string(),
        order_status: yup
            .string(),
        id: yup
            .number(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;

export const optionStatusOrder = [
    { value: "pending", label: "pending" },
    { value: "wait_confirmation", label: "wait_confirmation" },
    { value: "confirmed", label: "confirmed" },
    { value: "shipped", label: "shipped" },
    { value: "cancelled", label: "cancelled" },
    { value: "delivered", label: "delivered" },
]