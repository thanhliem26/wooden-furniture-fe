import styled from "./index.module.scss";
import { useEffect, useState } from "react";
import { cloneDeep, isEmpty } from "lodash";
import { formatCurrency, handleURL } from "@/utils/index";
import IconPrice from "./iconPrice";
import QuestionMark from "./iconQuestionMark";
import { useNavigate } from "react-router-dom";
import { DATA_ORDER_BY_STATUS } from "./constant";
import { STATUS_ORDER } from "@/constants/index";
import ModalEvaluate from "./modalEvaluate";

interface Props {
  orderDetailList: metadataOrderList[];
  type?: string;
  handleUpdateOrderDetail?: (data) => void;
}

const ContentOrder = ({ orderDetailList, handleUpdateOrderDetail, type = "all" }: Props) => {
  const [data, setData] = useState<metadataOrderList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cloneData = cloneDeep(orderDetailList);
    if (type !== "all") {
      cloneData = cloneData.filter((order) => {
        return order.order_status === type;
      });
    }

    setData(cloneData);
  }, [orderDetailList]);

  const handleRedirect = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styled["content__order"]}>
      <div className="content__order-list">
        {!isEmpty(data) &&
          data.map((order, key) => {
            const {
              product_data,
              quantity,
              productId,
              order_status,
              evaluate_id,
              id,
            } = order;
            const image = handleURL(product_data?.images);
            const orderDataByStatus = DATA_ORDER_BY_STATUS[order_status];

            return (
              <div className="content__order-item" key={key}>
                <div className="order__item-product">
                  <div className="item__product-title">
                    <div className="product__status-description">
                      <span style={{ color: orderDataByStatus.color }}>
                        <orderDataByStatus.icon
                          style={{ color: orderDataByStatus.color }}
                        />
                        &nbsp;
                        {orderDataByStatus.message}
                      </span>

                      {order_status === STATUS_ORDER.DELIVERED && (
                        <div className="date__updated">
                          <QuestionMark />
                        </div>
                      )}
                    </div>
                    <div className="product__status">
                      <span style={{ color: orderDataByStatus.color }}>
                        {orderDataByStatus.status}
                      </span>
                    </div>
                  </div>
                  <div className="item__product-content">
                    <div className="product__content-image">
                      <img src={image.url} alt="image product" />
                    </div>
                    <div className="product__content-text">
                      <h4>{product_data.name}</h4>
                      <p className="overflow__text">
                        {product_data.description}
                      </p>
                      <span>X{quantity}</span>
                    </div>
                    <div className="product__content-price">
                      <span> ₫{formatCurrency(product_data?.price)} </span>
                    </div>
                  </div>
                </div>
                <div className="order__item-star">
                  <div className="item__star-price">
                    <div className="icon__price">
                      <IconPrice />
                    </div>
                    <p>Thành tiền: </p>
                    <span>₫{formatCurrency(product_data?.price)}</span>
                  </div>
                  <div className="item__start-content">
                    {order_status === STATUS_ORDER.DELIVERED &&
                     (
                        <ModalEvaluate
                          destroyOnClose={true}
                          title="Đánh giá sản phẩm"
                          width={800}
                          product_data={product_data}
                          orderDetail_id={id}
                          isEdit={!!evaluate_id}
                          evaluate_id={evaluate_id}
                          handleUpdateOrderDetail={handleUpdateOrderDetail}
                          content={<button className="active">{evaluate_id ? 'Xem đánh giá' : 'Đánh giá'}</button>}
                        />
                      )}
                    <button onClick={() => handleRedirect(productId)}>
                      Mua lại 
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ContentOrder;
