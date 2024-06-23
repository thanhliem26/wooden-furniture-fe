import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { statusCode } from "@/constants/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter, isJson } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import ModalProduct from "../modalNews"; 
import images from "@/constants/images";
import { deleteNews, searchNews, setNewsSelected, setPagination } from "@/store/manageNews";
import newsApi from "@/api/news";
import { handlePrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import TEXT_COMMON from "@/constants/text";

interface Props {
  loading?: boolean;
  newsList: NewsState[];
  pagination: basePagination;
  total: number;
}

const TableManageNews = ({
  loading = false,
  newsList = [],
  pagination,
  total,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteNews = async ({ id, image }) => {
    try {
      let imageNews = image && isJson(image) ? JSON.parse(image) : [];
      imageNews = imageNews.map((news) => ({...news, is_delete: true}));

      const { message, status } = await newsApi.deleteNews(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteNews(id));
        await handlePrevImageS3(imageNews)

        eventEmitter.emit("submit_modal");

        Notification({
          message: message,
          description: TEXT_COMMON.SUCCESS_TEXT.DELETE_NOTIFY,
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<NewsState> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: 200,
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
      title: "IMAGE",
      dataIndex: "image",
      render: (image: string) => {
        const [imageNews] = image && isJson(image) ? JSON.parse(image) : [];
        const url = imageNews?.['url'] ? imageNews?.['url'] : images.StoreEmpty;

        return <div className="contain__image-news">
          <img src={url} alt="image news" />
        </div>
      }
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 200,
      //@ts-ignore
      render: (action: unknown, row: NewsState) => (
        <>
          <ModalProduct
            destroyOnClose={true}
            title="Edit Category"
            width={1000}
            isEdit={true}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setNewsSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            handleConfirm={() => handleDeleteNews(row)}
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
    <div className="table__manage-news">
      <div className="table__title">
        <InputSearchField
          placeholder="Search news"
          pagination={pagination}
          setFieldSearch={searchNews}
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
        dataSource={newsList}
        scroll={{ x: 1000 }}
        rowKey={'id'}
      />
    </div>
  );
};

export default TableManageNews;
