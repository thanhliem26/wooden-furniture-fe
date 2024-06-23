import styled from "./index.module.scss";
import TableManageCategory from "./tableManageCategory";
import { useAppSelector } from "@/store/index";
import ModalCategory from "./modalCategory";
import { ButtonComponent } from "@/components/form";
import { ShopOutlined } from "@ant-design/icons";

const ManageCategory = () => {
  const categoryList = useAppSelector(
    (state) => state.manageCategory.categoryList
  );
  const loading = useAppSelector((state) => state.manageCategory.loading);
  const pagination = useAppSelector((state) => state.manageCategory.pagination);
  const total = useAppSelector((state) => state.manageCategory.total);

  return (
    <div className={styled["manage__category"]}>
      <div className='add__category'>
        <ModalCategory
          destroyOnClose={true}
          title="Edit Category"
          width={800}
          content={
            <ButtonComponent
              className="btn__add-category"
              icon={<ShopOutlined />}
              label="Add category"
            />
          }
        />
      </div>
      <TableManageCategory
        categoryList={categoryList}
        loading={loading}
        pagination={pagination}
        total={total}
      />
    </div>
  );
};

export default ManageCategory;
