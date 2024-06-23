import { useState } from "react";
import Modal from "@/components/modal";
import ContentInfoChange from "./content";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
  onSuccess?: any;
  setNullWhenCancel?: boolean;
}

const ModalAddUser = ({ isEdit = false, onSuccess, setNullWhenCancel = true,  ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      footer={[]}
      {...props}
    >
      <ContentInfoChange isEdit={isEdit} onSuccess={onSuccess} setNullWhenCancel={setNullWhenCancel}/>
    </Modal>
  );
};

export default ModalAddUser;
