import { ButtonProps, ColProps } from 'antd';

export interface typeButtonComponent extends ButtonProps {
    wrapperCol?: ColProps,
    type?: "link" | "text" | "primary" | "default" | "dashed",
    htmlType?: 'button' | 'submit' | 'reset',
    label?: string,
    className?: string,
}