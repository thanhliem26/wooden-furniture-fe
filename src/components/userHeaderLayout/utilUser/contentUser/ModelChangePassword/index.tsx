import { useState } from "react";
import Modal from "@/components/modal";
import ChangePassword from "./ContentChangePassword";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
  onSuccess?: any;
  setNullWhenCancel?: boolean;
}

const ModalAddUser = ({ ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      footer={[]}
      {...props}
    >
      <ChangePassword />
    </Modal>
  );
};

export default ModalAddUser;
