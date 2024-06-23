import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ROlE, TAG_ROLE, statusCode } from "@/constants/index";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import images from "@/constants/images";
import ModalEdit from "./modalEdit";
import { useAppDispatch } from "@/store/index";
import { deleteUser, setPagination, setUserSelected, searchUser } from "@/store/manageUser";
import ModalConfirm from "@/components/confirm";
import userApi from "@/api/user";
import { eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import { handlePrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import InputSearchField from "@/components/admin/inputSearch";
interface Props {
  loading?: boolean;
  userList: UserState[];
  pagination: basePagination;
  total: number;
}

const TableManageUsers = ({
  loading = false,
  userList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteUser = async ({id, avatar, avatar_support}) => {
    try {
      const fieldAvatar = avatar ? [{...JSON.parse(avatar), is_delete: true}] : [];
      const fieldAvatarSP = avatar_support ? [{...JSON.parse(avatar_support), is_delete: true}] : [];

      const { message, status } = await userApi.deleteUser(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteUser(id));

        await handlePrevImageS3(fieldAvatar)
        await handlePrevImageS3(fieldAvatarSP)

        eventEmitter.emit("submit_modal");

        Notification({
          message: message,
          description: "Delete user success",
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<UserState> = [
    {
      title: "NAME",
      dataIndex: "fullName",
      key: "fullName",
      render: (name: string, row: UserState) => {
        const avatar = row.avatar && JSON.parse(row.avatar);
       
        return (
          <div className="content__name">
            <div className="content__name-image">
              <img
                src={avatar?.url || images.AvatarDefault}
                alt="image description"
              />
            </div>
            <div className="content__name-info">
              <h5>{name}</h5>
              <span>{row.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "DATE OF BIRTH",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: true,
      width: 150,
      align: 'center',
      render: (date: string) => {
        return <> {moment(date).format("DD-MM-YYYY")}</>;
      },
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 130,
      align: 'center'
    },
    {
      title: "ROLE",
      dataIndex: "role_user",
      key: "role_user",
      align: "center",
      width: 30,
      render: (role: string) => {
        return <Tag color={TAG_ROLE[role]}>{ROlE[role]}</Tag>;
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 180,
      align: 'center',
      //@ts-ignore
      render: (action: unknown, row: UserState) => (
        <>
          <ModalEdit
            destroyOnClose={true}
            title="Edit user"
            width={800}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setUserSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            handleConfirm={() => handleDeleteUser(row)}
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
    dispatch(setPagination({current: page, pageSize: size}))
  }

  return (
    <div className="table__sale-contract">
      <div className="table__title">
        <InputSearchField
          placeholder="Search User"
          pagination={pagination}
          setFieldSearch={searchUser}
          setPagination={setPagination}
        />
      </div>
      <Table
        // size="large"
        pagination={{ ...pagination, total: total, showSizeChanger: true, onChange: onChangePagination}}
        loading={loading}
        columns={columns}
        dataSource={userList}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableManageUsers;
