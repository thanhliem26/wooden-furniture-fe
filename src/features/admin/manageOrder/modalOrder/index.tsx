import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormNews from "./formOrder";
import { setNewsSelected } from "@/store/manageNews";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
}

const ModalNews = ({isEdit = false,  ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Modal
      footer={[]}
      className={styled["modal__orders"]}
      isModalOpen={isModalOpen}
      title={'Edit Order'}
      setIsModalOpen={setIsModalOpen}
      onCancelModal={() => dispatch(setNewsSelected(null))}
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
                Order
              </>
            ),
            children: <FormNews />,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalNews;
