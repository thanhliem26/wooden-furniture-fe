import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormAboutUs from "./formAboutUs";
import { setAboutUsSelected } from "@/store/aboutUs";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
}

const ModalProduct = ({isEdit = false,  ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Modal
      footer={[]}
      className={styled["modal__product"]}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={isEdit ? 'Edit About us' : 'Create About us'}
      onCancelModal={() => dispatch(setAboutUsSelected(null))}
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
                About Us
              </>
            ),
            children: <FormAboutUs isEdit={isEdit}/>,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalProduct;
