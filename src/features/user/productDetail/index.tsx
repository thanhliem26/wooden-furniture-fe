import productApi from "@/api/product";
import { NotificationError, destroyWS, sendingWS } from "@/utils/index";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "./index.module.scss";
import ProductContent from "./productContent";
import ProductSame from "./productSame";
import ProductEvaluate from "./productEvaluate";
import { STATUS_WS, TYPE_WS } from "@/constants/index";
import { WebSocketContext } from "./constant";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  PushCommentChildren,
  addCommentToList,
  deleteComment,
  updateComment,
} from "@/store/comments";
import TEXT_COMMON from "@/constants/text";
import HelmetProduct from "@/components/helmet/helmet-product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductState | null>(null);
  console.log("🚀 ~ product:", product);
  const is_call = useAppSelector(
    (state: RootState) => state.comments.is_call_api
  );
  const ws = useRef<WebSocket>();
  const timeOutWs = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  const handleGetProduct = async (id) => {
    try {
      const { metadata } = await productApi.getProductById(id);
      setProduct(metadata);
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    handleGetProduct(id);
  }, [id]);

  //
  useEffect(() => {
    // URL server websocket
    const wsUrl = import.meta.env.VITE_API_URL_WS;
    // create a connect server websocket
    ws.current = new WebSocket(wsUrl);
    //connect success
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");

      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws.current, { type: TYPE_WS.JOIN_ROOM, room_id: id });
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    //xử lí khi websocket đã bị đóng(vd: đóng tab, mất mạng, server mất kết nối, ...),
    //Ko thê gửi đến ws khi đã ở trạng thái close
    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");

      timeOutWs.current = setInterval(() => {
        if (ws.current.readyState === STATUS_WS.CLOSED) {
          console.log("re-connect websocket");
          ws.current = new WebSocket(wsUrl);
        } else {
          clearInterval(timeOutWs.current);
        }
      }, 5000);
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

      if (timeOutWs.current) {
        clearInterval(timeOutWs.current);
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
        case TYPE_WS.PING: {
          sendingWS(ws.current, { type: TYPE_WS.PONG });
          break;
        }
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
    <WebSocketContext.Provider
      value={{ ws: ws.current, product_id: Number(id) }}
    >
      <HelmetProduct product={product}>
        <div className={styled["product__detail"]}>
          <div className="product__detail-container">
            <div className="product__detail-title">
              <Link to="/">{TEXT_COMMON.SHOW_TEXT.HOME_PAGE} / </Link>
              <Link to="/product/">
                {TEXT_COMMON.SHOW_TEXT.PRODUCT_PAGE} /{" "}
              </Link>
              {product?.name}
            </div>
            <div className="product__detail-content">
              <ProductContent product={product} />
            </div>
            <div className="product__detail-evaluate">
              <ProductEvaluate product={product} />
            </div>
            <div className="product__detail-same">
              <ProductSame product={product} />
            </div>
          </div>
        </div>
      </HelmetProduct>
    </WebSocketContext.Provider>
  );
};

export default ProductDetail;
