import styled from "./index.module.scss";
import TableManageAboutUs from "./tableAboutUs";
import { useAppSelector } from "@/store/index";
import ModalAboutUs from "./modalAboutUs";
import { ButtonComponent } from "@/components/form";
import { ShopOutlined } from "@ant-design/icons";

const AboutUs = () => {
  const aboutUsList = useAppSelector(
    (state) => state.aboutUs.aboutUsList
  );
  const loading = useAppSelector((state) => state.aboutUs.loading);
  const pagination = useAppSelector((state) => state.aboutUs.pagination);
  const total = useAppSelector((state) => state.aboutUs.total);

  return (
      <div className={styled["manage__product"]}>
        <div className="add__product">
          <ModalAboutUs
            destroyOnClose={true}
            width={800}
            content={
              <ButtonComponent
                className="btn__add-add__product"
                icon={<ShopOutlined />}
                label="Add about us"
              />
            }
          />
        </div>
        <TableManageAboutUs
          aboutUsList={aboutUsList}
          loading={loading}
          pagination={pagination}
          total={total}
        />
      </div>
  );
};

export default AboutUs;
