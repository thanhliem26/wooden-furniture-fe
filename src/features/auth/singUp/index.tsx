import FormRegister from "./formRegister";
import ImageRegister from "./imageRegister";
import styled from "../index.module.scss";

const SingUp = () => {
  return (
    <div className={styled["login__page"]}>
      <div className="login__page-wrapper">
        <div className="container">
          <div className="singUp__content">
            <FormRegister />
            <ImageRegister />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
