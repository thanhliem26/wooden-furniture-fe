import { useState } from "react";
import { useAppDispatch } from "@/store/index";
import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  InputComponent,
  TextAreComponent,
} from "@/components/form";
import { eventEmitter, NotificationError } from "@/utils/index";
import { useForm } from "react-hook-form";
import { schema, FormData, handleSubmitEdit, handleSubmitCreate } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppSelector } from "@/store/index";

interface Props {
  isEdit: boolean;
}

const FormCategory = ({isEdit}: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const categorySelected = useAppSelector(
    (state: RootState) => state.manageCategory.categorySelected
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
      id: categorySelected?.id,
      name: categorySelected?.name,
      description: categorySelected?.description,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      isEdit
        ? handleSubmitEdit(data, dispatch, eventEmitter)
        : handleSubmitCreate(data, dispatch, eventEmitter);
    } catch (error: unknown) {
      NotificationError(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  return (
    <div className="change__field-category">
      <Form
        name="change__field-category"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 16]}>
          <Col md={6} span={24}>
            Category Name <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
              placeholder="Name Category"
              className="remove__border"
            />
          </Col>
          <Col md={6} span={24}>
            Category description
          </Col>
          <Col md={18} span={24}>
            <TextAreComponent
              name="description"
              control={control}
              errors={errors}
              placeholder="Description category"
              className="remove__border"
              rows={4}
            />
          </Col>
        </Row>
        <div className="button__footer">
          <ButtonComponent
            label="Cancel"
            className="btn__tab"
            loading={loading}
            type="default"
            onClick={handleClose}
          />
          <ButtonComponent
            htmlType="submit"
            label="Save changes ok"
            className="btn__submit btn__tab"
            loading={loading}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormCategory;
