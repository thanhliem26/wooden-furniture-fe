import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormProduct from "./formProduct";
import { setProductSelected } from "@/store/manageProducts";

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
      title={isEdit ? 'Edit Product' : 'Create Product'}
      onCancelModal={() => dispatch(setProductSelected(null))}
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
                Product
              </>
            ),
            children: <FormProduct isEdit={isEdit}/>,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalProduct;
