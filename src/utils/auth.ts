import authApi from "@/api/auth";
import { removeHeader, setHeader } from "@/api/axiosService";
import * as authUtil from '@/utils/index';
import { HEADER } from "../constants";

export const handleRefreshToken = async (refreshToken: string) => {
    if (refreshToken) {
        const { metadata } = await authApi.reFreshToken(refreshToken);

        const { user, tokens } = metadata;

        authUtil.setUser(user)
        authUtil.setToken(tokens.accessToken)
        authUtil.setRefreshToken(tokens.refreshToken)
        setHeader(HEADER.AUTHORIZATION, tokens.accessToken)
        window.location.reload();
    } else {
        removeHeader(HEADER.AUTHORIZATION);
        authUtil.removeToken()
        authUtil.removeUser()
        authUtil.removeRefreshToken();
        window.location.href = "/login";
    }
}