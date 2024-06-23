import { useEffect } from "react";
import { Button, Modal } from "antd";
import { ModalProps } from "antd";
import { eventEmitter } from '@/utils/index';

interface Props extends ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  content?: any;
  title?: string;
  children?: any;
  onCancelModal?: () => void;
  onSuccessModal?: () => boolean;
}

const BaseModal = ({
  isModalOpen = false,
  setIsModalOpen,
  content,
  title = "Basic Modal",
  children = "body Content",
  onCancelModal,
  onSuccessModal = () => true,
  ...props
}: Props) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const result = onSuccessModal();
    result && setIsModalOpen(false);
  };

  const handleCancel = () => {
    onCancelModal && onCancelModal();
    setIsModalOpen(false);
  };

  //handle event emitter
  useEffect(() => {
    eventEmitter.on('submit_modal', handleSubmit);
    eventEmitter.on('cancel_modal', handleCancel);
  }, [])

  return (
    <>
      {content && <span onClick={showModal}>{content}</span>}
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        {...props}
        footer={props?.footer ? props?.footer : [
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="Save Changes" onClick={handleSubmit} type="primary">
            Save Changes
          </Button>,
        ]}
      >
        <div className="modal__body">{children}</div>
      </Modal>
    </>
  );
};

export default BaseModal;
