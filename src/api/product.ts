import { axiosService } from "./axiosService";

const productApi = {
    createProduct(body): Promise<metadataProductRp> {
        const url = '/v1/api/product/create-product';
        return axiosService.post(url, body);
    },
    searchProducts(params = {name: ''}): Promise<metadataProduct> {
        const url = `/v1/api/product/list`;
        return axiosService.get(url, {params: params})
    },
    updateProduct(body): Promise<baseUpdate> {
        const url = `/v1/api/product/update/`
        return axiosService.put(url, body)
    },
    deleteProduct(id): Promise<baseDelete> {
        const url = `/v1/api/product/delete/${id}`
        return axiosService.delete(url)
    },
    getRangePrice(): Promise<metaDataRangePrice> {
        const url = `/v1/api/product/get-range-price`
        return axiosService.get(url)
    },
    getProductById(id): Promise<metadataProductRp> {
        const url = `/v1/api/product/${id}`
        return axiosService.get(url)
    },
    getProductDifferent(params: ParamGetProductDifferent):  Promise<metadataProduct> {
        const url = `/v1/api/product/list-different-product`
        return axiosService.get(url, {params: params})
    } 
}

export default productApi;