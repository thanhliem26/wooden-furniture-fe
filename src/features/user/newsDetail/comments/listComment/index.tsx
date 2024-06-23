import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  getListNewsComment,
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
  news: NewsState;
}

const ListComment = ({ news }: Props) => {
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
      news_id: news?.id,
      page: param.current,
      limit: param.pageSize,
    };

    try {
      const { metadata } = await commentApi.getListNewsComment({ ...optionQuery });
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
    if(!news) return;

    dispatch(
      getListNewsComment({
        news_id: news.id,
        page: paginationInit.current,
        limit: paginationInit.pageSize,
      })
    );
    dispatch(setPagination({...paginationInit}))

    return () => {
      dispatch(setCallApi(false));
    }
  }, [news]);

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
              <ItemContent news={news} comment={comment} key={index} />
            );
          })}
        </InfiniteScroll>
        {loading ? <Spin /> : null}
      </div>
    </div>
  );
};

export default ListComment;
