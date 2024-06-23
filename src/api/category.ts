import { axiosService } from "./axiosService";

const categoryApi = {
    createCategory(body): Promise<metadataCategoryRp> {
        const url = '/v1/api/category/create-category';
        return axiosService.post(url, body);
    },
    searchCategory(params = {name: ''}): Promise<metadataCategory> {
        const url = `/v1/api/category/list`;
        return axiosService.get(url, {params: params})
    },
    updateCategory(body): Promise<baseUpdate> {
        const url = `/v1/api/category/update/`
        return axiosService.put(url, body)
    },
    deleteCategory(id): Promise<baseDelete> {
        const url = `/v1/api/category/delete/${id}`
        return axiosService.delete(url)
    },
}

export default categoryApi;