import SingUp from "./singUp";
import styled from "./index.module.scss";

const Login = () => {
  return (
    <div className={styled["login__page"]}>
      <div className="login__page-wrapper">
      <div className="container">
        <SingUp />
      </div>
      </div>
    </div>
  );
};

export default Login;
