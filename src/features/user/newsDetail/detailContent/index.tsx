import { Link, useParams } from "react-router-dom";
import styled from "./index.module.scss";
import moment from "moment";
import { destroyWS, handleURL, sendingWS } from "@/utils/index";
import { useEffect, useMemo, useRef } from "react";
import CommentNews from "../comments";
import { WebSocketNewsContext } from "../constant";
import { STATUS_WS, TYPE_WS } from "@/constants/index";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  PushCommentChildren,
  addCommentToList,
  deleteComment,
  updateComment,
} from "@/store/comments";
import { renderDescription } from "@/utils/renderText";

interface Props {
  news: NewsState;
}

const DetailContent = ({ news }: Props) => {
  const image = useMemo(() => {
    return handleURL(news?.image);
  }, [news?.image]);

  const { id } = useParams();
  const is_call = useAppSelector(
    (state: RootState) => state.comments.is_call_api
  );
  const ws = useRef<WebSocket | null>(null);
  const timeOutWs = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_API_URL_WS;
    ws.current = new WebSocket(wsUrl);
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");

      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws.current, {
          type: TYPE_WS.JOIN_ROOM,
          room_id: `news_${id}`,
        });
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");

      timeOutWs.current = setInterval(() => {
        if(ws.current.readyState === STATUS_WS.CLOSED) {
          console.log("re-connect websocket")
          ws.current = new WebSocket(wsUrl);
        } else {
          clearInterval(timeOutWs.current);
        }
      }, 5000)
    };
    const handleBeforeUnload = () => {
      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws.current, { type: TYPE_WS.LEAVE_ROOM, room_id: id });
        destroyWS(ws.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        handleBeforeUnload();
      }

      if(timeOutWs.current) {
        clearInterval(timeOutWs.current)
      }
    };
  }, [id]);
  //

  useEffect(() => {
    // Sự kiện được kích hoạt khi nhận được tin nhắn từ máy chủ WebSocket
    if (!ws.current || !is_call) return;

    ws.current.onmessage = (event) => {
      const dataWS = JSON.parse(event.data);

      switch (dataWS.type) {
        case TYPE_WS.ADD_COMMENT: {
          if (dataWS.parent_id) {
            dispatch(
              PushCommentChildren({
                parent_id: dataWS.parent_id,
                commentChildren: dataWS.data,
              })
            );
          } else {
            dispatch(addCommentToList(dataWS.data));
          }
          break;
        }
        case TYPE_WS.UPDATE_COMMENT: {
          dispatch(updateComment(dataWS.data));
          break;
        }
        case TYPE_WS.DELETE_COMMENT: {
          dispatch(deleteComment(dataWS.data));
          break;
        }
        default:
          break;
      }
    };
  }, [id, is_call, ws.current]);

  return (
    <WebSocketNewsContext.Provider
      value={{ ws: ws.current, news_id: `news_${id}` }}
    >
      <div className={styled["detail__content"]}>
        <div className="detail__content-title">
          <div className="content__title">
            <h6>
              <Link to="/news">Tin Tức</Link>
            </h6>
          </div>
          <div className="content__title-name">
            <h1>{news?.name}</h1>
          </div>
          <div className="is__divider"></div>
          <div className="content__title-date">
            <span>
              POSTED ON {moment(news?.createdAt).format("DD")}/
              {moment(news?.createdAt).format("M")},
              {moment(news?.createdAt).format("YYYY")} BY ADMIN
            </span>
          </div>
        </div>
        <div className="detail__content-image">
          <div className="content__image">
            <img src={image.url} alt="image news" />
          </div>
          <div className="content__image-date">
            <div className="badge-inner">
              <span>{moment(news?.createdAt).format("DD")}</span>
              <br />
              <span className="is-xsmall">
                {moment(news?.createdAt).format("MM")}
              </span>
            </div>
          </div>
        </div>
        <div className="detail__content-markdown">
          {renderDescription(news?.contentMarkdown)}
        </div>
        <div className="detail__content-comments">
          <CommentNews news={news} />
        </div>
      </div>
    </WebSocketNewsContext.Provider>
  );
};

export default DetailContent;
