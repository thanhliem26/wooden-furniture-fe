import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import styled from "./index.module.scss";
import InputContent from "./inputContent";
import Images from "@/constants/images";
import { useContext, useMemo } from "react";
import {
  NotificationError,
  getInfoData,
  isJson,
  removeElement,
  sendingWS,
} from "@/utils/index";
import { addCommentToList, setLoading } from "@/store/comments";
import commentApi from "@/api/comment";
import ListComment from "./listComment";
import { Spin } from "antd";
import { WebSocketNewsContext } from "../constant";
import { STATUS_WS, TYPE_WS } from "@/constants/index";
import TEXT_COMMON from "@/constants/text";

interface Props {
  news: NewsState;
}

const CommentNews = ({ news }: Props) => {
  const user = useAppSelector((state: RootState) => state.user);
  const total = useAppSelector((state: RootState) => state.comments.total);
  const loading = useAppSelector((state: RootState) => state.comments.loading);
  const avatar = useMemo(() => {
    if (!user || !user.avatar) return Images.AvatarDefault;
    return isJson(user?.avatar) && JSON.parse(user?.avatar).url;
  }, [user]);

  const dispatch = useAppDispatch();
  const { ws, news_id } = useContext(WebSocketNewsContext);

  const handleSubmit = async ({ parent_id, content }) => {
    dispatch(setLoading(true));

    const param = {
      content: content,
      user_id: user.id,
      news_id: news.id,
    };

    if (parent_id) param["parent_id"] = parent_id;

    try {
      const { metadata } = await commentApi.createCommentNews(param);

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

      dispatch(addCommentToList(comment_store));
      dispatch(setLoading(false));

        if (ws?.readyState === STATUS_WS.OPEN) {
          sendingWS(ws, {
            type: TYPE_WS.ADD_COMMENT,
            room_id: news_id,
            data_ws: { parent_id: null, data: comment_store },
          });
        }

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  };

  return (
    <div className={styled["news__comment"]}>
      <div className="news__comment-title">
        {loading ? (
          <h3>
            <Spin /> {TEXT_COMMON.SHOW_TEXT.QA}
          </h3>
        ) : (
          <>
            <h3>{total} {TEXT_COMMON.SHOW_TEXT.QA}</h3>
            <p>({TEXT_COMMON.SHOW_TEXT.REPORT_SPAM_COMMENT})</p>
          </>
        )}
      </div>
      <div className="news__comment-content">
        <div className="input__content-field">
          {!!user.id && <InputContent avatar={avatar} callback={handleSubmit} />}
        </div>
        <div className="modal__comment-list">
          <ListComment news={news} />
        </div>
      </div>
    </div>
  );
};

export default CommentNews;
