import styled from "./index.module.scss";
import TableManageProduct from "./tableManageProduct";
import { useAppSelector } from "@/store/index";
import ModalProduct from "./modalProduct";
import { ButtonComponent } from "@/components/form";
import { ShopOutlined } from "@ant-design/icons";
import { ProductContext } from "./constant";
import categoryApi from "@/api/category";
import { useEffect, useState } from "react";

const ManageCategory = () => {
  const productList = useAppSelector(
    (state) => state.manageProduct.productList
  );
  const loading = useAppSelector((state) => state.manageProduct.loading);
  const pagination = useAppSelector((state) => state.manageProduct.pagination);
  const total = useAppSelector((state) => state.manageProduct.total);

  const [categoryList, setCategoryList] = useState<CategoryState[]>([]);

  useEffect(() => {
    handleGetCategory();
  }, []);

  const handleGetCategory = async () => {
    const { metadata } = await categoryApi.searchCategory({ name: "" });
    setCategoryList(metadata?.rows);
  };

  return (
    <ProductContext.Provider value={{ categoryList: categoryList }}>
      <div className={styled["manage__product"]}>
        <div className="add__product">
          <ModalProduct
            destroyOnClose={true}
            width={1000}
            content={
              <ButtonComponent
                className="btn__add-add__product"
                icon={<ShopOutlined />}
                label="Add product"
              />
            }
          />
        </div>
        <TableManageProduct
          productList={productList}
          loading={loading}
          pagination={pagination}
          total={total}
        />
      </div>
    </ProductContext.Provider>
  );
};

export default ManageCategory;
