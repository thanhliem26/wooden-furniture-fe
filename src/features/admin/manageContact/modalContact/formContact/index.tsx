import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  InputComponent,
  TextAreComponent,
} from "@/components/form";
import { eventEmitter, NotificationError } from "@/utils/index";
import { useForm } from "react-hook-form";
import { schema, FormData } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { useEffect } from "react";
import contactApi from "@/api/contact";
import Notification from "@/components/notificationSend";
import { updateRecordList } from "@/store/manageContact";
import TEXT_COMMON from "@/constants/text";

const FormCategory = () => {
  const contactSelected = useAppSelector(
    (state) => state.manageContact.contactSelected
  );
  const dispatch = useAppDispatch();

  const handleUpdate = async (data) => {
    try {
      const { message } = await contactApi.updateContact({...data, is_read: '1'});
      Notification({
        message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
        description: message,
      });

      dispatch(updateRecordList(contactSelected.id))
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    if (contactSelected && contactSelected.is_read === '0') {
      handleUpdate(contactSelected);
    }
  }, [contactSelected.is_read]);

  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: contactSelected?.id,
      name: contactSelected?.name,
      email: contactSelected?.email,
      phone_number: contactSelected?.phone_number,
      address: contactSelected?.address,
      content: contactSelected?.content,
    },
  });

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  return (
    <div className="change__field-contact">
      <Form name="change__field-contact">
        <Row gutter={[16, 16]}>
          <Col md={6} span={24}>
            Name <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
              placeholder="Name Category"
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Email <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="email"
              control={control}
              errors={errors}
              placeholder="Name Category"
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Telephone <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="phone_number"
              control={control}
              errors={errors}
              placeholder="Name Category"
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Address <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="address"
              control={control}
              errors={errors}
              placeholder="Name Category"
              className="remove__border"
              disabled
            />
          </Col>
          <Col md={6} span={24}>
            Content <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <TextAreComponent
              name="content"
              control={control}
              errors={errors}
              placeholder="Description contact"
              className="remove__border"
              rows={4}
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
        </div>
      </Form>
    </div>
  );
};

export default FormCategory;
