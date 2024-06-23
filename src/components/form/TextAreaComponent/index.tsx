import { Controller } from "react-hook-form";
import { ColProps, Form, Input } from "antd";

const { TextArea } = Input;

interface typeInputAreaComponent{
  name: string,
  control: any,
  errors?: any,
  label?: string,
  placeholder?: string,
  className?: string,
  icon?: React.ReactNode,
  type?: string,
  rows?: number,
  disabled?: boolean,
  labelCol?: ColProps,
}

const InputComponent = ({
  name,
  control,
  errors,
  label = "",
  placeholder = "",
  className = "",
  labelCol,
  ...props
}: typeInputAreaComponent) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className} labelCol={labelCol}>
          <TextArea
            {...field}
            placeholder={placeholder}
            {...props}
          />
          {errors?.[name] && (
            <div className="ant-form-item-explain-error">
              {errors?.[name]?.message}
            </div>
          )}
        </Form.Item>
      )}
    />
  );
};

export default InputComponent;
