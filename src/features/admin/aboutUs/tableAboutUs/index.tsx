import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { statusCode } from "@/constants/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import ModalProduct from "../modalAboutUs";
import { handlePrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import {
  deleteAboutUs,
  searchAboutUs,
  setAboutUsSelected,
  setPagination,
} from "@/store/aboutUs";
import aboutUsApi from "@/api/aboutUs";

interface Props {
  loading?: boolean;
  aboutUsList: AboutUsState[];
  pagination: basePagination;
  total: number;
}

const TableManageProduct = ({
  loading = false,
  aboutUsList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteAboutUs = async (payload: AboutUsState) => {
    const { image, logo, id } = payload;
    try {
      let imageDelete = image ? JSON.parse(image) : [];
      imageDelete = imageDelete.map((news) => ({ ...news, is_delete: true }));

      let logoDelete = logo ? JSON.parse(logo) : [];
      logoDelete = logoDelete.map((news) => ({ ...news, is_delete: true }));

      const { message, status } = await aboutUsApi.deleteAboutUs(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteAboutUs(id));
        await handlePrevImageS3(imageDelete);
        await handlePrevImageS3(logoDelete);

        eventEmitter.emit("submit_modal");

        Notification({
          message: message,
          description: "Notify delete succes",
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<AboutUsState> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name: string) => {
        return (
          <div className="content__name">
            <div className="content__name-info">
              <h5>{name}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (address: string) => {
        return <p className="overflow__text">{address}</p>;
      },
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: true,
      width: 130,
      align: "center",
      render: (phone_number: number) => {
        return <> {phone_number}</>;
      },
    },
    {
      title: "ACTIVE",
      dataIndex: "is_active",
      key: "is_active",
      sorter: true,
      width: 130,
      align: "center",
      render: (is_active: number) => {
        return (
          <Tag color={+is_active === 1 ? "green" : "grey"}>
            {+is_active === 1 ? "ACTIVE" : "NON ACTIVE"}
          </Tag>
        );
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 180,
      align: "center",
      //@ts-ignore
      render: (action: unknown, row: AboutUsState) => (
        <>
          <ModalProduct
            destroyOnClose={true}
            title="Edit Category"
            width={800}
            isEdit={true}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setAboutUsSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            handleConfirm={() => handleDeleteAboutUs(row)}
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
    <div className="table__manage-product">
      <div className="table__title">
        <InputSearchField
          placeholder="Search about us"
          pagination={pagination}
          setFieldSearch={searchAboutUs}
          setPagination={setPagination}
        />
      </div>
      <Table
        // size="large"
        pagination={{
          ...pagination,
          total: total,
          showSizeChanger: true,
          onChange: onChangePagination,
        }}
        loading={loading}
        columns={columns}
        dataSource={aboutUsList}
        scroll={{ x: 1000 }}
        rowKey={"id"}
      />
    </div>
  );
};

export default TableManageProduct;
