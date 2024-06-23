import { Controller } from "react-hook-form";
import { Form, Select } from "antd";
import { SelectProps } from "antd";
import { useEffect } from "react";

interface typeInputSelectComponent extends SelectProps {
  name: string;
  control: any;
  errors?: any;
  label?: string;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  defaultValue?: any;
  setValue?: (name, value) => void;
}

const SelectComponent = ({
  name,
  control,
  errors,
  label = "",
  placeholder = "",
  className = "",
  defaultValue,
  setValue,
  ...props
}: typeInputSelectComponent) => {

  useEffect(() => {
    setValue && setValue(name, defaultValue)
  }, [defaultValue])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className}>
          <Select
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

export default SelectComponent;
