import { useState } from "react";
import Modal from "@/components/modal";
import styled from "./index.module.scss";
import { useAppDispatch } from "@/store/index";
import FormEvaluate from "./formEvaluate";
import { setCategorySelected } from "@/store/manageCategories";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
  product_data: ProductDataOrder;
  orderDetail_id: number;
  handleUpdateOrderDetail?: (data) => void;
  evaluate_id?: null | number;
}

const ModalEvaluate = ({
  isEdit = false,
  product_data,
  evaluate_id,
  handleUpdateOrderDetail,
  orderDetail_id,
  ...props
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Modal
      footer={[]}
      className={styled["modal__evaluate"]}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onCancelModal={() => dispatch(setCategorySelected(null))}
      {...props}
    >
      <FormEvaluate
        evaluate_id={evaluate_id}
        handleUpdateOrderDetail={handleUpdateOrderDetail}
        orderDetail_id={orderDetail_id}
        isEdit={isEdit}
        product_data={product_data}
      />
    </Modal>
  );
};

export default ModalEvaluate;
