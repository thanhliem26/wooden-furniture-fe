import { useState } from "react";
import { Col, Row, Form } from "antd";
import { ButtonComponent, CheckboxComponent, InputComponent } from "@/components/form";
import { NotificationError, eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import { useForm, useWatch } from "react-hook-form";
import { schema, FormData } from './constant';
import { yupResolver } from "@hookform/resolvers/yup";
import styled from './index.module.scss';
import userApi from "@/api/user";
import { RootState, useAppSelector } from "@/store/index";
import { statusCode } from "@/constants/index";

const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const userSelected = useAppSelector(
    (state: RootState) => state.manageUser.userSelected
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
        id: userSelected?.id,
      },
  });

  //watch field show
  const showPassword = useWatch({
    control,
    name: "show", 
    defaultValue: false, 
  })
  
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const {status, message } = await userApi.changePassword(data);

      if (status === statusCode.UPDATED) {
        eventEmitter.emit("submit_modal");

        Notification({
          message: 'Notify Success',
          description: message,
        });
      }
    } catch (error: unknown) {
      NotificationError(error)
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
    <div className={styled['change__password']}>
      <Form
        name="change__password"
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 16]}>
        <Col md={6} span={24}>
            Current Password <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="current_password"
              control={control}
              errors={errors}
              placeholder="Your current Password"
              className="remove__border"
              type={showPassword ? 'text' : 'password'} 
            />
          </Col>
          <Col md={6} span={24}>
            New Password <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="password"
              control={control}
              errors={errors}
              placeholder="Your password"
              className="remove__border"
              type={showPassword ? 'text' : 'password'} 
            />
          </Col>
          <Col md={6} span={24}>
            Confirm New Password <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="re_password"
              control={control}
              errors={errors}
              placeholder="Your confirm password"
              className="remove__border"
              type={showPassword ? 'text' : 'password'} 
            />
          </Col>
          <Col md={6} span={0}>
          </Col>
          <Col md={18} span={24}>
            <CheckboxComponent
              name="show"
              control={control}
              errors={errors}
              className="remove__border"
              setValue={setValue}
            >Show password</CheckboxComponent>
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
            label="Save changes"
            className="btn__submit btn__tab"
            loading={loading}
          />
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
