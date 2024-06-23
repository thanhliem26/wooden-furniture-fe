import userApi from "@/api/user";
import { statusCode } from "@/constants/index";
import { addUser, setUserList, setUserSelected } from "@/store/manageUser";
import * as yup from "yup";
import Notification from "@/components/notificationSend";

export const handleGetSchema = ({ isEdit = false }) => {
    if (isEdit) {
        return yup
            .object({
                email: yup
                    .string()
                    .email("email is not valid!")
                    .required("email is required"),
                fullName: yup
                    .string()
                    .required("Full name is required"),
                role_user: yup
                    .string()
                    .required("role_user is required"),
                address: yup
                    .string(),
                dateOfBirth: yup
                    .string(),
                phoneNumber: yup
                    .string(),
                sex: yup
                    .string(),
                id: yup
                    .number(),
                show: yup
                    .boolean(),
                avatar: yup
                    .mixed(),
                avatar_support: yup
                    .mixed(),
            })
            .required();
    }

    return yup
        .object({
            email: yup
                .string()
                .email("email is not valid!")
                .required("email is required"),
            fullName: yup
                .string()
                .required("Full name is required"),
            role_user: yup
                .string()
                .required("role_user is required"),
            address: yup
                .string(),
            dateOfBirth: yup
                .string(),
            phoneNumber: yup
                .string(),
            sex: yup
                .string(),
            id: yup
                .number(),
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
            show: yup
                .boolean(),
            avatar: yup
                .mixed(),
            avatar_support: yup
                .mixed(),
        })
        .required();
}

export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status, metadata } = await userApi.createUser(data);

    if (status === statusCode.CREATED) {
        dispatch(addUser(metadata));

        eventEmitter.emit("submit_modal");

        Notification({
            message: "Notify success",
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { id, ...body } = data;
    const { message, status } = await userApi.editUser(id, body);

    if (status === statusCode.UPDATED) {
        dispatch(setUserList(data as UserStateEdit));

        eventEmitter.emit("submit_modal");
        dispatch(setUserSelected(null));

        Notification({
            message: message,
            description: "Update user success",
        });
    }
}