import { Col, Row } from "antd";
import styled from "./index.module.scss";
import FormPay from "./formPay";
import { useAppSelector } from "@/store/index";
import { useEffect, useMemo, useRef, useState } from "react";
import orderDetailApi from "@/api/orderDetail";
import { formatCurrency, NotificationError } from "@/utils/index";
import { useNavigate } from "react-router-dom";

const PayComponent = () => {
  const [dataOrder, setDataOrder] = useState<OrderDetailState[]>([]);
  const refChildren = useRef();
  const navigate = useNavigate();

  const user_id = useAppSelector((state) => state.user.id);
  const order_id = useAppSelector((state) => state.order.id);

  const total = useMemo(() => {
    return dataOrder.reduce((current, next) => {
      return current + next.quantity * next.product_data.price;
    }, 0);
  }, [dataOrder]);

  const handleGetOrderDetail = async () => {
    if (!order_id) return;

    try {
      const { metadata } = await orderDetailApi.getByOrderId({
        user_id,
        id: +order_id,
      });
      setDataOrder(
        metadata.map((item) => ({
          ...item,
          is_update: false,
        }))
      );
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleCallback = () => {
    if(!refChildren.current || !refChildren.current?.['submit']) return;

    //@ts-ignore
    return refChildren.current?.['submit']();
  }

  useEffect(() => {
    if(!user_id) {
      navigate('/Forbidden')
    }
  }, [user_id])

  useEffect(() => {
    if(user_id && order_id) {
      handleGetOrderDetail()
    }
  }, [user_id, order_id])

  return (
    <div className={styled["pay__main"]}>
      <div className="pay__main-container">
        <Row gutter={[16, 16]}>
          <Col span={24} md={14}>
            <div className="pay__main-field">
              <div className="main__field-title">
                <h3>Thông tin thanh toán</h3>
              </div>
              <div className="main__field-form">
                <FormPay ref={refChildren} order_id={order_id} dataOrder={dataOrder}/>
              </div>
            </div>
          </Col>
          <Col span={24} md={10}>
            <div className="pay__main-info">
              <div className="pay__info-title">
                <h4>Đơn hàng của bạn</h4>
              </div>
              <div className="pay__info-list">
                <table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="right bold">Tổng cộng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrder && dataOrder.map((order, index) => {
                      const {product_data, quantity} = order;
                      return <tr key={index}>
                        <td>{product_data.name}  × {quantity}</td>
                        <td className="right bold">{formatCurrency(product_data.price * quantity)}</td>
                      </tr>
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Tổng cộng</th>
                      <th className="right bold">{formatCurrency(total)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="pay__info-thanks">
                <p>
                  Cảm ơn quý khách hàng đã tin tưởng và chọn sản phẩm của chúng
                  tôi. Chúng tôi cam kết sẽ mang đến trải nghiệm mua sắm tốt
                  nhất cho quý vị. Xin chân thành cảm ơn!
                </p>
              </div>
              <div className="pay__info-btn">
                <button onClick={handleCallback}>Đặt hàng</button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PayComponent;
