import { axiosService } from "./axiosService";

const commentApi = {
    createComment(body: paramCreateComment): Promise<metadataCommentRp> {
        const url = '/v1/api/comment/create';
        return axiosService.post(url, body);
    },
    getListComment(params: paramGetListComment): Promise<metadataComment> {
        const url = `/v1/api/comment/list`;
        return axiosService.get(url, {params: params})
    },
    getListChildrenComment(params: paramGetListChildrenComment): Promise<metadataChildrenCommentRp> {
        const url = `/v1/api/comment/list-children`;
        return axiosService.get(url, {params: params})
    },
    updateProduct(body: paramUpdateComment): Promise<metadataCommentRp> {
        const url = `/v1/api/comment/update/`
        return axiosService.patch(url, body)
    },
    deleteComment(id): Promise<metadataCommentRp> {
        const url = `/v1/api/comment/delete/${id}`
        return axiosService.delete(url)
    },

    //comment news
    createCommentNews(body: paramCreateNewsComment): Promise<metadataCommentRp> {
        const url = '/v1/api/comment/create-news';
        return axiosService.post(url, body);
    },
    getListNewsComment(params: paramGetListNewsComment): Promise<metadataComment> {
        const url = `/v1/api/comment/list-news`;
        return axiosService.get(url, {params: params})
    },
    getListChildrenNewsComment(params: paramGetListChildrenNewsComment): Promise<metadataChildrenCommentRp> {
        const url = `/v1/api/comment/list-children-news`;
        return axiosService.get(url, {params: params})
    },
}

export default commentApi;