import { useState } from "react";
import Modal from "@/components/modal";
import styled from "./index.module.scss";
import TEXT_COMMON from "@/constants/text";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose: boolean;
  onClickDelete?: any;
}

const ModalConfirm = ({ onClickDelete, ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Modal
      footer={
        <div className="modal__footer">
          <button className="btn__cancel" onClick={() => setIsModalOpen(false)}>{TEXT_COMMON.SHOW_TEXT.CANCEL_COMMENT}</button>
          <button className="btn__submit" onClick={() => {
            onClickDelete();
            setIsModalOpen(false)
          }}>{TEXT_COMMON.SHOW_TEXT.AGREE_COMMENT}</button>
        </div>
      }
      className={styled["modal__comment-delete"]}
      title="Thông báo"
      centered
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      {...props}
    >
      <p>{TEXT_COMMON.SHOW_TEXT.CONFIRM_DELETE_COMMENT}y</p>
    </Modal>
  );
};

export default ModalConfirm;
