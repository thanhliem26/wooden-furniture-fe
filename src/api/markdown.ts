import { axiosService } from "./axiosService";

const markDownApi = {
    createMarkdown(body: paramCreateMarkdown): Promise<metaDataMarkdownCreate> {
        const url = '/v1/api/markdown/create';
        return axiosService.post(url, body);
    },
    // searchProducts(params = {name: ''}): Promise<metadataProduct> {
    //     const url = `/v1/api/product/list`;
    //     return axiosService.get(url, {params: params})
    // },
    // updateProduct(body): Promise<baseUpdate> {
    //     const url = `/v1/api/product/update/`
    //     return axiosService.put(url, body)
    // },
    // deleteProduct(id): Promise<baseDelete> {
    //     const url = `/v1/api/product/delete/${id}`
    //     return axiosService.delete(url)
    // },
}

export default markDownApi;