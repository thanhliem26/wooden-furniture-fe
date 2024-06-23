import { createContext } from 'react';

interface CommentContext {
    handleGetListChildren: (comment: CommentStateReducer, {page, limit}: {page: number, limit: number}) => Promise<void>;
    idSelected: number | null;
    handleGetUrl: (string) => string;
    handleReplyIds: any;
    handleDelete: any;
    checkIsExistReply: any;
    getItemReply: any;
    avatar: string;
    handleRemoveReply: any;
    handleReplyComment: any;
}

export const CommentContext = createContext<Partial<CommentContext>>({ });
