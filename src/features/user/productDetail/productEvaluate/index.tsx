import { Tabs } from "antd";
import styled from './index.module.scss';
import Description from "./description";
import Stars from './stars'
import { SmileOutlined, StarOutlined } from "@ant-design/icons";

interface Props {
  product: ProductState | null;
}

const ProductEvaluate= ({product}: Props) => {
  const items = [
    {
      key: "1",
      label: <span><SmileOutlined />Tổng quan </span>,
      children: <Description product={product}/>,
    },
    {
      key: "2",
      label: <span><StarOutlined />Đánh giá</span>,
      children: <Stars />,
    },
  ];

  return (
    <div className={styled['main__evaluate']}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ProductEvaluate;
