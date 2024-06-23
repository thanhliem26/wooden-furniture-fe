import { useEffect, useMemo, useState } from "react";
import styled from "./index.module.scss";
import productApi from "@/api/product";
import {
  NotificationError,
  formatCurrency,
  handleURL,
  messageOrderTooLimit,
} from "@/utils/index";
import { Col, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import Notification from "@/components/notificationSend";
import orderApi from "@/api/order";
import orderDetailApi from "@/api/orderDetail";
import { statusCode } from "@/constants/index";
import { searchOrder } from "@/store/orderUser";
import AOS from "aos";
import "aos/dist/aos.css";
import TEXT_COMMON from "@/constants/text";

interface Props {
  product: ProductState | null;
}

const ProductSame = ({ product }: Props) => {
  const [productList, setProductList] = useState<ProductState[]>([]);
  const list_order = useAppSelector(
    (state: RootState) => state.order.list_order
  );
  const orderId = useAppSelector((state: RootState) => state.order.id);
  const userId = useAppSelector((state: RootState) => state.user.id);

  const dispatch = useAppDispatch();

  const productInOrder = useMemo(() => {
    return list_order.map((order) => {
      return order.productId;
    });
  }, [list_order]);

  const handleAddOrderDetail = async (product) => {
    try {
      if (product?.stock_quantity < 1) {
        Notification({
          type: "error",
          message: TEXT_COMMON.ERROR_TEXT.NOTIFY_MESSAGE,
          description: messageOrderTooLimit(product.stock_quantity, 1),
        });

        return;
      }

      let order_id = orderId;

      if (!order_id) {
        const { metadata } = await orderApi.createOrder({ user_id: userId });
        order_id = metadata.id;
      }

      const { status, message } = await orderDetailApi.createOrderDetail({
        order_id,
        productId: product.id,
        quantity: 1,
      });
      if (status === statusCode.CREATED || status === statusCode.UPDATED) {
        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: message,
        });

        dispatch(
          searchOrder({ order_status: "pending", user_id: userId, limit: 1 })
        );
      }
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleGetProductSame = async ({ id, category_id, limit = 8 }) => {
    try {
      const { metadata } = await productApi.getProductDifferent({
        id,
        category_id,
        limit,
      });
      const { rows } = metadata;
      setProductList(rows);
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    if (product) {
      handleGetProductSame({
        id: product.id,
        category_id: product.category_id,
        limit: 8,
      });
    }
  }, [product]);

  //init aos
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  if (!product) return null;

  return (
    <div className={styled["product__same"]}>
      <div className="product__same-title">
        <h3>Sản phẩm tương tự</h3>
      </div>
      <div className="product__same-list">
        <Row gutter={[30, 30]}>
          {productList.map((product, index) => {
            const image = handleURL(product.images);
            return (
              <Col
                md={8}
                lg={6}
                span={12}
                key={index}
                data-aos-delay={"200"}
              >
                <div className="product_item-content">
                  <div className="item__content-image">
                    <Link to={`/product/${product.id}`}>
                      <img src={image.url} alt={product.description} />
                    </Link>
                    <div
                      className="shopping_card"
                      onClick={(e) => e.preventDefault()}
                    >
                      {productInOrder.includes(product.id) ? (
                        <Link
                          to={`/cart`}
                          className="shopping__card-exists"
                        >
                          Xem giỏ hàng →
                        </Link>
                      ) : (
                        <Tooltip placement="top" title="Thêm vào giỏ">
                          <strong
                            onClick={() => handleAddOrderDetail(product)}
                            className="icon__shopping"
                          >
                            +
                          </strong>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  <div className="item__content-price">
                    <p className="item__type">{product.category_name}</p>
                    <p className="item_name">
                      <a>{product.name}</a>
                    </p>
                    <p className="item_price">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default ProductSame;
