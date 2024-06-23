import newsApi from "@/api/news";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import TEXT_COMMON from "@/constants/text";
import { addNews, setNewsList, setNewsSelected } from "@/store/manageNews";
import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.CATEGORY),
        id: yup
            .number(),
        image: yup
            .array()
            .min(1, TEXT_COMMON.VALIDATE_TEXT.REQUIRED.IMAGE)
            .required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status, metadata } = await newsApi.createNews(data);

    if (status === statusCode.CREATED) {
        dispatch(addNews(metadata));

        eventEmitter.emit("submit_modal");

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { message, status } = await newsApi.updateNews(data);

    if (status === statusCode.UPDATED) {
        dispatch(setNewsList(data));

        eventEmitter.emit("submit_modal");
        dispatch(setNewsSelected(null));

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}