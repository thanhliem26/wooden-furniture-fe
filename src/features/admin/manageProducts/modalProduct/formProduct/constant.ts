import productApi from "@/api/product";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import TEXT_COMMON from "@/constants/text";
import { addProduct, setProductList, setProductSelected } from "@/store/manageProducts";
import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.CATEGORY),
        description: yup
            .string(),
        id: yup
            .number(),
        price: yup
            .number().positive(TEXT_COMMON.VALIDATE_TEXT.VALID.POSITIVE_NUMBER).integer()
            .required(),
        stock_quantity: yup
            .number().positive(TEXT_COMMON.VALIDATE_TEXT.VALID.POSITIVE_NUMBER).integer()
            .required(),
        category_id: yup
            .number()
            .required(),
        images: yup
            .array()
            .min(1, TEXT_COMMON.VALIDATE_TEXT.REQUIRED.IMAGE)
            .required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status, metadata } = await productApi.createProduct(data);

    if (status === statusCode.CREATED) {
        dispatch(addProduct(metadata));

        eventEmitter.emit("submit_modal");

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { message, status } = await productApi.updateProduct(data);

    if (status === statusCode.UPDATED) {
        dispatch(setProductList(data as ProductStateEdit));

        eventEmitter.emit("submit_modal");
        dispatch(setProductSelected(null));

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}