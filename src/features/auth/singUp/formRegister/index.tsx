import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import InputComponent from "@/components/form/inputComponent";
import ButtonComponent from "@/components/form/buttonComponent";
import {
  LockOutlined,
  UserOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { schema, FormData } from "./constant";
import authApi from "@/api/auth";
import Notification from "@/components/notificationSend";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "@/utils/index";
import TEXT_COMMON from "@/constants/text";

const FormRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Required<FormData>) => {
    try {
      setLoading(true);
      await authApi.singUp({...data, is_active: '0'});
      Notification({
        message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
        description: TEXT_COMMON.SUCCESS_TEXT.CREATE_USER_DESCRIPTION,
        duration: 10,
      });

      navigate("/verify-email");
    } catch (error) {
      NotificationError(error)
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="singUp__content-form">
      <h2 className="form__title">{TEXT_COMMON.SHOW_TEXT.SIGN_UP}</h2>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
      >
        <InputComponent
          name="fullName"
          control={control}
          errors={errors}
          placeholder="Your name"
          className="remove__border"
          icon={<UserOutlined className="site-form-item-icon" />}
        />
        <InputComponent
          name="email"
          control={control}
          errors={errors}
          placeholder="Your email"
          className="remove__border"
          icon={<AliwangwangOutlined />}
        />
        <InputComponent
          name="password"
          control={control}
          errors={errors}
          placeholder="Your password"
          className="remove__border"
          type="password"
          icon={<LockOutlined />}
        />
        <InputComponent
          name="re_password"
          control={control}
          errors={errors}
          placeholder="Repeat your password"
          className="remove__border"
          type="password"
          icon={<LockOutlined />}
        />
        <ButtonComponent
          htmlType="submit"
          label="Register"
          className="btn__submit"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default FormRegister;
