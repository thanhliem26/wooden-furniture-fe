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
  deleteContact,
  setContactSelected,
  setPagination,
} from "@/store/manageContact";
import ModalContact from "../modalContact";
import { searchContact } from "@/store/manageContact";
import contactApi from "@/api/contact";
import TEXT_COMMON from "@/constants/text";
interface Props {
  loading?: boolean;
  contactList: ContactState[];
  pagination: basePagination;
  total: number;
}

const TableManageContact = ({
  loading = false,
  contactList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteContact = async ({ id }) => {
    try {
      const { message, status } = await contactApi.deleteContact(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteContact(id));

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

  const columns: ColumnsType<ContactState> = [
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
      title: "TELEPHONE",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "STATUS",
      dataIndex: "is_read",
      key: "is_read",
      width: 50,
      align: 'center',
      render: (is_read: string) => {
        return (
          <>
            {+is_read === 1 ? (
              <Tag color="green">READ</Tag>
            ) : (
              <Tag color="orange">UNREAD</Tag>
            )}{" "}
          </>
        );
      },
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      width: 150,
      align: 'center',
      render: (date: string) => {
        return <> {moment(date).format("DD-MM-YYYY")}</>;
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      align: 'center',
      width: 200,
      //@ts-ignore
      render: (action: unknown, row: ContactState) => (
        <>
          <ModalContact
            destroyOnClose={true}
            title="View Contact"
            width={800}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setContactSelected(row))}
              >
                <EditOutlined /> VIEW
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            handleConfirm={() => handleDeleteContact(row)}
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
    <div className="table__manage-contact">
      <div className="table__title">
        <InputSearchField
          placeholder="Search Contact"
          pagination={pagination}
          setFieldSearch={searchContact}
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
        dataSource={contactList}
        scroll={{ x: 1000 }}
        rowKey={'id'}
      />
    </div>
  );
};

export default TableManageContact;
