import { useState } from "react";
import styled from "./index.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import ModalConfirm from "../modalComfirm";
import TEXT_COMMON from "@/constants/text";

interface Props {
  onClickUpdate: any;
  onClickDelete: any;
}

const PopoverContent = ({ onClickUpdate, onClickDelete }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <div className={styled["popover__main"]}>
          <ul className="popover__list">
            <li
              className="popover__item"
              onClick={() => {
                onClickUpdate();
                hide();
              }}
            >
              <EditOutlined /> <p>{TEXT_COMMON.SHOW_TEXT.EDIT_COMMENT}</p>
            </li>
            <ModalConfirm
              destroyOnClose={true}
              onClickDelete={onClickDelete}
              content={
                <li
                  className="popover__item"
                  onClick={() => {
                    hide();
                  }}
                >
                  <DeleteOutlined /> <p>{TEXT_COMMON.SHOW_TEXT.DELETE_COMMENT}</p>
                </li>
              }
            />
          </ul>
        </div>
      }
      title=""
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      overlayClassName={styled["popover__customize"]}
    >
      <div className="icon__dot">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="ellipsis"
          className="svg-inline--fa fa-ellipsis "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={12}
        >
          <path
            fill="currentColor"
            d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
          ></path>
        </svg>
      </div>
    </Popover>
  );
};

export default PopoverContent;
