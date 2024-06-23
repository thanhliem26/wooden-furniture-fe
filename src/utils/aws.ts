import { NotificationError } from "./index";
import authApi from "@/api/auth";

interface UploadResult {
    Location: string;
    Bucket: string;
    key: string;
    Key: string
}

export const uploadFileS3 = async (file: any, nameFile: string): Promise<UploadResult> => {
    try {
        const { metadata } = await authApi.uploadFileS3({file, nameFile})
        return metadata
    } catch(error) {
        NotificationError(error)
    }
};


export const deleteFileS3 = async (keyFile: string) => {
    try {
        const { metadata } = await authApi.deleteFileS3(keyFile)
        return metadata
    } catch(error) {
        NotificationError(error)
    }
}