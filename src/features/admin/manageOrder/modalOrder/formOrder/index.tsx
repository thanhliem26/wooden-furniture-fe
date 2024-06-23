import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  TextAreComponent,
} from "@/components/form";
import { eventEmitter, isJson, NotificationError } from "@/utils/index";
import { useForm } from "react-hook-form";
import { schema, FormData, optionStatusOrder } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import Notification from "@/components/notificationSend";
import UploadComponent from "@/components/form/uploadComponent";
import { useEffect, useState } from "react";
import lodash from "lodash";
import orderApi from "@/api/order";
import { editItemInOrderAll, setOrderSelected } from "@/store/orderUser";
import TEXT_COMMON from "@/constants/text";

const FormCategory = () => {
  const orderSelected = useAppSelector((state: RootState) => state.order.orderSelected);
  const [imageDefault, setImageDefault] = useState([]);
  const dispatch = useAppDispatch();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: orderSelected?.id,
      name: orderSelected?.name,
      email: orderSelected?.email,
      phone_number: orderSelected?.phone_number,
      address: orderSelected?.address,
      note: orderSelected?.note,
      order_status: orderSelected?.order_status,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const dataValue = lodash.cloneDeep(data);
      const { message } = await orderApi.updateOrder({ ...dataValue });

      Notification({
        message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
        description: message,
      });
      dispatch(editItemInOrderAll({ ...dataValue } as OrderState));

      eventEmitter.emit("submit_modal");
      dispatch(setOrderSelected(null));

    } catch (error: unknown) {
      NotificationError(error);
    }
  };

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  useEffect(() => {
    if (orderSelected && orderSelected.order_detail) {
      const images = orderSelected?.order_detail.map((order) => {
        const { product_data } = order;
        const [imageFirst] = isJson(product_data.images)
          ? JSON.parse(product_data.images)
          : [];

        return imageFirst;
      });
      setImageDefault(images);
    }
  }, [orderSelected]);

  return (
    <div className="change__field-orders">
      <Form name="change__field-orders" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col md={6} span={24}>
            Status
          </Col>
          <Col md={18} span={24}>
            <SelectComponent
              name="order_status"
              control={control}
              errors={errors}
              placeholder="ROLE"
              className="remove__border"
              options={optionStatusOrder}
            />  
          </Col>
          <Col md={6} span={24}>
            Name
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Email
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="email"
              control={control}
              errors={errors}
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Telephone
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="phone_number"
              control={control}
              errors={errors}
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Address
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="address"
              control={control}
              errors={errors}
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Note
          </Col>
          <Col md={18} span={24}>
            <TextAreComponent
              name="note"
              control={control}
              errors={errors}
              className="remove__border"
              rows={4}
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Image Product
          </Col>
          <Col md={18} span={24}>
            <UploadComponent
              name="image"
              control={control}
              errors={errors}
              className="remove__border"
              setValue={setValue}
              maxCount={1}
              defaultValue={imageDefault}
              disabled
            />
          </Col>
        </Row>
        <div className="button__footer">
          <ButtonComponent
            label="Cancel"
            className="btn__tab"
            type="default"
            onClick={handleClose}
          />
          <ButtonComponent
            htmlType="submit"
            label="Save changes ok"
            className="btn__submit btn__tab"
          />
        </div>
      </Form>
    </div>
  );
};

export default FormCategory;
