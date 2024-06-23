import { SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  SelectComponent,
} from "@/components/form";
import { handleMultiPrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import lodash from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "./index.module.scss";
import UploadComponent from "@/components/form/uploadComponent";
import {
  schema,
  FormData,
  optionTypeStaticPage,
  initialValue,
  initialValueType,
} from "./constant";
import categoryApi from "@/api/category";
import staticApi from "@/api/static";
import { statusCode } from "@/constants/index";
import Notification from "@/components/notificationSend";
import { NotificationError } from "@/utils/index";
import TEXT_COMMON from "@/constants/text";

const SettingStatic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryState[]>([]);
  const [staticList, setStaticList] = useState<StaticState[]>([]);
  const [defaultValue, setDefaultValue] = useState(initialValue);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const dataValue = lodash.cloneDeep(data);
      const { ImageSP, Images, productShow } = dataValue;

      const imagesUpload = !lodash.isEmpty(Images)
        ? await handleMultiPrevImageS3(Images)
        : "";
      dataValue.Images =
        typeof imagesUpload === "string"
          ? imagesUpload
          : JSON.stringify(imagesUpload);

      const imageSPUpload = !lodash.isEmpty(ImageSP)
        ? await handleMultiPrevImageS3(ImageSP)
        : "";
      dataValue.ImageSP =
        typeof imageSPUpload === "string"
          ? imageSPUpload
          : JSON.stringify(imageSPUpload);
      dataValue.productShow = JSON.stringify(productShow ? productShow : []);

      const { status, message } = await staticApi.setStatic(
        dataValue
      );
    
      if (status === statusCode.SUCCESS || status === statusCode.UPDATED) {
        handleGetStatic();

        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
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

  const handleGetProductList = async () => {
    const { metadata } = await categoryApi.searchCategory();
    setCategoryList(metadata.rows);
  };

  const handleGetStatic = async () => {
    const { metadata } = await staticApi.getStatic();
    setStaticList(metadata);
  };

  const handleChangeType = (value) => {
    const [item] = staticList.filter((itemStatic) => {
      return itemStatic["type"] === value;
    });

    if (!item) {
      setDefaultValue({ ...initialValue, type: value });
      return;
    }

    const valueSet: initialValueType = {
      ImageSP: item?.["ImageSP"] && Array.isArray(JSON.parse(item?.["ImageSP"])) ? JSON.parse(item?.["ImageSP"]) : [],
      Images: item?.["Images"]  && Array.isArray(JSON.parse(item?.["Images"])) ? JSON.parse(item?.["Images"]) : [],
      productShow: item?.["productShow"]
        ? JSON.parse(item?.["productShow"])
        : [],
      type: item?.["type"] ? item?.["type"] : null,
    };

    setDefaultValue(valueSet);
  };

  useEffect(() => {
    handleGetProductList();
    handleGetStatic();
  }, []);

  useEffect(() => {
    const type = getValues('type');
    handleChangeType(type)
  }, [staticList])

  return (
    <div className={styled["setting__static"]}>
      <div className="setting__static-page">
        <SettingOutlined /> <h3>Setting Static</h3>
      </div>
      <div className="setting__static-form">
        <Form
          name="change_information"
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={[16, 16]}>
            <Col md={4} span={24}>
              Type page <span className="required">*</span>
            </Col>
            <Col md={20} span={24}>
              <SelectComponent
                name="type"
                control={control}
                errors={errors}
                placeholder="Type Static Page"
                className="remove__border"
                showSearch
                options={optionTypeStaticPage}
                onChange={handleChangeType}
                defaultValue={defaultValue.type}
                setValue={setValue}
              />
            </Col>
            <Col md={4} span={24}>
              Images
            </Col>
            <Col md={20} span={24}>
              <UploadComponent
                name="Images"
                control={control}
                errors={errors}
                className="remove__border"
                setValue={setValue}
                maxCount={10}
                mdImage={8}
                smImage={12}
                spanImage={24}
                defaultValue={defaultValue.Images}
              />
            </Col>
            <Col md={4} span={24}>
              ImageSP
            </Col>
            <Col md={20} span={24}>
              <UploadComponent
                name="ImageSP"
                control={control}
                errors={errors}
                className="remove__border"
                setValue={setValue}
                maxCount={2}
                mdImage={8}
                smImage={12}
                spanImage={24}
                defaultValue={defaultValue.ImageSP}
              />
            </Col>
            <Col md={4} span={24}>
              List Product
            </Col>
            <Col md={20} span={24}>
              <SelectComponent
                name="productShow"
                control={control}
                errors={errors}
                placeholder="Category"
                className="remove__border"
                showSearch
                mode="multiple"
                options={categoryList.map((product) => ({
                  label: product.name,
                  value: product.id,
                }))}
                defaultValue={defaultValue.productShow}
                setValue={setValue}
              />
            </Col>
          </Row>
          <div className="button__footer">
            <ButtonComponent
              htmlType="submit"
              label="Save changes"
              className="btn__submit btn__tab"
              loading={loading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SettingStatic;
