import categoryApi from "@/api/category";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import TEXT_COMMON from "@/constants/text";
import { addCategory, setCategoryList, setCategorySelected } from "@/store/manageCategories";
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
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status, metadata } = await categoryApi.createCategory(data);

    if (status === statusCode.CREATED) {
        dispatch(addCategory(metadata));

        eventEmitter.emit("submit_modal");

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { message, status } = await categoryApi.updateCategory(data);

    if (status === statusCode.UPDATED) {
        dispatch(setCategoryList(data as CategoryStateEdit));

        eventEmitter.emit("submit_modal");
        dispatch(setCategorySelected(null));

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}