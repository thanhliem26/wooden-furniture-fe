
interface CommentState {
    id: number,
    product_id?: number,
    news_id?: number,
    user_id: number,
    content: string,
    parent_id?: number | null,
    countChild_low: number,
    countChild_total: number,
    updatedAt: number,
    createdAt: number,
}

type UserComment = {
    avatar: string,
    avatar_support: string,
    fullName: string,
    id: number,
    role_user: string,
}

interface CommentStateReducer extends CommentState {
    user_comment : UserComment,
    commentChildren: CommentStateReducer[],
    openChildren: boolean;
    pageSize: number;
    current: number;
}

interface typeAddListChildrenComment {
    children_list : CommentStateReducer[],
    id: number,
    pagination: basePagination
}

interface typePushChildrenComment {
    parent_id: number,
    commentChildren: CommentStateReducer
}

type setOpenCommentChildrenList = {
    id: number,
    show: boolean;
} 

type paramCreateComment = {
    product_id: number;
    user_id: number;
    content: string;
    parent_id?: number;
}

type paramCreateNewsComment = {
    news_id: number;
    user_id: number;
    content: string;
    parent_id?: number;
}

type paramGetListComment = {
    product_id: number;
    page?: number;
    limit?: number;
}

type paramGetListNewsComment = {
    news_id: number;
    page?: number;
    limit?: number;
}

type paramGetListChildrenComment = {
    parent_id: number;
    page?: number;
    limit?: number;
}

type paramGetListChildrenNewsComment = {
    news_id: number;
    page?: number;
    limit?: number;
}

type paramUpdateComment = {
    id: number,
    content: string,
    parent_id?: number | null,
}

type state_reducer_comments = {
    commentList: CommentStateReducer[],
    loading: boolean,
    total: number,
    totalParent: number,
    idSelected: number | null,
    pagination: basePagination,
    is_call_api: boolean;
}

interface typeMetadataComment {
    count: number,
    countParent: number,
    rows: CommentStateReducer[],
}

interface metadataComment extends baseInstance {
    metadata: typeMetadataComment
}

interface metadataChildrenCommentRp extends baseInstance {
    metadata: CommentStateReducer[]
}

interface metadataCommentRp extends baseInstance {
    metadata: CommentState
}