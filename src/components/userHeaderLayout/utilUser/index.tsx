import useResizeWindow from "@/hoc/useWindow";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useMemo } from "react";
import ContentPopover from "./contentPopover";
import ContentUser from './contentUser'
import { RootState, useAppSelector } from "@/store/index";

const UtilUser = () => {
  const resize = useResizeWindow();

  const listOrder = useAppSelector(
    (state: RootState) => state.order.list_order
  );

  const totalQuantity = useMemo(() => {
    return listOrder.reduce((current, next) => {
      return current + next.quantity;
    }, 0);
  }, [listOrder]);

  return (
    <div className="util__user">
      {resize.width >= 850 ? (
        <>
          <div className="util_user-singIn">
            <div className="user__singIn-image">
              <ContentUser />
            </div>
          </div>
          <div className="border__space"></div>
          <div className="util_user-shoppingCart">
            <Popover
              placement="bottomRight"
              trigger="hover"
              content={<ContentPopover />}
            >
              <span>
                Giỏ hàng
                <strong className="icon__shopping">{totalQuantity}</strong>
              </span>
            </Popover>
          </div>
        </>
      ) : (
        <ShoppingCartOutlined />
      )}
    </div>
  );
};

export default UtilUser;
