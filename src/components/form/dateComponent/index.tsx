import { Controller } from "react-hook-form";
import { DatePicker, Form } from "antd";
import { DatePickerProps } from "antd";

type typeInputDateComponent = DatePickerProps & {
    name: string,
    control: any,
    errors?: any,
    label?: string,
    placeholder?: string,
    className?: string,
    icon?: React.ReactNode,
    type?: string,
}

const InputDateComponent = ({
  name,
  control,
  errors,
  label = "",
  placeholder = "",
  className = "",
  ...props
}: typeInputDateComponent ) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className}>
          <DatePicker
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

export default InputDateComponent;
