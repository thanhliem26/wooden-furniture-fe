import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/index";
import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "@/components/form";
import { eventEmitter, isJson } from "@/utils/index";
import { useForm } from "react-hook-form";
import {
  schema,
  FormData,
  handleSubmitEdit,
  handleSubmitCreate,
  optionActive,
} from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/store/index";
import UploadComponent from "@/components/form/uploadComponent";
import lodash from 'lodash';
import { handleMultiPrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import markDownApi from "@/api/markdown";
import EditorBox from "@/components/form/tinyComponent";

interface Props {
  isEdit: boolean;
}

const FormAboutUs = ({ isEdit }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const aboutUsSelected = useAppSelector((state) => state.aboutUs.aboutUsSelected);

  const [imageDefault, setImageDefault] = useState([]);
  const [logoDefault, setLogoDefault] = useState([]);
  const [editor, setEditor] = useState<string>('');

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
      id: aboutUsSelected?.id,
      name: aboutUsSelected?.name,
      address: aboutUsSelected?.address || '',
      address_link: aboutUsSelected?.address_link,
      email: aboutUsSelected?.email,
      image: isJson(aboutUsSelected?.image) ? JSON.parse(aboutUsSelected?.image) : [],
      logo: isJson(aboutUsSelected?.logo) ? JSON.parse(aboutUsSelected?.logo) : [],
      phone_number: aboutUsSelected?.phone_number || '',
      is_active: aboutUsSelected?.is_active || '0',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const dataValue = lodash.cloneDeep(data);
      const { image, logo } = dataValue;

      const imagesUpload = !lodash.isEmpty(image)
      ? await handleMultiPrevImageS3(image)
      : "";
      dataValue.image = typeof imagesUpload === 'string' ? imagesUpload : JSON.stringify(imagesUpload);

      const imagesUploadLogo = !lodash.isEmpty(logo)
      ? await handleMultiPrevImageS3(logo)
      : "";
      dataValue.logo = typeof imagesUploadLogo === 'string' ? imagesUploadLogo : JSON.stringify(imagesUploadLogo);

      const { metadata } = await markDownApi.createMarkdown({
        contentHTML: editor, 
        contentMarkdown: editor,
        id: isEdit && aboutUsSelected?.markdown_id ? aboutUsSelected?.markdown_id : null,
      })

      const { id } = metadata;
      dataValue.markdown_id = id;
      dataValue.contentHTML = editor;
      dataValue.contentMarkdown = editor;
      
      isEdit
        ? handleSubmitEdit(dataValue, dispatch, eventEmitter)
        : handleSubmitCreate(dataValue, dispatch, eventEmitter);
    } catch (error: unknown) {
      console.log("error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditorTiny = (value) => {
    setEditor(value)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  useEffect(() => {
    const imageShow = isJson(aboutUsSelected?.image) ? JSON.parse(aboutUsSelected?.image) : [];
    setImageDefault(imageShow);

    const logo = isJson(aboutUsSelected?.logo) ? JSON.parse(aboutUsSelected?.logo) : [];
    setLogoDefault(logo);
    handleEditorTiny(aboutUsSelected?.contentHTML || '')
  }, [aboutUsSelected])

  return (
    <div className="change__field-product">
      <Form
        name="change__field-product"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 16]}>
        <Col md={6} span={24}>
              Active
            </Col>
            <Col md={18} span={24}>
              <SelectComponent
                name="is_active"
                control={control}
                errors={errors}
                className="remove__border"
                options={optionActive}
              />
            </Col>

          <Col md={6} span={24}>
            Name <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
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
            />
          </Col>

          <Col md={6} span={24}>
            Address Link<span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="address_link"
              control={control}
              errors={errors}
            />
          </Col>

          <Col md={6} span={24}>
            Phone Number<span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="phone_number"
              control={control}
              errors={errors}
            />
          </Col>

          <Col md={6} span={24}>
           Email<span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="email"
              control={control}
              errors={errors}
            />
          </Col>

          <Col md={6} span={24}>
            Logo <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <UploadComponent
              name="logo"
              control={control}
              errors={errors}
              className="remove__border"
              setValue={setValue}
              maxCount={1}
              defaultValue={logoDefault}
            />
          </Col>

          <Col md={6} span={24}>
            Image <span className="required">*</span>
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
            />
          </Col>

          <Col md={24} span={24}>
            Markdown
          </Col>
          <Col md={24} span={24}>
           {/* <MarkdownProduct showMarkDown={showMarkDown} handleEditorChange={debounceEditor} markdown={markdown}/> */}
           <EditorBox
            value={editor}
            onEditorChange={(value) => {
              setEditor(value);
            }}/>
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

export default FormAboutUs;
