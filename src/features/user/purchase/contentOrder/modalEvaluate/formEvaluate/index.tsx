import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";
import {
  ButtonComponent,
} from "@/components/form";
import {
  eventEmitter,
  handleURL,
  isJson,
  NotificationError,
} from "@/utils/index";
import StarEmpty from "@/components/starEmpty";
import StarFull from "@/components/starFull";
import TextArea from "antd/es/input/TextArea";
import EvaluateApi from "@/api/evaluate";
import Notification from "@/components/notificationSend";
import orderDetailApi from "@/api/orderDetail";
import Images from "@/constants/images";
import moment from "moment";

interface Props {
  isEdit: boolean;
  product_data: ProductDataOrder;
  orderDetail_id: number;
  handleUpdateOrderDetail: (data) => void;
  evaluate_id?: number | null;
}

const FormCategory = ({
  isEdit,
  evaluate_id,
  product_data,
  orderDetail_id,
  handleUpdateOrderDetail,
}: Props) => {
  const [star, setStar] = useState<number>(5);
  const [evaluate, setEvaluate] = useState<string>("");
  const [user, setUser] = useState<EvaluateState>();

  const image = useMemo(() => {
    return handleURL(product_data?.images);
  }, [product_data]);

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  const handleSubmit = async () => {
    try {
      const { metadata, message } = await EvaluateApi.createEvaluate({
        product_id: product_data.id,
        star: star.toString(),
        evaluate,
      });

      await orderDetailApi.updateOrderDetail({
        id: orderDetail_id,
        evaluate_id: metadata.id,
      });
      handleUpdateOrderDetail &&
        handleUpdateOrderDetail({
          id: orderDetail_id,
          evaluate_id: metadata.id,
        });

      Notification({
        message: "Notify success",
        description: message,
      });

      eventEmitter.emit("cancel_modal");
    } catch (error) {
      NotificationError(error);
    }
  };

  const handleGetEvaluate = async () => {
    const { metadata } = await EvaluateApi.getEvaluate(evaluate_id);
    setUser(metadata);
    setStar(metadata.star);
    setEvaluate(metadata.evaluate);
  };

  useEffect(() => {
    if (isEdit && evaluate_id) {
      handleGetEvaluate();
    }
  }, [isEdit, evaluate_id]);

  const avatar = useMemo(() => {
    if (!isEdit || !user?.user_evaluate) return "";
    const { user_evaluate } = user;
    return isJson(user_evaluate.avatar)
      ? JSON.parse(user_evaluate.avatar).url
      : Images.AvatarDefault;
  }, [isEdit, user]);

  return (
    <div className="change__field-evaluate">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="product__evaluate">
            <div className="product__evaluate-image">
              <img src={image.url} alt="product image" />
            </div>
            <div className="product__evaluate-content">
              <div className="product__name">
                <span>{product_data.name}</span>
              </div>
              <div className="product__description">
                <p className="overflow__text">{product_data.description}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="description__evaluate">
            {isEdit ? (
              <div className="evaluate__edit">
                <div className="evaluate__user">
                  <img src={avatar} alt="" />
                </div>
                <div className="evaluate__content">
                  <div className="content__name">
                    <span>{user?.user_evaluate?.fullName}</span>
                  </div>
                  <div className="content__star">
                    {Array.apply(null, Array(5)).map((_, index) => {
                      return (
                        <div className="evaluate__star" key={index}>
                          {star >= index + 1 ? <StarFull /> : <StarEmpty />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="content__description">
                    <p>{evaluate}</p>
                  </div>
                  <div className="content__date">
                    <span>
                      {moment(user?.createdAt).format("HH:mm DD-MM-YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="evaluate__starts">
                  {Array.apply(null, Array(5)).map((_, index) => {
                    return (
                      <div
                        className="evaluate__star"
                        key={index}
                        onClick={() => setStar(index + 1)}
                      >
                        {star >= index + 1 ? <StarFull /> : <StarEmpty />}
                      </div>
                    );
                  })}
                </div>
                <div className="evaluate__description">
                  <TextArea
                    value={evaluate}
                    onChange={(e) => {
                      setEvaluate(e.target.value);
                    }}
                    placeholder="Description contact"
                    className="remove__border"
                    rows={4}
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
      <div className="button__footer">
        <ButtonComponent
          label="Cancel"
          className="btn__tab"
          type="default"
          onClick={handleClose}
        />
        {!isEdit && (
          <ButtonComponent
            htmlType="submit"
            label="Save"
            className="btn__submit btn__tab"
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default FormCategory;
