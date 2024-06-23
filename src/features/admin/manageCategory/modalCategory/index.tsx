import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormCategory from "./formCategory";
import { setCategorySelected } from "@/store/manageCategories";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
}

const ModalCategory = ({isEdit = false,  ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Modal
      footer={[]}
      className={styled["modal__category"]}
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
                Category
              </>
            ),
            children: <FormCategory isEdit={isEdit}/>,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalCategory;
