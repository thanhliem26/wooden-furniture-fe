import { TYPE_REPLY_COMMENT } from "@/constants/index";
import { setOpenChildrenList } from "@/store/comments";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { useContext } from "react";
import PopoverContent from "../../popoverContent";
import InputContent from "../../../inputContent";
import { CommentContext } from "../constant";
import InfiniteScroll from "@/hoc/infiniteScroll";
import TEXT_COMMON from "@/constants/text";

interface Props {
  comment: CommentStateReducer;
}

const ItemChildren = ({ comment }: Props) => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const commentContext = useContext(CommentContext);

  return (
    <div className="main__comment-children">
      <div className="comment__children-title">
        {!comment.openChildren ? (
          <span
            onClick={() =>
              commentContext.handleGetListChildren(comment, {
                page: 1,
                limit: 10,
              })
            }
          >
            {TEXT_COMMON.SHOW_TEXT.SEE_MORE_COMMENT(comment.countChild_total)}
            {commentContext.idSelected === comment.id ? (
              <Spin />
            ) : (
              <DownOutlined />
            )}
          </span>
        ) : (
          <span
            onClick={() => {
              dispatch(
                setOpenChildrenList({
                  id: comment.id,
                  show: false,
                })
              );
            }}
          >
            {TEXT_COMMON.SHOW_TEXT.HIDDEN_COMMENT} <UpOutlined />
          </span>
        )}
      </div>
      {comment.openChildren ? (
        <>
          <div className="comment__children-list">
            <InfiniteScroll
              dataLength={Number(comment.commentChildren?.length)}
              hasMore={
                Number(comment.commentChildren?.length) <
                comment.countChild_total
              }
              next={() => {
                if (comment.commentChildren.length === comment.countChild_total)
                  return;

                commentContext.handleGetListChildren(comment, {
                  page: Number(comment.current) + 1,
                  limit: Number(comment.pageSize),
                });
              }}
            >
              {comment.commentChildren &&
                comment.commentChildren.map((commentChildren, index) => {
                  const urlImage = commentContext.handleGetUrl(
                    commentChildren.user_comment.avatar
                  );
                  return (
                    <div className="comment__list-item" key={index}>
                      <div className="comment__item-context">
                        <div className="comment__item-image">
                          <img src={urlImage} alt="image user" />
                        </div>
                        <div className="comment__item-content">
                          <div className="item__content-field">
                            <div className="item__content-name">
                              <span>
                                {commentChildren.user_comment.fullName}
                              </span>
                            </div>
                            <div className="item__content-text">
                              <p> {commentChildren.content}</p>
                            </div>
                          </div>
                          <div className="main__comment-reply">
                            {!!user.id && (
                              <div className="comment__reply-action">
                                <div className="main__comment-like">
                                  <button>
                                    <span>{TEXT_COMMON.SHOW_TEXT.ACTION_LIKE_COMMENT}</span>
                                  </button>
                                  .
                                  <button
                                    onClick={() =>
                                      commentContext.handleReplyIds({
                                        type: TYPE_REPLY_COMMENT.REPLY,
                                        id: commentChildren.id,
                                      })
                                    }
                                  >
                                    <span>{TEXT_COMMON.SHOW_TEXT.ACTION_REPLY_COMMENT}</span>
                                  </button>
                                  .
                                </div>
                                <div className="main__comment-createdAt">
                                  <span>
                                    {moment(commentChildren.createdAt).fromNow(
                                      true
                                    )}
                                  </span>
                                  {commentChildren.user_id === user.id ? (
                                    <PopoverContent
                                      onClickUpdate={() =>
                                        commentContext.handleReplyIds({
                                          type: TYPE_REPLY_COMMENT.UPDATE,
                                          id: commentChildren.id,
                                        })
                                      }
                                      onClickDelete={() =>
                                        commentContext.handleDelete(
                                          commentChildren.id
                                        )
                                      }
                                    />
                                  ) : null}
                                </div>
                              </div>
                            )}

                            <div className="comment__reply-update">
                              {commentContext.checkIsExistReply(
                                commentChildren.id
                              ) ? (
                                <div className="reply__update-input">
                                  <InputContent
                                    defaultValue={
                                      commentContext.getItemReply(
                                        commentChildren.id
                                      )?.type === TYPE_REPLY_COMMENT.UPDATE
                                        ? commentChildren.content
                                        : ""
                                    }
                                    className="update__input-field"
                                    titleSubmit={
                                      commentContext.getItemReply(
                                        commentChildren.id
                                      )?.type === TYPE_REPLY_COMMENT.UPDATE
                                        ? TEXT_COMMON.SHOW_TEXT.EDIT
                                        : TEXT_COMMON.SHOW_TEXT.ACTION_REPLY_COMMENT
                                    }
                                    avatar={commentContext.avatar}
                                    handleCancel={() =>
                                      commentContext.handleRemoveReply(
                                        commentChildren.id
                                      )
                                    }
                                    callback={(payload) =>
                                      commentContext.handleReplyComment({
                                        content: payload.content,
                                        id: commentChildren.id,
                                        type: commentContext.getItemReply(
                                          commentChildren.id
                                        )?.type,
                                        parent_id: comment.id,
                                      })
                                    }
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </InfiniteScroll>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ItemChildren;
