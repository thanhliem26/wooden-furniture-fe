import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Modal from "@/components/modal";
import styled from "./index.module.scss";
import lodash from "lodash";
import { Input } from "antd";
import { reduceImageQuality } from "@/utils/index";

interface Props {
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  fileCompress: any;
  loading?: boolean;
  setChange: any;
}

const ModalPreview = ({
  destroyOnClose = true,
  isModalOpen,
  setIsModalOpen,
  fileCompress,
  loading,
  setChange,
  ...props
}: Props) => {
  const [quality, setQuality] = useState<number>(100);
  const imgRef = useRef<any>(null);

  const reduceImageQualityDebounced = lodash.debounce(reduceImageQuality, 300);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = URL.createObjectURL(fileCompress);
    }
  }, [loading]);

  const handleSubmit = () => {
    reduceImageQuality(fileCompress, quality, ({ filterBlob }) => {
      const newBlob = new File([filterBlob], fileCompress?.name, {
        type: fileCompress?.type,
      });
      newBlob["uid"] = fileCompress.uid;
      setChange(quality === 100 ? fileCompress : newBlob);
      setQuality(100)
    });

    return true;
  };

  return (
    <Modal
      destroyOnClose={destroyOnClose}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onSuccessModal={handleSubmit}
      {...props}
    >
      <div className={styled["preview__image"]}>
        <div className="preview__image-contain">
          <p className="image__name">
            <b>Name:</b> {fileCompress?.name}
          </p>
          <img ref={imgRef} alt={fileCompress?.name} />
        </div>
        <div className="preview__image-range">
          <Input
            type="range"
            defaultValue={100}
            onChange={(e) =>
              reduceImageQualityDebounced(
                fileCompress,
                e.target.value,
                ({ quality, filterBlob }) => {
                  if (imgRef.current) {
                    imgRef.current.src = URL.createObjectURL(filterBlob);
                  }
                  setQuality(quality);
                }
              )
            }
          ></Input>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPreview;
