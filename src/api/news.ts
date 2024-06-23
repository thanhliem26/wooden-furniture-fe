import { axiosService } from "./axiosService";

const newsApi = {
    createNews(body): Promise<metadataNewsRp> {
        const url = '/v1/api/news/create';
        return axiosService.post(url, body);
    },
    searchNews(params: baseSearchQuery): Promise<metadataNews> {
        const url = `/v1/api/news/list`;
        return axiosService.get(url, {params: params})
    },
    updateNews(body): Promise<metadataNewsRp> {
        const url = `/v1/api/news/update`
        return axiosService.put(url, body)
    },
    deleteNews(id): Promise<baseDelete> {
        const url = `/v1/api/news/delete/${id}`
        return axiosService.delete(url)
    },
    getNewsById(id): Promise<metadataGetNewById> {
        const url = `/v1/api/news/getById/${id}`;
        return axiosService.get(url)
    },
}

export default newsApi;