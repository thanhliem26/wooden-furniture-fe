import { useEffect, useMemo, useRef } from "react";
import styled from "./index.module.scss";
import { NotificationError, formatCurrency } from "@/utils/index";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { deleteOrder } from "@/store/orderUser";
import lodash from "lodash";
import { ButtonComponent } from "@/components/form";
import orderDetailApi from "@/api/orderDetail";
import { statusCode } from "@/constants/index";
import Notification from "@/components/notificationSend";
import { Link, useNavigate } from "react-router-dom";

const ContentPopover = () => {
  const listOrder = useAppSelector(
    (state: RootState) => state.order.list_order
  );
  const navigate = useNavigate();
  const popoverRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const totalProduct = useMemo(() => {
    return listOrder.reduce((current, next) => {
      return current + next.price * next.quantity;
    }, 0);
  }, [listOrder]);

  const handleDeleteOrderDetail = async (id) => {
    try {
      const { status } = await orderDetailApi.deleteOrderDetail(id);

      if (status === statusCode.DELETED) {
        Notification({
          message: "Notification Success",
          description: "Delete orderDetail success",
        });

        dispatch(deleteOrder(id));
      }
    } catch (error: unknown) {
      NotificationError(error)
    }
  };

  const handleNavigate  = () => {
    navigate(`/cart`)
  }

  const handleNavigatePay = () => {
    navigate('/pay')
  }

  useEffect(() => {
    if (popoverRef?.current?.clientHeight >= 300) {
      popoverRef.current.classList.add('overFlow_scroll')
    }
  }, []);

  return (
    <div className={styled["content__popover"]}>
      {!lodash.isEmpty(listOrder) ? (
        <>
          <div className="content__popover-list" ref={popoverRef}>
            {listOrder.map((order, index) => {
              const [image] = order.images;

              return (
                <div className="content__popover-item" key={index}>
                  <div className="popover__item-image">
                    <img src={image.url} alt={image.name} />
                  </div>
                  <div className="popover__item-text">
                    <div className="item__text-name"><Link to={`/product/${order.productId}`}>{order.name}</Link></div>
                    <div className="item__text-price">
                      {order.quantity} ×
                      <span> {formatCurrency(order.price)}</span>
                    </div>
                  </div>
                  <div className="popover__item-delete">
                    <div
                      className="item__delete"
                      onClick={() =>
                        handleDeleteOrderDetail(order.orderDetailId)
                      }
                    >
                      ×
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="content__popover-quantity">
            <div className="content__popover-item">
              <div className="popover__item-text">
                <div className="item__text-quantity">
                  <strong>Tổng cộng:</strong>{" "}
                  <span> {formatCurrency(totalProduct)} ₫</span>
                </div>
              </div>
            </div>
          </div>
          <div className="content__popover-action">
            <ButtonComponent
              label="Xem Giỏ Hàng"
              className="btn__tab popover__action popover__action-see"
              type="default"
              onClick={handleNavigate}
            />
            <ButtonComponent
              label="Thanh Toán"
              className="btn__tab popover__action popover__action-pay"
              type="default"
              onClick={handleNavigatePay}
            />
          </div>
        </>
      ) : (
        <div className="content__popover-empty">
          Chưa có sản phẩm trong giỏ hàng.
        </div>
      )}
    </div>
  );
};

export default ContentPopover;
