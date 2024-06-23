import { useEffect, useState } from "react";
import styled from "./index.module.scss";

interface Props {
  avatar: string;
  titleCancel?: string;
  titleSubmit?: string;
  callback: any;
  handleCancel?: any;
  className?: string;
  defaultValue?: string;
}

const InputContent = ({
  avatar,
  callback,
  titleCancel = "Hủy",
  titleSubmit = "Bình luận",
  className = "",
  defaultValue,
  handleCancel,
}: Props) => {
  const [content, setContent] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const handleSetContent = (e) => {
    setContent(e.target.value);
  };

  const handleSetShowBtn = () => {
    setShowBtn(true);
  };

  const handleReset = () => {
    setShowBtn(false);
    setContent("");

    handleCancel && handleCancel();
  };

  const handleSubmit = async (callback) => {
    const valueSubmit = {
      content: content,
      parent_id: null,
    };

    if (!callback) return;

    const is_success = await callback(valueSubmit);
    if (is_success) handleReset();
  };

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      setShowBtn(true);
      setContent(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={`${styled["input__content"]} ${className}`}>
      <div className="modal__comment-input">
        <div className="comment__input-user">
          <img src={avatar} alt="" />
        </div>
        <div className="comment__input-field">
          <input
            type="text"
            placeholder="Bạn có thắc mắc gì về sản phẩm này?"
            onFocus={handleSetShowBtn}
            onChange={handleSetContent}
            value={content}
          />
        </div>
      </div>
      {showBtn && (
        <div className="comment__input-btn">
          <button className="btn__cancel" onClick={handleReset}>
            {titleCancel}
          </button>
          <button
            className={`btn__comment ${content && "active_comment"}`}
            onClick={() => {
              content && handleSubmit(callback);
            }}
          >
            {titleSubmit}
          </button>
        </div>
      )}
    </div>
  );
};

export default InputContent;
