import TEXT_COMMON from "@/constants/text";
import { formatCurrency } from "@/utils/index";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface Props {
  dataOrder: OrderDetailState[];
}

const TotalCart = ({ dataOrder }: Props) => {
  const total = useMemo(() => {
    return dataOrder.reduce((current, next) => {
      return current + next.quantity * next.product_data.price;
    }, 0);
  }, [dataOrder]);
 
  return (
    <>
      {total ? (
        <div className="total__cart">
          <div className="total__cart-title">Cộng giỏ hàng</div>
          <div className="total__cart-list">
            <div className="total__cart-item">
              <div className="cart__item-text">Tạm tính</div>
              <div className="cart__item-price">{formatCurrency(total)} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT}</div>
            </div>
            <div className="total__cart-item">
              <div className="cart__item-text">Tổng</div>
              <div className="cart__item-price">{formatCurrency(total)} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT}</div>
            </div>
          </div>
          <Link to="/pay" className="total__cart-btn">
            Tiến hành thanh toán
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default TotalCart;
