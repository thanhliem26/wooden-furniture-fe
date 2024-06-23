import styled from "./index.module.scss";
import TableManageOrder from "./tableOrder";
import { useAppSelector } from "@/store/index";

const ManageOrder = () => {
  const orderList = useAppSelector((state) => state.order.list__order_all);
  const loading = useAppSelector((state) => state.order.loading);
  const pagination = useAppSelector((state) => state.order.pagination);
  const total = useAppSelector((state) => state.order.total);

  return (
    <div className={styled["manage__order"]}>
      <TableManageOrder
        orderList={orderList}
        loading={loading}
        pagination={pagination}
        total={total}
      />
    </div>
  );
};

export default ManageOrder;
