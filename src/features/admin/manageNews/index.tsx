import styled from "./index.module.scss";
import ModalNews from "./modalNews";
import { ButtonComponent } from "@/components/form";
import { ShopOutlined } from "@ant-design/icons";
import TableManageNews from "./tableManageNews";
import { useAppSelector } from "@/store/index";

const ManageNews = () => {
  const newsList = useAppSelector((state) => state.manageNews.newsList);
  const loading = useAppSelector((state) => state.manageNews.loading);
  const pagination = useAppSelector((state) => state.manageNews.pagination);
  const total = useAppSelector((state) => state.manageNews.total);

  return (
    <div className={styled["manage__news"]}>
      <div className="add__news">
        <ModalNews
          destroyOnClose={true}
          width={1000}
          content={
            <ButtonComponent
              className="btn__add-add__news"
              icon={<ShopOutlined />}
              label="Add news"
            />
          }
        />
      </div>
      <TableManageNews
        newsList={newsList}
        loading={loading}
        pagination={pagination}
        total={total}
      />
    </div>
  );
};

export default ManageNews;
