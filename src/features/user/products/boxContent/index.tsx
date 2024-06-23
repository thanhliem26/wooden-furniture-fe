import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "./index.module.scss";

interface Props {
  title: string;
  children: any;
}

const BoxContent = ({ children, title }: Props) => {
  const [close, setClose] = useState<boolean>(false);

  return (
    <div className={styled['filter__box-list']}>
      <div className='filter__box-title'>
        <h4>{title} </h4>
        <span onClick={() => setClose(!close)}>
          <DownOutlined />
        </span>
      </div>
      <div className={close ? 'filter__box-container closed' : 'filter__box-container'}>
      {children}
      </div>
      
    </div>
  );
};

export default BoxContent;
