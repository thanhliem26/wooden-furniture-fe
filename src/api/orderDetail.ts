import { axiosService } from "./axiosService";

const orderDetailApi = {
    createOrderDetail(body): Promise<metadataOrderDetail> {
        const url = '/v1/api/orderDetail/create';
        return axiosService.post(url, body);
    },
    getByOrderId(params: paramSearchOrderDetail): Promise<listOrderDetailByOrderId> {
        const url = `/v1/api/orderDetail/get-orderDetail-byId`;
        return axiosService.get(url, {params: params})
    },
    getOrderDetail(): Promise<orderDetailList> {
        const url = `/v1/api/orderDetail/get-orderDetail`
        return axiosService.get(url)
    },
    deleteOrderDetail(id): Promise<baseDelete> {
        const url = `/v1/api/orderDetail/delete/${id}`
        return axiosService.delete(url)
    },
    updateOrderDetail(body: paramUpdateOrderDetail): Promise<baseUpdate> {
        const url = `/v1/api/orderDetail/update`
        return axiosService.patch(url, body)
    },
    getListStatistical(params: paramGetStatistical): Promise<listStatisticalOrderDetail> {
        const url = `/v1/api/orderDetail/get-statistical`
        return axiosService.get(url, {params: params})
    },
}

export default orderDetailApi;