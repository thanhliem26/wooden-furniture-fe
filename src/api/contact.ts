import { axiosService } from "./axiosService";

const contactApi = {
    createContact(body: Partial<paramCreateContact>): Promise<responseCreateContact> {
        const url = '/v1/api/userContact/create';
        return axiosService.post(url, body);
    },
    searchContact(params = {name: ''}): Promise<responseGetListContact> {
        const url = `/v1/api/userContact/list`;
        return axiosService.get(url, {params: params})
    },
    updateContact(body): Promise<baseUpdate> {
        const url = `/v1/api/userContact/update/${body.id}`
        return axiosService.patch(url, body)
    },
    deleteContact(id): Promise<baseDelete> {
        const url = `/v1/api/userContact/delete/${id}`
        return axiosService.delete(url)
    },
}

export default contactApi;