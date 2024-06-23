import { axiosService } from "./axiosService";

const aboutUsApi = {
    createAboutUs(body): Promise<responseAboutUsCreate> {
        const url = '/v1/api/about-us/create';
        return axiosService.post(url, body);
    },
    searchAboutUs(params = {name: ''}): Promise<metadataAboutUs> {
        const url = `/v1/api/about-us/list`;
        return axiosService.get(url, {params: params})
    },
    updateAboutUs(body): Promise<baseUpdate> {
        const url = `/v1/api/about-us/update/`
        return axiosService.put(url, body)
    },
    deleteAboutUs(id): Promise<baseDelete> {
        const url = `/v1/api/about-us/delete/${id}`
        return axiosService.delete(url)
    },
    getActiveAboutUs(): Promise<responseAboutUsCreate> {
        const url = `/v1/api/about-us/active`
        return axiosService.get(url)
    }
}

export default aboutUsApi;