import { Tabs } from "antd";
import styled from "./index.module.scss";
import {
  AccountBookOutlined,
  CarOutlined,
  CheckOutlined,
  DeleteOutlined,
  PlusOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import ContentOrder from "./contentOrder";
import { useEffect, useState } from "react";
import orderDetailApi from "@/api/orderDetail";
import { NotificationError } from "@/utils/index";
import { STATUS_ORDER } from "@/constants/index";
import { cloneDeep } from "lodash";
import { useAppSelector } from "@/store/index";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const userId = useAppSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [orderDetailList, setOrderDetailList] = useState<metadataOrderList[]>(
    []
  );
  const handleGetOrderList = async () => {
    try {
      const { metadata } = await orderDetailApi.getOrderDetail();
      setOrderDetailList(metadata);
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleUpdateOrderDetail = (data) => {
    let cloneList = cloneDeep(orderDetailList);
    cloneList = cloneList.map((order) => {
      if (order.id === data.id) {
        order.evaluate_id = data.evaluate_id;
      }

      return order;
    });

    setOrderDetailList(cloneList);
  };

  useEffect(() => {
    if(!userId) {
      navigate('/Forbidden')
    }
  }, [userId])

  useEffect(() => {
    if(userId) {
      handleGetOrderList();
    }
  }, []);

  return (
    <div className={styled["main__purchase"]}>
      <div className="main__purchase-container">
        <div className="purchase__nav">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: (
                  <>
                    <AccountBookOutlined />
                    Tất cả
                  </>
                ),
                children: <ContentOrder orderDetailList={orderDetailList} />,
              },
              {
                key: "2",
                label: (
                  <>
                    <SmallDashOutlined />
                    Chờ xác nhận
                  </>
                ),
                children: (
                  <ContentOrder
                    orderDetailList={orderDetailList}
                    type={STATUS_ORDER.WAIT_CONFIRMATION}
                  />
                ),
              },
              {
                key: "3",
                label: (
                  <>
                    <CheckOutlined />
                    Xác nhận
                  </>
                ),
                children: (
                  <ContentOrder
                    orderDetailList={orderDetailList}
                    type={STATUS_ORDER.CONFIRMED}
                  />
                ),
              },
              {
                key: "4",
                label: (
                  <>
                    <CarOutlined />
                    Đang giao hàng
                  </>
                ),
                children: (
                  <ContentOrder
                    orderDetailList={orderDetailList}
                    type={STATUS_ORDER.SHIPPED}
                  />
                ),
              },
              {
                key: "5",
                label: (
                  <>
                    <DeleteOutlined />
                    Hủy đơn
                  </>
                ),
                children: (
                  <ContentOrder
                    orderDetailList={orderDetailList}
                    type={STATUS_ORDER.CANCELLED}
                  />
                ),
              },
              {
                key: "6",
                label: (
                  <>
                    <PlusOutlined />
                    Giao thành công
                  </>
                ),
                children: (
                  <ContentOrder
                    orderDetailList={orderDetailList}
                    type={STATUS_ORDER.DELIVERED}
                    handleUpdateOrderDetail={handleUpdateOrderDetail}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;
