import { useContext, useMemo, useState } from "react";
import Images from "@/constants/images";
import {
  NotificationError,
  getInfoData,
  isJson,
  removeElement,
  sendingWS,
} from "@/utils/index";
import { STATUS_WS, TYPE_REPLY_COMMENT, TYPE_WS } from "@/constants/index";
import moment from "moment";
import PopoverContent from "../popoverContent";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import lodash from "lodash";
import {
  AddCommentChildren,
  PushCommentChildren,
  deleteComment,
  setIdSelected,
  setLoading,
  setOpenChildrenList,
  updateComment,
} from "@/store/comments";
import commentApi from "@/api/comment";
import InputContent from "../../inputContent";
import styled from "./index.module.scss";
import { CommentContext } from "./constant";
import ItemChildren from "./itemChildren";
import { WebSocketContext } from "@/features/user/productDetail/constant";
import TEXT_COMMON from "@/constants/text";

interface Props {
  comment: CommentStateReducer;
  product: ProductState;
}

type StateIdReply = {
  id: number;
  type: string;
};

const ItemContent = ({ comment, product }: Props) => {
  const user = useAppSelector((state: RootState) => state.user);
  const idSelected = useAppSelector(
    (state: RootState) => state.comments.idSelected
  );
  const [idReply, setIdReply] = useState<StateIdReply[]>([]);
  const { ws, product_id } = useContext(WebSocketContext);

  const dispatch = useAppDispatch();

  const handleGetUrl = (avatar) => {
    if (!avatar) return Images.AvatarDefault;
    return avatar && isJson(avatar) && JSON.parse(avatar).url;
  };

  const avatar = useMemo(() => {
    if (!user || !user.avatar) return Images.AvatarDefault;
    return isJson(user?.avatar) && JSON.parse(user?.avatar).url;
  }, [user]);

  const urlImage = useMemo(() => {
    return handleGetUrl(comment?.user_comment?.avatar);
  }, [comment]);

  const handleReplyComment = async ({
    content,
    id,
    parent_id = null,
    type = "update",
  }) => {
    if (type === TYPE_REPLY_COMMENT.REPLY) {
      handleReplyCommentParent({ content, parent_id: id });
    } else {
      handleCommentUpdate({ content, id, parent_id });
    }
  };

  const handleCommentUpdate = async ({ content, id, parent_id = null }) => {
    try {
      dispatch(setLoading(true));

      const { metadata } = await commentApi.updateProduct({ content, id });
      dispatch(
        updateComment({
          id: metadata.id,
          content: metadata.content,
          parent_id: parent_id,
        })
      );

      if (ws?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws, {
          type: TYPE_WS.UPDATE_COMMENT,
          room_id: product_id,
          data_ws: {
            parent_id: parent_id,
            data: {
              id: metadata.id,
              content: metadata.content,
              parent_id: parent_id,
            },
          },
        });
      }

      handleRemoveReply(id);
      dispatch(setLoading(false));

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  };

  const handleReplyCommentParent = async ({ content, parent_id }) => {
    const param = {
      content: content,
      user_id: user.id,
      product_id: product.id,
    };

    if (parent_id) param["parent_id"] = parent_id;

    try {
      const { metadata } = await commentApi.createComment(param);

      const comment_store = removeElement({
        field: ["left", "right"],
        object: metadata,
      });
      const user_comment = getInfoData({
        field: ["avatar", "avatar_support", "id", "fullName", "role_user"],
        object: user,
      });

      comment_store.countChild_low = 0;
      comment_store.countChild_total = 0;
      comment_store.user_comment = user_comment;

      dispatch(
        PushCommentChildren({
          parent_id: parent_id,
          commentChildren: comment_store,
        })
      );

      if (ws?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws, {
          type: TYPE_WS.ADD_COMMENT,
          room_id: product_id,
          data_ws: { parent_id: parent_id, data: comment_store },
        });
      }

      handleRemoveReply(parent_id);
      return true;
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleRemoveReply = (id) => {
    const cloneIdReply = lodash.cloneDeep(idReply);
    const removeItemReply = cloneIdReply.filter((item) => {
      return item.id !== id;
    });

    setIdReply(removeItemReply);
  };

  const checkIsExistReply = (id) => {
    return idReply.some((item) => item.id === id);
  };

  const getItemReply = (id) => {
    return idReply.find((item) => item.id === id);
  };

  const handleReplyIds = ({
    type = TYPE_REPLY_COMMENT.REPLY,
    id,
  }: StateIdReply) => {
    const cloneIdReply = lodash.cloneDeep(idReply);
    const idReplyNew = cloneIdReply.map((item) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setIdReply(
      !checkIsExistReply(id) ? [...cloneIdReply, { type, id }] : idReplyNew
    );
  };

  const handleDelete = async (id) => {
    try {
      dispatch(setLoading(true));

      const { metadata } = await commentApi.deleteComment(id);
      dispatch(deleteComment(metadata.id));
      if (ws?.readyState === STATUS_WS.OPEN) {
       
        sendingWS(ws, {
          type: TYPE_WS.DELETE_COMMENT,
          room_id: product_id,
          data_ws: {
            data: metadata.id,
          },
        });
      }
      handleRemoveReply(id);
      dispatch(setLoading(false));

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  };

  const handleGetListChildren = async (
    comment: CommentStateReducer,
    pagination = { page: 1, limit: 10 }
  ) => {
    try {
      dispatch(setIdSelected(comment.id));
      if (
        comment.commentChildren &&
        comment.commentChildren.length !== comment.countChild_total
      ) {
        const { metadata } = await commentApi.getListChildrenComment({
          parent_id: comment.id,
          page: pagination.page,
          limit: pagination.limit,
        });

        dispatch(
          AddCommentChildren({
            id: comment.id,
            children_list: metadata,
            pagination: {
              current: pagination.page,
              pageSize: pagination.limit,
            },
          })
        );
      }

      dispatch(setIdSelected(null));
      dispatch(setOpenChildrenList({ id: comment.id, show: true }));
    } catch (error) {
      NotificationError(error);
      dispatch(setIdSelected(null));
    }
  };

  const commentContextValue = useMemo(() => {
    return {
      handleGetListChildren,
      idSelected,
      handleGetUrl,
      handleReplyIds,
      handleDelete,
      checkIsExistReply,
      getItemReply,
      avatar,
      handleRemoveReply,
      handleReplyComment,
    };
  }, [idSelected, avatar, checkIsExistReply]);

  return (
    <CommentContext.Provider value={{ ...commentContextValue }}>
      <div className={styled["comment__list-item"]}>
        <div className="comment__item-context">
          <div className="comment__item-image">
            <img src={urlImage} alt="image user" />
          </div>
          <div className="comment__item-content">
            <div className="item__content-field">
              <div className="item__content-name">
                <span>{comment.user_comment.fullName}</span>
              </div>
              <div className="item__content-text">
                <p> {comment.content}</p>
              </div>
            </div>
            <div className="main__comment-reply">
              <div className="comment__reply-action">
                {!!user.id && <div className="main__comment-like">
                  <button>
                    <span>{TEXT_COMMON.SHOW_TEXT.ACTION_LIKE_COMMENT}</span>
                  </button>
                  .
                  <button
                    onClick={() =>
                      handleReplyIds({
                        type: TYPE_REPLY_COMMENT.REPLY,
                        id: comment.id,
                      })
                    }
                  >
                    <span>{TEXT_COMMON.SHOW_TEXT.ACTION_REPLY_COMMENT}</span>
                  </button>
                  .
                </div>}
                
                <div className="main__comment-createdAt">
                  <span>{moment(comment.createdAt).fromNow(true)}</span>
                  {comment.user_id === user.id ? (
                    <PopoverContent
                      onClickUpdate={() =>
                        handleReplyIds({
                          type: TYPE_REPLY_COMMENT.UPDATE,
                          id: comment.id,
                        })
                      }
                      onClickDelete={() => handleDelete(comment.id)}
                    />
                  ) : null}
                </div>
              </div>
              <div className="comment__reply-update">
                {checkIsExistReply(comment.id) ? (
                  <div className="reply__update-input">
                    <InputContent
                      defaultValue={
                        getItemReply(comment.id)?.type ===
                        TYPE_REPLY_COMMENT.UPDATE
                          ? comment.content
                          : ""
                      }
                      className="update__input-field"
                      titleSubmit={
                        getItemReply(comment.id)?.type ===
                        TYPE_REPLY_COMMENT.UPDATE
                          ? "Sửa"
                          : "Trả lời"
                      }
                      avatar={avatar}
                      handleCancel={() => handleRemoveReply(comment.id)}
                      callback={(payload) =>
                        handleReplyComment({
                          content: payload.content,
                          id: comment.id,
                          type: getItemReply(comment.id)?.type,
                        })
                      }
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {comment.countChild_total >= 1 && comment.parent_id === null ? (
              <ItemChildren comment={comment} />
            ) : null}
          </div>
        </div>
      </div>
    </CommentContext.Provider>
  );
};

export default ItemContent;
