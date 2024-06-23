import styled from "./index.module.scss";
import { Col, Form, Row } from "antd";
import {
  ButtonComponent,
  InputComponent,
  TextAreComponent,
} from "@/components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from "./constant";
import { NotificationError } from "@/utils/index";
import contactApi from "@/api/contact";
import Notification from "@/components/notificationSend";
import TEXT_COMMON from "@/constants/text";

const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
        const { message } = await contactApi.createContact(data);
        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: message,
      });

      reset();
    } catch (error: unknown) {
      NotificationError(error)
    }
  };

  return (
    <div className={styled["main__contact"]}>
      <div className="main__contact-container">
        <Row>
          <Col span={24} md={10}>
            <div className="contact__container-content">
              <h1>Liên hệ với chúng tôi</h1>
              <p>
                Trang liên hệ của chúng tôi là nơi để bạn chia sẻ ý kiến, gửi
                câu hỏi, hoặc yêu cầu hỗ trợ. Đội ngũ chăm sóc khách hàng của
                chúng tôi luôn sẵn lòng lắng nghe và phục vụ bạn một cách tận
                tình. Nếu bạn cần thông tin chi tiết về các sản phẩm hoặc dịch
                vụ của chúng tôi, hãy liên hệ ngay. Chúng tôi đánh giá cao mọi
                phản hồi và sẽ nhanh chóng phản hồi lại bạn. Đừng ngần ngại, hãy
                điền vào biểu mẫu liên hệ dưới đây hoặc liên hệ trực tiếp qua
                thông tin bên dưới. Xin cảm ơn bạn đã quan tâm đến chúng tôi!
              </p>
            </div>
          </Col>

          <Col span={24} md={14}>
            <div className="contact__container-field">
              <div className="container__field-form">
                <Form
                  name="change__field-category"
                  onFinish={handleSubmit(onSubmit)}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <InputComponent
                        name="name"
                        control={control}
                        errors={errors}
                        placeholder="Họ và tên"
                        className="remove__border"
                      />
                    </Col>
                    <Col span={24}>
                      <InputComponent
                        name="email"
                        control={control}
                        errors={errors}
                        placeholder="Email"
                        className="remove__border"
                      />
                    </Col>
                    <Col span={24}>
                      <InputComponent
                        name="phone_number"
                        control={control}
                        errors={errors}
                        placeholder="Số điện thoại"
                        className="remove__border"
                      />
                    </Col>
                    <Col span={24}>
                      <InputComponent
                        name="address"
                        control={control}
                        errors={errors}
                        placeholder="Địa chỉ"
                        className="remove__border"
                      />
                    </Col>
                    <Col span={24}>
                      <TextAreComponent
                        name="content"
                        control={control}
                        errors={errors}
                        placeholder="Lời nhắn"
                        className="remove__border"
                        rows={4}
                      />
                    </Col>
                  </Row>
                  <div className="button__footer">
                    <ButtonComponent
                      htmlType="submit"
                      label="Gửi"
                      className="btn__submit btn__tab"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
