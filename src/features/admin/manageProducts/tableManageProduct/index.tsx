import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { statusCode } from "@/constants/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter, formatCurrency } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import {
  setPagination,
  deleteProduct,
} from "@/store/manageProducts";
import {searchProduct, setProductSelected} from '@/store/manageProducts';
import ModalProduct from "../modalProduct"; 
import productApi from "@/api/product";
import { ProductContext } from "../constant";
import { useContext } from "react";
import { handlePrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import TEXT_COMMON from "@/constants/text";

interface Props {
  loading?: boolean;
  productList: ProductState[];
  pagination: basePagination;
  total: number;
}

const TableManageProduct = ({
  loading = false,
  productList = [],
  pagination,
  total,
}: Props) => {
  const categoryContext = useContext(ProductContext);
  const dispatch = useAppDispatch();

  const handleGetCategory = (id) => {
    const [result] = categoryContext.categoryList.filter((category) => {
      return category.id === id;
    })

    return result || {};
  }

  const handleDeleteProduct = async ({ id, images }) => {
    try {
      let imageProduct = images ? JSON.parse(images) : [];
      imageProduct = imageProduct.map((news) => ({...news, is_delete: true}));

      const { message, status } = await productApi.deleteProduct(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteProduct(id));
        await handlePrevImageS3(imageProduct)

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

  const columns: ColumnsType<ProductState> = [
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
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (description: string) => {
        return <p className="overflow__text">{description}</p>
      }
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      sorter: true,
      width: 130,
      align: 'center',
      render: (price: number) => {
        return <> {formatCurrency(price)}</>;
      },
    },
    {
      title: "STOCK QUANTITY",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      sorter: true,
      width: 130,
      align:'center',
      render: (stock_quantity: number) => {
        return <> {stock_quantity}</>;
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "category_id",
      key: "category_id",
      width: 130,
      align: 'center',
      render: (category_id: number) => {
        const category = handleGetCategory(category_id);
      
        return <b>{category?.['name']}</b>;
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 180,
      align: 'center',
      //@ts-ignore
      render: (action: unknown, row: ProductState) => (
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
                onClick={() => dispatch(setProductSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            handleConfirm={() => handleDeleteProduct(row)}
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
          placeholder="Search product"
          pagination={pagination}
          setFieldSearch={searchProduct}
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
        dataSource={productList}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableManageProduct;
