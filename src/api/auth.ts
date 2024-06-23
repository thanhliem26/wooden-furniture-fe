import { axiosService } from "./axiosService";
import { HEADER } from '@/constants/index';

const authApi = {
    helloWorld() {
        const url = '/';
        return axiosService.get(url);
    },
    singUp(data: formDataSingUp): Promise<responseSingUp> {
        const url = '/v1/api/access/signup';
        return axiosService.post(url, data);
    },
    login(body: formDataSingIn): Promise<responseToken> {
        const url = '/v1/api/access/login';
        return axiosService.post(url, body);
    },
    uploadFileS3(body): Promise<responseUploadImage> {
        const url = '/v1/api/access/uploadFIleS3';
        return axiosService.post(url, body, {headers: {[HEADER.CONTENT_TYPE]: 'multipart/form-data'}});
    },
    deleteFileS3(key): Promise<responseDeleteImage> {
        const url = `/v1/api/access/deleteFileS3/${key}`;
        return axiosService.delete(url);
    },
    reFreshToken(refreshToken: string): Promise<responseToken> {
        const url = '/v1/api/access/handleRefreshToken';
        return axiosService.post(url, undefined, {headers: {[HEADER.REFRESHTOKEN]: refreshToken}});
    },
    logOut({user_id, refreshToken}): Promise<baseDelete> {
        const url = '/v1/api/access/logout';
        return axiosService.post(url, {user_id}, {headers: {[HEADER.REFRESHTOKEN]: refreshToken}});
    },
    activeUser(body): Promise<responseActiveUser> {
        const url = '/v1/api/access/active-user';
        return axiosService.post(url, body);
    },
    loginProvider(body): Promise<responseToken> {
        const url = '/v1/api/access/login-provider';
        return axiosService.post(url, body);
    },
}

export default authApi;