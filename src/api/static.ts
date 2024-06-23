import { axiosService } from "./axiosService";

const staticApi = {
    setStatic(body): Promise<metadataStatic> {
        const url = '/v1/api/static/set-static';
        return axiosService.post(url, body);
    },
    getStatic(): Promise<listStaticState> {
        const url = `/v1/api/static/get-static`;
        return axiosService.get(url)
    },
    getStaticPage(params = {type: 1, limitProduct: 8}): Promise<metadataPageState> {
        const url = `/v1/api/static/static-page`;
        return axiosService.get(url, {params: params})
    }
}

export default staticApi;