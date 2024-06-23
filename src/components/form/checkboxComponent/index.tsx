import { Controller } from "react-hook-form";
import { Checkbox, Form } from "antd";
import { CheckboxProps } from "antd";

interface typeInputCheckboxComponent extends CheckboxProps {
  name: string;
  control: any;
  errors?: any;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  type?: string;
  setValue: any;
}

const CheckboxComponent = ({
  name,
  control,
  errors,
  label = "",
  className = "",
  children,
  setValue,
}: typeInputCheckboxComponent) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className}>
          <Checkbox
            {...field}
            checked={field.value}
            onChange={(e) =>
              setValue(name, e.target.checked, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {children}
          </Checkbox>
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

export default CheckboxComponent;
