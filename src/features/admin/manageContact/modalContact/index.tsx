import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormCategory from "./formContact";
import { setCategorySelected } from "@/store/manageCategories";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
}

const ModalCategory = ({ ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Modal
      footer={[]}
      className={styled["modal__contact"]}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onCancelModal={() => dispatch(setCategorySelected(null))}
      {...props}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <>
                <ShopOutlined />
                Contact
              </>
            ),
            children: <FormCategory />,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalCategory;
