import { Button, Form, ButtonProps } from "antd";
interface typeButtonComponent extends ButtonProps {
  wrapperCol?: any,
  type?: "link" | "text" | "primary" | "default" | "dashed",
  htmlType?: 'button' | 'submit' | 'reset',
  label?: string,
  className?: string,
}

const ButtonComponent = ({
  wrapperCol,
  type = "primary",
  htmlType = "button",
  label,
  className = '',
  loading = false,
  ...props
}: typeButtonComponent) => {
  return (
    <Form.Item wrapperCol={wrapperCol} className={className}>
      <Button type={type} htmlType={htmlType} loading={loading} {...props}>
        {label}
      </Button>
    </Form.Item>
  );
};

export default ButtonComponent;
