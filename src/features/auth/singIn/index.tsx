import FormLogin from "./formLogin";
import ImageLogin from "./imageLogin";
import styled from "../index.module.scss";

const SingUp = () => {
  return (
    <div className={styled["login__page"]}>
      <div className="login__page-wrapper">
        <div className="container">
          <div className="singIn__content">         
            <ImageLogin />
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
