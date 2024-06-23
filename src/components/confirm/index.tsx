import { message, Popconfirm, PopconfirmProps } from "antd";

interface typeConfirm extends PopconfirmProps {
  title: string;
  description: string;
  handleConfirm?: () => void;
  handleCancel?:  () => void;
  okText?: string;
  cancelText?: string;
}

const ModalConfirm = ({
  title = "Popup Confirm",
  description = "description",
  okText = "Yes",
  cancelText = "No",
  handleConfirm,
  handleCancel,
  children,
}: typeConfirm) => {
  const confirm = () => {
    handleConfirm && handleConfirm();
    message.success("Click on Yes");
  };

  const cancel = () => {
    handleCancel && handleCancel();
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={confirm}
      onCancel={cancel}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  );
};

export default ModalConfirm;
