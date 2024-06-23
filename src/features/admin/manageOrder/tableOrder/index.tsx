import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { STATUS_ORDER_COLOR, statusCode } from "@/constants/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import ModalOrder from "../modalOrder";
import { deleteOrderAll, searchOrderAll, setOrderSelected, setPagination } from "@/store/orderUser";
import orderApi from "@/api/order";

interface Props {
  loading?: boolean;
  orderList: OrderState[];
  pagination: basePagination;
  total: number;
}

const TableManageNews = ({
  loading = false,
  orderList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteOrder = async (data: Partial<OrderState>) => {
    try {
      const { id } = data;

      const { message, status } = await orderApi.deleteOrder(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteOrderAll(id));
        eventEmitter.emit("submit_modal");

        Notification({
          message: message,
          description: "Notify delete success!",
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<OrderState> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name: string) => {
        return (
          <div className="content__name">
            <div className="content__name-info overflow__text">
              <h5>{name}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone_number: string) => {
        return (
          <div className="content__name">
            <div className="content__name-info overflow__text">
              <h5>{phone_number}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: string) => {
        return (
          <div className="content__name">
            <div className="content__name-info overflow__text">
              <h5>{address}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "order_status",
      key: "order_status",
      width: 100,
      align: 'center',
      render: (order_status: string) => {
        return (
          <Tag
            color={STATUS_ORDER_COLOR[order_status]}
            className="tag__action"
          >
            {order_status}
          </Tag>
        );
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 200,
      align:'center',
      //@ts-ignore
      render: (action: unknown, row: OrderState) => (
        <>
          <ModalOrder
            destroyOnClose={true}
            width={800}
            isEdit={true}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setOrderSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            handleConfirm={() => handleDeleteOrder(row)}
          >
            <Tag color="red" className="tag__action">
              <DeleteOutlined /> DELETE
            </Tag>
          </ModalConfirm>
        </>
      ),
    },
  ];
  const onChangePagination = (page: number, size: number) => {
    dispatch(setPagination({ current: page, pageSize: size }));
  };

  return (
    <div className="table__manage-order">
      <div className="table__title">
        <InputSearchField
          placeholder="Search order"
          pagination={pagination}
          setFieldSearch={searchOrderAll}
          setPagination={setPagination}
        />
      </div>
      <Table
        pagination={{
          ...pagination,
          total: total,
          showSizeChanger: true,
          onChange: onChangePagination,
        }}
        loading={loading}
        columns={columns}
        dataSource={orderList}
        scroll={{ x: 1000 }}
        rowKey={"id"}
      />
    </div>
  );
};

export default TableManageNews;
