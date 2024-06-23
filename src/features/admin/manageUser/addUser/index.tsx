import { ButtonComponent } from "@/components/form";
import styled from "./index.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import ModalChangeInfoUser from '@/components/modal/modalChangeInfoUser';

const AddUser = () => {
  return (
    <div className={styled["add__user"]}>
      <ModalChangeInfoUser
        title="Add user"
        destroyOnClose={true}
        width={800}
        content={
          <ButtonComponent
            className="btn__add-user"
            icon={<UserAddOutlined />}
            label="Add user"
          />
        }
      ></ModalChangeInfoUser>
    </div>
  );
};

export default AddUser;
