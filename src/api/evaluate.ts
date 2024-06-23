import { axiosService } from "./axiosService";

const EvaluateApi = {
    createEvaluate(body: paramCreateEvaluate): Promise<typeCreateEvaluate> {
        const url = '/v1/api/evaluate/create';
        return axiosService.post(url, body);
    },
     getEvaluate(id): Promise<typeGetEvaluated> {
        const url = `/v1/api/evaluate/${id}`;
        return axiosService.get(url)
    },
    getListEvaluate(params): Promise<typeGetListEvaluated> {
        const url = `/v1/api/evaluate/list`;
        return axiosService.get(url, {params: params})
    },
}

export default EvaluateApi;