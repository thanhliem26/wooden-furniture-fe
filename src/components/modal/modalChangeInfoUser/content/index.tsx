import { useEffect, useState } from "react";
import styled from "../index.module.scss";
import { Col, Row, Form } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  handleGetSchema,
  handleSubmitCreate,
  handleSubmitEdit,
} from "../constant";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { setUserSelected } from "@/store/manageUser";
import dayjs from "dayjs";
import {
  NotificationError,
  eventEmitter,
  removeEmptyInOBject,
} from "@/utils/index";
import images from "@/constants/images";
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  InputDateComponent,
  SelectComponent,
} from "@/components/form";
import UploadComponent from "@/components/form/uploadComponent";
import {
  disabledDate,
  handlePrevImageS3,
  handleSetImage,
  optionGender,
  optionRole,
} from "./constant";
import lodash from "lodash";

interface Props {
  isEdit?: boolean;
  onSuccess?: any;
  setNullWhenCancel?: boolean;
}

const ContentInfoChange = ({
  isEdit,
  onSuccess,
  setNullWhenCancel = true,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userSelected = useAppSelector(
    (state: RootState) => state.manageUser.userSelected
  );

  const [avatar, setAvatar] = useState<string>(images.AvatarDefault);
  const [avatarSP, setAvatarSP] = useState<string>(images.AvatarSupporting);

  const dispatch = useAppDispatch();

  const schema = handleGetSchema({ isEdit: isEdit });
  type FormData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
      email: userSelected?.email,
      fullName: userSelected?.fullName,
      role_user: userSelected?.role_user,
      address: userSelected?.address || "",
      // @ts-ignores
      dateOfBirth: userSelected?.dateOfBirth ? dayjs(userSelected?.dateOfBirth) : dayjs(new Date()),
      phoneNumber: userSelected?.phoneNumber || "",
      sex: userSelected?.sex,
      id: userSelected?.id,
      avatar: userSelected?.avatar ? [JSON.parse(userSelected?.avatar)] : [],
      avatar_support: userSelected?.avatar_support
        ? [JSON.parse(userSelected?.avatar_support)]
        : [],
    },
  });

  const showPassword = useWatch({
    control,
    name: "show",
    defaultValue: false,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const dataValue = lodash.cloneDeep(data);

      const { avatar, avatar_support } = dataValue;

      dataValue.avatar = !lodash.isEmpty(avatar)
        ? await handlePrevImageS3(avatar)
        : "";
      dataValue.avatar_support = !lodash.isEmpty(avatar_support)
        ? await handlePrevImageS3(avatar_support)
        : "";

      removeEmptyInOBject(dataValue);

      isEdit
        ? handleSubmitEdit(dataValue, dispatch, eventEmitter)
        : handleSubmitCreate(dataValue, dispatch, eventEmitter);

      onSuccess && onSuccess();
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
    setNullWhenCancel && dispatch(setUserSelected(null));
    eventEmitter.emit("cancel_modal");
  };

  const FileListAvatar = getValues("avatar");
  const FileListAvatarSP = getValues("avatar_support");

  const handleChange = ({ file: newFileList }, data, name) => {
    const imageUpload = newFileList;

    const fileList = data.map((item) => {
      item.is_delete = true;

      return item;
    });

    const arrayImage = [
      ...fileList,
      { ...imageUpload, origin: "normal", is_delete: false },
    ];

    setValue(name, arrayImage, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  //set avatar
  useEffect(() => {
    handleSetImage(FileListAvatar, setAvatar);
  }, [FileListAvatar]);

  useEffect(() => {
    handleSetImage(FileListAvatarSP, setAvatarSP);
  }, [FileListAvatarSP]);

  return (
    <div className={styled["information__tab"]}>
      <div className="information__tab-content">
        <Form
          name="change_information"
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={onFinishFailed}
        >
          <div className="information__tab-image">
            <div className="tab__image-avatarSupport">
              <label htmlFor="avatar_support">
                <img src={avatarSP} alt="avatar supporting" />
              </label>

              <UploadComponent
                id="avatar_support"
                name="avatar_support"
                control={control}
                errors={errors}
                className="remove__border"
                setValue={setValue}
                maxCount={1}
                uploadSelf={true}
                onChange={(file) =>
                  handleChange(file, FileListAvatarSP, "avatar_support")
                }
              />
            </div>
            <div className="tab__image-avatar">
              <label htmlFor="image">
                <img src={avatar} alt="avatar" />
              </label>
              <UploadComponent
                id="image"
                name="avatar"
                control={control}
                errors={errors}
                className="remove__border"
                setValue={setValue}
                maxCount={1}
                uploadSelf={true}
                onChange={(file) => handleChange(file, FileListAvatar, "avatar")}
              />
            </div>
          </div>
          <Row gutter={[16, 16]}>
            <Col md={6} span={24}>
              Email <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="email"
                control={control}
                errors={errors}
                placeholder="Email"
                className="remove__border"
                disabled={isEdit}
              />
            </Col>
            <Col md={6} span={24}>
              Full Name <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="fullName"
                control={control}
                errors={errors}
                placeholder="Your name"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Role <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <SelectComponent
                name="role_user"
                control={control}
                errors={errors}
                placeholder="ROLE"
                className="remove__border"
                options={optionRole}
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
                placeholder="Address"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Date of Birth
            </Col>
            <Col md={18} span={24}>
              <InputDateComponent
                name="dateOfBirth"
                control={control}
                errors={errors}
                disabledDate={disabledDate}
                placeholder="date Of Birth"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Phone Number
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="phoneNumber"
                control={control}
                errors={errors}
                placeholder="phoneNumber"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Gender
            </Col>
            <Col md={18} span={24}>
              <SelectComponent
                name="sex"
                control={control}
                errors={errors}
                placeholder="sex"
                className="remove__border"
                options={optionGender}
              />
            </Col>

            {!isEdit ? (
              <>
                <Col md={6} span={24}>
                  New Password <span className="required">*</span>
                </Col>
                <Col md={18} span={24}>
                  <InputComponent
                    name="password"
                    control={control}
                    errors={errors}
                    placeholder="Your Password"
                    className="remove__border"
                    type={showPassword ? "text" : "password"}
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
                    placeholder="Confirm Password"
                    className="remove__border"
                    type={showPassword ? "text" : "password"}
                  />
                </Col>
                <Col md={6} span={0}></Col>
                <Col md={18} span={24}>
                  <CheckboxComponent
                    name="show"
                    control={control}
                    errors={errors}
                    className="remove__border"
                    setValue={setValue}
                  >
                    Show password
                  </CheckboxComponent>
                </Col>
              </>
            ) : null}
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
    </div>
  );
};

export default ContentInfoChange;
