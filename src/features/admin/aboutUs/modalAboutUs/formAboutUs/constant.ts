import aboutUsApi from "@/api/aboutUs";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import TEXT_COMMON from "@/constants/text";
import { addAboutUs, setAboutUsList, setAboutUsSelected } from "@/store/aboutUs";
import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.CATEGORY),
        address: yup
            .string(),
        id: yup
            .number(),
        address_link: yup
            .string()
            .required(),
        phone_number: yup
            .string()
            .required(),
        is_active: yup
            .string()
            .required(),
        email: yup
            .string()
            .email(TEXT_COMMON.VALIDATE_TEXT.VALID.EMAIL)
            .required(TEXT_COMMON.VALIDATE_TEXT.REQUIRED.EMAIL),
        logo: yup
            .array()
            .min(1, TEXT_COMMON.VALIDATE_TEXT.REQUIRED.LOGO)
            .required(),
        image: yup
            .array()
            .min(1, TEXT_COMMON.VALIDATE_TEXT.REQUIRED.IMAGE)
            .required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status } = await aboutUsApi.createAboutUs(data);

    if (status === statusCode.CREATED) {
        dispatch(addAboutUs({ ...data }));

        eventEmitter.emit("submit_modal");

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { message, status } = await aboutUsApi.updateAboutUs(data);

    if (status === statusCode.UPDATED) {
        dispatch(setAboutUsList(data));

        eventEmitter.emit("submit_modal");
        dispatch(setAboutUsSelected(null));

        Notification({
            message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
            description: message,
        });
    }
}

export const optionActive = [
    { value: "0", label: "NON ACTIVE" },
    { value: "1", label: "ACTIVE" },
  ]