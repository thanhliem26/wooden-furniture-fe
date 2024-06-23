import { useState } from "react";
import Modal from "@/components/modal";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormNews from "./formNews";
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
      className={styled["modal__news"]}
      isModalOpen={isModalOpen}
      title={isEdit ? 'Edit News' : 'Create News'}
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
                News
              </>
            ),
            children: <FormNews isEdit={isEdit}/>,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalNews;
