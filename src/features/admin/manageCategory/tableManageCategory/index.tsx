import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { statusCode } from "@/constants/index";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import {
  deleteCategory,
  searchCategory,
  setCategorySelected,
  setPagination,
} from "@/store/manageCategories";
import ModalCategory from "../modalCategory";
import categoryApi from "@/api/category";
import TEXT_COMMON from "@/constants/text";
interface Props {
  loading?: boolean;
  categoryList: CategoryState[];
  pagination: basePagination;
  total: number;
}

const TableManageCategory = ({
  loading = false,
  categoryList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteCategory = async ({ id }) => {
    try {
      const { message, status } = await categoryApi.deleteCategory(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteCategory(id));

        eventEmitter.emit("submit_modal");

        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: message,
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<CategoryState> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      width: 130,
      align: 'center',
      render: (date: string) => {
        return <> {moment(date).format("DD-MM-YYYY")}</>;
      },
    },
    {
      title: "UPDATED AT",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: true,
      width: 130,
      align: 'center',
      render: (date: string) => {
        return <> {moment(date).format("DD-MM-YYYY")}</>;
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 180,
      align: 'center',
      //@ts-ignore
      render: (action: unknown, row: CategoryState) => (
        <>
          <ModalCategory
            destroyOnClose={true}
            title="Edit Category"
            width={800}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setCategorySelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            handleConfirm={() => handleDeleteCategory(row)}
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
    <div className="table__manage-category">
      <div className="table__title">
        <InputSearchField
          placeholder="Search Category"
          pagination={pagination}
          setFieldSearch={searchCategory}
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
        dataSource={categoryList}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableManageCategory;
