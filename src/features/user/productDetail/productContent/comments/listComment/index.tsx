import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  getListComment,
  pushCommentToList,
  setCallApi,
  setLoading,
  setPagination,
} from "@/store/comments";
import ItemContent from "./itemContent";
import { Spin } from "antd";
import { NotificationError } from "@/utils/index";
import commentApi from "@/api/comment";
import InfiniteScroll from "@/hoc/infiniteScroll";

interface Props {
  product: ProductState;
}

const ListComment = ({ product }: Props) => {
  const commentList = useAppSelector(
    (state: RootState) => state.comments.commentList
  );
  const countComment = useAppSelector(
    (state: RootState) => state.comments.totalParent
  );
  const loading = useAppSelector((state: RootState) => state.comments.loading);
  const pagination = useAppSelector(
    (state: RootState) => state.comments.pagination
  );

  const dispatch = useAppDispatch();

  const handleScrollPage = async (param = { pageSize: 10, current: 1 }) => {
    const optionQuery = {
      product_id: product.id,
      page: param.current,
      limit: param.pageSize,
    };

    try {
      const { metadata } = await commentApi.getListComment({ ...optionQuery });
      const { rows } = metadata;
      dispatch(pushCommentToList(rows));
      dispatch(setPagination({ ...param }));
      dispatch(setLoading(false));
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleFetchScroll = (pagination) => {
    
    if (!loading) {
      dispatch(setLoading(true));
      handleScrollPage(pagination);
    }
  };

  useEffect(() => {
    const paginationInit = {pageSize: 10, current: 1};
    dispatch(
      getListComment({
        product_id: product.id,
        page: paginationInit.current,
        limit: paginationInit.pageSize,
      })
    );
    dispatch(setPagination({...paginationInit}))

    return () => {
      dispatch(setCallApi(false));
    }
  }, [product]);

  const handleScrollEndPage = () => {
    //catch event is valid to call api
    if (commentList.length >= countComment) return;
    const { current } = pagination;
    handleFetchScroll({ ...pagination, current: Number(current) + 1 });
  };

  return (
    <div className="main__comment">
      <div className="main__comment-list" id="scroll__handle">
        <InfiniteScroll
          dataLength={commentList.length}
          hasMore={commentList.length < countComment}
          next={() => {
            handleScrollEndPage();
          }}
        >
          {commentList.map((comment, index) => {
            return (
              <ItemContent product={product} comment={comment} key={index} />
            );
          })}
        </InfiniteScroll>
        {loading ? <Spin /> : null}
      </div>
    </div>
  );
};

export default ListComment;
