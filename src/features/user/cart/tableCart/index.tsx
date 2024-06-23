import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import styled from "./index.module.scss";
import orderDetailApi from "@/api/orderDetail";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { NotificationError, formatCurrency } from "@/utils/index";
import { TYPE_ADD_MINUS } from "@/constants/index";
import lodash from "lodash";
import { searchOrder } from "@/store/orderUser";
import TEXT_COMMON from "@/constants/text";

interface Props {
  dataOrder: OrderDetailState[],
  setDataOrder: React.Dispatch<React.SetStateAction<OrderDetailState[]>>,
}

const TableCart = ({dataOrder, setDataOrder}: Props) => {
  const user_id = useAppSelector((state) => state.user.id);
  const id = useAppSelector((state) => state.order.id);

  const dispatch = useAppDispatch();
  const [idDelete, setIdDelete] = useState<number[]>([]);

  const isUpdate = useMemo(() => {
    const findUpdate = dataOrder.filter((order) => {
      return order?.['is_update'] === true;
    })
   
    return !lodash.isEmpty(findUpdate)
  }, [dataOrder])
  
  const isDelete = useMemo(() => {
    return !lodash.isEmpty(idDelete)
  }, [idDelete])

  const handleGetOrderDetail = async () => {
    if (!id) return;

    try {
      const { metadata } = await orderDetailApi.getByOrderId({
        user_id,
        id: +id,
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

  const handleSetData = (id, type) => {
    const dataClone = lodash.cloneDeep(dataOrder);
    const dataSet = dataClone.map((item) => {
      if (item.id === id && type === TYPE_ADD_MINUS.ADD) {
        item.quantity += 1;
        item.is_update = true;
      }

      if (
        item.id === id &&
        type === TYPE_ADD_MINUS.MINUS &&
        item.quantity > 0
      ) {
        item.quantity -= 1;
        item.is_update = true;
      }

      return item;
    });

    setDataOrder(dataSet);
  };

  const handleSetDelete = (id) => {
    const dataClone = lodash.cloneDeep(dataOrder);
    const dataSet = dataClone.filter((item) => {
      if (item.id === id) {
        setIdDelete([...idDelete, item.id]);
      }

      return item.id !== id;
    });

    setDataOrder(dataSet);
  };

  const columns: TableProps<OrderDetailState>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, row) => {
        const { images, name } = row.product_data;
        const [imageFirst] = JSON.parse(images);
        return (
          <div className="product__info">
            <div className="product__info-image">
              <img src={imageFirst.url} alt="image product" />
            </div>
            <div className="product__info-content">
              <div className="product__info-name">{name}</div>
              <div
                className="product__info-remove"
                onClick={() => handleSetDelete(row.id)}
              >
                <span>REMOVE</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, row) => {
        return <span className="span__price">{formatCurrency(row.product_data.price)} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, row) => {
        const { quantity, id } = row;
        return (
          <div className="product__quantity">
            <button
              className={quantity <= 1 ? "btn__disabled" : ""}
              onClick={() =>
                quantity > 1 && handleSetData(id, TYPE_ADD_MINUS.MINUS)
              }
            >
              -
            </button>
            {quantity}
            <button onClick={() => handleSetData(id, TYPE_ADD_MINUS.ADD)}>
              +
            </button>
          </div>
        );
      },
    },
    {
      title: "Subtotal",
      key: "subTotal",
      dataIndex: "subTotal",
      render: (_, row) => {
        return <span className="span__price">{formatCurrency(row.product_data.price * row.quantity)} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT}</span>;
      },
    },
  ];

  useEffect(() => {
    if (user_id) {
      handleGetOrderDetail();
    }
  }, [user_id, id]);

  const handleUpdate = async () => {
    if(isUpdate) {
      await Promise.all(
        dataOrder.map(async (order) => {
          const { order_id, productId, quantity} = order;
          if (order?.["is_update"]) {
            await orderDetailApi.createOrderDetail({order_id, productId, quantity})
          }
  
          return order;
        })
      );
    }
    
    if(isDelete) {
      await Promise.all(
        idDelete.map(async (id) => {
          await orderDetailApi.deleteOrderDetail(id)
  
          return id;
        })
       
      );
      setIdDelete([]);
    }

    if(isDelete || isUpdate) {
      handleGetOrderDetail();
      dispatch(
        searchOrder({ order_status: "pending", user_id: user_id, limit: 1 })
      );
    }

  
  };
  return (
    <Table
      className={styled["table__cart"]}
      columns={columns}
      dataSource={dataOrder}
      rowKey={(record) => record.id}
      pagination={{ position: [] }}
      footer={() => (
        <div className="footer__cart">
          <div className="footer__cart-btn">
            <button className={isUpdate || isDelete ? '' : 'not__allow'} onClick={handleUpdate}>UPDATE CART</button>
          </div>
        </div>
      )}
    />
  );
};

export default TableCart;
